/**
 * 解析 design/../index.html 中的导航的 hash ，使之与 menu 中 components.config.json 的 hash 对应。
 */
const fs = require('fs');
const { resolve } = require('path');
const _ = require('lodash');

const themes = ['default', 'dark'];

const DESIGN_INDEX_PATH = '../public/design';
const COMPONENTS_JSON_PATH = '../utils/component.config.json';

const readfile = path => fs.readFileSync(resolve(__dirname, path), { encoding: 'UTF-8' });

const gerJSONDataFromDesignHtmlData = htmlData => {
  const jsonStr = /let\ data\ \=\ \{([\s\S]*)\};/.exec(htmlData)[1];
  return JSON.parse(`{${jsonStr}}`);
};

const parseArtboardData = jsonData =>
  _.get(jsonData, 'artboards').map((data, index) => ({
    ...data,
    name: data.name.toLowerCase(),
    index: `${index}`
  }));

const componentsData = JSON.parse(readfile(COMPONENTS_JSON_PATH));

const themeArtsboardData = Object.fromEntries(
  themes.map(theme => {
    const deafaultThemeDesignHtmlData = readfile(`${DESIGN_INDEX_PATH}/${theme}/index.html`);
    const defaultJsonData = gerJSONDataFromDesignHtmlData(deafaultThemeDesignHtmlData);
    const artboadrsData = parseArtboardData(defaultJsonData);
    return [theme, _.keyBy(artboadrsData, 'name')];
  })
);

fs.writeFile(
  resolve(__dirname, COMPONENTS_JSON_PATH),
  JSON.stringify(
    componentsData.map(obj => {
      const { name } = obj;
      const getHash = theme =>
        _.get(themeArtsboardData[theme], `${name.toLowerCase()}.index`) || null;

      obj = {
        ...obj,
        designHash: Object.fromEntries(
          Object.keys(themeArtsboardData).map(theme => [theme, getHash(theme)])
        )
      };
      if (_.isEmpty(_.values(obj.designHash).filter(_.identity))) {
        delete obj.designHash;
      }
      return obj;
    }),
    null,
    '  '
  ),
  e => {
    e && console.log(e);
  }
);
