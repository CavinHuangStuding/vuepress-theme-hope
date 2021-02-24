---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-photo-swipe
tagline: Photo swipe plugin for vuepress
action:
  - text: Demo 💡
    link: /demo/
    type: primary

  - text: Config 🛠
    link: /config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

Let your images support preview, zoom, share, swipe view and download.

## How to use

### Install

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D vuepress-plugin-photo-swipe
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm i -D vuepress-plugin-photo-swipe
```
</CodeGroupItem>
</CodeGroup>

### Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: ["photo-swipe"],
};
```
