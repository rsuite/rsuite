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
  'dist/rsuite-rtl.min.css'
];

const directoriesToEnsureExistence = ['less'];

filesToEnsureExistence.forEach(function ensureFileExistence(filePath) {
  assert.ok(fs.existsSync(filePath), `File ${filePath} should exist`);
});

directoriesToEnsureExistence.forEach(function ensureDirectoryExistence(directoryPath) {
  assert.ok(fs.existsSync(directoryPath), `Directory ${directoryPath} should exist`);
});
