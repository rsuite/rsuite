import fs from 'node:fs';
import assert from 'node:assert/strict';
import { validateReport } from '../runner/report.mjs';
import { validateTreeReport } from '../runner/tree-report.mjs';
import { validateVirtualReport } from '../runner/virtual-report.mjs';
import { virtualOracle } from '../runner/virtual-oracle.mjs';
import { jumpProbeTargets } from '../runner/virtual-jump-timing.mjs';
import { defaultVirtualRowCount, virtualRowCounts } from '../src/virtual/workload.mjs';
import { validateLifecycleReport } from '../runner/lifecycle-report.mjs';
const [file, browser = 'all', ...extra] = process.argv.slice(2);
assert(
  file && !extra.length,
  'Usage: node checks/report-integrity.mjs report.json [all|chromium|firefox|webkit]'
);
const actual = JSON.parse(fs.readFileSync(file)),
  validate = {
    selection: validateReport,
    tree: validateTreeReport,
    virtual: validateVirtualReport,
    lifecycle: validateLifecycleReport
  }[actual.workflow];
assert(validate, 'Unknown report workflow');
assert.equal(actual.validated, true);
const summary = validate(actual, browser);
assert.deepEqual(summary, actual.summary);
const positive = r => r.cases.find(c => c.passed && c.profile === 'pointer'),
  keyboard = r => r.cases.find(c => c.passed && c.profile === 'keyboard');
assert(
  positive(actual) && (actual.jumpTiming || keyboard(actual)),
  'Mutation controls require each requested input profile to have a passing case'
);
const results = [];
function reject(name, mutate, keepSummary = false) {
  const r = structuredClone(actual);
  if (!keepSummary) delete r.summary;
  mutate(r);
  let error;
  try {
    validate(r, browser);
  } catch (e) {
    error = String(e);
  }
  assert(error, 'False green: ' + name);
  results.push({ name, rejected: true, error });
}
reject('incomplete-report', r => (r.complete = false));
reject('missing-cell', r => r.cases.pop());
reject('duplicate-cell', r => (r.cases[r.cases.length - 1] = structuredClone(r.cases[0])));
reject('missing-capture-protocol', r => delete r.captureProtocol);
reject('missing-integrity-protocol', r => delete r.integrity);
reject('unchecked-final-state', r => (r.integrity.after = false));
reject('no-bound-responses', r => (r.integrity.responsesChecked = 0));
reject('too-few-bound-responses', r => (r.integrity.responsesChecked = 1));
reject('tainted-response', r => r.integrity.violations.push({ file: 'probe' }));
reject(
  'contradictory-summary',
  r => (r.summary = { ...r.summary, passed: r.summary.passed + 1 }),
  true
);
reject('missing-browser-version', r => (positive(r).version = ''));
reject('missing-native-events', r => (positive(r).events = []));
reject('untrusted-event', r => (positive(r).events[0].trusted = false));
if (actual.jumpTiming) reject('wrong-input-profile', r => (positive(r).profile = 'keyboard'));
else reject('wrong-input-profile', r => keyboard(r).events.forEach(e => (e.type = 'click')));
reject('page-error', r => positive(r).pageErrors.push('probe'));
reject('http-error', r => positive(r).httpErrors.push([500, '/probe']));
reject('checkpoint-order', r => positive(r).checkpoints.reverse());
reject('incomplete-success', r => positive(r).checkpoints.pop());
reject('broken-reference', r =>
  positive(r).checkpoints[0].state.brokenReferences.push({ id: 'missing' })
);
reject('duplicate-id', r =>
  positive(r).checkpoints[0].state.duplicateIds.push({ id: 'duplicate', count: 2 })
);
if (actual.workflow === 'virtual') {
  const rowCount = actual.virtualRows ?? defaultVirtualRowCount;
  const { selectedVirtualKey, virtualStates } = virtualOracle(rowCount);
  const otherRowCount = virtualRowCounts.find(count => count !== rowCount);
  reject('unknown-virtual-row-count', r => (r.virtualRows = 12345));
  reject('relabeled-virtual-row-count', r => (r.virtualRows = otherRowCount));
  reject('wrong-virtual-end-target', r => {
    const state = positive(r).checkpoints.find(c => c.name === 'end').state;
    state.virtual.rows.find(row => row.id === virtualStates.end.target).visible = false;
  });
  if (Object.hasOwn(actual, 'virtualRows')) {
    reject('missing-virtual-row-count', r => delete r.virtualRows);
    reject('wrong-fixture-row-count', r => {
      positive(r).checkpoints[0].state.virtual.rowCount = otherRowCount;
    });
  }
  if (actual.jumpTiming) {
    const sample = r => positive(r).jumpSamples[0];
    reject('reordered-timing-cases', r => ([r.cases[4], r.cases[5]] = [r.cases[5], r.cases[4]]));
    reject('wrong-timing-protocol', r => (r.jumpTiming.protocol = 'unknown'));
    reject('missing-timing-event', r => positive(r).jumpSamples.pop());
    reject('wrong-timing-target', r => (sample(r).target = 'entry-00002'));
    reject('timing-target-from-other-workload', r => {
      const [otherJump] = jumpProbeTargets(otherRowCount);
      Object.assign(sample(r), otherJump);
    });
    reject('untrusted-timing-start', r => (sample(r).trusted = false));
    reject('already-visible-timing-target', r => (sample(r).alreadyVisible = true));
    reject('negative-timing-duration', r => (sample(r).visibleMs = sample(r).startedMs - 1));
    reject('missing-ready-frame', r => (sample(r).frames = 0));
    reject('hit-before-visible', r => (sample(r).hitTestableMs = sample(r).visibleMs - 1));
    reject(
      'overlapping-timing-samples',
      r => (positive(r).jumpSamples[1].startedMs = sample(r).startedMs)
    );
    reject(
      'inflated-timing-sample-count',
      r => {
        Object.values(r.summary.jumpTimings)[0].visible.count++;
      },
      true
    );
  }
  reject('wrong-ownership', r => (positive(r).ownership = 'native-all'));
  reject('erased-row-metadata', r => (positive(r).checkpoints[0].state.virtual.rows = []));
  reject(
    'wrong-rendered-count',
    r => (positive(r).checkpoints[0].state.virtual.rendered = rowCount)
  );
  reject('wrong-data-id', r => (positive(r).checkpoints[0].state.ids[0] = 'bogus'));
  reject(
    'hidden-requested-row',
    r =>
      (positive(r).checkpoints[1].state.virtual.rows.find(
        x => x.id === selectedVirtualKey
      ).visible = false)
  );
  reject('forged-visible-flag', r => {
    const row = positive(r).checkpoints[0].state.virtual.rows.find(x => !x.visible);
    assert(row);
    row.visible = true;
  });
  reject('missing-row-geometry-protocol', r => {
    delete positive(r).checkpoints[0].state.virtual.geometryVersion;
  });
  reject('forged-whole-row-flag', r => {
    const virtual = positive(r).checkpoints[0].state.virtual;
    const row = virtual.rows.find(row => !row.rowFullyVisible);
    assert(row);
    row.rowFullyVisible = true;
    virtual.fullyVisibleRows++;
  });
  reject('wrong-whole-row-count', r => {
    positive(r).checkpoints[0].state.virtual.fullyVisibleRows++;
  });
  reject('missing-whole-row-bounds', r => {
    positive(r).checkpoints[0].state.virtual.rows[0].rowRect = null;
  });
  reject('forged-row-clip', r => {
    positive(r).checkpoints[0].state.virtual.rows[0].rowClip.bottom++;
  });
  reject('invalid-client-scrollport', r => {
    const row = positive(r).checkpoints[0].state.virtual.rows.find(row => row.rowClipping.length);
    assert(row);
    row.rowClipping[0].rect.height++;
  });
  reject('wrong-selected-key', r => (positive(r).checkpoints[2].state.selected = '[]'));
  reject(
    'wrong-real-checkbox',
    r =>
      (positive(r).checkpoints[2].state.checkboxes.find(
        x => x.kind === 'input' && x.rowId === selectedVirtualKey
      ).checked = false)
  );
  reject('erased-real-checkbox', r => {
    const s = positive(r).checkpoints[2].state;
    s.checkboxes = s.checkboxes.filter(x => x.rowId !== selectedVirtualKey);
  });
  reject(
    'wrong-mount-membership',
    r => (positive(r).checkpoints[2].state.virtual.selectedRowMounted = false)
  );
  reject('invalid-viewport', r => (positive(r).checkpoints[0].state.virtual.viewport.height = 0));
  reject('wrong-pointer-row', r =>
    positive(r)
      .events.filter(e => e.rowId === selectedVirtualKey)
      .forEach(e => (e.rowId = 'entry-00000'))
  );
} else if (actual.workflow === 'lifecycle') {
  const state = (r, name) => positive(r).checkpoints.find(c => c.name === name).state;
  reject('wrong-workflow', r => (r.workflow = 'selection'));
  reject('wrong-ownership', r => (positive(r).ownership = 'native-all'));
  reject('wrong-displayed-id', r => (state(r, 'initial').ids[0] = 'bogus'));
  reject('stale-recovered-id', r => (state(r, 'recovered').ids[0] = 'entry-000'));
  reject('stale-loading-selection', r => (state(r, 'loading').selected = '["entry-001"]'));
  reject('stale-recovered-selection', r => (state(r, 'recovered').selected = '["entry-001"]'));
  reject('wrong-phase', r => (state(r, 'loading').lifecycle.phase = 'empty'));
  reject('wrong-app-status', r => (state(r, 'loading').lifecycle.statusText = 'No entries'));
  reject(
    'hidden-loading-indicator',
    r => (state(r, 'loading').lifecycle.loadingIndicators[0].visible = false)
  );
  reject('simultaneous-loading-empty', r =>
    state(r, 'loading').lifecycle.emptyIndicators.push({ text: 'No entries', visible: true })
  );
  reject('empty-counted-as-data', r => state(r, 'empty').ids.push('empty-row'));
  reject(
    'wrong-recovered-checkbox',
    r =>
      (state(r, 'reselected').checkboxes.find(
        c => c.kind === 'input' && c.rowId === 'entry-101'
      ).checked = false)
  );
  reject('erased-recovered-checkbox', r => {
    const s = state(r, 'reselected');
    s.checkboxes = s.checkboxes.filter(c => c.rowId !== 'entry-101');
  });
  reject('wrong-recovered-pointer-row', r =>
    positive(r)
      .events.filter(e => e.rowId === 'entry-101')
      .forEach(e => (e.rowId = 'entry-001'))
  );
  reject(
    'missing-native-toolbar-input',
    r => (positive(r).events = positive(r).events.filter(e => e.buttonText !== 'Start loading'))
  );
  reject('invalid-busy-observation', r =>
    state(r, 'initial').lifecycle.nativeBusy.push({
      tag: 'DIV',
      role: null,
      value: 'invalid',
      visible: true
    })
  );
} else if (actual.workflow === 'tree') {
  reject('wrong-workflow', r => (r.workflow = 'selection'));
  reject('wrong-ownership', r => (positive(r).ownership = 'native-all'));
  reject('wrong-displayed-id', r => (positive(r).checkpoints[0].state.ids[0] = 'bogus'));
  reject('erased-row-metadata', r => (positive(r).checkpoints[0].state.rows = []));
  reject('false-tree-level', r => (positive(r).checkpoints[0].state.rows[0].level = '99'));
  reject(
    'wrong-selected-key',
    r => (positive(r).checkpoints.find(c => c.name === 'selected').state.selected = '[]')
  );
  reject(
    'wrong-real-checkbox',
    r =>
      (positive(r)
        .checkpoints.find(c => c.name === 'selected')
        .state.checkboxes.find(c => c.kind === 'input' && c.rowId === 'north-budget').checked =
        false)
  );
  const semantic = actual.cases.find(c => c.functionalPassed && !c.semantics.passed);
  if (semantic) {
    reject('erased-semantic-failures', r => {
      const c = r.cases.find(c => c.functionalPassed && !c.semantics.passed);
      c.semantics = { passed: true, failures: [] };
      c.passed = true;
    });
  }
} else {
  reject('wrong-displayed-id', r => (positive(r).checkpoints[0].state.ids[0] = 'bogus'));
  reject(
    'wrong-selected-key',
    r => (positive(r).checkpoints.find(c => c.name === 'selected').state.selected = '[]')
  );
  reject('disabled-control-enabled', r =>
    positive(r)
      .checkpoints.find(c => c.name === 'disabled')
      .state.checkboxes.filter(c => c.rowId === 'entry-003')
      .forEach(c => (c.disabled = false))
  );
  reject(
    'disabled-pointer-wrong-row',
    r =>
      (positive(r).checkpoints.find(c => c.name === 'disabled').observation.point.rowId =
        'entry-004')
  );
  reject(
    'disabled-pointer-untrusted',
    r =>
      (positive(r).checkpoints.find(c => c.name === 'disabled').observation.events[0].trusted =
        false)
  );
}
const failure = actual.cases.find(c => !c.passed);
if (failure)
  reject('partial-failure-marked-success', r => (r.cases.find(c => !c.passed).passed = true));
console.log(
  JSON.stringify(
    {
      workflow: actual.workflow,
      browser,
      baseline: summary,
      mutationsRejected: results.length,
      results
    },
    null,
    2
  )
);
