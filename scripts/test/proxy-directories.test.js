const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { findResources } = require('../proxy-directories');

function fixture(t, parentName, entries) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-proxy-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const dir = path.join(root, parentName, 'src');
  fs.mkdirSync(dir, { recursive: true });
  entries.forEach(([name, isDirectory]) => {
    const target = path.join(dir, name);
    if (isDirectory) fs.mkdirSync(target);
    else fs.writeFileSync(target, '');
  });
  return dir;
}

test('component names and ignores do not depend on a dotted parent path', t => {
  const dir = fixture(t, '.checkout.v2', [
    ['Button', true],
    ['Form', true],
    ['internals', true],
    ['styles', true],
    ['index.ts', false]
  ]);
  assert.deepEqual(findResources({ dir, ignores: ['internals', 'styles'] }).sort(), [
    'Button',
    'Form'
  ]);
});

test('component names survive spaces and Unicode in parent directories', t => {
  const dir = fixture(t, 'React 组件库', [['FormControl', true]]);
  assert.deepEqual(findResources({ dir }), ['FormControl']);
});

test('locale files lose only their terminal TypeScript extension', t => {
  const dir = fixture(t, '.checkout.v2', [
    ['en_US.ts', false],
    ['zh_CN.ts', false],
    ['index.ts', false],
    ['custom.ts.locale.ts', false]
  ]);
  assert.deepEqual(findResources({ dir, isFile: true, ignores: ['index'] }).sort(), [
    'custom.ts.locale',
    'en_US',
    'zh_CN'
  ]);
});

test('directory names keep dots and TypeScript-like suffixes', t => {
  const dir = fixture(t, 'checkout', [
    ['Custom.ts', true],
    ['Custom.Widget', true]
  ]);
  assert.deepEqual(findResources({ dir }).sort(), ['Custom.Widget', 'Custom.ts']);
});

test('ordinary component and locale discovery stays compatible', t => {
  const dir = fixture(t, 'checkout', [
    ['Button', true],
    ['useFormControl', true],
    ['index.ts', false],
    ['en_US.ts', false]
  ]);
  assert.deepEqual(findResources({ dir }).sort(), ['Button', 'useFormControl']);
  assert.deepEqual(findResources({ dir, isFile: true, ignores: ['index'] }).sort(), [
    'Button',
    'en_US',
    'useFormControl'
  ]);
});
