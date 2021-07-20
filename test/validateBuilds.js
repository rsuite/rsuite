const { assert } = require('chai');
const fs = require('fs');

// Validate style outputs:
// - dist/rsuite.css
// - dist/rsuite.min.css
// - dist/rsuite-rtl.css
// - dist/rsuite-rtl.min.css
// - less/**/*.less

const filesToEnsureExistence = [
  'dist/rsuite.css',
  'dist/rsuite.min.css',
  'dist/rsuite-rtl.css',
  'dist/rsuite-rtl.min.css',
  // See https://github.com/rsuite/rsuite/issues/1767
  'lib/styles/plugins/palette.js'
];

const directoriesToEnsureExistence = ['less'];

it('Ensure file existence', () => {
  filesToEnsureExistence.forEach(function ensureFileExistence(filePath) {
    assert.isTrue(fs.existsSync(filePath), `File ${filePath} exists`);
  });
});

it('Ensure directory existence', () => {
  directoriesToEnsureExistence.forEach(function ensureDirectoryExistence(directoryPath) {
    assert.isTrue(fs.existsSync(directoryPath), `Directory ${directoryPath} exists`);
  });
});

it('Should enable Dark mode by default', () => {
  const css = fs.readFileSync('dist/rsuite.css');

  assert.isTrue(/\.rs-theme-dark/.test(css), 'Dark mode styles are included');
});
