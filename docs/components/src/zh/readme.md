---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-components
tagline: 组件库插件
action:
  - text: 快速上手 💡
    link: /zh/guide/
    type: primary

  - text: 配置 🛠
    link: /zh/config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 安装

<CodeGroup>
<CodeGroupItem title="yarn">

```bash
yarn add -D @mr-hope/vuepress-plugin-components
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash
npm i -D @mr-hope/vuepress-plugin-components
```

</CodeGroupItem>
</CodeGroup>

## 使用

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/components",
      {
        // 插件选项
      },
    ],
  ],
};
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
exports default {
  plugins: [
    [
      "@mr-hope/components",
      {
        // 插件选项
      },
    ],
  ],
};
```

</CodeGroupItem>
</CodeGroup>
