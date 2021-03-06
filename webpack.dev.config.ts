import {
  Configuration as WebpackConfiguration,
  HotModuleReplacementPlugin,
} from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path = require("path");

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
          },
        },
      },
      {
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
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
      {
        test: /\.json$/,
        type: "asset/resource",
        generator: {
          filename: "./data/[name][ext]",
        },
      },
      {
        test: /\.(jpe?g|jpg|png|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "./images/[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      Assets: path.resolve(__dirname, "src/assets/"),
      Constants: path.resolve(__dirname, "src/constants/"),
      Components: path.resolve(__dirname, "src/interface/components/"),
      Composites: path.resolve(__dirname, "src/interface/composites/"),
      Pages: path.resolve(__dirname, "src/interface/pages/"),
      Structures: path.resolve(__dirname, "src/interface/structures/"),
      Navigation: path.resolve(__dirname, "src/navigation/"),
      Types: path.resolve(__dirname, "src/types/"),
      Slices: path.resolve(__dirname, "src/redux/slices/"),
      Actions: path.resolve(__dirname, "src/redux/actions/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
    new HotModuleReplacementPlugin(),
  ],
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
  },
};

export default config;
