import fs from 'fs';

import del from 'del';
import webpack from 'webpack';

import packageJSON from '../../package.json';
import { webpackConfig } from '../config/webpack.prod.js';
import { statsOptions } from '../utils/common.js';
import { CssTypes } from '../utils/css-types.js';

const { config: { directories: dirs, isReact } } = packageJSON;

if (fs.existsSync(dirs.production)) {
  del.sync(`${ dirs.production }/**/*`);
}

const cssTypes = new CssTypes(true, dirs.source, 'css');

console.info('Building...');
const compilerClient = webpack(await webpackConfig());

await cssTypes.start();
compilerClient.run(async (error, stats) => {
  if (error instanceof Error) {
    console.error(error.stack ?? error);
    if (typeof error.details !== 'undefined') {
      console.error(error.details);
    }
  } else {
    await cssTypes.finish();
    console.info(stats.toString(statsOptions));
    console.info('Frontend compiled successfully.');
  }
});
