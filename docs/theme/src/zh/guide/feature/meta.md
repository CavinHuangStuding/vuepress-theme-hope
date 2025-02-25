---
title: 页面元数据
icon: time
category:
  - 功能
tag:
  - 功能
  - 元数据
---

主题通过 [`@vuepress/plugin-git`][git] 插件在页面底部显示页面的最后更新时间与贡献者，并提供了“编辑此页”按钮的支持。

主题同时根据侧边栏配置提供上一页和下一页的导航按钮。

<!-- more -->

## 基于 Git 的信息

`vuepress-theme-hope` 通过内置 [`@vuepress/plugin-git`][git] 插件，实现了页面创建时间、最后更新时间与贡献者的自动生成。

插件会通过页面文件最后一次 `git` 提交的 UNIX 时间戳 (ms) 来自动生成页面创建时间和最后更新时间，同时根据提交记录生成贡献者。

主题将以合适的日期格式将最后更新时间显示在每一页的底部，同时显示该页面所有贡献者。

::: tip

主题会使用 `dayjs` 自动根据当前语言，本地化最后更新时间的表述文字。

:::

::: warning 使用注意事项

由于最后更新时间是基于 `git` 的, 所以你只能在一个基于 `git` 的项目中启用它。此外，由于使用的时间戳来自 git commit，因此它将仅在给定页的第一次提交之后显示，并且仅在该页面后续提交更改时更新。

:::

::: danger 开发模式默认禁用

由于 `git` 插件对性能有严重影响，所以在**开发模式下主题不会启用**。如有需要请自行在配置文件中引入插件，或运行开发命令时添加 `--debug` 参数。

:::

## 编辑此页链接

你可以通过在 `themeConfig` 中设置如下项目，来自动为每个页面生成编辑此页链接:

- `docsRepo`: 文档仓库地址，默认同 `themeConfig.repo`
- `docsDir`: 文档在仓库中的目录，默认为根目录
- `docsBranch`: 文档存放的分值，默认为 `"main"`

## 显示控制

如果你想要全局禁用这些项目的显示，请在 `themeConfig` 中，将以下对应项目设置为 `false`。你也可以通过 `YAML front matter` 中设置这些项目来启用/禁用指定页面:

- `lastUpdated`: 是否显示页面最后更新时间
- `contributors`: 是否显示页面贡献者
- `editLink`: 是否展示编辑此页链接

[git]: https://v2.vuepress.vuejs.org/zh/reference/plugin/git.html
