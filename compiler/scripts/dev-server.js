import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import packageJSON from '../../package.json';
import { webpackConfig } from '../config/webpack.dev.js';
import { CssTypes } from '../utils/css-types.js';
import { logger } from '../utils/logger.js';

const { config: { directories: dirs, devPort: port } } = packageJSON;

const cssTypes = new CssTypes(false, dirs.source, 'css');
await cssTypes.start();

logger('dev server', port)();

const serverOptions = {
  stats: 'minimal',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};

const server = express();

server.use((req, res, next) => {
  if (!/(\.(?!html)\w+$|__webpack.*|index\.css)/u.test(req.url)) {
    req.url = '/';
  }
  next();
});

const compilerClient = webpack(await webpackConfig());
server.use(webpackDevMiddleware(compilerClient, serverOptions));
server.use(webpackHotMiddleware(compilerClient, { log: false }));

server.listen(port);
