import assert from 'node:assert/strict';

export async function probeDisabledPointer(page, target) {
  const point = await target.evaluate(node => {
    const rect = (node.labels?.[0] || node.closest('label') || node).getBoundingClientRect();
    const x = rect.x + rect.width / 2,
      y = rect.y + rect.height / 2;
    const hit = document.elementFromPoint(x, y);
    const row = node.closest('tr,[role="row"]');
    const rowRect = row?.getBoundingClientRect();
    const rowId = row?.querySelector('[data-row-id]')?.dataset.rowId;
    const hitRowId = hit?.closest('tr,[role="row"]')?.querySelector('[data-row-id]')?.dataset.rowId;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height,
      inViewport: x > 0 && y > 0 && x < innerWidth && y < innerHeight,
      rowId,
      hitRowId,
      withinTargetRow:
        !!rowRect &&
        x >= rowRect.left &&
        x <= rowRect.right &&
        y >= rowRect.top &&
        y <= rowRect.bottom,
      pointerSuppressed: getComputedStyle(node).pointerEvents === 'none',
      hitContainsTargetRow: !!hit && !!row && hit.contains(row),
      hitMode: hitRowId === rowId ? 'row' : 'disabled-subtree-pass-through'
    };
  });
  assert.ok(point.width > 0 && point.height > 0 && point.inViewport);
  assert.equal(point.rowId, 'entry-003', 'Pointer hit must belong to the disabled row');
  assert.equal(point.withinTargetRow, true, 'Control center must be inside its row');
  if (point.hitMode !== 'row') {
    assert.equal(point.hitRowId, undefined, 'Pointer must not hit a different row');
    assert.equal(point.pointerSuppressed, true, 'Pass-through requires disabled subtree CSS');
    assert.equal(point.hitContainsTargetRow, true, 'Pass-through must hit an ancestor of the row');
  }
  const start = await page.evaluate(() => {
    window.__disabledChanges = [];
    window.__disabledListener = event =>
      window.__disabledChanges.push({ trusted: event.isTrusted });
    document.addEventListener('change', window.__disabledListener, true);
    return window.__nativeEvents.length;
  });
  try {
    await page.mouse.click(point.x, point.y);
    // Let the native event task and rendering finish without extending the timeout.
    await page.evaluate(
      () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    );
    const observed = await page.evaluate(
      start => ({
        events: window.__nativeEvents.slice(start),
        changes: window.__disabledChanges
      }),
      start
    );
    assert.ok(observed.events.some(event => event.type === 'pointerdown'));
    assert.ok(observed.events.some(event => event.type === 'pointerup'));
    assert.ok(observed.events.every(event => event.trusted));
    assert.deepEqual(observed.changes, []);
    assert.equal(await target.isChecked(), false);
    return { method: 'native-pointer', point, ...observed };
  } finally {
    await page.evaluate(() => {
      document.removeEventListener('change', window.__disabledListener, true);
      delete window.__disabledListener;
      delete window.__disabledChanges;
    });
  }
}
