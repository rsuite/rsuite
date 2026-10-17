const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const resolverRoot = path.dirname(require.resolve('resolve-tspaths/package.json'));
const resolverBin = JSON.parse(fs.readFileSync(path.join(resolverRoot, 'package.json'), 'utf8'))
  .bin['resolve-tspaths'];
const resolverCli = path.resolve(resolverRoot, resolverBin);

for (const directory of ['project with spaces', 'project[fixture]', 'project{one,two}']) {
  test(`declaration aliases resolve in ${directory}`, () => {
    const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-declaration-paths-'));
    const root = path.join(temporary, directory);
    const declarations = `import type { Fixture } from '@/internal/types';
export type { Fixture } from '@/internal/types';
export declare const fixture: Fixture;
export declare const load: () => Promise<import('@/internal/types').Fixture>;
export type Label = '@/internal/types';
`;
    const expected = `import type { Fixture } from '../internal/types';
export type { Fixture } from '../internal/types';
export declare const fixture: Fixture;
export declare const load: () => Promise<import('../internal/types').Fixture>;
export type Label = '@/internal/types';
`;
    try {
      fs.mkdirSync(path.join(root, 'src/internal'), { recursive: true });
      fs.writeFileSync(path.join(root, 'src/internal/types.ts'), 'export interface Fixture {}\n');
      fs.writeFileSync(
        path.join(root, 'tsconfig.json'),
        JSON.stringify({
          compilerOptions: { baseUrl: '.', rootDir: 'src', paths: { '@/*': ['src/*'] } },
          include: ['src/**/*.ts']
        })
      );
      for (const format of ['cjs', 'esm']) {
        const out = path.join('lib', format);
        fs.mkdirSync(path.join(root, out, 'Component'), { recursive: true });
        fs.mkdirSync(path.join(root, out, 'internal'), { recursive: true });
        fs.writeFileSync(
          path.join(root, out, 'internal/types.d.ts'),
          'export interface Fixture {}\n'
        );
        const file = path.join(root, out, 'Component/index.d.ts');
        fs.writeFileSync(file, declarations);
        const result = spawnSync(
          process.execPath,
          [resolverCli, '--project', 'tsconfig.json', '--out', out],
          { cwd: root, encoding: 'utf8', timeout: 30000 }
        );
        assert.ifError(result.error);
        assert.equal(result.status, 0, result.stdout + result.stderr);
        assert.equal(fs.readFileSync(file, 'utf8'), expected, result.stdout + result.stderr);
      }
    } finally {
      fs.rmSync(temporary, { recursive: true, force: true });
    }
  });
}
