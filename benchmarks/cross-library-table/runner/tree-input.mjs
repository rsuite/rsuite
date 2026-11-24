const settle = page =>
  page.evaluate(
    () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
export async function activateDisclosure(page, row, button, id, ids, expanded) {
  const deadline = Date.now() + 10000;
  let attempts = 0;
  const matches = () =>
    page.evaluate(
      expected =>
        JSON.stringify(
          [...document.querySelectorAll('[data-row-id]')]
            .filter(
              node => node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden'
            )
            .map(node => node.dataset.rowId)
        ) === JSON.stringify(expected),
      ids
    );
  const current = () =>
    page.evaluate(() => {
      const active = document.activeElement,
        row = active?.closest('tr,[role="row"]');
      return {
        id: row?.querySelector('[data-row-id]')?.dataset.rowId,
        inGrid: !!active?.closest('[role="grid"],[role="treegrid"]'),
        ids: [...document.querySelectorAll('[data-row-id]')]
          .filter(node => node.getClientRects().length)
          .map(node => node.dataset.rowId)
      };
    });
  for (let step = 0; step < 64 && Date.now() < deadline; step++) {
    if (
      await button.evaluate(
        node => node === document.activeElement || node.contains(document.activeElement)
      )
    ) {
      await page.keyboard.press('Enter');
      return Math.max(1, deadline - Date.now());
    }
    if (await row.evaluate(node => node.contains(document.activeElement))) {
      await page.keyboard.press(expanded ? 'ArrowRight' : 'ArrowLeft');
      await settle(page);
      if (await matches()) return Math.max(1, deadline - Date.now());
      if (++attempts < 3) continue;
      attempts = 0;
    } else {
      const before = await current();
      if (before.inGrid) {
        await page.keyboard.press(
          before.ids.indexOf(before.id) > before.ids.indexOf(id) ? 'ArrowUp' : 'ArrowDown'
        );
        await settle(page);
        if ((await current()).id !== before.id) continue;
      }
    }
    await page.keyboard.press('Tab');
  }
  throw Error('Native Tab/arrow navigation did not activate the tree disclosure');
}
