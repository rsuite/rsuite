const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn, spawnSync } = require('node:child_process');
const { setTimeout: delay } = require('node:timers/promises');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '../..');
const gulpRoot = path.dirname(require.resolve('gulp'));
const gulpBin = JSON.parse(fs.readFileSync(path.join(gulpRoot, 'package.json'), 'utf8')).bin.gulp;
const gulpCli = path.resolve(gulpRoot, gulpBin);

function createFixture(directory) {
  const temporary = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-build-source-')));
  // Parent test/src directories must not be mistaken for source subdirectories.
  const root = path.join(temporary, 'test', 'src', directory);
  fs.mkdirSync(path.join(root, 'scripts'), { recursive: true });
  fs.symlinkSync(
    path.join(projectRoot, 'node_modules'),
    path.join(root, 'node_modules'),
    'junction'
  );
  for (const file of [
    'gulpfile.js',
    'babel.config.js',
    'package.json',
    'scripts/proxy-directories.js'
  ]) {
    fs.copyFileSync(path.join(projectRoot, file), path.join(root, file));
  }
  const files = {
    'README.md': 'fixture readme',
    'CHANGELOG.md': 'fixture changelog',
    LICENSE: 'fixture license',
    'src/index.ts': "export { default } from './nested-dir/value[fixture]';\n",
    'src/nested-dir/value[fixture].ts': "export default 'initial';\n",
    'src/nested-dir/handwritten.d.ts': 'export declare const handwritten: string;\n',
    'src/nested-dir/styles/index.scss': '.fixture { color: red; }\n',
    'src/nested-dir/test/invalid.ts': 'intentionally invalid typescript',
    'src/nested-dir/stories/invalid.tsx': 'intentionally invalid typescript',
    'src/nested-dir/test/nested/fixture.ts': "export const testOnly = 'fixture';\n",
    'src/nested-dir/stories/nested/fixture.tsx': "export const storyOnly = 'fixture';\n",
    'src/nested-dir/test/nested/fixture.d.ts': 'export declare const testOnly: string;\n',
    'src/nested-dir/stories/nested/fixture.d.ts': 'export declare const storyOnly: string;\n',
    'src/nested-dir/test/nested/fixture.scss': '.test-only { color: red; }\n',
    'src/nested-dir/stories/nested/fixture.scss': '.story-only { color: red; }\n',
    'src/nested-dir/contest/test.ts': "export const production = 'preserved';\n",
    'src/nested-dir/testable/handwritten.d.ts': 'export declare const production: string;\n',
    'src/nested-dir/stories-archive/styles.scss': '.production { color: blue; }\n',
    'src/locales/index.ts': 'export {};\n',
    'src/locales/en_US.ts': "export default { name: 'fixture' };\n"
  };
  for (const [file, contents] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), contents);
  }
  return { root, temporary, files };
}

function gulpArgs(root, task) {
  return [gulpCli, '--cwd', root, '--gulpfile', path.join(root, 'gulpfile.js'), task];
}

for (const directory of ['project with spaces', 'project[fixture]', 'project{one,two}']) {
  test(`build reads literal source paths in ${directory}`, () => {
    const fixture = createFixture(directory);
    const { root, temporary, files } = fixture;
    try {
      const result = spawnSync(process.execPath, gulpArgs(root, 'build'), {
        cwd: root,
        encoding: 'utf8',
        timeout: 30000
      });
      assert.ifError(result.error);
      assert.equal(result.status, 0, result.stdout + result.stderr);
      for (const format of ['cjs', 'esm']) {
        const output = fs.readFileSync(
          path.join(root, 'lib', format, 'nested-dir/value[fixture].js'),
          'utf8'
        );
        assert.ok(output.startsWith("'use client';\n"), output);
        assert.match(output, /initial/);
        assert.equal(
          fs.readFileSync(path.join(root, 'lib', format, 'nested-dir/handwritten.d.ts'), 'utf8'),
          files['src/nested-dir/handwritten.d.ts']
        );
        for (const excluded of [
          'test/invalid.js',
          'stories/invalid.js',
          'test/nested/fixture.js',
          'stories/nested/fixture.js',
          'test/nested/fixture.d.ts',
          'stories/nested/fixture.d.ts'
        ]) {
          assert.equal(
            fs.existsSync(path.join(root, 'lib', format, 'nested-dir', excluded)),
            false
          );
        }
      }
      for (const format of ['cjs', 'esm']) {
        assert.match(
          fs.readFileSync(path.join(root, 'lib', format, 'nested-dir/contest/test.js'), 'utf8'),
          /preserved/
        );
        assert.equal(
          fs.readFileSync(
            path.join(root, 'lib', format, 'nested-dir/testable/handwritten.d.ts'),
            'utf8'
          ),
          files['src/nested-dir/testable/handwritten.d.ts']
        );
      }
      for (const directory of ['test', 'stories']) {
        assert.equal(
          fs.existsSync(path.join(root, 'lib/nested-dir', directory, 'nested/fixture.scss')),
          false
        );
      }
      assert.equal(
        fs.readFileSync(path.join(root, 'lib/nested-dir/stories-archive/styles.scss'), 'utf8'),
        files['src/nested-dir/stories-archive/styles.scss']
      );
      for (const file of ['README.md', 'CHANGELOG.md', 'LICENSE']) {
        assert.equal(fs.readFileSync(path.join(root, 'lib', file), 'utf8'), files[file]);
      }
      assert.equal(
        fs.readFileSync(path.join(root, 'lib/nested-dir/styles/index.scss'), 'utf8'),
        files['src/nested-dir/styles/index.scss']
      );
    } finally {
      fs.rmSync(temporary, { recursive: true, force: true });
    }
  });
}

async function waitFor(predicate, diagnostics) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (predicate()) return;
    await delay(30);
  }
  assert.fail(`Timed out waiting for Gulp output:\n${diagnostics()}`);
}

for (const directory of ['project', 'project[fixture]', 'project{one,two}']) {
  test(`dev recompiles a literal file under lib/cjs in ${directory}`, async () => {
    const { root, temporary } = createFixture(directory);
    let child;
    let exit;
    let diagnostics = '';
    try {
      // Signal the real watcher's ready event so the edit cannot race its initial scan.
      fs.appendFileSync(
        path.join(root, 'gulpfile.js'),
        `\nconst originalWatch = gulp.watch.bind(gulp);
gulp.watch = (...args) => {
  const watcher = originalWatch(...args);
  watcher.once('ready', () => console.log('RSUITE_FIXTURE_WATCH_READY'));
  watcher.on('all', (event, filePath) => console.log('RSUITE_FIXTURE_WATCH_EVENT ' + JSON.stringify({ event, filePath })));
  return watcher;
};\n`
      );
      child = spawn(process.execPath, gulpArgs(root, 'dev'), { cwd: root });
      child.stdout.on('data', data => (diagnostics += data));
      child.stderr.on('data', data => (diagnostics += data));
      exit = new Promise(resolve => child.once('close', resolve));
      await waitFor(
        () => diagnostics.includes('RSUITE_FIXTURE_WATCH_READY'),
        () => diagnostics
      );
      for (const relative of ['test/nested/fixture.ts', 'stories/nested/fixture.tsx']) {
        const ignored = path.join(root, 'src/nested-dir', relative);
        const emitted = path.join(root, 'lib/cjs/nested-dir', relative.replace(/\.tsx?$/, '.js'));
        assert.equal(fs.existsSync(emitted), false);
        fs.writeFileSync(ignored, 'intentionally invalid typescript after watch is ready');
        const event =
          'RSUITE_FIXTURE_WATCH_EVENT ' + JSON.stringify({ event: 'change', filePath: ignored });
        await waitFor(
          () => diagnostics.includes(event) || child.exitCode !== null,
          () => diagnostics
        );
        assert.equal(child.exitCode, null, diagnostics);
        assert.equal(fs.existsSync(emitted), false);
      }
      const source = path.join(root, 'src/nested-dir/value[fixture].ts');
      const output = path.join(root, 'lib/cjs/nested-dir/value[fixture].js');
      fs.writeFileSync(source, "export default 'updated';\n");
      await waitFor(
        () => fs.existsSync(output) && fs.readFileSync(output, 'utf8').includes('updated'),
        () => diagnostics
      );
      assert.ok(fs.readFileSync(output, 'utf8').startsWith("'use client';\n"));
      assert.equal(fs.existsSync(path.join(root, 'cjs')), false);
      assert.equal(fs.existsSync(path.join(temporary, 'cjs')), false);
    } finally {
      if (child && child.exitCode === null) child.kill();
      if (exit) await exit;
      fs.rmSync(temporary, { recursive: true, force: true });
    }
  });
}
