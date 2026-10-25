import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { chromium, firefox } from 'playwright';

const compiled = await build({
  entryPoints: [fileURLToPath(new URL('../src/geometry.ts', import.meta.url))],
  bundle: true,
  write: false,
  format: 'iife',
  globalName: 'geometryControl',
  platform: 'browser',
  define: { 'process.env.NODE_ENV': '"production"' }
});
const results = [];
const message = 'Expected a uniform, DOM-ordered ordinary list';
for (const [name, launcher] of Object.entries({ chromium, firefox })) {
  const browser = await launcher.launch();
  try {
    for (const control of ['uniform', 'pitch', 'middle', 'order', 'collector failure', 'hidden']) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      try {
        await page.setContent(
          '<style>body{margin:0}.benchmark-popup{margin:40px;width:240px;height:180px;overflow:auto;display:flex;flex-direction:column}.row{height:36px;flex-shrink:0}.label{display:block;height:100%}</style><div class="benchmark-popup"></div>'
        );
        await page.addScriptTag({ content: compiled.outputFiles[0].text });
        const observation = await page.evaluate(control => {
          const menu = document.querySelector('.benchmark-popup');
          menu.innerHTML = Array.from(
            { length: 200 },
            (_, index) =>
              '<div class="row" role="option"><span class="label" data-bench-value="' +
              (index + 1) +
              '">Item ' +
              (index + 1) +
              '</span></div>'
          ).join('');
          const rows = [...menu.querySelectorAll('[data-bench-value]')];
          if (control === 'pitch' || control === 'collector failure') {
            for (const row of menu.children) row.style.marginBottom = '1px';
          }
          if (control === 'middle') menu.children[50].style.height = '42px';
          if (control === 'order') menu.children[100].style.order = '-1';
          if (control === 'hidden') menu.style.display = 'none';
          if (control === 'collector failure')
            menu.getAnimations = () => {
              throw new Error('intentional geometry collector failure');
            };
          try {
            return {
              values: geometryControl.visibleRows(menu, rows).map(row => row.dataset.benchValue)
            };
          } catch (error) {
            return { error: error.message };
          }
        }, control);
        if (control === 'uniform') assert.deepEqual(observation.values, ['1', '2', '3', '4', '5']);
        else if (control === 'hidden') assert.deepEqual(observation.values, []);
        else {
          assert(
            observation.error?.startsWith(message + ': '),
            'Original guard must retain its numeric context'
          );
          const context = JSON.parse(observation.error.slice(message.length + 2));
          if (control === 'collector failure') {
            assert.match(context.contextError, /intentional geometry collector failure/);
          } else {
            assert.equal(context.rowCount, 200);
            assert.equal(context.middleIndex, 100);
            assert.equal(context.expectedRowHeight, 36);
            assert.equal(context.probes.first.height, 36);
            assert.equal(context.probes.last.height, 36);
            assert(context.pitchDeviation > 0.5 || context.middleDeviation > 0.5);
            assert(context.afterGuard.at >= 0 && context.afterGuard.animations.length <= 8);
          }
        }
        assert.deepEqual(pageErrors, []);
        results.push({
          browser: name,
          version: browser.version(),
          control,
          status: 'passed',
          observation
        });
        console.log('PASS', name, control);
      } catch (error) {
        results.push({
          browser: name,
          version: browser.version(),
          control,
          status: 'failed',
          error: String(error.stack || error),
          pageErrors
        });
        console.error('FAIL', name, control, error.message);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}
await fs.mkdir(new URL('../results/', import.meta.url), { recursive: true });
await fs.writeFile(
  new URL('../results/geometry-controls.json', import.meta.url),
  JSON.stringify(results, null, 2) + '\n'
);
if (results.some(result => result.status === 'failed')) process.exitCode = 1;
