import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { cpus, platform, release, arch } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { chromium, firefox } from 'playwright';

const root = fileURLToPath(new URL('../../', import.meta.url));
const require = createRequire(import.meta.url);
const { values } = parseArgs({
  options: {
    before: { type: 'string' },
    after: { type: 'string' },
    browser: { type: 'string', default: 'chromium' },
    size: { type: 'string', default: '50000' },
    warmups: { type: 'string', default: '5' },
    iterations: { type: 'string', default: '30' },
    output: { type: 'string' },
    help: { type: 'boolean', default: false }
  }
});
if (values.help) {
  console.log(
    'node benchmarks/select-picker/compare-opening.mjs --before path/to/.build --after path/to/.build\n' +
      '  [--browser chromium|firefox] [--size 50000] [--warmups 5] [--iterations 30] [--output path.json]\n' +
      'Compare unchanged production fixtures in one browser, one page and one origin, in ABBA order.'
  );
  process.exit(0);
}
const size = Number(values.size);
const warmups = Number(values.warmups);
const iterations = Number(values.iterations);
if (
  !values.before ||
  !values.after ||
  !['chromium', 'firefox'].includes(values.browser) ||
  !Number.isSafeInteger(size) ||
  size < 100 ||
  size > 1000000 ||
  !Number.isSafeInteger(warmups) ||
  warmups < 0 ||
  !Number.isSafeInteger(iterations) ||
  iterations < 1
) {
  throw new Error(
    'Supply both build directories, a supported browser, size 100–1000000, warmups >= 0 and iterations >= 1.'
  );
}

async function bundleHash(directory) {
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
  await visit(directory);
  return hash.digest('hex');
}

const builds = { before: resolve(values.before), after: resolve(values.after) };
const routes = new Map();
const bundleSha256 = {};
for (const [variant, build] of Object.entries(builds)) {
  bundleSha256[variant] = await bundleHash(build);
  routes.set('/' + variant, {
    bytes: await readFile(join(build, 'index.html')),
    type: 'text/html'
  });
  for (const name of await readdir(join(build, 'assets'))) {
    const route = '/assets/' + name;
    const bytes = await readFile(join(build, 'assets', name));
    if (routes.has(route)) {
      assert(
        routes.get(route).bytes.equals(bytes),
        'Shared asset names must contain identical bytes'
      );
    }
    routes.set(route, { bytes, type: name.endsWith('.css') ? 'text/css' : 'text/javascript' });
  }
}

const output = resolve(
  root,
  values.output ?? `benchmarks/select-picker/results/opening-${values.browser}-${Date.now()}.json`
);
const report = {
  completed: false,
  metadata: {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    playwrightVersion: require('playwright/package.json').version,
    os: { platform: platform(), release: release(), arch: arch() },
    cpu: { model: cpus()[0]?.model, cores: cpus().length },
    browser: values.browser,
    viewport: { width: 1280, height: 800 },
    headless: true,
    bundleSha256,
    order: ['before', 'after', 'after', 'before'],
    size,
    warmups,
    iterations,
    percentileMethod: 'nearest-rank'
  },
  visits: [],
  samples: [],
  browserErrors: []
};
const server = createServer((request, response) => {
  const route = routes.get(new URL(request.url, 'http://localhost').pathname);
  if (!route) return response.writeHead(404).end();
  response.writeHead(200, { 'Content-Type': route.type, 'Cache-Control': 'no-store' });
  response.end(route.bytes);
});
let browser;
try {
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const url = 'http://127.0.0.1:' + server.address().port;
  browser = await (values.browser === 'firefox' ? firefox : chromium).launch({ headless: true });
  report.metadata.browserVersion = browser.version();
  const page = await browser.newPage({ viewport: report.metadata.viewport, deviceScaleFactor: 1 });
  page.on('pageerror', error => report.browserErrors.push(error.message));
  let fixtureSettings;
  for (const [visit, variant] of report.metadata.order.entries()) {
    await page.goto(url + '/' + variant + '?size=' + size);
    await page.waitForFunction(() => window.selectPickerBenchmark?.ready);
    const fixture = await page.evaluate(() => window.selectPickerBenchmark.metadata());
    assert(fixture.production && fixture.size === size);
    const settings = [
      'reactVersion',
      'size',
      'listHeight',
      'itemSize',
      'overscanCount',
      'devicePixelRatio'
    ].map(key => fixture[key]);
    if (fixtureSettings)
      assert.deepEqual(settings, fixtureSettings, 'Use matching fixture settings');
    fixtureSettings = settings;
    report.visits.push({ visit, variant, fixture });
    // Exclude the first opening as well as the requested warmups on each new document.
    for (let trial = -warmups - 1; trial < iterations; trial++) {
      await page.evaluate(
        size => window.selectPickerBenchmark.arm({ kind: 'open', count: size }),
        size
      );
      await page.getByRole('combobox').click();
      await page.waitForFunction(() =>
        ['complete', 'failed'].includes(window.selectPickerBenchmark.result().status)
      );
      const measurement = await page.evaluate(() => window.selectPickerBenchmark.result());
      if (measurement.error) throw new Error(measurement.error);
      if (trial >= 0) report.samples.push({ visit, variant, trial, ...measurement.sample });
      await page.getByRole('combobox').click();
      await page.waitForFunction(() => !document.querySelector('[role="listbox"]'));
    }
  }
  assert.equal(report.browserErrors.length, 0);
  report.completed = true;
} catch (error) {
  report.error = error instanceof Error ? error.message : String(error);
  process.exitCode = 1;
} finally {
  const cleanup = await Promise.allSettled([
    browser?.close(),
    new Promise((resolve, reject) => server.close(error => (error ? reject(error) : resolve())))
  ]);
  const errors = cleanup
    .filter(result => result.status === 'rejected')
    .map(result => String(result.reason));
  if (errors.length) {
    report.cleanupErrors = errors;
    report.completed = false;
    process.exitCode = 1;
  }
  const percentile = (samples, key, p) =>
    samples.map(sample => sample[key]).sort((a, b) => a - b)[Math.ceil(samples.length * p) - 1];
  report.summary = ['before', 'after'].map(variant => {
    const samples = report.samples.filter(sample => sample.variant === variant);
    return {
      variant,
      samples: samples.length,
      domReadyP50Ms: percentile(samples, 'domReadyMs', 0.5),
      domReadyP95Ms: percentile(samples, 'domReadyMs', 0.95),
      frameReadyP50Ms: percentile(samples, 'frameReadyMs', 0.5),
      frameReadyP95Ms: percentile(samples, 'frameReadyMs', 0.95)
    };
  });
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(report, null, 2) + '\n');
  console.table(report.summary);
  console.log('Raw opening comparison: ' + output);
  if (report.error) console.error(report.error);
}
