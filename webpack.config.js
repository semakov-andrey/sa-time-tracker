import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
  entry: './src/index.tsx',
  output: {
    path: path.resolve('build'),
    publicPath: '/'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    contentBase: '/',
    host: '0.0.0.0',
    port: 3000
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    alias: {
      'entities': path.resolve('src/entities'),
      'domain': path.resolve('src/domain'),
      'interface': path.resolve('src/interface'),
      'utils': path.resolve('src/utils')
    }
  }
};