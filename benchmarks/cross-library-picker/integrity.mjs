import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
export function filesUnder(root) {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .flatMap(entry => {
      const name = path.join(root, entry.name);
      return entry.isDirectory() ? filesUnder(name) : [name];
    })
    .sort();
}
export function inputs(root) {
  const files = [
    ...filesUnder(path.join(root, 'src')),
    ...filesUnder(path.join(root, 'runner')),
    ...[
      'index.html',
      'vite.config.mjs',
      'package.json',
      'package-lock.json',
      'tsconfig.json',
      'build.mjs',
      'run.mjs',
      'integrity.mjs'
    ].map(name => path.join(root, name))
  ];
  return Object.fromEntries(
    files.map(file => [path.relative(root, file), hash(fs.readFileSync(file))])
  );
}
export function packageFingerprint(root, folder = path.join(root, 'node_modules/rsuite')) {
  return hash(
    Buffer.from(
      JSON.stringify(
        Object.fromEntries(
          filesUnder(folder).map(file => [path.relative(folder, file), hash(fs.readFileSync(file))])
        )
      )
    )
  );
}
