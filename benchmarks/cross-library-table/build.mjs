import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync, execFileSync } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';
import { inputs, packageFingerprint, candidateDependencies, hash } from './integrity.mjs';
import { installedDependencies } from './dependencies.mjs';
const root = path.dirname(fileURLToPath(import.meta.url));
const sourceInputs = inputs(root);
const candidateFingerprint = packageFingerprint(root);
const dependencyContract = candidateDependencies(root);
const dependencySnapshot = installedDependencies(root);
if (candidateFingerprint !== packageFingerprint(root, path.resolve(root, '../../lib')))
  throw new Error('Installed candidate differs from root lib snapshot');
const builds = {};
for (const library of ['rsuite', 'antd', 'chakra', 'heroui']) {
  const result = spawnSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build'], {
    cwd: root,
    env: { ...process.env, TABLE_LIBRARY: library },
    stdio: 'inherit'
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
  const folder = path.join(root, 'dist', library);
  const visit = dir =>
    fs
      .readdirSync(dir, { withFileTypes: true })
      .flatMap(entry =>
        entry.isDirectory() ? visit(path.join(dir, entry.name)) : [path.join(dir, entry.name)]
      )
      .sort();
  builds[library] = {
    artifacts: visit(folder).map(file => ({
      file: path.relative(folder, file),
      bytes: fs.statSync(file).size,
      sha256: hash(fs.readFileSync(file))
    }))
  };
}
if (
  !isDeepStrictEqual(sourceInputs, inputs(root)) ||
  JSON.stringify(dependencyContract) !== JSON.stringify(candidateDependencies(root)) ||
  candidateFingerprint !== packageFingerprint(root) ||
  !isDeepStrictEqual(dependencySnapshot, installedDependencies(root))
)
  throw new Error('Inputs changed during table build');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json')));
const names = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.devDependencies),
  'schema-typed'
];
const versions = Object.fromEntries(
  names.map(name => [
    name,
    JSON.parse(fs.readFileSync(path.join(root, 'node_modules', name, 'package.json'))).version
  ])
);
fs.writeFileSync(
  path.join(root, 'dist/build-inputs.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      node: process.version,
      versions,
      sourceInputs,
      candidateFingerprint,
      candidateDependencies: dependencyContract,
      installedDependencies: dependencySnapshot,
      builds,
      fixtureSourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], {
        cwd: root,
        encoding: 'utf8'
      }).trim(),
      fixtureWorkingTreeStatus: execFileSync(
        'git',
        ['status', '--porcelain', '--untracked-files=all'],
        { cwd: root, encoding: 'utf8' }
      ).trim(),
      scope:
        'Four table compositions; native engine and application sorting/selection ownership are explicit. Fixture commit does not prove SDK rebuilt at HEAD; SDK identity is the recorded package fingerprint. No performance, conformance or overall ranking result.'
    },
    null,
    2
  ) + '\n'
);
