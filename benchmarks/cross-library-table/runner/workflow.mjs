import assert from 'node:assert/strict';
import { ascending } from './oracle.mjs';
import { probeDisabledPointer } from './disabled.mjs';
async function waitIds(page, ids) {
  await page.waitForFunction(
    expected =>
      JSON.stringify(
        [...document.querySelectorAll('[data-row-id]')].map(node => node.dataset.rowId)
      ) === JSON.stringify(expected),
    ids,
    { timeout: 10000 }
  );
}
async function hasFocus(target, rowAllowed = false) {
  return target.evaluate(
    (node, allowRow) =>
      node === document.activeElement ||
      node.contains(document.activeElement) ||
      (allowRow && !!node.closest('tr,[role="row"]')?.contains(document.activeElement)),
    rowAllowed
  );
}
async function keyboardFocus(page, target, kind) {
  const backwards =
    (kind === 'sort' || kind === 'toolbar') &&
    (await page.evaluate(() => !!document.activeElement?.closest('section[aria-label="Ledger"]')));
  for (let tab = 0; tab < 64; tab++) {
    if (await hasFocus(target, kind === 'selection')) return;
    const inTable = await page.evaluate(
      () => !!document.activeElement?.closest('section[aria-label="Ledger"]')
    );
    if (inTable && kind === 'sort')
      for (let up = 0; up < 3; up++) {
        await page.keyboard.press('ArrowUp');
        if (await hasFocus(target, false)) return;
      }
    if (inTable && kind !== 'toolbar')
      for (let arrow = 0; arrow < (kind === 'selection' ? 24 : 5); arrow++) {
        await page.keyboard.press(kind === 'selection' ? 'ArrowDown' : 'ArrowRight');
        if (await hasFocus(target, kind === 'selection')) return;
      }
    await page.keyboard.press(backwards ? 'Shift+Tab' : 'Tab');
  }
  throw Error('Native Tab/arrow navigation did not reach ' + kind + ' target');
}
async function activate(page, target, profile, kind) {
  if (profile === 'keyboard') {
    await keyboardFocus(page, target, kind);
    await page.keyboard.press(kind === 'selection' ? 'Space' : 'Enter');
  } else if (kind === 'selection') {
    const point = await target.evaluate(node => {
      const box = (node.labels?.[0] || node.closest('label') || node).getBoundingClientRect();
      return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    });
    await page.mouse.click(point.x, point.y);
  } else {
    const button = kind === 'sort' ? target.getByRole('button', { name: /^amount$/i }) : null;
    if (button && (await button.count())) {
      assert.equal(await button.count(), 1);
      await button.click();
    } else await target.click();
  }
}
export async function workflow(page, profile, checkpoint) {
  await page.waitForFunction(() => document.querySelectorAll('[data-row-id]').length === 24);
  const amount = page
    .getByRole('region', { name: 'Ledger', exact: true })
    .getByRole('columnheader', { name: /^Amount/i });
  assert.equal(await amount.count(), 1);
  await checkpoint('initial');
  const disabled = page.getByRole('checkbox', { name: 'Select Entry 0003', exact: true });
  assert.equal(await disabled.isDisabled(), true);
  assert.equal(await disabled.isChecked(), false);
  const observation =
    profile === 'pointer'
      ? await probeDisabledPointer(page, disabled)
      : { method: 'attribute-only' };
  await checkpoint('disabled', observation);
  await activate(page, amount, profile, 'sort');
  await waitIds(
    page,
    ascending.map(row => row.id)
  );
  await checkpoint('ascending');
  const target = ascending[0],
    checkbox = page.getByRole('checkbox', { name: 'Select ' + target.name, exact: true });
  await activate(page, checkbox, profile, 'selection');
  await page.waitForFunction(
    key => document.querySelector('output').textContent === JSON.stringify([key]),
    target.id
  );
  await waitChecked(page, checkbox);
  assert.equal(await checkbox.isChecked(), true);
  await checkpoint('selected');
  await activate(page, amount, profile, 'sort');
  await waitIds(
    page,
    [...ascending].reverse().map(row => row.id)
  );
  await waitChecked(page, checkbox);
  assert.equal(await checkbox.isChecked(), true);
  assert.equal(
    await page.getByRole('checkbox', { name: 'Select Entry 0003', exact: true }).isDisabled(),
    true
  );
  await checkpoint('descending');
  const filter = page.getByRole('textbox', { name: 'Filter entries', exact: true });
  if (profile === 'keyboard') {
    await keyboardFocus(page, filter, 'toolbar');
    await page.keyboard.type('Entry 0001');
  } else await filter.fill('Entry 0001');
  await waitIds(page, ['entry-001']);
  assert.equal(await checkbox.count(), 0);
  await checkpoint('filtered');
  await activate(
    page,
    page.getByRole('button', { name: 'Clear filter', exact: true }),
    profile,
    'toolbar'
  );
  await waitIds(
    page,
    [...ascending].reverse().map(row => row.id)
  );
  await waitChecked(page, checkbox);
  assert.equal(await checkbox.isChecked(), true);
  await checkpoint('restored');
}
async function waitChecked(page, checkbox) {
  await page.waitForFunction(
    node =>
      node instanceof HTMLInputElement
        ? node.checked
        : node.getAttribute('aria-checked') === 'true',
    await checkbox.elementHandle(),
    { timeout: 10000 }
  );
}
