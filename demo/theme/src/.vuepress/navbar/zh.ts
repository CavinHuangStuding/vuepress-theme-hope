import { defineNavbarConfig } from "vuepress-theme-hope";
import { version } from "../../../../../lerna.json";

export const zh = defineNavbarConfig([
  "/zh/",
  "/zh/home",
  { text: "使用指南", icon: "creative", link: "/zh/guide/" },
  {
    text: "博文",
    icon: "edit",
    prefix: "/zh/posts/",
    children: [
      {
        text: "文章 1-4",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "文章 1", icon: "edit", link: "article1" },
          { text: "文章 2", icon: "edit", link: "article2" },
          "article3",
          "article4",
        ],
      },
      {
        text: "文章 5-12",
        icon: "edit",
        children: [
          {
            text: "文章 5",
            icon: "edit",
            link: "article/article5",
          },
          {
            text: "文章 6",
            icon: "edit",
            link: "article/article6",
          },
          "article/article7",
          "article/article8",
        ],
      },
      { text: "文章 9", icon: "edit", link: "article9" },
      { text: "文章 10", icon: "edit", link: "article10" },
      "article11",
      "article12",
    ],
  },
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V2 文档",
        link: "https://vuepress-theme-hope.github.io/v2/zh/",
      },
      {
        text: "V1 文档",
        link: "https://vuepress-theme-hope.github.io/v1/zh/",
      },
      {
        text: "V1 演示",
        link: "https://vuepress-theme-hope.github.io/v1-demo/zh/",
      },
    ],
  },
]);
