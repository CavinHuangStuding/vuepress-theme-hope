---
title: Custom alignment
icon: align
---

By injecting configuration into vuepress-plugin-container, you can use

```md
::: center
Paragraph to center
:::

::: right
Right paragraph
:::
```

To customize your paragraph alignment.

<!-- more -->

## Config

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // Enable Align
      align: true,
    }),
  ],
};
```

:::

::: code-group-item JS

```js {8}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // Enable Align
      align: true,
    }),
  ],
};
```

:::

::::

## Demo

:::: danger
vuepress-theme-hope v2 is still in W.I.P, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[open an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues).
:::
::::

```md
:::: danger
vuepress-theme-hope v2 is still in W.I.P, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[open an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues).
:::
::::
```
