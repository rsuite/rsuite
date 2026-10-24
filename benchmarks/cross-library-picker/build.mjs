import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync, execFileSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import { parseArgs } from 'node:util';
import { inputs, packageFingerprint, filesUnder, hash } from './integrity.mjs';
import { styleBuild, libraryStyles } from './runner/style-profiles.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({
  options: {
    'style-profile': { type: 'string', default: 'full' },
    'style-output': { type: 'boolean', default: false }
  }
});
const output = styleBuild(root, values['style-profile'], values['style-output']);
const libraries = ['rsuite', 'antd', 'chakra', 'heroui'];
const sourceInputs = inputs(root);
const candidateFingerprint = packageFingerprint(root);
if (candidateFingerprint !== packageFingerprint(root, path.resolve(root, '../../lib'))) {
  throw new Error(
    'Installed RSuite differs from lib: reinstall this benchmark after rebuilding RSuite'
  );
}
const packages = [
  'rsuite',
  'antd',
  '@chakra-ui/react',
  '@heroui/react',
  '@heroui/styles',
  'react',
  'react-dom',
  'react-aria-components',
  '@tanstack/react-virtual',
  'tailwindcss',
  'vite',
  'playwright',
  'axe-core'
];
const versions = Object.fromEntries(
  packages.map(name => {
    const p = JSON.parse(fs.readFileSync(path.join(root, 'node_modules', name, 'package.json')));
    return [name, p.version];
  })
);
const auditEngine = {
  version: versions['axe-core'],
  sourceSHA256: hash(fs.readFileSync(path.join(root, 'node_modules/axe-core/axe.min.js')))
};
const builds = {};
for (const library of libraries) {
  const result = spawnSync(
    process.execPath,
    [path.join(root, 'node_modules/vite/bin/vite.js'), 'build'],
    {
      cwd: root,
      env: {
        ...process.env,
        PICKER_LIBRARY: library,
        PICKER_STYLE_PROFILE: output.profile,
        PICKER_STYLE_OUTPUT: output.separate ? '1' : '0'
      },
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024
    }
  );
  if (result.status !== 0) {
    console.error((result.stdout + result.stderr).split('\n').slice(-25).join('\n'));
    process.exit(result.status ?? 1);
  }
  const folder = path.join(output.directory, library);
  fs.writeFileSync(path.join(folder, 'build.log'), result.stdout + result.stderr);
  console.log('Built', library, '(full log: ' + path.relative(root, folder) + '/build.log)');
  const artifacts = filesUnder(folder).map(file => {
    const bytes = fs.readFileSync(file);
    return {
      file: path.relative(folder, file),
      bytes: bytes.length,
      gzipBytes: gzipSync(bytes).length,
      sha256: hash(bytes)
    };
  });
  builds[library] = {
    styles: libraryStyles(root, library, output.profile),
    artifacts,
    initialAssets: JSON.parse(fs.readFileSync(path.join(folder, '.vite/manifest.json')))[
      'index.html'
    ]
  };
}
if (
  JSON.stringify(sourceInputs) !== JSON.stringify(inputs(root)) ||
  candidateFingerprint !== packageFingerprint(root) ||
  auditEngine.sourceSHA256 !==
    hash(fs.readFileSync(path.join(root, 'node_modules/axe-core/axe.min.js')))
)
  throw new Error('Build inputs changed during build');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
fs.writeFileSync(
  path.join(output.directory, 'build-inputs.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      styleProfile: output.profile,
      separateStyleOutput: output.separate,
      node: process.version,
      versions,
      auditEngine,
      candidateSourceCommit: git('rev-parse', 'HEAD'),
      candidateWorkingTreeStatus: git('status', '--porcelain', '--untracked-files=all'),
      sourceInputs,
      candidateFingerprint,
      builds
    },
    null,
    2
  ) + '\n'
);
