import assert from 'node:assert/strict';
import { lifecycleStates } from './lifecycle-oracle.mjs';
import { lifecycleSnapshot } from './lifecycle-snapshot.mjs';
import { virtualActivate as activate } from './virtual-input.mjs';
export async function lifecycleWorkflow(page, profile, checkpoint) {
  async function capture(name) {
    const expected = lifecycleStates[name];
    await page.waitForFunction(expected => {
      const ids = [...document.querySelectorAll('[data-row-id]')].map(n => n.dataset.rowId);
      return (
        JSON.stringify(ids) === JSON.stringify(expected.ids) &&
        document.querySelector('[data-app-phase]')?.dataset.appPhase === expected.phase &&
        document.querySelector('output')?.textContent === JSON.stringify(expected.selected)
      );
    }, expected);
    const deadline = Date.now() + 10000;
    let state;
    do {
      state = await page.evaluate(lifecycleSnapshot);
      const loading = state.lifecycle.loadingIndicators.filter(n => n.visible).length;
      const empty = state.lifecycle.emptyIndicators.filter(n => n.visible).length;
      if (loading === Number(name === 'loading') && empty === Number(name === 'empty')) break;
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
    } while (Date.now() < deadline);
    assert.equal(
      state.lifecycle.loadingIndicators.filter(n => n.visible).length,
      Number(name === 'loading')
    );
    assert.equal(
      state.lifecycle.emptyIndicators.filter(n => n.visible).length,
      Number(name === 'empty')
    );
    await checkpoint(name);
  }
  async function select(id) {
    const row = page
      .locator('tr,[role="row"]')
      .filter({ has: page.locator('[data-row-id="' + id + '"]') });
    const checkbox = row.getByRole('checkbox');
    assert.equal(await checkbox.count(), 1);
    await activate(page, checkbox, profile, 'selection', id);
    await page.waitForFunction(
      id => document.querySelector('output')?.textContent === JSON.stringify([id]),
      id
    );
    await page.waitForFunction(
      id =>
        document
          .querySelector('[data-row-id="' + id + '"]')
          ?.closest('tr,[role="row"]')
          ?.querySelector('input[type="checkbox"]')?.checked === true,
      id
    );
    assert.equal(await checkbox.isChecked(), true);
  }
  await page.waitForSelector('[data-row-id]');
  await capture('initial');
  await select('entry-001');
  await capture('selected');
  await activate(
    page,
    page.getByRole('button', { name: 'Start loading', exact: true }),
    profile,
    'toolbar'
  );
  await capture('loading');
  await activate(
    page,
    page.getByRole('button', { name: 'Resolve empty', exact: true }),
    profile,
    'toolbar'
  );
  await capture('empty');
  await activate(
    page,
    page.getByRole('button', { name: 'Recover data', exact: true }),
    profile,
    'toolbar'
  );
  await capture('recovered');
  await select('entry-101');
  await capture('reselected');
}
