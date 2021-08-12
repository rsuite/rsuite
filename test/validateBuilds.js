const { assert } = require('chai');
const fs = require('fs');

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

  // Validate proxy directories
  'lib/Button/package.json',
  'lib/locales/zh_CN/package.json',

  // Validate less
  'lib/styles/index.less',
  'lib/Button/styles/index.less',
  'lib/styles/plugins/palette.js', // See https://github.com/rsuite/rsuite/issues/1767

  // Validate cjs/esm
  'lib/cjs/Button/index.js',
  'lib/esm/Button/index.js',
  'lib/cjs/locales/zh_CN.js',
  'lib/esm/locales/zh_CN.js',

  // Validate d.ts files
  'lib/esm/Button/index.d.ts',
  'lib/cjs/Button/index.d.ts',
  'lib/cjs/locales/zh_CN.d.ts',
  'lib/esm/locales/zh_CN.d.ts'
];

it('Ensure file existence', () => {
  filesToEnsureExistence.forEach(function ensureFileExistence(filePath) {
    assert.isTrue(fs.existsSync(filePath), `File ${filePath} exists`);
  });
});

it('Should enable Dark mode by default', () => {
  const css = fs.readFileSync('lib/dist/rsuite.css');

  assert.isTrue(/\.rs-theme-dark/.test(css), 'Dark mode styles are included');
});
