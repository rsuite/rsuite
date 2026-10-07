/* eslint-disable @typescript-eslint/no-require-imports -- This Node-only runner executes isolated published-package consumers. */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { createRequire } = require('node:module');
const esbuild = require('./node_modules/esbuild');

const root = path.resolve(__dirname, '../..');
const lib = path.join(root, 'lib');
const supply = path.join(__dirname, 'node_modules');
const results = path.join(__dirname, 'results');
const entries = ['Form', 'FormControl', 'FormErrorSummary', 'SelectPicker', 'Button'];
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
assert.equal(esbuild.version, '0.25.2');
assert(fs.existsSync(path.join(lib, 'package.json')), 'Run npm run build:ts first');
fs.mkdirSync(results, { recursive: true });
const diagnostics = fs.mkdtempSync(path.join(results, 'run-'));
const temporary = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-public-runtime-')));
console.log('Runtime results: ' + diagnostics);

function link(modules, name, target) {
  const destination = path.join(modules, name);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.symlinkSync(target, destination, process.platform === 'win32' ? 'junction' : 'dir');
}

function dependencyRoot(name, directory) {
  const resolve = createRequire(path.join(directory, 'package.json')).resolve;
  let file;
  try {
    file = resolve(name + '/package.json');
  } catch {
    file = resolve(name);
  }
  let current = path.dirname(file);
  while (true) {
    const metadata = path.join(current, 'package.json');
    if (fs.existsSync(metadata) && JSON.parse(fs.readFileSync(metadata, 'utf8')).name === name)
      return fs.realpathSync(current);
    const parent = path.dirname(current);
    assert.notEqual(parent, current, 'Missing installed dependency metadata: ' + name);
    current = parent;
  }
}

async function main() {
  const published = path.join(temporary, 'published');
  fs.cpSync(lib, published, { recursive: true });
  const metadata = JSON.parse(fs.readFileSync(path.join(published, 'package.json'), 'utf8'));
  const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
  const suppliers = {};
  for (const name of Object.keys(metadata.dependencies)) {
    const directory = fs.realpathSync(path.join(root, 'node_modules', name));
    const pkg = path.join(directory, 'package.json');
    const version = JSON.parse(fs.readFileSync(pkg, 'utf8')).version;
    assert.equal(version, lock.packages['node_modules/' + name].version, name + ' lock mismatch');
    suppliers[name] = { directory, version, packageSHA256: hash(pkg) };
  }
  const moduleInputs = {};
  for (const name of ['', ...entries]) {
    const directory = path.join(published, name);
    const pkg = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));
    const input = path.resolve(directory, pkg.module);
    assert(input.startsWith(published + path.sep) && fs.statSync(input).isFile());
    moduleInputs[name || 'Root'] = input;
  }
  let failures = 0;
  for (const major of [18, 19]) {
    const project = path.join(temporary, 'react' + major);
    const modules = path.join(project, 'node_modules');
    fs.mkdirSync(modules, { recursive: true });
    link(modules, 'rsuite', published);
    const linked = new Map(
      Object.entries(suppliers).map(([name, supplier]) => [name, supplier.directory])
    );
    const peers = {};
    for (const [name, slot] of Object.entries({
      react: 'react' + major,
      'react-dom': 'react' + major + '-dom'
    })) {
      const directory = fs.realpathSync(path.join(supply, slot));
      const pkg = path.join(directory, 'package.json');
      const version = JSON.parse(fs.readFileSync(pkg, 'utf8')).version;
      assert.equal(version, major === 18 ? '18.2.0' : '19.0.0');
      peers[name] = { directory, version, packageSHA256: hash(pkg) };
      linked.set(name, directory);
    }
    // Preserve symlinks keeps React unified, so hoisted transitive dependencies
    // must also be reachable from this consumer's node_modules.
    for (const directory of linked.values()) {
      const pkg = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));
      for (const name of Object.keys(pkg.dependencies || {}))
        if (!linked.has(name)) linked.set(name, dependencyRoot(name, directory));
    }
    for (const [name, directory] of linked) link(modules, name, directory);
    const input = path.join(project, 'esm-entry.mjs');
    fs.writeFileSync(
      input,
      Object.entries(moduleInputs)
        .map(([name, file]) => 'export * as ' + name + ' from ' + JSON.stringify(file) + ';')
        .join('\n')
    );
    const bundle = await esbuild.build({
      absWorkingDir: project,
      entryPoints: [input],
      outfile: path.join(project, 'esm-bundle.cjs'),
      bundle: true,
      platform: 'node',
      format: 'cjs',
      packages: 'external',
      metafile: true,
      logLevel: 'warning'
    });
    for (const name of Object.keys(bundle.metafile.inputs)) {
      const file = path.resolve(project, name);
      assert(
        file === input || file.startsWith(path.join(published, 'esm') + path.sep),
        'Unexpected ESM input: ' + name
      );
    }
    for (const output of Object.values(bundle.metafile.outputs)) {
      for (const item of output.imports) {
        assert(item.external, 'Dependency must remain external: ' + item.path);
        assert(
          ['react', 'react-dom', ...Object.keys(suppliers)].some(
            name => item.path === name || item.path.startsWith(name + '/')
          ),
          'Unknown peer or dependency: ' + item.path
        );
      }
    }
    const consumer = path.join(project, 'consumer.js');
    fs.copyFileSync(path.join(__dirname, 'consumer.js'), consumer);
    const run = spawnSync(
      process.execPath,
      ['--preserve-symlinks', '--preserve-symlinks-main', consumer, String(major)],
      {
        cwd: project,
        encoding: 'utf8',
        timeout: 30000,
        maxBuffer: 4 * 1024 * 1024
      }
    );
    const row = {
      major,
      node: process.version,
      esbuild: esbuild.version,
      moduleInputs,
      suppliers,
      peers,
      linkedDependencyRoots: Object.fromEntries(linked),
      fixtureLockSHA256: hash(path.join(__dirname, 'package-lock.json')),
      rootLockSHA256: hash(path.join(root, 'package-lock.json')),
      consumerSHA256: hash(consumer),
      copiedPackageSHA256: hash(path.join(published, 'package.json')),
      metafile: bundle.metafile,
      exitCode: run.status,
      signal: run.signal,
      error: run.error?.message,
      stdout: run.stdout,
      stderr: run.stderr,
      scope:
        'Natural CJS package entries and bundled actual package.module entries; external dependencies, DOM-free SSR. No native Node ESM, RSC, hydration, or UMD coverage.'
    };
    fs.writeFileSync(
      path.join(diagnostics, 'react' + major + '.json'),
      JSON.stringify(row, null, 2) + '\n'
    );
    if (run.stdout) process.stdout.write(run.stdout);
    if (run.stderr) process.stderr.write(run.stderr);
    console.log('react' + major + ': ' + (run.status === 0 && !run.error ? 'PASS' : 'FAIL'));
    if (run.status !== 0 || run.error) failures++;
  }
  process.exitCode = failures ? 1 : 0;
}

main()
  .catch(error => {
    fs.writeFileSync(path.join(diagnostics, 'runner-error.txt'), error.stack + '\n');
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    fs.rmSync(temporary, { recursive: true, force: true });
  });
