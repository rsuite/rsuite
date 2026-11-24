import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { candidateDependencies } from '../sdk-dependencies.mjs';

const require = createRequire(path.resolve('package.json'));
const matcherRoot = path.dirname(require.resolve('semver/package.json'));
const matcherVersion = require('semver/package.json').version;
const write = (file, value) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value));
};

function fixture(t) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-sdk-contract-'));
  t.after(() => fs.rmSync(temporary, { recursive: true, force: true }));
  const root = path.join(temporary, 'fixture');
  const modules = path.join(root, 'node_modules');
  const sdk = path.join(modules, 'rsuite');
  const metadata = {
    name: 'rsuite',
    version: '6.2.5',
    dependencies: { 'schema-typed': '^2.4.4', 'rsuite-table': '^5.19.3' },
    optionalDependencies: { 'optional-engine': '^1.0.0' },
    peerDependencies: { react: '^18.0.0 || ^19.0.0', 'optional-peer': '^1.0.0' },
    peerDependenciesMeta: { 'optional-peer': { optional: true } },
    engines: { node: '>=18' }
  };
  const lock = { lockfileVersion: 3, packages: { 'node_modules/rsuite': { ...metadata } } };
  write(path.join(root, 'package.json'), { devDependencies: { semver: matcherVersion } });
  write(path.join(sdk, 'package.json'), metadata);
  fs.cpSync(matcherRoot, path.join(modules, 'semver'), { recursive: true });
  const install = (name, version, location = 'node_modules/' + name) => {
    write(path.join(root, location, 'package.json'), { name, version });
    lock.packages[location] = { version };
  };
  install('schema-typed', '2.4.4');
  install('rsuite-table', '5.19.3');
  install('react', '19.0.0');
  const save = () => write(path.join(root, 'package-lock.json'), lock);
  save();
  return { temporary, root, modules, sdk, metadata, lock, install, save };
}

function rejects(root, reason) {
  assert.throws(
    () => candidateDependencies(root),
    error => error.code === 'RSUITE_SDK_DEPENDENCIES' && reason.test(error.message)
  );
}

test('records actual hoisted packages and permits absent optional dependencies and peers', t => {
  const { root } = fixture(t);
  const result = candidateDependencies(root);
  assert.equal(result.sdkVersion, '6.2.5');
  assert.equal(result.dependencies.find(row => row.name === 'schema-typed').version, '2.4.4');
  assert.equal(result.dependencies.filter(row => row.installed).length, 3);
  assert.deepEqual(
    result.dependencies
      .filter(row => !row.installed)
      .map(row => row.name)
      .sort(),
    ['optional-engine', 'optional-peer']
  );
});

test('rejects the stale file dependency metadata that previously hid new SDK requirements', t => {
  const { root, lock, save } = fixture(t);
  lock.packages['node_modules/rsuite'].dependencies = { 'schema-typed': '^2.4.2' };
  save();
  rejects(root, /metadata differs/);
});

test('rejects an actually installed version below the SDK floor even when the lock agrees', t => {
  const { root, install, save } = fixture(t);
  install('schema-typed', '2.4.2');
  save();
  rejects(root, /schema-typed.*does not satisfy/);
});

test('uses a nested dependency before the apparently correct top-level version', t => {
  const { root, install, save } = fixture(t);
  install('schema-typed', '2.4.2', 'node_modules/rsuite/node_modules/schema-typed');
  save();
  rejects(root, /node_modules\/rsuite\/node_modules\/schema-typed.*does not satisfy/);
});

test('records a valid nested dependency at its actual locked location', t => {
  const { root, install, save } = fixture(t);
  install('schema-typed', '2.4.5', 'node_modules/rsuite/node_modules/schema-typed');
  save();
  const row = candidateDependencies(root).dependencies.find(row => row.name === 'schema-typed');
  assert.equal(row.version, '2.4.5');
  assert.equal(row.location, 'node_modules/rsuite/node_modules/schema-typed');
});

test('rejects a missing required dependency', t => {
  const { root, modules } = fixture(t);
  fs.rmSync(path.join(modules, 'schema-typed'), { recursive: true });
  rejects(root, /schema-typed.*missing required package/);
});

test('rejects a dependency borrowed from a parent node_modules directory', t => {
  const { temporary, root, modules } = fixture(t);
  fs.rmSync(path.join(modules, 'schema-typed'), { recursive: true });
  write(path.join(temporary, 'node_modules/schema-typed/package.json'), {
    name: 'schema-typed',
    version: '2.4.4'
  });
  rejects(root, /outside the standalone install/);
});

test('rejects an installed dependency version that differs from the frozen resolved record', t => {
  const { root, lock, save } = fixture(t);
  lock.packages['node_modules/schema-typed'].version = '2.4.5';
  save();
  rejects(root, /differs from the frozen resolved record/);
});

test('enforces required peer version ranges', t => {
  const { root, install, save } = fixture(t);
  install('react', '17.0.2');
  save();
  rejects(root, /react.*does not satisfy/);
});

test('does not accept a prerelease solely because its numeric version is above the floor', t => {
  const { root, install, save } = fixture(t);
  install('schema-typed', '2.5.0-beta.0');
  save();
  rejects(root, /schema-typed.*does not satisfy/);
});

test('rejects a symlinked SDK installation', t => {
  const { temporary, root, sdk } = fixture(t);
  const external = path.join(temporary, 'sdk-store');
  fs.renameSync(sdk, external);
  fs.symlinkSync(external, sdk, 'dir');
  rejects(root, /physical installations/);
});

test('rejects a dependency with a mismatched package identity', t => {
  const { root, modules } = fixture(t);
  write(path.join(modules, 'schema-typed/package.json'), { name: 'other', version: '2.4.4' });
  rejects(root, /identity differs/);
});

test('requires the fixture to pin the exact installed range matcher', t => {
  const { root } = fixture(t);
  write(path.join(root, 'package.json'), { devDependencies: { semver: '^' + matcherVersion } });
  rejects(root, /exact fixture pin/);
});

test('rejects a range matcher borrowed through a symlink', t => {
  const { temporary, root, modules } = fixture(t);
  const external = path.join(temporary, 'matcher-store');
  fs.renameSync(path.join(modules, 'semver'), external);
  fs.symlinkSync(external, path.join(modules, 'semver'), 'dir');
  rejects(root, /range matcher resolves outside/);
});
