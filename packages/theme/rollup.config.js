import { rollupTypescript } from "../../scripts/rollup";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import typescript2 from "rollup-plugin-typescript2";
import rollupCopy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import { preserveShebangs } from "rollup-plugin-preserve-shebangs";
import vue from "rollup-plugin-vue";
import { terser } from "rollup-plugin-terser";
import styles from "rollup-plugin-styles";

const isProduction = process.env.mode === "production";

const rollupBundleTypescript = (
  filePath,
  {
    external = [],
    dtsExternal = [],
    useStyle = false,
    resolve = false,
    copy = [],
    tsconfig = {},
    output = {},
    inlineDynamicImports = true,
    preserveShebang = false,
  } = {}
) => [
  {
    input: `./src/client/${filePath}.ts`,
    output: [
      {
        file: `./lib/bundle/${filePath}.js`,
        format: "esm",
        sourcemap: true,
        exports: "named",
        ...output,
      },
    ],
    plugins: [
      ...(preserveShebang ? [preserveShebangs()] : []),
      typescript(tsconfig),
      ...(useStyle ? [styles()] : []),
      ...(resolve ? [nodeResolve({ preferBuiltins: true }), commonjs()] : []),
      ...(isProduction ? [terser()] : []),
      ...(copy.length
        ? [
            rollupCopy({
              targets: copy.map((item) =>
                typeof item === "string"
                  ? {
                      src: `./src/client/${item}`,
                      dest: `./lib/bundle/${item}`,
                    }
                  : {
                      src: `./src/client/${item[0]}`,
                      dest: `./lib/bundle/${item[1]}`,
                    }
              ),
            }),
          ]
        : []),
    ],
    inlineDynamicImports,
    external,
    treeshake: {
      unknownGlobalSideEffects: false,
    },
  },
  {
    input: `./src/client/${filePath}.ts`,
    output: [{ file: `./lib/bundle/${filePath}.d.ts`, format: "esm" }],
    plugins: [dts()],
    external: dtsExternal,
  },
];

const rollupBundleVue = (
  filePath,
  {
    dts: enableDts = true,
    external = [],
    dtsExternal = [],
    useStyle = false,
    resolve = false,
    copy = [],
    output = {},
    inlineDynamicImports = true,
  } = {}
) => {
  const temp = filePath.split(".");
  const ext = temp.pop();
  const filename = temp.join(".");

  return [
    {
      input: `./src/client/${filePath}`,
      output: [
        {
          file: `./lib/bundle/${filename}.js`,
          format: "esm",
          sourcemap: true,
          exports: "named",
          ...output,
        },
      ],
      plugins: [
        vue(),
        typescript2({
          tsconfigOverride: {
            compilerOptions: {
              declaration: false,
              declarationMap: false,
            },
          },
        }),
        ...(useStyle ? [styles()] : []),
        ...(resolve ? [nodeResolve({ preferBuiltins: true }), commonjs()] : []),
        ...(isProduction ? [terser()] : []),
        ...(copy.length
          ? [
              rollupCopy({
                targets: copy.map((item) =>
                  typeof item === "string"
                    ? {
                        src: `./src/client/${item}`,
                        dest: `./lib/bundle/${item}`,
                      }
                    : {
                        src: `./src/client/${item[0]}`,
                        dest: `./lib/bundle/${item[1]}`,
                      }
                ),
              }),
            ]
          : []),
      ],
      inlineDynamicImports,
      external,
      treeshake: {
        unknownGlobalSideEffects: false,
      },
    },
    ...(ext === "ts" && enableDts
      ? [
          {
            input: `./src/client/${filePath}`,
            output: [{ file: `./lib/bundle/${filename}.d.ts`, format: "esm" }],
            plugins: [dts()],
            external: dtsExternal,
          },
        ]
      : []),
  ];
};

export default [
  rollupBundleVue("module/blog/appEnhance.ts", {
    copy: [
      ["module/blog/assets", "module/blog"],
      ["module/blog/styles", "module/blog"],
    ],
    external: [
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@theme-hope/components/transitions/DropTransition.vue",
      "@theme-hope/module/blog/components/icons/EmptyIcon.vue",
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "bcryptjs",
      "vue",
      "vue-router",
      "vuepress-plugin-blog2/lib/client",
      /\.jpg$/,
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("module/blog/appSetup", {
    external: [
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "vuepress-plugin-blog2/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("module/navbar/appEnhance", {
    copy: [["module/navbar/styles", "module/navbar"]],
    external: [
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@mr-hope/vuepress-shared/lib/client",
      "@vueuse/core",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("module/outlook/appSetup", {
    external: ["@theme-hope/composables", "@theme-hope/utils", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("module/sidebar/appEnhance", {
    copy: [["module/sidebar/styles", "module/sidebar"]],
    external: [
      "@theme-hope/components/transitions/DropTransition.vue",
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("module/sidebar/appSetup", {
    external: [
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleVue("appEnhance.ts", {
    copy: [
      ["components/transitions/DropTransition.vue", "components/transitions"],
      ["styles", ""],
    ],
    external: [
      "@theme-hope/components/transitions/DropTransition.vue",
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/shared",
      "bcryptjs",
      "lodash.throttle",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("composables/index", {
    external: [
      "@theme-hope/utils",
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "vue",
      "vue-router",
    ],
  }),

  rollupBundleTypescript("utils/index", {
    external: ["@vuepress/shared"],
  }),

  rollupBundleVue("layouts/Layout.ts", {
    external: [
      "@theme-hope/composables",
      "@vuepress/client",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleVue("layouts/404.ts", {
    external: [
      "@theme-hope/composables",
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@mr-hope/vuepress-plugin-components",
      "@vuepress/cli",
      "@vuepress/utils",
      "bcryptjs",
      "vuepress-plugin-blog2",
      "vuepress-plugin-comment2",
      "vuepress-plugin-copy-code2",
      "vuepress-plugin-feed2",
      "vuepress-plugin-md-enhance",
      "vuepress-plugin-photo-swipe",
      "vuepress-plugin-pwa2",
      "vuepress-plugin-reading-time2",
      "vuepress-plugin-sass-palette",
      "vuepress-plugin-seo2",
      "vuepress-plugin-sitemap2",
    ],
  }),
].flat();
