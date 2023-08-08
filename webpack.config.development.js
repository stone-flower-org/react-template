const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const { createEmotionPlugin } = require('emotion-ts-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEV_HOST = process.env.DEV_HOST || 'localhost';
const DEV_PORT = process.env.DEV_PORT || 3000;

module.exports = {
  devServer: {
    host: DEV_HOST,
    historyApiFallback: true,
    hot: true,
    port: DEV_PORT,
  },
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  createEmotionPlugin({
                    sourcemap: true,
                    autoLabel: true,
                    labelFormat: '[local]',
                    autoInject: true,
                    jsxImportSource: '@emotion/react',
                  }),
                ],
              }),
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    runtimeChunk: true,
  },
  output: {
    chunkFilename: 'static/js/[name].chunk.js',
    filename: 'static/js/[name].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        ...['config'].map((configName) => ({
          from: path.resolve(__dirname, 'configs', `${configName}.local.json`),
          to: path.resolve(__dirname, 'dist', 'assets', 'config', `${configName}.json`),
        })),
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: 'tsconfig.production.json',
      },
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
    }),
  ],
};
