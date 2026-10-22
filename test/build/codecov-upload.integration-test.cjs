const assert = require('node:assert/strict');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const { verifyUploadOutcomes } = require('../../scripts/check-codecov-upload-ci.cjs');

test('coverage delivery requires one successful attempt after only failures', () => {
  const states = ['success', 'failure', 'skipped', 'cancelled', '', 'unknown', undefined, null];
  let accepted = 0;

  for (const first of states) {
    for (const second of states) {
      for (const third of states) {
        const outcomes = [first, second, third];
        const success = outcomes.indexOf('success');
        const valid =
          success !== -1 &&
          outcomes.slice(0, success).every(value => value === 'failure') &&
          outcomes.slice(success + 1).every(value => value === 'skipped');

        if (valid) {
          assert.equal(verifyUploadOutcomes(outcomes), success + 1);
          accepted++;
        } else {
          assert.throws(() => verifyUploadOutcomes(outcomes), /did not complete successfully/);
        }
      }
    }
  }

  assert.equal(accepted, 3);
  for (const malformed of [undefined, null, 'success', [], ['success'], Array(4).fill('success')]) {
    assert.throws(() => verifyUploadOutcomes(malformed), /did not complete successfully/);
  }
});

test('the required CI command fails when delivery is absent, cancelled or exhausted', () => {
  const script = path.resolve(__dirname, '../../scripts/check-codecov-upload-ci.cjs');
  const cases = [
    { outcomes: ['success', 'skipped', 'skipped'], status: 0 },
    { outcomes: ['failure', 'success', 'skipped'], status: 0 },
    { outcomes: ['failure', 'failure', 'success'], status: 0 },
    { outcomes: ['failure', 'failure', 'failure'], status: 1 },
    { outcomes: ['cancelled', 'skipped', 'skipped'], status: 1 },
    { outcomes: ['skipped', 'skipped', 'skipped'], status: 1 },
    { outcomes: ['success', 'failure', 'skipped'], status: 1 },
    { outcomes: ['', '', ''], status: 1 }
  ];

  for (const { outcomes, status } of cases) {
    const result = spawnSync(process.execPath, [script], {
      encoding: 'utf8',
      env: {
        ...process.env,
        CODECOV_ATTEMPT_1: outcomes[0],
        CODECOV_ATTEMPT_2: outcomes[1],
        CODECOV_ATTEMPT_3: outcomes[2]
      }
    });
    assert.equal(result.error, undefined);
    assert.equal(result.status, status, JSON.stringify(outcomes));
    assert.match(status === 0 ? result.stdout : result.stderr, /Coverage delivery/);
  }
});
