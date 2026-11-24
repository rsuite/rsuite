import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const fixture = path.resolve(import.meta.dirname, '..');
assert(process.argv.length <= 3);
const output = path.resolve(process.argv[2] ?? path.join(fixture, 'results/virtual-pointer'));
assert(!fs.existsSync(output), 'Output must be new; retain prior control evidence');
fs.mkdirSync(output, { recursive: true });
const { chromium, firefox } = createRequire(fixture + '/package.json')('playwright');
const { virtualActivate } = await import(pathToFileURL(fixture + '/runner/virtual-input.mjs'));
const { createCapture } = await import(pathToFileURL(fixture + '/runner/capture.mjs'));
const { artifactGuard, assertBuildState } = await import(
  pathToFileURL(fixture + '/runner/build-state.mjs')
);
const built = JSON.parse(fs.readFileSync(fixture + '/dist/build-inputs.json'));
assertBuildState(fixture, built);
const guard = artifactGuard(fixture, built);
const report = {
  scope:
    'Native pointer activation of an already visible virtual row must not scroll that row before pointerdown. Two actual HeroUI production cases plus covered, clipped, disabled and wrong-row rejection controls in both browsers; no performance/ranking result.',
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
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
try {
  async function rejectUnsafeTargets(browser, name) {
    for (const scenario of ['covered', 'clipped', 'disabled', 'wrong-row']) {
      const context = await browser.newContext({ viewport: { width: 500, height: 300 } });
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      const row = { browser: name, version: browser.version(), control: scenario };
      report.cases.push(row);
      try {
        await page.setContent(`
          <div data-virtual-viewport style="position:relative;width:200px;height:60px;overflow:hidden">
            <div role="row" style="position:absolute;top:${scenario === 'clipped' ? 120 : 8}px">
              <label><input type="checkbox" ${scenario === 'disabled' ? 'disabled' : ''}>
                <span data-row-id="${scenario === 'wrong-row' ? 'entry-09001' : 'entry-09000'}">Record</span>
              </label>
            </div>
            ${scenario === 'covered' ? '<div style="position:absolute;inset:0;z-index:1;background:white"></div>' : ''}
          </div>`);
        await page.evaluate(() => {
          window.__nativeEvents = [];
          for (const type of ['pointerdown', 'pointerup', 'click'])
            document.addEventListener(
              type,
              event => window.__nativeEvents.push({ type, trusted: event.isTrusted }),
              true
            );
        });
        await assert.rejects(
          virtualActivate(page, page.locator('input'), 'pointer', 'selection', 'entry-09000'),
          /Virtual selection checkbox is disabled|Visible virtual selection label is not a native hit target/
        );
        row.events = await page.evaluate(() => window.__nativeEvents);
        assert.deepEqual(row.events, [], 'Rejected target must receive no pointer input');
        row.passed = true;
      } catch (error) {
        row.passed = false;
        row.error = String(error);
      } finally {
        await context.close();
      }
      console.log(
        JSON.stringify({ browser: name, control: scenario, passed: row.passed, error: row.error })
      );
    }
  }
  for (const [name, engine] of Object.entries({ chromium, firefox })) {
    const browser = await engine.launch();
    try {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
        reducedMotion: 'reduce'
      });
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      const row = { browser: name, version: browser.version(), library: 'heroui', errors: [] };
      const capture = createCapture(page, 'virtual');
      report.cases.push(row);
      page.on('pageerror', error => row.errors.push(String(error)));
      try {
        await page.addInitScript(() => {
          window.__nativeEvents = [];
          for (const type of ['pointerdown', 'pointerup', 'click'])
            document.addEventListener(
              type,
              event => {
                window.__nativeEvents.push({
                  type,
                  trusted: event.isTrusted,
                  rowId: event.target
                    .closest?.('[data-virtual-row-id],tr,[role="row"]')
                    ?.querySelector('[data-row-id]')?.dataset.rowId,
                  scrollTop: document.querySelector('[data-virtual-viewport]')?.scrollTop
                });
              },
              true
            );
        });
        await page.goto('http://127.0.0.1:' + server.address().port + '/heroui/virtual.html');
        await page.waitForSelector('[data-row-id]');
        await virtualActivate(
          page,
          page.getByRole('button', { name: 'Jump row 9000', exact: true }),
          'pointer',
          'toolbar'
        );
        const deadline = Date.now() + 10000;
        do {
          row.before = await capture();
          if (row.before.virtual.rows.some(item => item.id === 'entry-09000' && item.visible))
            break;
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
        } while (Date.now() < deadline);
        assert(row.before.virtual.rows.some(item => item.id === 'entry-09000' && item.visible));
        row.scrollBefore = await page.evaluate(
          () => document.querySelector('[data-virtual-viewport]').scrollTop
        );
        const checkbox = page
          .locator('tr,[role="row"],[data-virtual-row-id]')
          .filter({ has: page.locator('[data-row-id="entry-09000"]') })
          .getByRole('checkbox');
        await virtualActivate(page, checkbox, 'pointer', 'selection', 'entry-09000');
        await page.waitForFunction(
          () => document.querySelector('output').textContent === '["entry-09000"]'
        );
        row.events = await page.evaluate(() => window.__nativeEvents);
        row.after = await capture();
        const down = row.events.find(
          event => event.type === 'pointerdown' && event.rowId === 'entry-09000'
        );
        assert(down?.trusted, 'The actual row must receive native pointerdown');
        assert.equal(
          down.scrollTop,
          row.scrollBefore,
          'Driver scrolled the already visible virtual row before pointerdown'
        );
        for (const type of ['pointerdown', 'pointerup', 'click'])
          assert(
            row.events.some(
              event => event.type === type && event.trusted && event.rowId === 'entry-09000'
            )
          );
        assert.deepEqual(JSON.parse(row.after.selected), ['entry-09000']);
        assert.equal(await checkbox.isChecked(), true);
        assert(row.after.virtual.rows.some(item => item.id === 'entry-09000' && item.visible));
        assert.deepEqual(row.errors, []);
        row.passed = true;
      } catch (error) {
        row.passed = false;
        row.error = String(error);
        row.events ??= await page.evaluate(() => window.__nativeEvents).catch(() => []);
        row.after ??= await capture().catch(() => null);
      } finally {
        await context.close();
      }
      console.log(
        JSON.stringify({
          browser: name,
          passed: row.passed,
          scrollBefore: row.scrollBefore,
          error: row.error
        })
      );
      await rejectUnsafeTargets(browser, name);
    } finally {
      await browser.close();
    }
  }
  assertBuildState(fixture, built);
  assert.deepEqual(guard.violations, []);
  report.responsesChecked = guard.checked;
} finally {
  await new Promise(resolve => server.close(resolve));
  fs.writeFileSync(output + '/virtual-pointer.json', JSON.stringify(report, null, 2) + '\n');
}
if (report.cases.some(row => !row.passed)) process.exitCode = 1;
