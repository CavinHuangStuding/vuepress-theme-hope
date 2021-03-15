---
home: true
icon: home
title: Home
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: A vuepress theme with tons of features✨
action:
  - text: Get Started 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

features:
  - title: Markdown Enhance 🧰
    details: Add align, sup/sub script, footnote, tex, flowchart, mark and presentation support in markdown
    link: /guide/markdown/

  - title: Pageviews and comments 💬
    details: Start pageview statistics and comment support with Valine and Vssue
    link: /guide/feature/comment/

  - title: Article information display ℹ
    details: Add author, writing date, reading time, word count and other information to your article
    link: /guide/feature/page-info/

  - title: Blog support 📝
    details: Add date, tags and category to your articles, then article, tag, category and timeline list will be auto generated
    link: /guide/blog/intro/

  - title: Article Encryption 🔐
    details: Encrypt you article based on path and folders, so that only the one you want could see them
    link: /guide/feature/encrypt/

  - title: Custom theme color 🎨
    details: Supports custom theme colors and allows users to switch between preset theme colors
    link: /guide/interface/theme-color/

  - title: Dark Mode 🌙
    details: Switch between light and dark modes freely
    link: /guide/interface/darkmode/

  - title: SEO enhancement ⚒
    details: Optimize pages for search engines.
    link: /guide/feature/seo/

  - title: Sitemap 🗺
    details: Generate a Sitemap for your website
    link: /guide/feature/sitemap/

  - title: Feed support 📡
    details: You can generate feed, and let users to subcribe it
    link: /guide/feature/feed/

  - title: PWA support 📲
    details: The built-in PWA plugin will make your website more like an APP.
    link: /guide/feature/pwa/

  - title: TS support 🔧
    details: Turn on TypeScript support for your VuePress
    link: /guide/feature/typescript/

  - title: More new features ✨
    details: Including icon support, path navigation, footer support, fullscreen button, blog homepage, etc.
    link: /guide/feature/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 🛠Install

### Quick Install

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn create vuepress-theme-hope [dir]
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npx create-vuepress-theme-hope [dir]
```
</CodeGroupItem>
</CodeGroup>

### Manual Install

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D vuepress-theme-hope
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm i -D vuepress-theme-hope
```
</CodeGroupItem>
</CodeGroup>

## 🚀Usage

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  // your config here
});
```

::: tip

The purpose of introducing the `config` function is to give you full hints through TS’s Interface and JSDoc when you edit the configuration.

At the same time, the `config` function will also complete some default configurations for your current configuration which will pass directly to VuePress.

You can view [Config of this site][docs-config] as an example.

:::

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/docs/theme/src/.vuepress/config.js
