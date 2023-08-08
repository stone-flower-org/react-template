const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { createEmotionPlugin } = require('emotion-ts-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devtool: 'nosources-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.production.json',
              logInfoToStdOut: true,
              logLevel: 'error',
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
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          keep_classnames: true,
          keep_fnames: true,
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
          parse: {
            ecma: 8,
          },
          sourceMap: true,
        },
      }),
    ],
  },
  plugins: [
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
      filename: 'static/css/[name].[contenthash:8].css',
    }),
  ],
  stats: 'errors-only',
};
