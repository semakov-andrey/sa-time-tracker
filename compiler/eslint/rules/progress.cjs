const path = require('path');
const CLIOptions = require('eslint/lib/options');
const logUpdate = require('log-update');

let options;
let files;
const fullPercents = 100;

module.exports = {
  create(context) {
    if (!options) {
      try {
        options = CLIOptions.parse(process.argv);
      } catch (error) {
        return console.error(error.message);
      }
      files = options._?.map((file) => path.resolve(file));
    }
    if (!files) return {};

    const filePath = context.getFilename();
    const index = files.findIndex((file) => file === filePath);
    if (index === -1) return {};

    const progress = Math.ceil((index + 1) * fullPercents / files.length);
    logUpdate(`Linting progress: ${ fullPercents !== progress ? `${ progress }%` : 'done' }`);

    return {};
  }
};
