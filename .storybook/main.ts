import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-essentials",
    "@storybook/addon-styling",
    "@storybook/addon-interactions",
    "@storybook/jest",
    "@storybook/test-runner",
    "@storybook/addon-coverage",
    {
      name: "@storybook/addon-styling",
      options: {
        postcss: {
          implementation: require.resolve("postcss"),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve = {
      ...config.resolve,
    };
    config.resolve.plugins = [new TsconfigPathsPlugin()];

    return config;
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
