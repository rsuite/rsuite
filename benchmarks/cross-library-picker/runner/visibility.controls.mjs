import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { chromium, firefox } from 'playwright';
import { observeStyles } from './style-observation.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const compiled = await build({
  stdin: {
    contents:
      'export { visible } from "./src/geometry"; export { snapshot } from "./src/measurement";',
    resolveDir: root,
    loader: 'ts'
  },
  bundle: true,
  write: false,
  format: 'iife',
  globalName: 'visibilityControl',
  platform: 'browser',
  define: { 'process.env.NODE_ENV': '"production"' }
});
const firstFive = ['1', '2', '3', '4', '5'];
const controls = [
  { name: 'visible', values: firstFive, popup: true, direct: true },
  { name: 'zero-opacity popup', values: [], popup: false, direct: false },
  { name: 'zero-opacity ancestor', values: [], popup: false, direct: false },
  { name: 'zero-opacity row', values: ['2', '3', '4', '5'], popup: true, direct: false },
  { name: 'partial-opacity popup', values: firstFive, popup: true, direct: true },
  { name: 'partial-opacity ancestor', values: firstFive, popup: true, direct: true },
  { name: 'pointer-events none', values: firstFive, popup: true, direct: true },
  { name: 'display none', values: [], popup: false, direct: false },
  {
    name: 'partially clipped first row',
    values: ['1', '2', '3', '4', '5', '6'],
    popup: true,
    direct: true,
    fully: false
  },
  { name: 'collapsed transparent finished animation', values: [], popup: false, direct: false },
  { name: 'collapsed painted popup retains guard', values: firstFive, popup: true, direct: true }
];
const output = new URL('../results/visibility-controls.json', import.meta.url);
const report = { node: process.version, platform: process.platform, complete: false, cases: [] };
await fs.mkdir(new URL('../results/', import.meta.url), { recursive: true });
const save = () => fs.writeFile(output, JSON.stringify(report, null, 2) + '\n');
for (const [name, launcher] of Object.entries({ chromium, firefox })) {
  const browser = await launcher.launch({ headless: true });
  try {
    for (const control of controls) {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        reducedMotion: 'reduce'
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const row = {
        browser: name,
        version: browser.version(),
        control: control.name,
        passed: false
      };
      report.cases.push(row);
      try {
        const collapsed = control.name.startsWith('collapsed ');
        await page.setContent(
          '<style>body{margin:0}.benchmark-popup{margin:40px;width:240px;height:180px;overflow:auto;display:flex;flex-direction:column}.row{height:36px;flex-shrink:0}.label{display:block;height:100%}</style>' +
            '<div id="root"><input role="combobox" aria-expanded="' +
            !collapsed +
            '"><output data-bench-selected="21">21</output><div class="benchmark-popup">' +
            Array.from(
              { length: 200 },
              (_, index) =>
                '<div class="row" role="option"><span class="label" data-bench-value="' +
                (index + 1) +
                '">Item ' +
                (index + 1) +
                '</span></div>'
            ).join('') +
            '</div></div>'
        );
        await page.addScriptTag({ content: compiled.outputFiles[0].text });
        await page.evaluate(control => {
          const menu = document.querySelector('.benchmark-popup');
          const root = document.querySelector('#root');
          if (control === 'zero-opacity popup') menu.style.opacity = '0';
          if (control === 'zero-opacity ancestor') root.style.opacity = '0';
          if (control === 'zero-opacity row') menu.firstElementChild.style.opacity = '0';
          if (control === 'partial-opacity popup') menu.style.opacity = '.25';
          if (control === 'partial-opacity ancestor') root.style.opacity = '.25';
          if (control === 'pointer-events none') menu.style.pointerEvents = 'none';
          if (control === 'display none') menu.style.display = 'none';
          if (control === 'partially clipped first row') menu.scrollTop = 10;
          if (control === 'collapsed transparent finished animation') {
            menu
              .animate(
                [
                  { opacity: 1, transform: 'scale(1)' },
                  { opacity: 0, transform: 'scale(.8)' }
                ],
                { duration: 200, fill: 'forwards' }
              )
              .finish();
          }
          window.pickerBenchmark = { snapshot: () => visibilityControl.snapshot() };
        }, control.name);
        row.observation = await page.evaluate(() => {
          const menu = document.querySelector('.benchmark-popup');
          return {
            snapshot: window.pickerBenchmark.snapshot(),
            directVisible: visibilityControl.visible(menu.firstElementChild, menu),
            directFullyVisible: visibilityControl.visible(menu.firstElementChild, menu, true),
            opacity: getComputedStyle(menu).opacity,
            ancestorOpacity: getComputedStyle(document.querySelector('#root')).opacity,
            animations: menu.getAnimations().map(animation => ({
              playState: animation.playState,
              currentTime: animation.currentTime
            }))
          };
        });
        if (control.name === 'collapsed transparent finished animation') {
          try {
            const checkpoint = await observeStyles(page);
            row.closedStyleObservation = {
              snapshot: checkpoint.snapshot,
              popup: checkpoint.styles.popup
            };
          } catch (error) {
            row.closedStyleError = String(error);
          }
        }
        assert.equal(row.observation.snapshot.popupVisible, control.popup);
        assert.deepEqual(row.observation.snapshot.visibleValues, control.values);
        assert.equal(row.observation.directVisible, control.direct);
        if ('fully' in control) assert.equal(row.observation.directFullyVisible, control.fully);
        if (control.name === 'collapsed transparent finished animation') {
          assert.deepEqual(row.observation.animations, [
            { playState: 'finished', currentTime: 200 }
          ]);
          assert.equal(row.closedStyleError, undefined);
          assert.equal(row.closedStyleObservation.snapshot.expanded, false);
          assert.equal(row.closedStyleObservation.snapshot.popupVisible, false);
          assert.equal(row.closedStyleObservation.snapshot.selected, '21');
          assert.equal(row.closedStyleObservation.popup, null);
          row.closedStyleCheckpointPassed = true;
        }
        if (control.name === 'collapsed painted popup retains guard') {
          await assert.rejects(
            () => observeStyles(page),
            /Missing representative style node:.*visiblePopup/
          );
          row.originalPaintedPopupGuardRetained = true;
        }
        assert.deepEqual(errors, []);
        row.passed = true;
        console.log('PASS', name, control.name);
      } catch (error) {
        row.error = String(error.stack || error);
        row.pageErrors = errors;
        console.error('FAIL', name, control.name, error.message);
      } finally {
        await context.close();
        await save();
      }
    }
  } finally {
    await browser.close();
  }
}
report.complete = true;
await save();
if (report.cases.some(row => !row.passed)) process.exitCode = 1;
