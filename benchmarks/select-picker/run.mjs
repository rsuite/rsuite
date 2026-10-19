import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { cpus, platform, release, arch, homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { build, preview } from 'vite';
import { chromium, firefox } from 'playwright';

const root = fileURLToPath(new URL('../../', import.meta.url));
const directory = fileURLToPath(new URL('.', import.meta.url));
const require = createRequire(import.meta.url);
const errorMessage = error =>
  (error instanceof Error ? error.message : String(error))
    .replaceAll(root, '<repository>/')
    .replaceAll(homedir(), '<home>');
const { values } = parseArgs({
  options: {
    browser: { type: 'string', default: 'chromium' },
    sizes: { type: 'string', default: '1000,10000,50000' },
    warmups: { type: 'string', default: '5' },
    iterations: { type: 'string', default: '30' },
    output: { type: 'string' },
    'skip-build': { type: 'boolean', default: false },
    help: { type: 'boolean', default: false }
  }
});
if (values.help) {
  console.log(
    'npm run bench:select-picker -- [--browser chromium|firefox] [--sizes 1000,10000,50000]\n' +
      '  [--warmups 5] [--iterations 30] [--output path.json] [--skip-build]\n' +
      'Runs a production-built fixture; timing has no pass/fail threshold.'
  );
  process.exit(0);
}
const sizes = values.sizes.split(',').map(Number);
const warmups = Number(values.warmups);
const iterations = Number(values.iterations);
if (
  !['chromium', 'firefox'].includes(values.browser) ||
  !sizes.length ||
  sizes.some(size => !Number.isSafeInteger(size) || size < 100 || size > 1000000) ||
  new Set(sizes).size !== sizes.length ||
  !Number.isSafeInteger(warmups) ||
  warmups < 0 ||
  !Number.isSafeInteger(iterations) ||
  iterations < 1
) {
  throw new Error(
    'Invalid arguments: sizes must be unique integers in [100,1000000], warmups >= 0, iterations >= 1'
  );
}

async function bundleHash(path) {
  const hash = createHash('sha256');
  async function visit(path, relative = '') {
    const entries = (await readdir(path, { withFileTypes: true })).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    for (const entry of entries) {
      const name = relative + '/' + entry.name;
      if (entry.isDirectory()) await visit(join(path, entry.name), name);
      else {
        hash.update(name);
        hash.update(await readFile(join(path, entry.name)));
      }
    }
  }
  await visit(path);
  return hash.digest('hex');
}

// Nearest-rank percentiles are also used for mounted row counts.
function percentile(samples, key, fraction) {
  const sorted = samples.map(sample => sample[key]).sort((a, b) => a - b);
  return sorted[Math.ceil(sorted.length * fraction) - 1];
}

async function measure(page, condition, action) {
  await page.evaluate(condition => window.selectPickerBenchmark.arm(condition), condition);
  await action();
  await page.waitForFunction(() =>
    ['complete', 'failed'].includes(window.selectPickerBenchmark.result().status)
  );
  const result = await page.evaluate(() => window.selectPickerBenchmark.result());
  if (result.error) throw new Error(JSON.stringify(condition) + ': ' + result.error);
  return result.sample;
}

async function open(page) {
  await page.getByRole('combobox').click();
  await page.waitForFunction(() => window.selectPickerBenchmark.snapshot().mountedRows > 0);
}

async function close(page) {
  if ((await page.getByRole('combobox').getAttribute('aria-expanded')) === 'true') {
    await page.getByRole('combobox').click();
  }
  await page.waitForFunction(() => !document.querySelector('[role="listbox"]'));
}

async function scenarios(page, size, report) {
  const record = (scenario, trial, sample, details = {}) => {
    report.samples.push({ size, scenario, trial, ...details, ...sample });
  };
  const opening = () =>
    measure(page, { kind: 'open', count: size }, () => page.getByRole('combobox').click());

  record('first-open', 0, await opening());
  await close(page);
  for (let trial = -warmups; trial < iterations; trial++) {
    const sample = await opening();
    if (trial >= 0) record('open', trial, sample);
    await close(page);
  }

  await open(page);
  for (const filter of [
    { query: 'Item', count: size, firstValue: 1 },
    { query: 'match', count: Math.floor(size / 100), firstValue: 100 },
    { query: 'no-such-option', count: 0, firstValue: null }
  ]) {
    for (let trial = -warmups; trial < iterations; trial++) {
      await page.getByRole('searchbox').fill('');
      await page.waitForFunction(
        size =>
          window.selectPickerBenchmark.snapshot().logicalRows === size &&
          !document.querySelector('.rs-highlight-mark'),
        size
      );
      await page.getByRole('searchbox').focus();
      const sample = await measure(page, { kind: 'filter', ...filter }, () =>
        page.keyboard.insertText(filter.query)
      );
      if (trial >= 0) record('filter', trial, sample, filter);
    }
  }
  await close(page);

  for (let trial = -warmups; trial < iterations; trial++) {
    await open(page);
    // One initial focus. Subsequent keyboard events follow native option focus.
    await page.getByRole('combobox').focus();
    for (let value = 1; value <= 20; value++) {
      const sample = await measure(page, { kind: 'key', value }, () =>
        page.keyboard.press('ArrowDown')
      );
      if (trial >= 0) record('arrow-down', trial, sample, { keyIndex: value });
    }
    await page.keyboard.press('Enter');
    await page.waitForFunction(
      () =>
        window.selectPickerBenchmark.selectedValue() === 20 &&
        document.activeElement?.getAttribute('role') === 'combobox'
    );
    await close(page);
    await page.locator('.rs-picker-clean').click();
    await page.waitForFunction(() => window.selectPickerBenchmark.selectedValue() === null);
  }
}

const configFile = join(directory, 'vite.config.mjs');
const output = resolve(
  root,
  values.output ??
    join(directory, 'results', new Date().toISOString().replaceAll(':', '-') + '.json')
);
const report = {
  schemaVersion: 1,
  completed: false,
  metadata: {
    timestamp: new Date().toISOString(),
    commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
    dirty: !!execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim(),
    rsuiteVersion: require('../../package.json').version,
    nodeVersion: process.version,
    viteVersion: require('vite/package.json').version,
    playwrightVersion: require('playwright/package.json').version,
    os: { platform: platform(), release: release(), arch: arch() },
    cpu: { model: cpus()[0]?.model, cores: cpus().length },
    browser: values.browser,
    viewport: { width: 1280, height: 800 },
    headless: true,
    skipBuild: values['skip-build'],
    sizes,
    warmups,
    iterations,
    keyboardKeysPerTrial: 20,
    percentileMethod: 'nearest-rank'
  },
  fixtures: [],
  samples: [],
  browserErrors: []
};
let server;
let browser;
try {
  if (!values['skip-build']) {
    for (const script of ['build:ts', 'build:scss']) {
      execFileSync('npm', ['run', script], {
        cwd: root,
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' }
      });
    }
    await build({ configFile });
  }
  report.metadata.bundleSha256 = await bundleHash(join(directory, '.build'));
  server = await preview({ configFile });
  const address = server.httpServer.address();
  const url = 'http://127.0.0.1:' + address.port;
  browser = await (values.browser === 'firefox' ? firefox : chromium).launch({ headless: true });
  report.metadata.browserVersion = browser.version();

  for (const size of sizes) {
    const page = await browser.newPage({
      viewport: report.metadata.viewport,
      deviceScaleFactor: 1
    });
    const errors = [];
    page.on('pageerror', error => {
      const message = errorMessage(error);
      errors.push(message);
      report.browserErrors.push({ size, message });
    });
    try {
      await page.goto(url + '/?size=' + size);
      await page.waitForFunction(() => window.selectPickerBenchmark?.ready);
      const fixture = await page.evaluate(() => window.selectPickerBenchmark.metadata());
      if (!fixture.production) throw new Error('The benchmark must use a production build');
      report.fixtures.push(fixture);
      await scenarios(page, size, report);
      if (errors.length) throw new Error('Browser errors: ' + errors.join('; '));
    } finally {
      await page.close();
    }
  }
  report.completed = true;
} catch (error) {
  report.error = errorMessage(error);
  process.exitCode = 1;
} finally {
  const cleanup = await Promise.allSettled([
    browser?.close(),
    server
      ? new Promise((resolve, reject) =>
          server.httpServer.close(error => (error ? reject(error) : resolve()))
        )
      : undefined
  ]);
  const cleanupErrors = cleanup
    .filter(result => result.status === 'rejected')
    .map(result => errorMessage(result.reason));
  if (cleanupErrors.length) {
    report.cleanupErrors = cleanupErrors;
    report.completed = false;
    process.exitCode = 1;
  }
  const groups = new Map();
  for (const sample of report.samples) {
    const key = [sample.size, sample.scenario, sample.query ?? ''].join('/');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(sample);
  }
  report.summary = Array.from(groups, ([scenario, samples]) => ({
    scenario,
    samples: samples.length,
    domReadyP50Ms: percentile(samples, 'domReadyMs', 0.5),
    domReadyP95Ms: percentile(samples, 'domReadyMs', 0.95),
    frameReadyP50Ms: percentile(samples, 'frameReadyMs', 0.5),
    frameReadyP95Ms: percentile(samples, 'frameReadyMs', 0.95),
    mountedRowsP50: percentile(samples, 'mountedRows', 0.5),
    mountedRowsP95: percentile(samples, 'mountedRows', 0.95),
    mountedRowsMax: Math.max(...samples.map(sample => sample.mountedRows))
  }));
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(report, null, 2) + '\n');
  console.table(report.summary);
  console.log('Raw results: ' + output);
  if (report.error) console.error(report.error);
}
