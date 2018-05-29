const { copy, outputFile, readFile } = require('fs-extra');
const {
  SOURCE_FOLDER,
  RELEASE_FOLDER,
  STATIC_FILE_NAMES,
} = require('./constants');

/**
 * Since files like `manifest.json`, `CNAME` and `robots.txt` are
 * not referenced in the project.
 */
const copyAll = (from, to, files) =>
  Promise.all(files.map(name => copy(`${from}/${name}`, `${to}/${name}`)));

void (async () => {
  await copyAll(SOURCE_FOLDER, RELEASE_FOLDER, STATIC_FILE_NAMES);
})();
