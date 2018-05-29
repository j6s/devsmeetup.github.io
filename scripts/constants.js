const { resolve } = require('path');

module.exports = {
  SOURCE_FOLDER: resolve(__dirname, '..', 'src'),
  RELEASE_FOLDER: resolve(__dirname, '..', 'release'),
  STATIC_FILE_NAMES: ['CNAME', 'manifest.json', 'robots.txt'],
};
