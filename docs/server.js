/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const url = require('url');
const next = require('next');
const { pathnameToLanguage } = require('./scripts/languageHelpers');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const rootPaths = ['/components/', '/guide/', '/resources/'];
const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  const server = express();

  server.use('/design', express.static('public/design'));
  server.get('*', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let { pathname } = parsedUrl;
    const { userLanguage, canonical } = pathnameToLanguage(pathname);

    pathname = canonical;
    if (pathname !== '/') {
      pathname = pathname.replace(/\/en\//, '/').replace(/\/$/, '');
    }

    if (pathname === '/' || rootPaths.some(path => ~pathname.indexOf(path))) {
      app.render(req, res, pathname, {
        userLanguage,
        ...parsedUrl.query
      });
      return;
    }

    handle(req, res, parsedUrl);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
