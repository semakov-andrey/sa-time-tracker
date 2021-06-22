import path from 'path';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PostCSSAssetsPlugin from 'postcss-assets-webpack-plugin';
import postcssCustomMedia from 'postcss-custom-media';
import postcssNested from 'postcss-nested';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';

import { webpackConfigCommon } from './webpack.common.js';

import packageJSON from '../../package.json';
import { Favicon } from '../utils/favicon.js';

const {
  config: { directories: dirs, entries },
  version
} = packageJSON;

const entry = Object.fromEntries(Object
  .entries(entries)
  .map(([ key, value ]) =>
    [ key, [ path.resolve(dirs.source, value) ] ]));

const [ firstEntry ] = Object.values(entries);

export const webpackConfig = () =>
  merge(webpackConfigCommon(), {
    entry,
    mode: 'production',
    target: 'node',
    output: {
      filename: `${ dirs.assets }[name].[contenthash:8].js`,
      path: path.resolve(dirs.production)
    },
    module: {
      rules: [
        {
          test: /\.css$/u,
          use: [
            './compiler/utils/named-export-css-loader.cjs',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[local]--[hash:base64:5]',
                  exportLocalsConvention: 'camelCase'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [ postcssNested, postcssCustomMedia, autoprefixer() ]
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'head',
        template: `${ dirs.source }/${ firstEntry }.html`,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: false,
          quoteCharacter: '"',
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeOptionalTags: true
        }
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),
      new MiniCssExtractPlugin({
        filename: `${ dirs.assets }[name].[contenthash:8].css`
      }),
      new Favicon(`${ dirs.source }/interface/assets/favicon`, true),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'VERSION': JSON.stringify(version)
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        defaultSizes: 'parsed',
        statsFilename: 'stats.json'
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            output: {
              comments: false
            }
          },
          extractComments: false
        }),
        new PostCSSAssetsPlugin({
          test: /\.css$/u,
          log: false,
          plugins: [
            cssnano({
              preset: [ 'default', {
                discardComments: {
                  removeAll: true
                },
                minifyFontValues: {
                  removeQuotes: false
                }
              } ]
            })
          ]
        })
      ]
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 4096000
    }
  });