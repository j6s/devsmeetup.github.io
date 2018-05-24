const del = require('del');
const express = require('express');
const { copy, outputFile, readFile } = require('fs-extra');
const globby = require('globby');
const http = require('http');
const Bundler = require('parcel-bundler');
const { resolve } = require('path');
const puppeteer = require('puppeteer');

const { main } = require('./package.json');

// Config
// ---------------
const file = resolve(__dirname, main);
const staticFiles = ['CNAME', 'manifest.json', 'robots.txt'];
const out = resolve(__dirname, './dist');
const port = 1337;

// Helper
// ---------------
const serve = ({ folder, port }) =>
  new Promise((resolve, reject) => {
    const app = express();
    app.use(express.static(folder));

    const server = http.createServer(app);
    const close = () =>
      new Promise(resolve => {
        server.close(() => {
          console.log('Stopping server ...');
          resolve();
        });
      });

    server
      .listen(port, () => {
        console.log(`Serving files in "${folder}" ...`);
        resolve(close);
      })
      .on('error', err => reject(err));
  });

const ssr = async url => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.teaser');

    const html = await page.content(); // serialized HTML of page DOM.
    await browser.close();

    return html;
  } catch (err) {
    console.error(err);
    throw new Error('page.goto/waitForSelector timed out.');
  }
};

const sanitize = html => html.replace(/<script.*<\/script>/g, '');

const fixManifest = async folder => {
  const files = await globby([`${folder}/*.html`]);
  const jsToJson = html => html.replace(/(href="\/manifest)(.*js)/g, '$1.json');

  return Promise.all(
    files.map(name =>
      readFile(name, 'utf8').then(html => outputFile(name, jsToJson(html)))
    )
  );
};

const copyAll = ({ from, to, files }) =>
  Promise.all(files.map(name => copy(`${from}/${name}`, `${to}/${name}`)));

// Script
// ---------------
void (async function() {
  // Remove old build folder
  await del([out]);

  // Bundle with parcel
  const bundler = new Bundler(file, {
    cache: false,
    detailedReport: true,
    minify: true,
    watch: false,
  });
  const bundle = await bundler.bundle();

  // Serve build files
  const close = await serve({
    folder: out,
    port,
  });

  // Run puppeteer
  const html = await ssr(`http://localhost:${port}`);

  /**
   * (1) Remove <script> tags, since they're no longer needed.
   * (2) Rename manifest, parcel transform this to a JS file ...
   */
  await outputFile(bundle.name, sanitize(html));
  await fixManifest(out);

  // Copy CNAME and other files
  const { rootDir } = bundle.entryAsset.options;
  await copyAll({ from: rootDir, to: out, files: staticFiles });

  close();
})();
