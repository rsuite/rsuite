/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

function findPages(options = {}, directory = path.resolve(__dirname, '../pages'), pages = []) {
  fs.readdirSync(directory).forEach(item => {
    const itemPath = path.resolve(directory, item);
    const pathname = itemPath
      .replace(new RegExp(`\\${path.sep}`, 'g'), '/')
      .replace(/^.*\/pages/, '')
      .replace('.js', '')
      .replace(/^\/index$/, '/') // Replace `index` by `/`.
      .replace(/\/index$/, '');

    if (pathname.indexOf('/en') !== -1) {
      return;
    }

    if (fs.statSync(itemPath).isDirectory()) {
      const children = [];
      pages.push({
        pathname,
        children
      });
      findPages(options, itemPath, children);
      return;
    }
  });

  return pages;
}

module.exports = findPages;
