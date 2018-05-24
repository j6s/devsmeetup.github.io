const del = require('del');
const { outputFile } = require('fs-extra');
const Bundler = require('parcel-bundler');
const { resolve } = require('path');
const puppeteer = require('puppeteer');
const serve = require('serve');

const { main } = require('./package.json');

// Helper
// ---------------
const ssr = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.teaser');
  } catch (err) {
    console.error(err);
    throw new Error('page.goto/waitForSelector timed out.');
  }

  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();

  return html;
};

const sanitize = html => html.replace(/<script.*<\/script>/g, '');

// Config
// ---------------
const file = resolve(__dirname, main);
const out = resolve(__dirname, './dist');
const port = 1337;

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
  const server = serve(out, {
    port,
    silent: true,
  });

  // Run puppeteer
  let html = await ssr(`http://localhost:${port}`);

  // Overwrite previously created file (from bundle) + remove <script> tags
  await outputFile(bundle.name, sanitize(html));

  server.stop();
})();
