import assert from 'node:assert/strict';
import { lifecycleStates, lifecycleOwnership } from './lifecycle-oracle.mjs';
import { validateRunIntegrity, checkedSummary } from './build-state.mjs';
export function validateLifecycleReport(report, browserName = 'all') {
  assert.equal(report.workflow, 'lifecycle');
  assert.equal(report.complete, true);
  validateRunIntegrity(report);
  assert(['all', 'chromium', 'firefox'].includes(browserName));
  const expected = (browserName === 'all' ? ['chromium', 'firefox'] : [browserName]).flatMap(
    browser =>
      Object.keys(lifecycleOwnership).flatMap(library =>
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
    assert.equal(row.ownership, lifecycleOwnership[row.library]);
    assert.deepEqual(
      row.checkpoints.map(c => c.name),
      Object.keys(lifecycleStates).slice(0, row.checkpoints.length)
    );
    for (const { name, state } of row.checkpoints) {
      const expected = lifecycleStates[name];
      assert.deepEqual(state.ids, expected.ids);
      assert.deepEqual(JSON.parse(state.selected), expected.selected);
      assert.equal(state.lifecycle.phase, expected.phase);
      assert.equal(state.lifecycle.statusText, expected.text);
      assert.equal(state.lifecycle.statusRole, 'status');
      for (const [kind, active] of [
        ['loading', name === 'loading'],
        ['empty', name === 'empty']
      ]) {
        const indicators = state.lifecycle[kind + 'Indicators'];
        assert(Array.isArray(indicators));
        assert(indicators.every(n => typeof n.visible === 'boolean' && typeof n.text === 'string'));
        assert.equal(indicators.filter(n => n.visible).length, Number(active));
        if (active) assert.equal(indicators.find(n => n.visible).text, expected.text);
      }
      assert(Array.isArray(state.lifecycle.nativeBusy));
      for (const busy of state.lifecycle.nativeBusy) {
        assert(['true', 'false'].includes(busy.value));
        assert.equal(typeof busy.visible, 'boolean');
      }
      const inputs = state.checkboxes.filter(c => c.kind === 'input' && c.rowId !== null);
      assert.deepEqual(
        inputs.map(c => c.rowId),
        expected.ids
      );
      for (const input of inputs) {
        assert.equal(input.checked, expected.selected.includes(input.rowId));
        assert.equal(input.disabled, false);
      }
      assert.deepEqual(state.brokenReferences, []);
      assert.deepEqual(state.duplicateIds, []);
    }
    if (!row.passed) {
      assert(typeof row.error === 'string' && row.error.length);
      continue;
    }
    assert.equal(row.checkpoints.length, Object.keys(lifecycleStates).length);
    assert.deepEqual(row.pageErrors, []);
    assert.deepEqual(row.httpErrors, []);
    assert(row.events.length && row.events.every(e => e.trusted === true));
    for (const id of ['entry-001', 'entry-101'])
      if (row.profile === 'pointer')
        for (const type of ['pointerdown', 'pointerup', 'click'])
          assert(row.events.some(e => e.type === type && e.rowId === id));
      else assert(row.events.some(e => e.type === 'keydown' && e.key === ' ' && e.rowId === id));
    for (const text of ['Start loading', 'Resolve empty', 'Recover data'])
      assert(
        row.events.some(
          e =>
            e.buttonText === text &&
            (row.profile === 'pointer'
              ? e.type === 'click'
              : e.type === 'keydown' && e.key === 'Enter')
        )
      );
  }
  return checkedSummary(report, {
    total: expected.length,
    passed: report.cases.filter(c => c.passed).length,
    failed: report.cases.filter(c => !c.passed).length
  });
}
