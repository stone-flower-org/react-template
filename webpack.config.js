const fs = require('fs');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const packageJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' }));

const APP_NAME = packageJson.name;
const APP_VERSION = packageJson.version;
const DEV_MODE = process.env.DEV_MODE || 'development';
const MOCK_API = !!process.env.MOCK_API;
const envConfig =
  DEV_MODE === 'production' ? require('./webpack.config.production') : require('./webpack.config.development');

const NODE_MODULES_PATTERN = /[\\/]node_modules[\\/]/;
const CORE_JS_PATTERN = /[\\/]node_modules[\\/]core-js[\\/]/;

module.exports = merge(
  {
    entry: './src/index.tsx',
    experiments: { topLevelAwait: true },
    ignoreWarnings: [
      /export .* was not found in/, // https://github.com/TypeStrong/ts-loader#transpileonly
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { url: false } }],
        },
        {
          test: /\.svg$/,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true,
                typescript: true,
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                ref: true,
              },
            },
          ],
        },
      ],
    },
    name: APP_NAME,
    optimization: {
      emitOnErrors: true,
      splitChunks: {
        cacheGroups: {
          polyfills: {
            chunks: 'initial',
            name: 'polyfills',
            test: CORE_JS_PATTERN,
          },
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: (mod) => {
              for (const pattern of [CORE_JS_PATTERN]) {
                if (pattern.test(mod.context)) return false;
              }
              return NODE_MODULES_PATTERN.test(mod.context);
            },
          },
        },
        chunks: 'async',
      },
    },
    output: {
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      filename: 'static/js/[name].[contenthash:8].js',
      path: path.resolve(__dirname, 'dist'),
      pathinfo: false,
      publicPath: '/',
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
            globOptions: {
              ignore: ['**/index.html', '**/mockServiceWorker.js', '**/.*'],
            },
          },
        ],
      }),
      new webpack.DefinePlugin({
        'process.env.APP_VERSION': JSON.stringify(APP_VERSION),
        'process.env.DEV_MODE': JSON.stringify(DEV_MODE),
        'process.env.MOCK_API': JSON.stringify(MOCK_API),
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        templateParameters: {
          PUBLIC_URL: '/',
          APP_VERSION,
        },
        template: path.join(__dirname, 'public', 'index.html'),
      }),
    ],
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      symlinks: false,
    },
  },
  envConfig,
);
