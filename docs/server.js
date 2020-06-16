/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('http');
const express = require('express');
const url = require('url');
const next = require('next');
const { pathnameToLanguage } = require('./scripts/languageHelpers');
const nextApp = next({
  dev: process.env.NODE_ENV !== 'production'
});
const nextHandler = nextApp.getRequestHandler();

async function run() {
  await nextApp.prepare();
  const app = express();
  const rootPaths = ['/components/', '/extensions/', '/guide/', '/tools/'];

  app.use('/design', express.static('public/design'));
  app.get('*', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let { pathname } = parsedUrl;
    const { userLanguage, canonical } = pathnameToLanguage(pathname);

    pathname = canonical;
    if (pathname !== '/') {
      pathname = pathname.replace(/\/en\//, '/').replace(/\/$/, '');
    }

    if (pathname === '/' || rootPaths.some(path => ~pathname.indexOf(path))) {
      nextApp.render(req, res, pathname, {
        userLanguage,
        ...parsedUrl.query
      });
      return;
    }

    nextHandler(req, res, parsedUrl);
  });

  const server = http.createServer(app);
  const port = parseInt(process.env.PORT, 10) || 3000;

  server.listen(port, err => {
    if (err) {
      throw err;
    }
  });
}

run();
