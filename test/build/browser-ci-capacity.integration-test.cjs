const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const yaml = require('js-yaml');

const root = path.resolve(__dirname, '../..');
const read = name => yaml.load(fs.readFileSync(path.join(root, '.github/workflows', name), 'utf8'));
const workflows = {
  main: read('nodejs-ci.yml'),
  chromium: read('chromium-tests.yml'),
  firefox: read('firefox-tests.yml')
};

function verify(workflows) {
  for (const engine of ['chromium', 'firefox']) {
    const job = workflows[engine].jobs.test;
    assert.equal(job['timeout-minutes'], 30);
    assert.equal(job['runs-on'], 'ubuntu-24.04');
    assert.equal(job.strategy['fail-fast'], false);
    assert.deepEqual(job.strategy.matrix.include, [
      { suite: 'components', shard: 1, shards: 2 },
      { suite: 'components', shard: 2, shards: 2 },
      { suite: 'native', shard: 1, shards: 4 },
      { suite: 'native', shard: 2, shards: 4 },
      { suite: 'native', shard: 3, shards: 4 },
      { suite: 'native', shard: 4, shards: 4 }
    ]);
    const component = job.steps.find(step => step.id === 'component-tests');
    assert.equal(component.if, "matrix.suite == 'components'");
    assert.equal(
      component.run,
      'npm run test:ci -- --browser.headless --shard=${{ matrix.shard }}/${{ matrix.shards }}'
    );
    const native = job.steps.find(step => step.name === 'Run native browser control tests');
    assert.equal(native.if, "matrix.suite == 'native'");
    assert.equal(
      native.run,
      'npm run test:browser-controls -- --shard=${{ matrix.shard }}/${{ matrix.shards }}'
    );
    const coverage = job.steps.find(step => step.name === 'Retain browser coverage');
    assert.equal(coverage.if, "matrix.suite == 'components'");
    assert.equal(
      coverage.with.name,
      `browser-coverage-${engine}-\${{ inputs.react-version }}-\${{ matrix.shard }}`
    );
    assert(!job['continue-on-error']);
    assert(job.steps.every(step => !step['continue-on-error']));
  }

  const jobs = workflows.main.jobs;
  for (const [id, commands] of [
    [
      'public-types',
      [
        'npm ci --legacy-peer-deps',
        'npm ci --prefix test/public-declarations --legacy-peer-deps --ignore-scripts',
        'npm run build:ts && npm run build:types',
        'npm run test:public-types'
      ]
    ],
    [
      'public-runtime',
      [
        'npm ci --legacy-peer-deps',
        'npm ci --prefix test/public-runtime --legacy-peer-deps --ignore-scripts',
        'node scripts/install-browser-ci.cjs chromium\nnode scripts/install-browser-ci.cjs firefox\n',
        'npm run build:ts && npm run build:types && npm run dist',
        'npm run test:public-runtime',
        'npm run test:public-umd'
      ]
    ]
  ]) {
    const job = jobs[id];
    assert.equal(job['timeout-minutes'], 10);
    assert.equal(job['runs-on'], 'ubuntu-24.04');
    assert.equal(
      job.steps.find(step => step.uses === 'actions/setup-node@v4').with['node-version'],
      '22'
    );
    assert.deepEqual(
      job.steps.filter(step => step.run).map(step => step.run),
      commands
    );
    for (const command of commands) {
      const matches = job.steps.filter(step => step.run === command);
      assert.equal(matches.length, 1, command);
      assert.equal(matches[0].if, undefined, command);
    }
    assert(!job['continue-on-error']);
    assert(job.steps.every(step => !step['continue-on-error']));
    const artifact = job.steps.find(step => step.uses === 'actions/upload-artifact@v4');
    assert.equal(artifact.if, 'always()');
    assert.equal(
      artifact.with.name,
      id === 'public-types' ? 'public-declaration-consumers' : 'public-runtime-consumers'
    );
    assert.equal(
      artifact.with.path,
      id === 'public-types' ? 'test/public-declarations/results' : 'test/public-runtime/results'
    );
  }
  const gate = jobs['public-declarations'];
  assert.equal(gate.name, 'Public declarations');
  assert.deepEqual(gate.needs, ['public-types', 'public-runtime']);
  assert.equal(gate.if, 'always()');
  assert.equal(gate['timeout-minutes'], 10);
  assert.deepEqual(gate.steps[0].env, {
    DECLARATION_RESULT: '${{ needs.public-types.result }}',
    RUNTIME_RESULT: '${{ needs.public-runtime.result }}'
  });
  assert(!gate['continue-on-error']);
  assert(gate.steps.every(step => !step['continue-on-error']));
  const summaries = Object.values(jobs).filter(job =>
    /^Test \((chromium|firefox), React/.test(job.name)
  );
  assert.equal(summaries.length, 6);
  for (const summary of summaries) {
    assert.equal(summary.if, 'always()');
    assert(summary.needs.includes('coverage'));
    assert.equal(
      summary.steps[0].run,
      'test "$SHARD_RESULT" = success && test "$COVERAGE_RESULT" = success'
    );
  }
}

test('CI partitions retain component coverage, native files and both public consumers', () => {
  verify(workflows);
});

test('the required public check rejects failed, cancelled, skipped and absent results', () => {
  const command = workflows.main.jobs['public-declarations'].steps[0].run;
  const outcomes = ['success', 'failure', 'cancelled', 'skipped', '', null];
  for (const declaration of outcomes) {
    for (const runtime of outcomes) {
      const environment = { ...process.env };
      delete environment.DECLARATION_RESULT;
      delete environment.RUNTIME_RESULT;
      if (declaration !== null) environment.DECLARATION_RESULT = declaration;
      if (runtime !== null) environment.RUNTIME_RESULT = runtime;
      const result = spawnSync('sh', ['-c', command], {
        env: environment,
        encoding: 'utf8'
      });
      assert.equal(result.status === 0, declaration === 'success' && runtime === 'success');
    }
  }
});

test('workflow guards reject lost shards, skipped consumers and missing UMD checks', () => {
  for (const mutate of [
    value => value.firefox.jobs.test.strategy.matrix.include.pop(),
    value => {
      value.chromium.jobs.test.strategy['fail-fast'] = true;
    },
    value => {
      value.main.jobs['public-types'].steps.find(
        step => step.run === 'npm run test:public-types'
      ).if = 'false';
    },
    value => {
      value.main.jobs['public-runtime'].steps = value.main.jobs['public-runtime'].steps.filter(
        step => step.run !== 'npm run test:public-umd'
      );
    },
    value => {
      value.main.jobs['public-declarations'].needs.pop();
    },
    value => {
      value.main.jobs['public-runtime'].steps.find(
        step => step.name === 'Install UMD consumer browsers'
      ).run = 'node scripts/install-browser-ci.cjs chromium';
    },
    value => {
      value.main.jobs['public-runtime'].steps.find(
        step => step.uses === 'actions/upload-artifact@v4'
      ).with.name = 'public-declaration-consumers';
    }
  ]) {
    const altered = structuredClone(workflows);
    mutate(altered);
    assert.throws(() => verify(altered));
  }
});
