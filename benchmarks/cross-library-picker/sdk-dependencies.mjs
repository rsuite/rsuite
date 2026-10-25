import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { isDeepStrictEqual } from 'node:util';

function fail(message, details) {
  const error = new Error('SDK dependency contract: ' + message + '\n' + JSON.stringify(details));
  error.code = 'RSUITE_SDK_DEPENDENCIES';
  error.details = details;
  throw error;
}

function within(parent, child) {
  const relative = path.relative(parent, child);
  return relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
}

/** Check the installed SDK's actual requirements, not cached file: package metadata. */
export function candidateDependencies(fixtureRoot) {
  const root = fs.realpathSync(fixtureRoot);
  const modules = path.join(root, 'node_modules');
  const sdk = path.join(modules, 'rsuite');
  if (fs.realpathSync(modules) !== modules || fs.realpathSync(sdk) !== sdk) {
    fail('the standalone SDK and node_modules must be physical installations', { sdk });
  }
  const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
  const metadata = read(path.join(sdk, 'package.json'));
  const lock = read(path.join(root, 'package-lock.json'));
  const locked = lock.packages?.['node_modules/rsuite'];
  const mismatch = [];
  if (metadata.name !== 'rsuite' || !locked || locked.link || locked.version !== metadata.version) {
    mismatch.push({ field: 'identity', installed: metadata.version, locked: locked?.version });
  }
  for (const field of [
    'dependencies',
    'optionalDependencies',
    'peerDependencies',
    'peerDependenciesMeta',
    'engines'
  ]) {
    if (!isDeepStrictEqual(metadata[field] || {}, locked?.[field] || {})) {
      mismatch.push({ field, installed: metadata[field] || {}, locked: locked?.[field] || {} });
    }
  }
  if (mismatch.length)
    fail('installed SDK metadata differs from its frozen lock snapshot', mismatch);

  const require = createRequire(path.join(root, 'package.json'));
  const matcherFile = require.resolve('semver/package.json');
  if (!within(modules, fs.realpathSync(matcherFile))) {
    fail('the range matcher resolves outside the standalone install', { matcherFile });
  }
  const matcher = require('semver');
  const matcherVersion = require('semver/package.json').version;
  const matcherPin = read(path.join(root, 'package.json')).devDependencies?.semver;
  if (matcherPin !== matcherVersion) {
    fail('the range matcher must use its exact fixture pin', { matcherPin, matcherVersion });
  }
  if (metadata.engines?.node && !matcher.satisfies(process.versions.node, metadata.engines.node)) {
    fail('the running Node version does not satisfy the SDK requirement', {
      version: process.versions.node,
      range: metadata.engines.node
    });
  }
  const sdkRequire = createRequire(path.join(sdk, 'package.json'));
  const search = sdkRequire.resolve.paths('rsuite-sdk-dependency-contract');
  const issues = [];
  const dependencies = [];
  for (const kind of ['dependencies', 'optionalDependencies', 'peerDependencies']) {
    for (const [name, range] of Object.entries(metadata[kind] || {}).sort()) {
      const optional =
        kind === 'optionalDependencies' ||
        (kind === 'peerDependencies' && metadata.peerDependenciesMeta?.[name]?.optional === true);
      if (name.split('/').some(part => part === '..' || part === '.')) {
        fail('invalid dependency name', { name });
      }
      const file = search
        .map(directory => path.join(directory, name, 'package.json'))
        .find(candidate => fs.existsSync(candidate));
      if (!file) {
        if (!optional) issues.push({ name, kind, range, reason: 'missing required package' });
        dependencies.push({ name, kind, range, optional, installed: false });
        continue;
      }
      const real = fs.realpathSync(file);
      if (!within(modules, real)) {
        issues.push({
          name,
          kind,
          range,
          reason: 'package resolves outside the standalone install'
        });
        continue;
      }
      const bytes = fs.readFileSync(real);
      const installed = JSON.parse(bytes);
      const location = path.relative(root, path.dirname(file)).split(path.sep).join('/');
      const row = {
        name,
        kind,
        range,
        optional,
        installed: true,
        version: installed.version,
        location,
        packageSHA256: crypto.createHash('sha256').update(bytes).digest('hex')
      };
      if (installed.name !== name) {
        issues.push({
          ...row,
          reason: 'resolved package identity differs from its dependency name'
        });
      }
      if (!matcher.validRange(range) || !matcher.satisfies(installed.version, range)) {
        issues.push({ ...row, reason: 'installed version does not satisfy the SDK requirement' });
      }
      if (lock.packages?.[location]?.version !== installed.version) {
        issues.push({
          ...row,
          reason: 'installed version differs from the frozen resolved record'
        });
      }
      dependencies.push(row);
    }
  }
  if (issues.length) fail('resolved dependency requirements are not met', issues);
  return { sdkVersion: metadata.version, matcherVersion, dependencies };
}
