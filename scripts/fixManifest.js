const { outputFile, readFile } = require('fs-extra');
const globby = require('globby');
const { RELEASE_FOLDER } = require('./constants');

/**
 * Parcel currently transforms `manifest.json` to a
 * JavaScript file :-/
 *
 * More info:
 * https://github.com/parcel-bundler/parcel/issues/235
 */
const jsToJson = html => html.replace(/(href="manifest)(.*js)/g, '$1.json');

void (async () => {
  const files = await globby([`${RELEASE_FOLDER}/*.html`]);

  await Promise.all(
    files.map(name =>
      readFile(name, 'utf8').then(html => outputFile(name, jsToJson(html)))
    )
  );
})();
