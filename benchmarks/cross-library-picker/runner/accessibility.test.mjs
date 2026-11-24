import assert from 'node:assert/strict';
import test from 'node:test';
import { auditStates, referenceFailures, auditSummary } from './accessibility-report.mjs';
import { runAxe } from './accessibility.mjs';

const refs = (expanded, attribute, targets) => [{ expanded, references: [{ attribute, targets }] }];
const clean = () => ({
  complete: true,
  cases: [
    {
      status: 'completed',
      states: auditStates.map(state => ({
        state,
        referenceFailures: [],
        axe: { violations: [], incomplete: [] }
      }))
    }
  ],
  controls: [{ knownUnlabelledInputDetected: true }]
});

test('closed unmounted popup is allowed; expanded missing, empty or wrong-role targets fail', () => {
  const missing = [{ id: 'popup', exists: false }];
  assert.deepEqual(referenceFailures(refs(false, 'aria-controls', missing)), []);
  assert.equal(referenceFailures(refs(true, 'aria-controls', missing)).length, 1);
  assert.equal(referenceFailures(refs(true, 'aria-controls', [])).length, 1);
  assert.equal(
    referenceFailures(refs(true, 'aria-controls', [{ id: 'popup', exists: true, role: 'group' }]))
      .length,
    1
  );
  assert.deepEqual(
    referenceFailures(
      refs(true, 'aria-controls', [{ id: 'popup', exists: true, role: 'listbox' }])
    ),
    []
  );
});

test('stale active-descendant and missing label/description IDs are retained even when closed', () => {
  for (const attribute of ['aria-activedescendant', 'aria-labelledby', 'aria-describedby']) {
    assert.equal(
      referenceFailures(refs(false, attribute, [{ id: 'absent', exists: false }])).length,
      1
    );
  }
});

test('violations, reference failures, missing states, missing cases or an absent engine control cannot pass', () => {
  const mutations = [
    report => report.cases[0].states[0].axe.violations.push({ id: 'color-contrast' }),
    report => report.cases[0].states[0].referenceFailures.push({ id: 'popup' }),
    report => report.cases[0].states.pop(),
    report => report.cases.pop(),
    report => report.controls.pop(),
    report => {
      report.cases[0].status = 'failed';
    },
    report => {
      report.complete = false;
    },
    report => {
      report.error = 'browser failed';
    },
    report => {
      report.cases[0].browserErrors = ['late error'];
    }
  ];
  for (const mutate of mutations) {
    const report = clean();
    mutate(report);
    assert.equal(auditSummary(report, 1).exitCode, 1);
  }
  assert.equal(auditSummary(clean(), 1).exitCode, 0);
});

test('manual incomplete results survive a clean automated outcome without certifying conformance', () => {
  const report = clean();
  report.cases[0].states[0].axe.incomplete.push({ id: 'color-contrast' });
  const result = auditSummary(report, 1);
  assert.equal(result.incompleteRules, 1);
  assert.equal(result.exitCode, 0);
  assert.equal(result.manualReviewRequired, true);
  assert.equal(result.conformance, 'not assessed');
});

test('a nonresponsive browser audit rejects at its outer deadline', async () => {
  await assert.rejects(
    runAxe({ evaluate: () => new Promise(() => {}) }, undefined, 15),
    /Accessibility scan exceeded 15ms/
  );
});
