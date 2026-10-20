import fs from 'node:fs';
import path from 'node:path';
export { hash, packageFingerprint } from '../cross-library-picker/integrity.mjs';
import { hash, filesUnder } from '../cross-library-picker/integrity.mjs';
export function inputs(root) {
  const files = [
    ...filesUnder(path.join(root, 'src')),
    ...filesUnder(path.join(root, 'runner')),
    ...filesUnder(path.join(root, 'checks')),
    ...[
      '.npmrc',
      '.gitignore',
      'package.json',
      'package-lock.json',
      'tsconfig.json',
      'index.html',
      'tree.html',
      'virtual.html',
      'vite.config.mjs',
      'build.mjs',
      'run.mjs',
      'integrity.mjs',
      'dependencies.mjs',
      '../cross-library-picker/integrity.mjs',
      '../cross-library-picker/runner/server.mjs',
      '../cross-library-picker/runner/diagnostics.mjs'
    ].map(name => path.resolve(root, name))
  ];
  return Object.fromEntries(
    files.map(file => [path.relative(root, file), hash(fs.readFileSync(file))])
  );
}
