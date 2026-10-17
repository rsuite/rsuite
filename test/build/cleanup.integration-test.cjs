const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '../..');
const gulpSource = fs.readFileSync(path.join(projectRoot, 'gulpfile.js'), 'utf8');
const gulpRoot = path.dirname(require.resolve('gulp'));
const gulpBin = JSON.parse(fs.readFileSync(path.join(gulpRoot, 'package.json'), 'utf8')).bin.gulp;
const gulpCli = path.resolve(gulpRoot, gulpBin);

for (const fixture of [
  { name: 'a path with spaces', directory: 'project with spaces', siblings: ['unrelated'] },
  { name: 'literal brackets', directory: 'project[fixture]', siblings: ['projectf'] },
  { name: 'literal braces', directory: 'project{one,two}', siblings: ['projectone', 'projecttwo'] },
  {
    name: 'an absent output directory',
    directory: 'project',
    siblings: ['unrelated'],
    absent: true
  }
]) {
  test(`build cleanup handles ${fixture.name} without changing neighboring output`, () => {
    const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-build-clean-'));
    const fixtureRoot = path.join(temporary, fixture.directory);
    const output = path.join(fixtureRoot, 'lib');
    try {
      fs.mkdirSync(fixtureRoot, { recursive: true });
      if (!fixture.absent) {
        fs.mkdirSync(output);
        fs.writeFileSync(path.join(output, 'stale.txt'), 'stale output');
      }
      for (const sibling of fixture.siblings) {
        const directory = path.join(temporary, sibling, 'lib');
        fs.mkdirSync(directory, { recursive: true });
        fs.writeFileSync(path.join(directory, 'keep.txt'), 'neighbor output');
      }
      fs.symlinkSync(
        path.join(projectRoot, 'node_modules'),
        path.join(fixtureRoot, 'node_modules'),
        'junction'
      );
      fs.symlinkSync(
        path.join(projectRoot, 'scripts'),
        path.join(fixtureRoot, 'scripts'),
        'junction'
      );
      fs.copyFileSync(
        path.join(projectRoot, 'babel.config.js'),
        path.join(fixtureRoot, 'babel.config.js')
      );
      fs.copyFileSync(
        path.join(projectRoot, 'package.json'),
        path.join(fixtureRoot, 'package.json')
      );
      // Expose the actual shared build/dev cleanup task only in this isolated fixture.
      fs.writeFileSync(
        path.join(fixtureRoot, 'gulpfile.js'),
        `${gulpSource}\nexports.cleanupFixture = clean;\n`
      );

      const result = spawnSync(
        process.execPath,
        [
          gulpCli,
          '--cwd',
          fixtureRoot,
          '--gulpfile',
          path.join(fixtureRoot, 'gulpfile.js'),
          'cleanupFixture'
        ],
        { encoding: 'utf8', timeout: 30000 }
      );
      assert.ifError(result.error);
      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.deepEqual(
        {
          outputExists: fs.existsSync(output),
          neighbors: fixture.siblings.map(sibling => {
            const sentinel = path.join(temporary, sibling, 'lib', 'keep.txt');
            return fs.existsSync(sentinel) ? fs.readFileSync(sentinel, 'utf8') : null;
          })
        },
        { outputExists: false, neighbors: fixture.siblings.map(() => 'neighbor output') }
      );
    } finally {
      fs.rmSync(temporary, { recursive: true, force: true });
    }
  });
}
