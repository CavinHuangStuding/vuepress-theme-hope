import { chalk, fs } from "@vuepress/utils";
import { dirname } from "path";
import { getFeedChannelOption, getFilename, getFeedLinks } from "./options";
import { Feed } from "./feed";
import { FeedPage } from "./page";
import { compareDate, logger } from "./utils";

import type { App, Page } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { ResolvedFeedOptionsMap } from "./options";

export class FeedGenerator {
  /** feed 生成器 */
  feedMap: Record<string, Feed>;

  constructor(private app: App, private options: ResolvedFeedOptionsMap) {
    this.feedMap = Object.fromEntries(
      Object.entries(options).map(([localePath, localeOptions]) => {
        return [
          localePath,
          new Feed({
            channel: getFeedChannelOption(app, localeOptions, localePath),
            links: getFeedLinks(app, localeOptions),
          }),
        ];
      })
    );
  }

  addPages(localePath: string): void {
    const feed = this.feedMap[localePath];
    const localeOption = this.options[localePath];
    const {
      filter = ({ frontmatter, filePathRelative }: Page): boolean =>
        !(
          frontmatter.home ||
          !filePathRelative ||
          frontmatter.article === false ||
          frontmatter.feed === false
        ),
      sorter = (
        pageA: Page<Record<string, never>, { git?: GitData }>,
        pageB: Page<Record<string, never>, { git?: GitData }>
      ): number => {
        return compareDate(
          pageA.git?.createdTime
            ? new Date(pageA.git?.createdTime)
            : pageA.frontmatter.date,
          pageB.git?.createdTime
            ? new Date(pageB.git?.createdTime)
            : pageB.frontmatter.date
        );
      },
    } = localeOption;
    const pages = this.app.pages
      .filter((page) => page.pathLocale === localePath)
      .filter(filter)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .sort(sorter)
      .slice(0, localeOption.count || 100);

    let count = 0;

    for (const page of pages) {
      const item = new FeedPage(
        this.app,
        localeOption,
        page,
        feed
      ).getFeedItem();

      if (item) {
        feed.addItem(item);
        count += 1;
      }
    }

    logger.succeed(
      `added ${chalk.cyan(
        `${count} page(s)`
      )} as feed item(s) in route ${chalk.cyan(localePath)}`
    );
  }

  async generateFeed(): Promise<void> {
    const { dest } = this.app.dir;

    await Promise.all(
      Object.entries(this.options).map(async ([localePath, localeOptions]) => {
        // current locale has valid output
        if (localeOptions.atom || localeOptions.json || localeOptions.rss) {
          const feed = this.feedMap[localePath];
          const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
            getFilename(localeOptions, localePath);

          this.addPages(localePath);

          // generate atom files
          if (localeOptions.atom) {
            await fs.ensureDir(dirname(dest(atomOutputFilename)));
            await fs.outputFile(dest(atomOutputFilename), feed.atom());

            logger.succeed(
              `Atom feed file generated and saved to ${chalk.cyan(
                atomOutputFilename
              )}`
            );
          }

          // generate json files
          if (localeOptions.json) {
            await fs.ensureDir(dirname(dest(jsonOutputFilename)));
            await fs.outputFile(dest(jsonOutputFilename), feed.json());

            logger.succeed(
              `JSON feed file generated and saved to ${chalk.cyan(
                jsonOutputFilename
              )}`
            );
          }

          // generate rss files
          if (localeOptions.rss) {
            await fs.ensureDir(dirname(dest(rssOutputFilename)));
            await fs.outputFile(dest(rssOutputFilename), feed.rss());

            logger.succeed(
              `RSS feed file generated and saved to ${chalk.cyan(
                rssOutputFilename
              )}`
            );
          }
        }
      })
    );
  }
}
