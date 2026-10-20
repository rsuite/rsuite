import assert from 'node:assert/strict';
import { expectedStates, selectedRow } from './oracle.mjs';

export function validateReport(report, browserName = 'all') {
  assert.ok(['all', 'chromium', 'firefox'].includes(browserName), 'Unknown browser');
  assert.equal(report.complete, true, 'Incomplete report');
  const browsers = browserName === 'all' ? ['chromium', 'firefox'] : [browserName];
  const expected = browsers.flatMap(browser =>
    ['rsuite', 'antd', 'chakra', 'heroui'].flatMap(library =>
      ['pointer', 'keyboard'].map(profile => [browser, library, profile].join('/'))
    )
  );
  assert.deepEqual(
    report.cases.map(row => [row.browser, row.library, row.profile].join('/')).sort(),
    expected.sort(),
    'Missing, duplicate or unexpected matrix cells'
  );
  const names = Object.keys(expectedStates);
  for (const row of report.cases) {
    const key = [row.browser, row.library, row.profile].join('/');
    assert.equal(typeof row.passed, 'boolean', key + ': missing outcome');
    assert.ok(typeof row.version === 'string' && row.version.length, key + ': browser version');
    assert.ok(Array.isArray(row.checkpoints), key + ': missing checkpoints');
    assert.deepEqual(
      row.checkpoints.map(checkpoint => checkpoint.name),
      names.slice(0, row.checkpoints.length),
      key + ': invalid checkpoint order'
    );
    if (!row.passed) {
      assert.ok(typeof row.error === 'string' && row.error.length, key + ': missing failure');
      continue;
    }
    assert.equal(row.checkpoints.length, names.length, key + ': incomplete success');
    assert.deepEqual(row.pageErrors, [], key + ': page errors');
    assert.deepEqual(row.httpErrors, [], key + ': request errors');
    assert.ok(
      row.events.length && row.events.every(event => event.trusted === true),
      key + ': native trust'
    );
    assert.ok(
      row.events.some(event => event.type === (row.profile === 'keyboard' ? 'keydown' : 'click')),
      key + ': input profile'
    );
    for (const checkpoint of row.checkpoints) {
      const expected = expectedStates[checkpoint.name],
        state = checkpoint.state;
      if (checkpoint.name === 'disabled') {
        const observed = checkpoint.observation;
        if (row.profile === 'pointer') {
          assert.equal(observed.method, 'native-pointer', key + ': disabled activation');
          assert.equal(observed.point.rowId, 'entry-003', key + ': disabled pointer hit');
          assert.equal(observed.point.withinTargetRow, true, key + ': disabled control bounds');
          if (observed.point.hitMode === 'row') assert.equal(observed.point.hitRowId, 'entry-003');
          else {
            assert.equal(observed.point.hitMode, 'disabled-subtree-pass-through');
            assert.equal(observed.point.hitRowId, undefined);
            assert.equal(observed.point.pointerSuppressed, true);
            assert.equal(observed.point.hitContainsTargetRow, true);
          }
          assert.ok(
            observed.point.inViewport && observed.point.width > 0 && observed.point.height > 0
          );
          assert.ok(observed.events.some(event => event.type === 'pointerdown'));
          assert.ok(observed.events.some(event => event.type === 'pointerup'));
          assert.ok(observed.events.every(event => event.trusted === true));
          assert.deepEqual(observed.changes, [], key + ': disabled change event');
        } else assert.equal(observed.method, 'attribute-only', key + ': keyboard disabled scope');
      }
      assert.deepEqual(state.ids, expected.ids, key + ': row IDs at ' + checkpoint.name);
      assert.deepEqual(JSON.parse(state.selected), expected.selected, key + ': selected IDs');
      assert.deepEqual(state.brokenReferences, [], key + ': broken references');
      assert.deepEqual(state.duplicateIds, [], key + ': duplicate IDs');
      const controls = state.checkboxes.filter(control => control.rowId === selectedRow.id);
      const inputs = controls.filter(control => control.kind === 'input');
      const actual = inputs.length ? inputs : controls;
      const visible = expected.ids.includes(selectedRow.id);
      assert.equal(actual.length, visible ? 1 : 0, key + ': selected-row control');
      if (visible)
        assert.equal(
          actual[0].checked,
          expected.selected.includes(selectedRow.id),
          key + ': actual checked state'
        );
      const disabledControls = state.checkboxes.filter(control => control.rowId === 'entry-003');
      const disabledInputs = disabledControls.filter(control => control.kind === 'input');
      const disabled = disabledInputs.length ? disabledInputs : disabledControls;
      assert.equal(disabled.length, expected.ids.includes('entry-003') ? 1 : 0);
      if (disabled.length) {
        assert.equal(disabled[0].disabled, true, key + ': actual disabled state');
        assert.equal(disabled[0].checked, false, key + ': disabled row selected');
      }
    }
  }
  return {
    total: expected.length,
    passed: report.cases.filter(row => row.passed).length,
    failed: report.cases.filter(row => !row.passed).length
  };
}
