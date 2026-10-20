import assert from 'node:assert/strict';
const settle = page =>
  page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
export async function virtualActivate(page, target, profile, kind, id) {
  if (profile === 'pointer') {
    if (kind === 'selection') {
      const start = await page.evaluate(() => window.__nativeEvents.length);
      const label = target.locator('xpath=ancestor::label[1]');
      assert.equal(await label.count(), 1);
      await label.click();
      const events = await page.evaluate(start => window.__nativeEvents.slice(start), start);
      for (const type of ['pointerdown', 'pointerup', 'click'])
        assert(
          events.some(event => event.type === type && event.trusted === true && event.rowId === id),
          'Native selection hit does not belong to target row: ' + type
        );
    } else await target.click();
    return;
  }
  const deadline = Date.now() + 10000;
  const backwards =
    kind === 'toolbar' &&
    (await target.evaluate(
      node =>
        !!(document.activeElement?.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_PRECEDING)
    ));
  for (let step = 0; step < 64 && Date.now() < deadline; step++) {
    if (
      (await target.count()) === 1 &&
      (await target.evaluate(
        (node, selection) =>
          node === document.activeElement ||
          node.contains(document.activeElement) ||
          (selection && node.closest('tr,[role="row"]')?.contains(document.activeElement)),
        kind === 'selection'
      ))
    ) {
      await page.keyboard.press(kind === 'selection' ? 'Space' : 'Enter');
      return;
    }
    const before = await page.evaluate(() => {
      const n = document.activeElement;
      return {
        inSection: !!n?.closest('section[aria-label="Virtual ledger"]'),
        inGrid: !!n?.closest('[role="grid"],[role="treegrid"]'),
        rowId: n?.closest('tr,[role="row"]')?.querySelector('[data-row-id]')?.dataset.rowId
      };
    });
    if (kind === 'selection' && before.inGrid && before.rowId && before.rowId !== id) {
      await page.keyboard.press(
        Number(before.rowId.slice(6)) > Number(id.slice(6)) ? 'ArrowUp' : 'ArrowDown'
      );
      await settle(page);
      const after = await page.evaluate(
        () =>
          document.activeElement?.closest('tr,[role="row"]')?.querySelector('[data-row-id]')
            ?.dataset.rowId
      );
      if (after !== before.rowId) continue;
    }
    await page.keyboard.press(backwards ? 'Shift+Tab' : 'Tab');
  }
  throw Error('Native Tab/arrow navigation did not reach virtual ' + kind + ' ' + (id ?? ''));
}
