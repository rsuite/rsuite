import assert from 'node:assert/strict';

export function assertWholeRowGeometry(virtual) {
  assert.equal(virtual.geometryVersion, 1);
  const { viewport, screenViewport, headerBottom, rows } = virtual;
  assert(screenViewport.width > 0 && Number.isFinite(screenViewport.width));
  assert(screenViewport.height > 0 && Number.isFinite(screenViewport.height));
  for (const row of rows) {
    const b = row.rowRect;
    const c = row.rowClip;
    assert(b && c, 'Whole-row bounds are required');
    for (const key of ['top', 'bottom', 'left', 'right', 'width', 'height'])
      assert(Number.isFinite(b[key]), 'Invalid row rectangle: ' + key);
    for (const key of ['top', 'bottom', 'left', 'right'])
      assert(Number.isFinite(c[key]), 'Invalid row clipping bound: ' + key);
    assert(b.width >= 0 && b.height >= 0);
    assert(Math.abs(b.right - b.left - b.width) < 0.01);
    assert(Math.abs(b.bottom - b.top - b.height) < 0.01);
    const expectedClip = {
      top: Math.max(0, viewport.top, headerBottom),
      bottom: Math.min(viewport.bottom, screenViewport.height),
      left: Math.max(0, viewport.left),
      right: Math.min(viewport.right, screenViewport.width)
    };
    assert(Array.isArray(row.rowClipping));
    for (const { axis, rect } of row.rowClipping) {
      assert(axis === 'x' || axis === 'y');
      for (const key of ['top', 'bottom', 'left', 'right', 'width', 'height'])
        assert(Number.isFinite(rect[key]), 'Invalid client scrollport: ' + key);
      assert(rect.width >= 0 && rect.height >= 0);
      assert(Math.abs(rect.right - rect.left - rect.width) < 0.01);
      assert(Math.abs(rect.bottom - rect.top - rect.height) < 0.01);
      if (axis === 'y') {
        expectedClip.top = Math.max(expectedClip.top, rect.top);
        expectedClip.bottom = Math.min(expectedClip.bottom, rect.bottom);
      } else {
        expectedClip.left = Math.max(expectedClip.left, rect.left);
        expectedClip.right = Math.min(expectedClip.right, rect.right);
      }
    }
    assert.deepEqual(c, expectedClip);
    assert.equal(
      row.rowFullyVisible,
      b.width > 0 &&
        b.height > 0 &&
        b.top >= c.top - 0.5 &&
        b.bottom <= c.bottom + 0.5 &&
        b.left >= c.left - 0.5 &&
        b.right <= c.right + 0.5
    );
  }
  assert.equal(virtual.fullyVisibleRows, rows.filter(row => row.rowFullyVisible).length);
}
