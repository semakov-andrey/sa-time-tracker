import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const getAliases = (folders) =>
  folders.reduce((acc, folder) => ({
    ...acc,
    [folder]: path.resolve(`src/${folder}`)
  }), {});

export default {
  entry: './src/index.tsx',
  output: {
    path: path.resolve('build'),
    publicPath: '/'
  },
  mode: process.env.NODE_ENV,
  stats: 'errors-warnings',
  devtool: isProduction ? false : 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  devServer: {
    contentBase: '/',
    host: '0.0.0.0',
    port: 3000
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    alias: {
      ...getAliases([
        'entities',
        'domain',
        'interface',
        'utils'
      ])
    }
  }
};
