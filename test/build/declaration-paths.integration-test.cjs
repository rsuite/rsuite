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
const projectRoot = path.resolve(__dirname, '../..');
const typescriptCli = require.resolve('typescript/bin/tsc');

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

for (const directory of ['project with spaces', 'project[fixture]', 'project{one,two}']) {
  test(`declaration builds exclude nested fixtures in ${directory}`, () => {
    const temporary = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-declaration-fixtures-'))
    );
    const root = path.join(temporary, 'test', directory);
    const files = {
      'src/index.ts': "export type { Fixture } from './internal/types';\n",
      'src/internal/types.ts': 'export interface Fixture { value: string }\n',
      'src/testable/keep.ts': "export const retained = 'production';\n",
      'src/internal/test/invalid.ts': 'intentionally invalid typescript',
      'src/internal/stories/invalid.tsx': 'intentionally invalid typescript',
      'src/internal/test/nested/types.ts': 'export interface TestFixture {}\n',
      'src/internal/stories/nested/types.tsx': 'export interface StoryFixture {}\n',
      'src/internal/test/nested/manual.d.ts': 'export declare const testOnly: string;\n',
      'src/internal/stories/nested/manual.d.ts': 'export declare const storyOnly: string;\n'
    };
    try {
      for (const [file, contents] of Object.entries(files)) {
        fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
        fs.writeFileSync(path.join(root, file), contents);
      }
      fs.copyFileSync(
        path.join(projectRoot, 'tsconfig.build.json'),
        path.join(root, 'tsconfig.build.json')
      );
      fs.writeFileSync(
        path.join(root, 'tsconfig.json'),
        JSON.stringify({
          compilerOptions: {
            target: 'ES2022',
            module: 'ESNext',
            rootDir: 'src',
            strict: true,
            declaration: true,
            types: [],
            lib: ['ES2022'],
            jsx: 'preserve'
          },
          include: ['src/**/*']
        })
      );
      const privateFiles = Object.keys(files).filter(
        file => file.includes('/test/') || file.includes('/stories/')
      );
      const listed = spawnSync(
        process.execPath,
        [typescriptCli, '--project', 'tsconfig.build.json', '--listFilesOnly'],
        {
          cwd: root,
          encoding: 'utf8',
          timeout: 30000
        }
      );
      assert.ifError(listed.error);
      assert.equal(listed.status, 0, listed.stdout + listed.stderr);
      const included = listed.stdout.split(/\r?\n/).map(file => path.normalize(file));
      assert.ok(included.includes(path.join(root, 'src/internal/types.ts')));
      assert.ok(included.includes(path.join(root, 'src/testable/keep.ts')));
      for (const file of privateFiles)
        assert.equal(included.includes(path.join(root, file)), false, file);
      for (const format of ['cjs', 'esm']) {
        const out = path.join('lib', format);
        const emitted = spawnSync(
          process.execPath,
          [
            typescriptCli,
            '--project',
            'tsconfig.build.json',
            '--emitDeclarationOnly',
            '--outDir',
            out
          ],
          {
            cwd: root,
            encoding: 'utf8',
            timeout: 30000
          }
        );
        assert.ifError(emitted.error);
        assert.equal(emitted.status, 0, emitted.stdout + emitted.stderr);
        assert.match(
          fs.readFileSync(path.join(root, out, 'internal/types.d.ts'), 'utf8'),
          /interface Fixture/
        );
        assert.match(
          fs.readFileSync(path.join(root, out, 'testable/keep.d.ts'), 'utf8'),
          /production/
        );
        assert.equal(fs.existsSync(path.join(root, out, 'internal/test')), false);
        assert.equal(fs.existsSync(path.join(root, out, 'internal/stories')), false);
      }
    } finally {
      fs.rmSync(temporary, { recursive: true, force: true });
    }
  });
}
