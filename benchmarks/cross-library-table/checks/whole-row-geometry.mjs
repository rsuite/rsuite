import assert from 'node:assert/strict';
import { chromium, firefox } from 'playwright';
import { virtualSnapshot } from '../runner/virtual-snapshot.mjs';
import { assertWholeRowGeometry } from '../runner/virtual-geometry.mjs';

const cases = [
  { name: 'fully inside', row: 'top:0', full: true },
  { name: 'behind header', row: 'top:-12px', full: false },
  { name: 'inside viewport border', row: 'top:-2px', full: false },
  { name: 'bottom clipped', row: 'top:80px', marker: 'top:0;height:8px', full: false },
  { name: 'horizontal clipping', row: 'top:0;width:120px', full: false },
  { name: 'nested clipping', row: 'top:0', marker: 'top:0;height:8px', nested: true, full: false },
  {
    name: 'outside browser viewport',
    row: 'top:24px',
    marker: 'top:0;height:8px',
    height: 80,
    full: false
  }
];
const results = [];
for (const [name, engine] of Object.entries({ chromium, firefox })) {
  const browser = await engine.launch();
  try {
    const observations = [];
    for (const scenario of cases) {
      const page = await browser.newPage({
        viewport: { width: 500, height: scenario.height || 400 }
      });
      try {
        const row = `<div role="row" style="position:absolute;left:0;width:100px;height:40px;${scenario.row}"><span data-row-id="entry-00000" style="position:absolute;left:12px;top:12px;width:16px;height:16px;${scenario.marker || ''}">R</span></div>`;
        const content = scenario.nested
          ? `<div style="position:absolute;top:0;width:100px;height:24px;overflow:hidden">${row}</div>`
          : row;
        await page.setContent(
          `<body style="margin:0"><section aria-label="Virtual ledger" style="width:200px;height:200px"><div role="columnheader" style="height:40px">Header</div><div id="viewport" style="position:relative;width:100px;height:100px;border:4px solid;overflow:hidden">${content}</div></section></body>`
        );
        const state = (await page.evaluate(virtualSnapshot)).virtual;
        assertWholeRowGeometry(state);
        assert.equal(state.rows.length, 1);
        assert.equal(state.rows[0].visible, true, scenario.name + ': marker must remain visible');
        assert.equal(state.rows[0].rowFullyVisible, scenario.full, scenario.name);
        const forged = structuredClone(state);
        forged.rows[0].rowFullyVisible = !scenario.full;
        forged.fullyVisibleRows = Number(!scenario.full);
        assert.throws(() => assertWholeRowGeometry(forged), undefined, 'Forged row flag accepted');
        observations.push({ name: scenario.name, expectedFullRow: scenario.full, state });
      } finally {
        await page.close();
      }
    }
    results.push({ browser: name, version: browser.version(), observations, passed: true });
  } finally {
    await browser.close();
  }
}
console.log(
  JSON.stringify(
    {
      passed: true,
      scope:
        'Real DOM clipping controls distinguish visible identity markers from complete row border boxes. Includes viewport borders, nested clipping and browser bounds; no component/performance/AT conformance result.',
      results
    },
    null,
    2
  )
);
