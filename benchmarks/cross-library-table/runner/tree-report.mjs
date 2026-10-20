import { validateRunIntegrity, checkedSummary } from './build-state.mjs';
import assert from 'node:assert/strict';
import { treeStates, levels, branches, treeOwnership } from './tree-oracle.mjs';
export function treeSemantics(checkpoints) {
  const failures = [];
  for (const { name, state } of checkpoints) {
    if (state.rootRole !== 'treegrid')
      failures.push({ checkpoint: name, gate: 'treegrid-role', actual: state.rootRole });
    for (const row of state.rows) {
      if (Number(row.level) !== levels[row.id])
        failures.push({
          checkpoint: name,
          row: row.id,
          gate: 'row-level',
          actual: row.level,
          expected: levels[row.id]
        });
      if (branches.includes(row.id)) {
        const expected = String(treeStates[name].expanded.includes(row.id));
        if (row.expanded !== expected && !(row.cellExpanded ?? []).includes(expected))
          failures.push({ checkpoint: name, row: row.id, gate: 'expanded-state', expected });
        if (row.buttons.length !== 1 || !row.buttons[0].name.trim())
          failures.push({ checkpoint: name, row: row.id, gate: 'disclosure-name' });
      } else {
        if (row.expanded !== null || (row.cellExpanded ?? []).length)
          failures.push({ checkpoint: name, row: row.id, gate: 'leaf-expanded-state' });
        if (row.buttons.length)
          failures.push({ checkpoint: name, row: row.id, gate: 'leaf-disclosure' });
      }
    }
  }
  return {
    passed: failures.length === 0,
    failures,
    scope:
      'Tree role, row levels, expanded state and disclosure names only; no AT/conformance result'
  };
}
export function validateTreeReport(report, browserName = 'all') {
  validateRunIntegrity(report);
  assert.equal(report.workflow, 'tree');
  assert.equal(report.complete, true);
  assert(['all', 'chromium', 'firefox'].includes(browserName));
  const expected = (browserName === 'all' ? ['chromium', 'firefox'] : [browserName]).flatMap(
    browser =>
      Object.keys(treeOwnership).flatMap(library =>
        ['pointer', 'keyboard'].map(profile => [browser, library, profile].join('/'))
      )
  );
  assert.deepEqual(
    report.cases.map(row => [row.browser, row.library, row.profile].join('/')).sort(),
    expected.sort()
  );
  for (const row of report.cases) {
    assert.equal(typeof row.passed, 'boolean');
    assert.equal(typeof row.version, 'string');
    assert(row.version.length);
    assert.equal(row.ownership, treeOwnership[row.library]);
    assert.deepEqual(
      row.checkpoints.map(c => c.name),
      Object.keys(treeStates).slice(0, row.checkpoints.length)
    );
    assert.equal(typeof row.functionalPassed, 'boolean');
    for (const { name, state } of row.checkpoints) {
      assert.deepEqual(state.ids, treeStates[name].ids);
      assert.deepEqual(
        state.rows.map(item => item.id),
        state.ids
      );
      assert.deepEqual(JSON.parse(state.selected), treeStates[name].selected);
      assert.deepEqual(state.brokenReferences, []);
      assert.deepEqual(state.duplicateIds, []);
      const controls = state.checkboxes.filter(
        control => control.kind === 'input' && control.rowId === 'north-budget'
      );
      assert.equal(controls.length, treeStates[name].ids.includes('north-budget') ? 1 : 0);
      if (controls.length) assert.equal(controls[0].checked, treeStates[name].selected.length > 0);
    }
    if (!row.functionalPassed) {
      assert.equal(row.passed, false);
      assert(row.error);
      continue;
    }
    assert.equal(row.checkpoints.length, Object.keys(treeStates).length);
    assert(row.events.length && row.events.every(event => event.trusted === true));
    assert(
      row.events.some(event => event.type === (row.profile === 'keyboard' ? 'keydown' : 'click'))
    );
    assert.deepEqual(row.pageErrors, []);
    assert.deepEqual(row.httpErrors, []);
    const actualSemantics = treeSemantics(row.checkpoints);
    assert.deepEqual(row.semantics, actualSemantics);
    assert.equal(row.passed, actualSemantics.passed);
    if (!row.passed) assert(row.error);
  }
  const summary = {
    total: expected.length,
    passed: report.cases.filter(row => row.passed).length,
    failed: report.cases.filter(row => !row.passed).length,
    functionalPassed: report.cases.filter(row => row.functionalPassed).length,
    functionalFailed: report.cases.filter(row => !row.functionalPassed).length,
    semanticsFailedOnCompleted: report.cases.filter(
      row => row.functionalPassed && !row.semantics.passed
    ).length
  };
  return checkedSummary(report, summary);
}
