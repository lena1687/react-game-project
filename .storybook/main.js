const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-formik/register",
  ],
  features: {
    storyStoreV7: true,
  },
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },

  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]_[local]-[hash:base64:5]",
            },
          },
        },
        "sass-loader",
      ],
      include: path.resolve(__dirname, "../"),
    });
    config.resolve.alias = {
      Assets: path.resolve(__dirname, "../src/assets/"),
      Constants: path.resolve(__dirname, "../src/constants/"),
      Components: path.resolve(__dirname, "../src/interface/components/"),
      Composites: path.resolve(__dirname, "../src/interface/composites/"),
      Pages: path.resolve(__dirname, "../src/interface/pages/"),
      Structures: path.resolve(__dirname, "../src/interface/structures/"),
      Navigation: path.resolve(__dirname, "../src/navigation/"),
      Types: path.resolve(__dirname, "../src/types/"),
    };

    // Return the altered config
    return config;
  },
};
