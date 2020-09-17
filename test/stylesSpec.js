const assert = require('chai').assert;
const { basename, join, resolve } = require('path');
const { existsSync, readFileSync } = require('fs');
const glob = require('glob');

const UN_STYLED_COMPONENTS = [
  'Schema',
  'DOMHelper',
  'Whisper',
  'SafeAnchor',
  'Portal',
  'IntlProvider',
  'Affix',
  'RangeSlider',
  'Overlay'
];

const THEMES = ['default', 'dark'];

const STYLED_COMPONENTS = glob
  .sync(resolve(__dirname, `../src/[A-Z]*`))
  .map(path => basename(path))
  .filter(componentName => !UN_STYLED_COMPONENTS.includes(componentName));

function shouldHasStyleFile() {
  console.log('Should has style file.');
  STYLED_COMPONENTS.map(function testStyleFile(componentName) {
    const indexFile = join(__dirname, `../src/${componentName}/styles/index.ts`);
    const defaultFile = join(__dirname, `../src/${componentName}/styles/themes/default.ts`);
    const darkFile = join(__dirname, `../src/${componentName}/styles/themes/dark.ts`);
    assert.equal(existsSync(indexFile), true, `${indexFile} should exists.`);
    assert.equal(existsSync(defaultFile), true, `${defaultFile} should exists.`);
    assert.equal(existsSync(darkFile), true, `${darkFile} should exists.`);
  });
}

function shouldImportCoreFile() {
  console.log('Should Import core file.');
  STYLED_COMPONENTS.map(function testStyleFile(componentName) {
    THEMES.forEach(theme => {
      const tsFile = join(__dirname, `../src/${componentName}/styles/themes/${theme}.ts`);
      const fileContent = readFileSync(tsFile, { encoding: 'utf-8' });
      const importDarkResource = fileContent
        .split('\n')
        .filter(text => Boolean(text) && /^import '\.\.\/\.\.\/\.\.\/[A-Z].*/.test(text));
      assert.equal(
        fileContent.indexOf(`import '../../../styles/themes/${theme}/core.less';`),
        0,
        `${tsFile} should import ${theme}/core.less at the first line.`
      );
      assert.equal(
        importDarkResource.every(text =>
          new RegExp(
            `^import '\\.\\.\\/\\.\\.\\/\\.\\.\\/[A-Z].*\\/styles\\/themes\\/${theme}';$`
          ).test(text)
        ),
        true,
        `
      ${tsFile} should import dark file eg: **/themes/${theme}.
      Current:
      ${importDarkResource.join('\n')}
      `
      );
    });
  });
}

[shouldHasStyleFile, shouldImportCoreFile].forEach(test => test());

console.log('Successful!');
