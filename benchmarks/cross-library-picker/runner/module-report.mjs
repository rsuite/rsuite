import fs from 'node:fs';
import path from 'node:path';

export function moduleReport(root) {
  const owners = new Map();
  function owner(id) {
    if (id.startsWith('\0')) return null;
    let directory = path.dirname(id.split('?')[0]);
    const visited = [];
    let value = null;
    while (directory !== path.dirname(directory)) {
      if (owners.has(directory)) {
        value = owners.get(directory);
        break;
      }
      visited.push(directory);
      const file = path.join(directory, 'package.json');
      if (fs.existsSync(file)) {
        const pkg = JSON.parse(fs.readFileSync(file));
        if (pkg.name) {
          value = { name: pkg.name, version: pkg.version };
          break;
        }
      }
      directory = path.dirname(directory);
    }
    for (const item of visited) owners.set(item, value);
    return value;
  }
  return {
    name: 'picker-module-report',
    writeBundle(options, bundle) {
      const chunks = Object.values(bundle)
        .filter(value => value.type === 'chunk')
        .map(chunk => ({
          file: chunk.fileName,
          imports: chunk.imports,
          dynamicImports: chunk.dynamicImports,
          modules: Object.entries(chunk.modules).map(([id, info]) => ({
            id: id.replaceAll(root + path.sep, ''),
            package: owner(id),
            renderedCharacters: info.renderedLength,
            originalCharacters: info.originalLength
          }))
        }));
      fs.writeFileSync(
        path.join(options.dir, 'module-report.json'),
        JSON.stringify(
          {
            scope:
              'Rollup module renderedLength before final minification, in characters; not per-package minified or gzip byte attribution',
            chunks
          },
          null,
          2
        ) + '\n'
      );
    }
  };
}
