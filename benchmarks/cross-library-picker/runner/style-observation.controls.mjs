import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox } from 'playwright';
import { observeStyles } from './style-observation.mjs';

const root = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const output = path.join(root, 'results/style-observation-controls.json');
fs.mkdirSync(path.dirname(output), { recursive: true });
const report = { node: process.version, platform: process.platform, complete: false, cases: [] };
const save = () => fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
const prefix = 'Missing representative style node: ';
const snapshot = {
  expanded: true,
  popupVisible: true,
  mountedRows: 1,
  visibleValues: ['1'],
  fullyVisibleValues: ['1'],
  rowHeights: [36],
  firstVisible: '1',
  activeValue: '1',
  activeReferenceConnected: true,
  emptyVisible: false,
  selected: null
};
const input = '<input role="combobox" aria-expanded="true">';
const popup = value =>
  `<div class="benchmark-popup" style="width:120px;height:60px"><div role="option"><span data-bench-value="${value}">Item ${value}</span></div></div>`;
const controls = [
  { name: 'missing combobox', html: popup('1'), snapshot, missing: ['combobox'] },
  {
    name: 'visible popup with collapsed snapshot',
    html: input + popup('1'),
    snapshot: {
      ...snapshot,
      expanded: false,
      firstVisible: null,
      activeValue: null,
      selected: '21'
    },
    missing: ['visiblePopup']
  },
  {
    name: 'missing first visible label',
    html: input + popup('2'),
    snapshot,
    missing: ['firstVisibleLabel']
  },
  {
    name: 'context collector failure retains primary guard',
    html: input + popup('2'),
    snapshot,
    missing: ['firstVisibleLabel'],
    contextFailure: true
  },
  { name: 'complete representative nodes', html: input + popup('1'), snapshot, missing: [] }
];
save();
try {
  for (const [name, engine] of Object.entries({ chromium, firefox })) {
    const browser = await engine.launch({ headless: true });
    try {
      for (const control of controls) {
        const context = await browser.newContext({
          viewport: { width: 1280, height: 800 },
          reducedMotion: 'reduce'
        });
        const page = await context.newPage();
        const record = {
          browser: name,
          browserVersion: browser.version(),
          name: control.name,
          status: 'running'
        };
        report.cases.push(record);
        save();
        try {
          await page.setContent('<div id="root">' + control.html + '</div>');
          await page.evaluate(value => {
            window.pickerBenchmark = { snapshot: () => value };
          }, control.snapshot);
          if (control.contextFailure) {
            await page.evaluate(() => {
              const original = document.getAnimations.bind(document);
              let calls = 0;
              document.getAnimations = () => {
                if (++calls === 2) throw new Error('Controlled diagnostic collector failure');
                return original();
              };
            });
          }
          if (control.missing.length) {
            let original;
            try {
              await observeStyles(page);
            } catch (error) {
              original = error;
            }
            assert(original, 'Missing representative nodes must remain a failure');
            record.originalError = String(original);
            const line = original.message.split('\n').find(value => value.includes(prefix));
            assert(line, 'The original style failure must retain its atomic context');
            const details = JSON.parse(line.slice(line.indexOf(prefix) + prefix.length));
            assert.deepEqual(details.missing, control.missing);
            if (control.contextFailure) {
              assert.deepEqual(Object.keys(details).sort(), ['contextError', 'missing']);
              assert.equal(details.contextError, 'Error: Controlled diagnostic collector failure');
              record.collectorFailurePreserved = true;
            } else {
              assert.deepEqual(details.snapshot, control.snapshot);
              assert.equal(details.popupCandidates.length, 1);
              assert.equal(details.popupCandidates[0].rect.width, 120);
              assert.equal(details.popupCandidates[0].rect.height, 60);
              assert.equal(details.popupCandidates[0].style.display, 'block');
              assert(Array.isArray(details.animations));
              assert.equal(typeof details.document.hasFocus, 'boolean');
              assert.equal(typeof details.timestampMs, 'number');
              if (control.name === 'visible popup with collapsed snapshot') {
                assert.equal(details.nodes.popup, null);
                assert.equal(details.popupCandidates[0].selected, false);
                assert.equal(details.popupCandidates[0].style.opacity, '1');
              }
              if (control.name === 'missing first visible label') {
                assert.equal(details.nodes.firstVisibleLabel, null);
                assert.deepEqual(details.popupCandidates[0].values, ['2']);
              }
            }
            record.atomicContext = details;
            record.expectedFailureRetained = true;
          } else {
            const value = await observeStyles(page);
            assert.deepEqual(value.snapshot, snapshot);
            assert.equal(value.subjects.firstVisibleLabel.directText, 'Item 1');
            assert(value.styles.combobox && value.styles.popup && value.styles.firstVisibleLabel);
            record.representativeNodesPresent = true;
          }
          record.status = 'passed';
        } catch (error) {
          record.status = 'failed';
          record.error = String(error.stack || error);
          throw error;
        } finally {
          await context.close();
          save();
        }
      }
    } finally {
      await browser.close();
    }
  }
  report.complete = true;
  console.log('Style observation controls:', report.cases.length, 'passed');
} finally {
  save();
}
