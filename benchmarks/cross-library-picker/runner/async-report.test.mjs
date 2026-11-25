import test from 'node:test';
import assert from 'node:assert/strict';
import { asyncSummary } from './async-report.mjs';
const clean = () => ({
  complete: true,
  cases: [
    {
      scenario: 'response-order',
      status: 'completed',
      states: [
        'alpha-pending',
        'newer-response-retained',
        'disabled-result-skipped-and-selected'
      ].map(name => ({ name })),
      browserErrors: []
    }
  ]
});
test('failed, partial and browser-error async runs cannot pass', () => {
  for (const mutate of [
    r => r.cases.pop(),
    r => r.cases[0].states.pop(),
    r => {
      r.complete = false;
    },
    r => {
      r.cases[0].status = 'failed';
    },
    r => {
      r.cases[0].states[1].name = 'alpha-pending';
    },
    r => r.cases[0].browserErrors.push('runtime failure'),
    r => {
      r.error = 'server failure';
    }
  ]) {
    const report = clean();
    mutate(report);
    assert.equal(asyncSummary(report, 1).exitCode, 1);
  }
  assert.equal(asyncSummary(clean(), 1).exitCode, 0);
});
