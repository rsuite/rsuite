/* eslint-disable @typescript-eslint/no-var-requires */

const util = require('util');
const fs = require('fs');
const algoliaSearch = require('algoliasearch');
const components = require('../utils/component.config.json');

const items = components.filter(item => !item.group && item.id !== 'overview');
const readFile = util.promisify(fs.readFile);

async function getIndices(locale) {
  const indices = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const path = locale === 'zh' ? item.id : `${item.id}/en`;
    const doc = await readFile(`../pages/components/${path}/index.md`, 'utf8');
    const text = doc.match(/(?<=#[\S\ ]+\n\n)[\S\ ]+/gi);
    let content = '';

    if (Array.isArray(text)) {
      content = text[0];
    }

    indices.push({
      objectID: item.id,
      component: item.id,
      title: locale === 'zh' ? `${item.name} ${item.title}` : item.name,
      anchor: item.id,
      content
    });
  }

  return indices;
}

const client = {
  _instance: null,
  getInstance() {
    const ALGOLIA_APP_ID = 'PTK5IGAK3K';
    const { ALGOLIA_SECRET } = process.env;
    if (this._instance) {
      return this._instance;
    } else if (ALGOLIA_SECRET) {
      this._instance = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_SECRET);
    }
    return this._instance;
  },
  upload(indices, locale) {
    const client = this.getInstance();
    if (!client) {
      throw Error('The algolia instance is not initialized.');
    }
    const reposIndex = client.initIndex(`rsuite-${locale}`);
    reposIndex.clearObjects();
    reposIndex
      .saveObjects(indices)
      .then(({ objectIDs }) => {
        console.log(objectIDs);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

function uploadIndices(locale) {
  getIndices(locale).then(indices => {
    client.upload(indices, locale);
  });
}

uploadIndices('zh');
uploadIndices('en');
