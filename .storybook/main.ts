import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-styling",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    // Add support for path aliases like @/lib/utils
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }

    // Improve TypeScript support
    if (config.module && config.module.rules) {
      // Find the TypeScript rule
      const tsRule = config.module.rules.find((rule) => {
        if (typeof rule === 'object' && rule !== null && 'test' in rule) {
          return rule.test && rule.test.toString().includes('tsx');
        }
        return false;
      });

      // Enhance the TypeScript rule if found
      if (tsRule && typeof tsRule === 'object' && 'use' in tsRule && Array.isArray(tsRule.use)) {
        const babelLoader = tsRule.use.find((loader) => {
          if (typeof loader === 'object' && loader !== null && 'loader' in loader) {
            return loader.loader && loader.loader.includes('babel-loader');
          }
          return false;
        });

        if (babelLoader && typeof babelLoader === 'object' && 'options' in babelLoader && babelLoader.options) {
          const options = typeof babelLoader.options === 'object' ? babelLoader.options : {};
          babelLoader.options = {
            ...options,
            presets: [
              ['@babel/preset-typescript', { allowNamespaces: true, allowDeclareFields: true, onlyRemoveTypeImports: true }],
              ...(options.presets && Array.isArray(options.presets) ? options.presets : [])
            ]
          };
        }
      }
      
      // Add support for CSS files and Tailwind CSS
      config.module.rules.push({
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      });
    }

    return config;
  },
} satisfies StorybookConfig;

export default config;
