const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

let config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "./bundle.js"
  },
  module: {
    rules: [
      /*{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },*/
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  /*resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },*/
  plugins: [
    new MiniCssExtractPlugin({filename:"styles.css"}),
    new DashboardPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  },
  devtool: "eval-source-map"
}

module.exports = config;