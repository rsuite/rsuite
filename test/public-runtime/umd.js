/* eslint-disable @typescript-eslint/no-require-imports -- This Node runner loads actual UMD artifacts in isolated browsers. */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const esbuild = require('./node_modules/esbuild');
const playwright = require('playwright');

const root = path.resolve(__dirname, '../..');
const results = path.join(__dirname, 'results');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const browsers = (process.env.RSUITE_UMD_BROWSERS || 'chromium,firefox').split(',');
assert(browsers.length && browsers.every(name => ['chromium', 'firefox', 'webkit'].includes(name)));
assert.equal(new Set(browsers).size, browsers.length, 'Browser names must be unique');
assert.equal(esbuild.version, '0.25.2');
const artifacts = ['rsuite.js', 'rsuite.min.js'].map(name => {
  const file = path.join(root, 'lib/dist', name);
  assert(fs.statSync(file).isFile(), 'Run npm run dist first');
  return { name, file, sha256: hash(file) };
});
fs.mkdirSync(results, { recursive: true });
const diagnostics = fs.mkdtempSync(path.join(results, 'umd-'));
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-umd-runtime-'));
const consumer = path.join(__dirname, 'umd-consumer.js');
const report = {
  node: process.version,
  playwright: require('playwright/package.json').version,
  esbuild: esbuild.version,
  rootLockSHA256: hash(path.join(root, 'package-lock.json')),
  fixtureLockSHA256: hash(path.join(__dirname, 'package-lock.json')),
  consumerSHA256: hash(consumer),
  artifacts,
  peers: [],
  runs: [],
  errors: []
};
const save = () =>
  fs.writeFileSync(path.join(diagnostics, 'results.json'), JSON.stringify(report, null, 2) + '\n');
console.log('UMD runtime results: ' + diagnostics);

async function buildPeers(major) {
  const react = path.dirname(require.resolve('react' + major + '/package.json'));
  const reactDOM = path.dirname(require.resolve('react' + major + '-dom/package.json'));
  const expected = major === 18 ? '18.2.0' : '19.0.0';
  for (const directory of [react, reactDOM]) {
    assert.equal(
      JSON.parse(fs.readFileSync(path.join(directory, 'package.json'))).version,
      expected
    );
  }
  const file = path.join(temporary, 'react' + major + '.js');
  const bundle = await esbuild.build({
    absWorkingDir: root,
    stdin: {
      contents: `import * as React from 'react';
        import * as ReactDOM from 'react-dom';
        import * as Client from 'react-dom/client';
        globalThis.React = React;
        globalThis.ReactDOM = { ...ReactDOM, ...Client };`,
      resolveDir: root
    },
    alias: { react, 'react-dom': reactDOM },
    bundle: true,
    platform: 'browser',
    format: 'iife',
    define: { 'process.env.NODE_ENV': '"development"' },
    outfile: file,
    metafile: true,
    logLevel: 'warning'
  });
  assert(!Object.keys(bundle.metafile.inputs).some(input => input.startsWith('src/')));
  report.peers.push({
    major,
    expected,
    react,
    reactDOM,
    sha256: hash(file),
    metafile: bundle.metafile
  });
  return { major, expected, file };
}

async function runPage(browser, name, peers, artifact) {
  const page = await browser.newPage();
  page.setDefaultTimeout(5000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const row = {
    browser: name,
    browserVersion: browser.version(),
    react: peers.expected,
    artifact: artifact.name,
    cases: [],
    errors
  };
  report.runs.push(row);
  try {
    await page.goto('about:blank');
    // Only the React bridge is bundled by esbuild. Load RSuite's exact UMD output unchanged.
    await page.addScriptTag({ path: peers.file });
    await page.addScriptTag({ path: artifact.file });
    await page.addScriptTag({ path: consumer });
    assert.deepEqual(await page.evaluate(() => [window.React.version, window.ReactDOM.version]), [
      peers.expected,
      peers.expected
    ]);
    const cases = await page.evaluate(() => window.rsuiteUMDConsumer.cases);
    assert.deepEqual(cases, [
      'nested-array',
      'symbol-metadata',
      'date',
      'map',
      'set',
      'typed-array'
    ]);
    for (const contract of cases) {
      try {
        await page.evaluate(value => window.rsuiteUMDConsumer.render(value), contract);
        const input = page.getByRole('textbox', { name: 'Value' });
        assert.equal(await input.inputValue(), 'Original');
        await input.fill('Edited');
        await page.waitForFunction(() => window.rsuiteUMDConsumer.changed());
        const result = await page.evaluate(() => window.rsuiteUMDConsumer.verify());
        assert.equal(result.passed, true);
        row.cases.push(result);
      } catch (error) {
        row.cases.push({ name: contract, passed: false, error: error.stack });
        console.error(
          `${name} React ${peers.expected} ${artifact.name} ${contract}: ${error.message}`
        );
        await page
          .screenshot({
            path: path.join(
              diagnostics,
              `${name}-react${peers.major}-${artifact.name}-${contract}.png`
            )
          })
          .catch(() => {});
      }
      save();
    }
  } catch (error) {
    row.error = error.stack;
    console.error(`${name} React ${peers.expected} ${artifact.name}: ${error.message}`);
  } finally {
    await page.close();
    save();
  }
  const passed =
    !row.error && !errors.length && row.cases.length === 6 && row.cases.every(item => item.passed);
  console.log(`${name} React ${peers.expected} ${artifact.name}: ${passed ? 'PASS' : 'FAIL'}`);
  return passed;
}

async function main() {
  const peers = [];
  for (const major of [18, 19]) peers.push(await buildPeers(major));
  let failures = 0;
  for (const name of browsers) {
    const browser = await playwright[name].launch({ headless: true });
    try {
      for (const peer of peers) {
        for (const artifact of artifacts) {
          if (!(await runPage(browser, name, peer, artifact))) failures++;
        }
      }
    } finally {
      await browser.close();
    }
  }
  process.exitCode = failures ? 1 : 0;
}

main()
  .catch(error => {
    report.errors.push(error.stack);
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    save();
    fs.rmSync(temporary, { recursive: true, force: true });
  });
