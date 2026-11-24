import fs from 'node:fs';
import path from 'node:path';
import { hash } from '../cross-library-picker/integrity.mjs';

function packageFiles(folder, relative = '') {
  return fs
    .readdirSync(path.join(folder, relative), { withFileTypes: true })
    .filter(entry => !['node_modules', '.git'].includes(entry.name))
    .flatMap(entry => {
      const name = path.join(relative, entry.name);
      return entry.isDirectory() ? packageFiles(folder, name) : [name];
    })
    .sort();
}
export function installedDependencies(root) {
  const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json')));
  const packages = {},
    missingOptional = [];
  for (const [name, record] of Object.entries(lock.packages).sort(([a], [b]) =>
    a.localeCompare(b)
  )) {
    if (!name.startsWith('node_modules/')) continue;
    const folder = path.join(root, name);
    if (!fs.existsSync(folder)) {
      if (!record.optional) throw Error('Missing installed dependency: ' + name);
      missingOptional.push(name);
      continue;
    }
    const manifest = JSON.parse(fs.readFileSync(path.join(folder, 'package.json')));
    if (record.version && manifest.version !== record.version)
      throw Error('Installed dependency version differs from lock: ' + name);
    const files = packageFiles(folder).map(file => [
      file,
      hash(fs.readFileSync(path.join(folder, file)))
    ]);
    packages[name] = {
      name: manifest.name,
      version: manifest.version,
      files: files.length,
      sha256: hash(Buffer.from(JSON.stringify(files)))
    };
  }
  return {
    packages,
    missingOptional,
    sha256: hash(Buffer.from(JSON.stringify({ packages, missingOptional })))
  };
}
