import { defineThemeConfig } from "vuepress-theme-hope";
import { version } from "../../../../lerna.json";

const hostname =
  process.env.HOSTNAME || "https://vuepress-theme-hope-v2.netlify.app";

export default defineThemeConfig({
  hostname,

  author: {
    name: "Mr.Hope",
    url: "https://mrhope.site",
  },

  iconPrefix: "iconfont icon-",

  repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "docs/reading-time2/src",

  logo: "/logo.svg",

  footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",
  copyright: false,
  displayFooter: true,

  pageInfo: ["Category", "Tag", "ReadingTime"],

  locales: {
    "/": {
      navbar: [
        {
          text: version,
          icon: "note",
          children: [
            {
              text: "V1 Docs",
              link: "https://vuepress-theme-hope.github.io/v1/reading-time/",
            },
          ],
        },
      ],
    },

    "/zh/": {
      navbar: [
        {
          text: version,
          icon: "note",
          children: [
            {
              text: "V1 文档",
              link: "https://vuepress-theme-hope.github.io/v1/reading-time/zh/",
            },
          ],
        },
      ],
    },
  },

  plugins: {
    mdEnhance: {
      codegroup: true,
    },

    pwa: {
      update: "hint",
      favicon: "/favicon.ico",
      themeColor: "#46bd87",
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "vuepress-plugin-reading-time2",
        short_name: "reading-time plugin",
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    },
  },
});
