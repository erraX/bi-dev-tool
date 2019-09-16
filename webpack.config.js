const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const resolve = p => path.resolve(__dirname, p);

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: false,
  entry: {
    index: resolve('./src/index.js'),
    content: resolve('./src/content.js'),
    devtool: resolve('./src/devtool/index.jsx')
  },
  output: {
    path: resolve('./extension'),
    publicPath: '/',
    pathinfo: isDev,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json', '.jsx']
  },
  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-formatter-friendly')
        },
        include: resolve('./src')
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: isProd,
          compact: isProd
        }
      },
      {
        test: /\.less$/,
        use: [
          // { loader: MiniCssExtractPlugin.loader },
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg?g|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/[name].[ext]'
        }
      }
    ]
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    }),
    new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
    new CopyPlugin([
      { from: resolve('manifest.json'), to: 'manifest.json' },
      { from: resolve('src/html'), to: 'html' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ]
};
