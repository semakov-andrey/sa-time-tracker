import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import packageJSON from '../../package.json';
import { getAlises } from '../utils/common.js';

const { config: { directories: dirs } } = packageJSON;

if (dirs.assets !== '') {
  dirs.assets += '/';
}

export const webpackConfigCommon = () => ({
  target: 'web',
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/u,
        loader: 'esbuild-loader',
        exclude: /node_modules/u,
        options: {
          loader: 'tsx',
          target: 'es2020'
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ],
  resolve: {
    extensions: [
      '.json',
      '.js',
      '.jsx',
      '.ts',
      '.tsx'
    ],
    alias: {
      ...getAlises([
        'entities',
        'domain',
        'interface',
        'store',
        'utils'
      ])
    }
  }
});
