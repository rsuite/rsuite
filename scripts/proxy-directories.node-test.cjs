const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test, after } = require('node:test');
const { findResources } = require('./proxy-directories.js');

const fixtureParent = fs.realpathSync(os.tmpdir());
const fixtureRoot = fs.mkdtempSync(path.join(fixtureParent, 'rsuite-proxy-resources-'));

function assertOwnedDirectory(directory) {
  const relative = path.relative(fixtureRoot, directory);
  assert(relative && !relative.startsWith('..') && !path.isAbsolute(relative));
  assert.strictEqual(fs.realpathSync(directory), directory);
  assert(!fs.lstatSync(directory).isSymbolicLink());
}

function assertNoSymlinks(directory) {
  for (const item of fs.readdirSync(directory)) {
    const itemPath = path.join(directory, item);
    const stat = fs.lstatSync(itemPath);
    assert(!stat.isSymbolicLink());
    if (stat.isDirectory()) assertNoSymlinks(itemPath);
  }
}

function withResources(parent, setup, check) {
  const caseRoot = fs.mkdtempSync(path.join(fixtureRoot, 'case-'));
  assertOwnedDirectory(caseRoot);
  try {
    const directory = path.join(caseRoot, parent);
    fs.mkdirSync(directory, { recursive: true });
    setup(directory);
    check(directory);
  } finally {
    assertOwnedDirectory(caseRoot);
    assertNoSymlinks(caseRoot);
    fs.rmSync(caseRoot, { recursive: true });
  }
}

function makeDirectory(directory, name) {
  fs.mkdirSync(path.join(directory, name));
}

function makeFile(directory, name) {
  fs.writeFileSync(path.join(directory, name), '', { flag: 'wx' });
}

const parentLayouts = [
  ['finds components and locales under a plain parent', 'plain-parent/src'],
  ['finds components and locales under dotted parents', '.codex-top1/build-tree/src'],
  ['finds components and locales under parents with spaces', 'workspace with spaces/src'],
  ['finds components and locales under punctuation parents', 'workspace+[draft]/src'],
  ['finds components and locales under non-ASCII parents', '工作区/套件/src'],
  ['finds components and locales under nested parents', 'nested/parent/source/src']
];

for (const [title, parent] of parentLayouts) {
  test(title, { concurrency: false }, t => {
    if (parent === 'plain-parent/src') {
      t.diagnostic(JSON.stringify({ node: process.versions.node, execPath: process.execPath, fixtureRoot }));
    }
    withResources(
      parent,
      directory => {
        for (const name of ['Affix', 'Form', 'locales', 'styles', 'internals']) {
          makeDirectory(directory, name);
        }
        makeFile(directory, 'index.tsx');
        for (const name of ['en_US.ts', 'zh_CN.ts', 'index.ts']) {
          makeFile(path.join(directory, 'locales'), name);
        }
      },
      directory => {
        assert.deepStrictEqual(
          findResources({ dir: directory, ignores: ['styles', 'internals'] }).sort(),
          ['Affix', 'Form', 'locales']
        );
        assert.deepStrictEqual(
          findResources({ dir: path.join(directory, 'locales'), ignores: ['index'], isFile: true }).sort(),
          ['en_US', 'zh_CN']
        );
      }
    );
  });
}

test('preserves file selection, ignores and the existing .ts replacement', { concurrency: false }, () => {
  withResources(
    'legacy/src',
    directory => {
      for (const name of ['Widget.ts', 'component.ts.cache']) makeDirectory(directory, name);
      for (const name of ['en_US.ts', 'index.ts', 'notes.ts.backup', 'README.md']) makeFile(directory, name);
    },
    directory => {
      assert.deepStrictEqual(
        findResources({ dir: directory, ignores: ['Widget', 'index'] }).sort(),
        ['component.cache']
      );
      assert.deepStrictEqual(
        findResources({ dir: directory, ignores: ['Widget', 'index'], isFile: true }).sort(),
        ['README.md', 'component.cache', 'en_US', 'notes.backup']
      );
    }
  );
});

test('selects direct entries without recursing into component children', { concurrency: false }, () => {
  withResources(
    'plain-parent/src',
    directory => {
      makeDirectory(directory, 'Parent');
      makeDirectory(path.join(directory, 'Parent'), 'Child');
      makeFile(path.join(directory, 'Parent'), 'nested.ts');
      makeFile(directory, 'top.ts');
    },
    directory => {
      assert.deepStrictEqual(findResources({ dir: directory }), ['Parent']);
      assert.deepStrictEqual(findResources({ dir: directory, isFile: true }).sort(), ['Parent', 'top']);
      assert.deepStrictEqual(findResources({ dir: directory, ignores: ['Parent'] }), []);
    }
  );
});

after(() => {
  assert.strictEqual(fs.realpathSync(fixtureRoot), fixtureRoot);
  assert(!fs.lstatSync(fixtureRoot).isSymbolicLink());
  assert.deepStrictEqual(fs.readdirSync(fixtureRoot), []);
  fs.rmdirSync(fixtureRoot);
});
