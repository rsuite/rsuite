import assert from 'node:assert/strict';
import { virtualOracle } from './virtual-oracle.mjs';
import { virtualSnapshot } from './virtual-snapshot.mjs';
import { virtualActivate } from './virtual-input.mjs';
export async function virtualWorkflow(page, profile, checkpoint, rowCount) {
  const { jumpIndex, selectedVirtualKey, virtualStates } = virtualOracle(rowCount);

  async function waitForCheckedRow() {
    await page.waitForFunction(key => {
      const input = document
        .querySelector('[data-row-id="' + key + '"]')
        ?.closest('[data-virtual-row-id],tr,[role="row"]')
        ?.querySelector('input[type="checkbox"]');
      return input?.checked === true;
    }, selectedVirtualKey);
  }
  async function capture(name) {
    const expected = virtualStates[name],
      deadline = Date.now() + 10000;
    let state;
    do {
      state = await page.evaluate(virtualSnapshot);
      if (state.virtual.rows.some(row => row.id === expected.target && row.visible)) break;
      await page.evaluate(() => new Promise(r => requestAnimationFrame(r)));
    } while (Date.now() < deadline);
    assert(
      state.virtual.rows.some(row => row.id === expected.target && row.visible),
      'Requested virtual row is not visible: ' + expected.target
    );
    assert(state.virtual.rendered > 0 && state.virtual.rendered < 200);
    await page.waitForFunction(
      keys => document.querySelector('output')?.textContent === JSON.stringify(keys),
      expected.selected
    );
    await checkpoint(name);
  }
  await page.waitForSelector('[data-row-id]');
  await capture('initial');
  const button = name => page.getByRole('button', { name, exact: true });
  const jump = button('Jump row ' + jumpIndex);
  await virtualActivate(page, jump, profile, 'toolbar');
  await capture('jump');
  const row = page
      .locator('tr,[role="row"],[data-virtual-row-id]')
      .filter({ has: page.locator('[data-row-id="' + selectedVirtualKey + '"]') }),
    checkbox = row.getByRole('checkbox');
  assert.equal(await checkbox.count(), 1);
  await virtualActivate(page, checkbox, profile, 'selection', selectedVirtualKey);
  await waitForCheckedRow();
  assert.equal(await checkbox.isChecked(), true);
  await capture('selected');
  await virtualActivate(page, button('Jump top'), profile, 'toolbar');
  await capture('top');
  await virtualActivate(page, button('Jump end'), profile, 'toolbar');
  await capture('end');
  await virtualActivate(page, jump, profile, 'toolbar');
  await waitForCheckedRow();
  assert.equal(await checkbox.isChecked(), true);
  await capture('restored');
}
