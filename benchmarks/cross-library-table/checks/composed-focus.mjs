import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const fixture = path.resolve(import.meta.dirname, '..'),
  root = path.resolve(process.argv[2] ?? path.join(fixture, 'results', 'composed-focus'));
assert(process.argv.length <= 3);
fs.mkdirSync(root, { recursive: true });
const { chromium, firefox } = createRequire(fixture + '/package.json')('playwright'),
  { virtualActivate } = await import(pathToFileURL(fixture + '/runner/virtual-input.mjs')),
  { artifactGuard, assertBuildState } = await import(
    pathToFileURL(fixture + '/runner/build-state.mjs')
  ),
  built = JSON.parse(fs.readFileSync(fixture + '/dist/build-inputs.json')),
  guard = artifactGuard(fixture, built);
assertBuildState(fixture, built);
const report = {
  scope:
    'Native Arrow/Home/End probe for application-owned Antd/Chakra roving checkbox focus; not a cross-library performance/ranking result',
  cases: [],
  built
};
const server = http.createServer((req, res) => {
  try {
    const file = path.resolve(fixture, 'dist', '.' + new URL(req.url, 'http://localhost').pathname);
    assert(file.startsWith(fixture + '/dist/'));
    const bytes = fs.readFileSync(file);
    guard.check(file, bytes);
    res.setHeader(
      'Content-Type',
      file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : 'text/html'
    );
    res.end(bytes);
  } catch {
    res.statusCode = 404;
    res.end();
  }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
try {
  for (const [engineName, engine] of Object.entries({ chromium, firefox })) {
    const browser = await engine.launch();
    try {
      for (const library of ['antd', 'chakra']) {
        const context = await browser.newContext({ viewport: { width: 1280, height: 900 } }),
          page = await context.newPage();
        page.setDefaultTimeout(10000);
        const row = {
          browser: engineName,
          version: browser.version(),
          library,
          steps: [],
          errors: []
        };
        report.cases.push(row);
        page.on('pageerror', e => row.errors.push(String(e)));
        try {
          await page.addInitScript(() => {
            window.__focusKeys = [];
            document.addEventListener(
              'keydown',
              e => window.__focusKeys.push({ key: e.key, trusted: e.isTrusted }),
              true
            );
          });
          await page.goto(
            'http://127.0.0.1:' + server.address().port + '/' + library + '/virtual.html'
          );
          await page.waitForSelector('[data-row-id]');
          await virtualActivate(
            page,
            page.getByRole('button', { name: 'Jump row 9000', exact: true }),
            'keyboard',
            'toolbar'
          );
          const input = page.locator('[data-virtual-row-id="entry-09000"]').getByRole('checkbox');
          await virtualActivate(page, input, 'keyboard', 'selection', 'entry-09000');
          await page.waitForFunction(
            () => document.querySelector('output').textContent === '["entry-09000"]'
          );
          for (const [key, id] of [
            ['ArrowDown', 'entry-09001'],
            ['ArrowUp', 'entry-09000'],
            ['Home', 'entry-00000'],
            ['End', 'entry-09999'],
            ['ArrowUp', 'entry-09998']
          ]) {
            await page.keyboard.press(key);
            await page.waitForFunction(
              id =>
                document.activeElement?.closest('[data-virtual-row-id]')?.dataset.virtualRowId ===
                id,
              id
            );
            assert.equal(await page.locator('output').textContent(), '["entry-09000"]');
            row.steps.push({ key, id });
          }
          row.events = await page.evaluate(() => window.__focusKeys);
          assert(row.events.length && row.events.every(e => e.trusted));
          for (const key of ['ArrowUp', 'ArrowDown', 'Home', 'End'])
            assert(row.events.some(e => e.key === key));
          assert.deepEqual(row.errors, []);
          row.passed = true;
        } catch (error) {
          row.passed = false;
          row.error = String(error);
          row.focus = await page.evaluate(() => document.activeElement?.outerHTML);
          fs.writeFileSync(
            root + '/focus-' + engineName + '-' + library + '-failure.html',
            await page.content()
          );
        } finally {
          await context.close();
        }
        console.log(engineName, library, row.passed ? 'PASS' : row.error);
      }
    } finally {
      await browser.close();
    }
  }
  assertBuildState(fixture, built);
  assert.deepEqual(guard.violations, []);
} finally {
  await new Promise(r => server.close(r));
  fs.writeFileSync(root + '/composed-focus-probe.json', JSON.stringify(report, null, 2) + '\n');
}
if (report.cases.some(c => !c.passed)) process.exitCode = 1;
