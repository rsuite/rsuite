import assert from 'node:assert/strict';
import { treeStates } from './tree-oracle.mjs';
import { activateDisclosure } from './tree-input.mjs';
async function waitIds(page, name, timeout = 10000) {
  await page.waitForFunction(
    expected =>
      JSON.stringify(
        [...document.querySelectorAll('[data-row-id]')]
          .filter(
            node => node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden'
          )
          .map(node => node.dataset.rowId)
      ) === JSON.stringify(expected),
    treeStates[name].ids,
    { timeout }
  );
}
function rowFor(page, id) {
  return page
    .locator('[data-row-id="' + id + '"]')
    .locator('xpath=ancestor::*[self::tr or @role="row"][1]');
}
async function focusNative(page, target, { rowAllowed = false, backwards = false } = {}) {
  const deadline = Date.now() + 10000;
  const focused = () =>
    target.evaluate(
      (node, rowAllowed) =>
        node === document.activeElement ||
        node.contains(document.activeElement) ||
        (rowAllowed && !!node.closest('tr,[role="row"]')?.contains(document.activeElement)),
      rowAllowed
    );
  for (let tab = 0; tab < 64 && Date.now() < deadline; tab++) {
    if (await focused()) return;
    if (
      rowAllowed &&
      (await page.evaluate(
        () => !!document.activeElement?.closest('[role="grid"],[role="treegrid"]')
      ))
    ) {
      const desired = await target.evaluate(
        node => node.closest('tr,[role="row"]')?.querySelector('[data-row-id]')?.dataset.rowId
      );
      const before = await page.evaluate(() => ({
        id: document.activeElement?.closest('tr,[role="row"]')?.querySelector('[data-row-id]')
          ?.dataset.rowId,
        ids: [...document.querySelectorAll('[data-row-id]')]
          .filter(node => node.getClientRects().length)
          .map(node => node.dataset.rowId)
      }));
      await page.keyboard.press(
        before.ids.indexOf(before.id) > before.ids.indexOf(desired) ? 'ArrowUp' : 'ArrowDown'
      );
      await page.evaluate(
        () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      );
      if (await focused()) return;
      const after = await page.evaluate(
        () =>
          document.activeElement?.closest('tr,[role="row"]')?.querySelector('[data-row-id]')
            ?.dataset.rowId
      );
      if (after !== before.id) continue;
    }
    await page.keyboard.press(backwards ? 'Shift+Tab' : 'Tab');
    await page.evaluate(
      () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    );
  }
  throw Error('Native Tab/ArrowDown navigation did not reach the tree target');
}
async function toggle(page, profile, id, expected) {
  const row = rowFor(page, id),
    button = row.locator('button,[role="button"]');
  assert.equal(await button.count(), 1, id + ': one disclosure control');
  let timeout = 10000;
  if (profile === 'keyboard') {
    timeout = await activateDisclosure(
      page,
      row,
      button,
      id,
      treeStates[expected].ids,
      treeStates[expected].expanded.includes(id)
    );
  } else await button.click();
  await waitIds(page, expected, timeout);
}
async function checked(page) {
  const checkbox = page.getByRole('checkbox', { name: 'Select North budget', exact: true });
  await page.waitForFunction(
    node =>
      node instanceof HTMLInputElement
        ? node.checked
        : node.getAttribute('aria-checked') === 'true',
    await checkbox.elementHandle(),
    { timeout: 10000 }
  );
  assert.equal(await checkbox.isChecked(), true);
}
export async function treeWorkflow(page, profile, checkpoint) {
  await waitIds(page, 'initial');
  await checkpoint('initial');
  await toggle(page, profile, 'north', 'root-expanded');
  await checkpoint('root-expanded');
  await toggle(page, profile, 'north-projects', 'branch-expanded');
  await checkpoint('branch-expanded');
  const checkbox = page.getByRole('checkbox', { name: 'Select North budget', exact: true });
  if (profile === 'keyboard') {
    await focusNative(page, checkbox, { rowAllowed: true });
    await page.keyboard.press('Space');
  } else {
    const point = await checkbox.evaluate(node => {
      const r = (node.labels?.[0] || node.closest('label') || node).getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    await page.mouse.click(point.x, point.y);
  }
  await checked(page);
  await page.waitForFunction(
    () => document.querySelector('output').textContent === '["north-budget"]'
  );
  await checkpoint('selected');
  const reverse = page.getByRole('button', { name: 'Reverse root order', exact: true });
  if (profile === 'keyboard') {
    await focusNative(page, reverse, { backwards: true });
    await page.keyboard.press('Enter');
  } else await reverse.click();
  await waitIds(page, 'reordered');
  await checked(page);
  await checkpoint('reordered');
  await toggle(page, profile, 'north', 'root-collapsed');
  await checkpoint('root-collapsed');
  await toggle(page, profile, 'north', 'root-reexpanded');
  await checked(page);
  await checkpoint('root-reexpanded');
  await toggle(page, profile, 'north-projects', 'branch-collapsed');
  await checkpoint('branch-collapsed');
  await toggle(page, profile, 'north-projects', 'branch-reexpanded');
  await checked(page);
  await checkpoint('branch-reexpanded');
}
