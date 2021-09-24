const { assert } = require('chai');
const fs = require('fs');
const path = require('path');
const flatten = require('lodash/flatten');
const { findResources } = require('../scripts/proxyDirectories');

const components = findResources({
  dir: path.join(__dirname, '../src'),
  ignores: ['styles', '@types']
});

const unstyledComponents = [
  'Schema',
  'DOMHelper',
  'Whisper',
  'SafeAnchor',
  'Menu',
  'Affix',
  'RangeSlider',
  'utils',
  'Plaintext',
  'Disclosure',
  'Overlay',
  'CustomProvider',
  'locales',
  'CheckTree',
  'Tree',
  'Col',
  'TagGroup'
];

const styledComponents = components.filter(i => !unstyledComponents.includes(i));

const locales = findResources({
  dir: path.join(__dirname, '../src/locales'),
  ignores: ['index'],
  isFile: true
});

const filesToEnsureExistence = [
  // Validate dist
  'lib/dist/rsuite.js',
  'lib/dist/rsuite.min.js',
  'lib/dist/rsuite.css',
  'lib/dist/rsuite.min.css',
  'lib/dist/rsuite-rtl.css',
  'lib/dist/rsuite-rtl.min.css',

  // Validate docs
  'lib/CHANGELOG.md',
  'lib/README.md',
  'lib/LICENSE',
  'lib/package.json',

  // Validate less
  'lib/styles/index.less',
  'lib/styles/plugins/palette.js', // See https://github.com/rsuite/rsuite/issues/1767
  ...styledComponents.map(i => `lib/${i}/styles/index.less`),

  // Validate components
  ...flatten(
    components.map(i => [
      `lib/${i}/package.json`,
      `lib/cjs/${i}/index.js`,
      `lib/esm/${i}/index.js`,
      `lib/esm/${i}/index.d.ts`,
      `lib/cjs/${i}/index.d.ts`
    ])
  ),

  // Validate locales
  ...flatten(
    locales.map(i => [
      `lib/locales/${i}/package.json`,
      `lib/cjs/locales/${i}.js`,
      `lib/esm/locales/${i}.js`,
      `lib/cjs/locales/${i}.d.ts`,
      `lib/esm/locales/${i}.d.ts`
    ])
  )
];

it('Ensure file existence', () => {
  filesToEnsureExistence.forEach(function ensureFileExistence(filePath) {
    assert.isTrue(fs.existsSync(path.join(__dirname, `../${filePath}`)), `File ${filePath} exists`);
  });
});

it('Should enable Dark mode by default', () => {
  const css = fs.readFileSync(path.join(__dirname, '../lib/dist/rsuite.css'));
  assert.isTrue(/\.rs-theme-dark/.test(css), 'Dark mode styles are included');
});
