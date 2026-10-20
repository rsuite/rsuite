import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync, execFileSync } from 'node:child_process';
import { inputs, packageFingerprint, filesUnder, hash } from './integrity.mjs';
const root = path.dirname(fileURLToPath(import.meta.url));
const sourceInputs = inputs(root);
const candidateFingerprint = packageFingerprint(root);
if (candidateFingerprint !== packageFingerprint(root, path.resolve(root, '../../lib')))
  throw new Error('Installed candidate does not match the root lib snapshot');
const builds = {};
for (const library of ['rsuite', 'antd', 'chakra', 'heroui']) {
  const result = spawnSync(
    process.execPath,
    ['node_modules/vite/bin/vite.js', 'build', '--config', 'async/vite.config.mjs'],
    {
      cwd: root,
      env: { ...process.env, PICKER_LIBRARY: library },
      stdio: 'inherit'
    }
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
  const output = path.join(root, 'async-dist', library);
  builds[library] = {
    artifacts: filesUnder(output).map(file => ({
      file: path.relative(output, file),
      bytes: fs.statSync(file).size,
      sha256: hash(fs.readFileSync(file))
    }))
  };
}
if (
  JSON.stringify(sourceInputs) !== JSON.stringify(inputs(root)) ||
  candidateFingerprint !== packageFingerprint(root)
)
  throw new Error('Inputs changed while building async fixture');
const fixturePackage = JSON.parse(fs.readFileSync(path.join(root, 'package.json')));
const versions = Object.fromEntries(
  Object.keys({ ...fixturePackage.dependencies, ...fixturePackage.devDependencies }).map(name => [
    name,
    JSON.parse(fs.readFileSync(path.join(root, 'node_modules', name, 'package.json'))).version
  ])
);
fs.writeFileSync(
  path.join(root, 'async-dist/build-inputs.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      node: process.version,
      versions,
      fixtureSourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], {
        cwd: root,
        encoding: 'utf8'
      }).trim(),
      fixtureWorkingTreeStatus: execFileSync(
        'git',
        ['status', '--porcelain', '--untracked-files=all'],
        {
          cwd: root,
          encoding: 'utf8'
        }
      ).trim(),
      sourceInputs,
      candidateFingerprint,
      builds,
      virtualization: {
        rsuite: 'native SelectPicker list',
        antd: 'native Select virtual list',
        chakra: 'documented TanStack virtualizer composition',
        heroui: 'React Aria Virtualizer/ListLayout composition'
      },
      scope:
        'Production async capability fixture; shared transport ordering belongs to application code. Fixture commit identifies this checkout; candidate identity is its package fingerprint, not proof that lib was rebuilt from HEAD. No performance or ranking result.'
    },
    null,
    2
  ) + '\n'
);
