import assert from 'node:assert/strict';
import { virtualStates, virtualOwnership, selectedVirtualKey } from './virtual-oracle.mjs';
import { validateRunIntegrity, checkedSummary } from './build-state.mjs';
export function validateVirtualReport(report, browserName = 'all') {
  assert.equal(report.workflow, 'virtual');
  assert.equal(report.complete, true);
  validateRunIntegrity(report);
  assert(['all', 'chromium', 'firefox'].includes(browserName));
  const expected = (browserName === 'all' ? ['chromium', 'firefox'] : [browserName]).flatMap(
    browser =>
      Object.keys(virtualOwnership).flatMap(library =>
        ['pointer', 'keyboard'].map(profile => [browser, library, profile].join('/'))
      )
  );
  assert.deepEqual(
    report.cases.map(row => [row.browser, row.library, row.profile].join('/')).sort(),
    expected.sort()
  );
  for (const row of report.cases) {
    assert.equal(typeof row.passed, 'boolean');
    assert(typeof row.version === 'string' && row.version.length);
    assert.equal(row.ownership, virtualOwnership[row.library]);
    assert.deepEqual(
      row.checkpoints.map(c => c.name),
      Object.keys(virtualStates).slice(0, row.checkpoints.length)
    );
    for (const { name, state } of row.checkpoints) {
      const expected = virtualStates[name];
      assert.deepEqual(
        state.ids,
        state.virtual.rows.map(r => r.id)
      );
      assert.equal(state.virtual.rendered, state.ids.length);
      assert(state.ids.length > 0 && state.ids.length < 200);
      assert(new Set(state.ids).size === state.ids.length);
      assert(state.ids.every(id => /^entry-\d{5}$/.test(id) && Number(id.slice(6)) < 10000));
      const viewport = state.virtual.viewport;
      assert(
        viewport.width > 0 && viewport.height > 0 && Number.isFinite(state.virtual.headerBottom)
      );
      for (const item of state.virtual.rows) {
        for (const value of Object.values(item.rect)) assert(Number.isFinite(value));
        for (const value of Object.values(item.clip)) assert(Number.isFinite(value));
        assert(item.clip.top >= Math.max(viewport.top, state.virtual.headerBottom));
        assert(
          item.clip.bottom <= viewport.bottom &&
            item.clip.left >= viewport.left &&
            item.clip.right <= viewport.right
        );
        const b = item.rect,
          c = item.clip;
        assert.equal(
          item.visible,
          b.width > 0 &&
            b.height > 0 &&
            b.top >= c.top - 0.5 &&
            b.bottom <= c.bottom + 0.5 &&
            b.left >= c.left - 0.5 &&
            b.right <= c.right + 0.5
        );
      }
      assert(state.virtual.rows.some(r => r.id === expected.target && r.visible));
      assert.deepEqual(JSON.parse(state.selected), expected.selected);
      assert.deepEqual(state.brokenReferences, []);
      assert.deepEqual(state.duplicateIds, []);
      assert.equal(state.virtual.selectedRowMounted, state.ids.includes(selectedVirtualKey));
      const inputs = state.checkboxes.filter(
        c => c.kind === 'input' && c.rowId === selectedVirtualKey
      );
      assert.equal(inputs.length, state.ids.includes(selectedVirtualKey) ? 1 : 0);
      if (inputs.length) {
        assert.equal(inputs[0].checked, expected.selected.includes(selectedVirtualKey));
        assert.equal(inputs[0].disabled, false);
      }
    }
    if (!row.passed) {
      assert(typeof row.error === 'string' && row.error.length);
      continue;
    }
    assert.equal(row.checkpoints.length, Object.keys(virtualStates).length);
    assert.deepEqual(row.pageErrors, []);
    assert.deepEqual(row.httpErrors, []);
    assert(row.events.length && row.events.every(e => e.trusted === true));
    assert(row.events.some(e => e.type === (row.profile === 'keyboard' ? 'keydown' : 'click')));
    if (row.profile === 'pointer')
      for (const type of ['pointerdown', 'pointerup', 'click'])
        assert(
          row.events.some(
            e => e.type === type && e.rowId === selectedVirtualKey && e.trusted === true
          )
        );
    else
      assert(
        row.events.some(
          e =>
            e.type === 'keydown' &&
            e.key === ' ' &&
            e.rowId === selectedVirtualKey &&
            e.trusted === true
        )
      );
  }
  const summary = {
    total: expected.length,
    passed: report.cases.filter(c => c.passed).length,
    failed: report.cases.filter(c => !c.passed).length
  };
  return checkedSummary(report, summary);
}
