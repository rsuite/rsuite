import assert from 'node:assert/strict';
import { chromium, firefox } from 'playwright';
import { snapshot } from '../runner/snapshot.mjs';
import { virtualSnapshot } from '../runner/virtual-snapshot.mjs';
import { createCapture } from '../runner/capture.mjs';
const results = [];
for (const [name, engine] of Object.entries({ chromium, firefox })) {
  const browser = await engine.launch();
  try {
    const run = async atomic => {
      const context = await browser.newContext(),
        page = await context.newPage();
      try {
        await page.setContent(
          '<output>[]</output><section aria-label="Virtual ledger" style="width:400px;height:200px"><div role="row"><span data-row-id="entry-00000">First</span></div><div role="row"><span data-row-id="entry-00001">Second</span></div></section>'
        );
        await page.evaluate(() => {
          const original = Document.prototype.querySelectorAll;
          let armed = true;
          document.querySelectorAll = function (selector) {
            const value = original.call(this, selector);
            if (selector === '[data-row-id]' && armed) {
              armed = false;
              queueMicrotask(() => {
                const section = document.querySelector('section');
                section.appendChild(section.firstElementChild);
              });
            }
            return value;
          };
        });
        const state = atomic
          ? await createCapture(page, 'virtual')()
          : { ...(await page.evaluate(snapshot)), ...(await page.evaluate(virtualSnapshot)) };
        const current = await page.evaluate(() =>
          [...document.querySelectorAll('[data-row-id]')].map(n => n.dataset.rowId)
        );
        assert.deepEqual(current, ['entry-00001', 'entry-00000']);
        if (atomic)
          assert.deepEqual(
            state.ids,
            state.virtual.rows.map(r => r.id)
          );
        else
          assert.notDeepEqual(
            state.ids,
            state.virtual.rows.map(r => r.id)
          );
        return {
          ids: state.ids,
          metadataIds: state.virtual.rows.map(r => r.id),
          DOMAfterTask: current
        };
      } finally {
        await context.close();
      }
    };
    results.push({
      browser: name,
      version: browser.version(),
      split: await run(false),
      atomic: await run(true),
      passed: true
    });
  } finally {
    await browser.close();
  }
}
console.log(
  JSON.stringify(
    {
      passed: true,
      scope:
        'Deterministic DOM reorder between tasks reproduces split sampling mismatch; single-task sampling stays internally consistent. Not a component benchmark outcome.',
      results
    },
    null,
    2
  )
);
