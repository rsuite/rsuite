import assert from 'node:assert/strict';
import { bounded } from '../../cross-library-picker/runner/diagnostics.mjs';
const snapshot = page => page.evaluate(() => window.formBenchmark.snapshot());
const input = (page, name) => page.locator('[data-form-field=' + JSON.stringify(name) + '] input');
const button = (page, name) => page.getByRole('button', { name, exact: true });
async function appearance(page) {
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every(animation => !animation.pending && animation.playState !== 'running')
  );
  await page.evaluate(
    () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
}
async function settle(page) {
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.waitForFunction(() =>
      window.formBenchmark.snapshot().requests.every(row => row.state !== 'pending')
    );
    await appearance(page);
    if ((await snapshot(page)).requests.every(row => row.state !== 'pending')) return;
  }
  throw new Error('Validation requests did not settle');
}
function noErrors(state) {
  assert.deepEqual(state.errors, []);
  assert.ok(
    Object.values(state.fields).every(field => field.invalid !== 'true'),
    'No invalid input remains'
  );
}
async function expectErrors(page, entries) {
  await page.waitForFunction(expected => {
    const fields = window.formBenchmark.snapshot().fields;
    return Object.entries(expected).every(([name, message]) =>
      fields[name]?.errors.includes(message)
    );
  }, entries);
}

export async function runScenario(page, url, scenario, record, save) {
  record.network = [];
  record.networkErrors = [];
  record.referenceFindings = [];
  record.submitAttempts = [];
  const submit = async () => {
    const before = (await snapshot(page)).submits.length;
    const attempt = { mode: record.submitMode, before };
    record.submitAttempts.push(attempt);
    save();
    if (record.submitMode === 'keyboard')
      await page.locator('[data-form-field] input').last().press('Enter');
    else await button(page, 'Submit').click();
    try {
      await page.waitForFunction(
        count => window.formBenchmark.snapshot().submits.length > count,
        before
      );
    } catch (error) {
      throw new Error('Native ' + record.submitMode + ' submit was not observed', { cause: error });
    } finally {
      attempt.after = (await snapshot(page)).submits.length;
      save();
    }
    assert.equal(attempt.after, before + 1, 'Exactly one native submit event per attempt');
  };
  const held = new Map(),
    released = new Set(),
    waiters = new Map();
  const fulfill = (route, username) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ available: username !== 'taken' && !!username })
    });
  await page.route('**/availability?**', route =>
    (async () => {
      const value = new URL(route.request().url()).searchParams.get('username') ?? '';
      const shouldHold = record.phase === 'async-race' && ['taken', 'fresh'].includes(value);
      record.network.push({ value, held: shouldHold });
      if (shouldHold && !released.has(value)) {
        const routes = held.get(value) ?? [];
        routes.push(route);
        held.set(value, routes);
        waiters.get(value)?.();
      } else await fulfill(route, value);
    })().catch(async error => {
      record.networkErrors.push(String(error));
      save();
      await route.abort().catch(() => {});
    })
  );
  const waitHeld = value =>
    bounded(
      () =>
        held.has(value) ? Promise.resolve() : new Promise(resolve => waiters.set(value, resolve)),
      12000,
      'Expected validation request ' + value
    );
  const release = async value => {
    released.add(value);
    for (const route of held.get(value) ?? []) await fulfill(route, value);
  };
  const checkpoint = async name => {
    await settle(page);
    const state = await snapshot(page);
    record.states.push({ name, state });
    save();
    if (state.invalidReferences.length)
      record.referenceFindings.push({ name, references: state.invalidReferences });
    return state;
  };
  record.phase = 'navigation';
  await page.goto(url);
  await page.waitForFunction(() => window.formBenchmark?.ready());
  record.metadata = await page.evaluate(() => window.formBenchmark.metadata());
  assert.equal(record.metadata.production, true);
  assert.equal(record.metadata.reactVersion, '19.0.0');
  if (scenario === 'nested-validation') {
    record.phase = 'invalid-submit';
    await input(page, 'profile.email').fill('invalid');
    await input(page, 'password').fill('short');
    await input(page, 'confirmation').fill('different');
    await submit();
    await expectErrors(page, {
      'profile.email': 'Enter a valid email',
      password: 'Use at least eight characters',
      confirmation: 'Passwords must match'
    });
    let state = await checkpoint('invalid-nested-fields');
    assert.deepEqual(state.submissions, []);
    record.phase = 'valid-submit';
    await input(page, 'profile.email').fill('updated@example.com');
    await input(page, 'password').fill('updated123');
    await input(page, 'confirmation').fill('updated123');
    await submit();
    await page.waitForFunction(() => window.formBenchmark.snapshot().submissions.length === 1);
    state = await checkpoint('valid-nested-submission');
    noErrors(state);
    assert.equal(state.submissions[0].profile.email, 'updated@example.com');
    assert.equal(state.submissions[0].password, 'updated123');
    assert.equal(state.submissions[0].confirmation, 'updated123');
    assert.deepEqual(state.submissions[0].contacts, [{ email: 'first@example.com' }]);
  } else if (scenario === 'dynamic-fields') {
    record.phase = 'add-invalid-row';
    await button(page, 'Add contact').click();
    await input(page, 'contacts.1.email').waitFor();
    await submit();
    await expectErrors(page, { 'contacts.1.email': 'Enter a valid contact email' });
    let state = await checkpoint('new-row-invalid');
    assert.deepEqual(state.submissions, []);
    record.phase = 'shift-row';
    await input(page, 'contacts.1.email').fill('second@example.com');
    await button(page, 'Remove contact 1').click();
    await page.waitForFunction(
      () =>
        window.formBenchmark.snapshot().fields['contacts.0.email']?.value === 'second@example.com'
    );
    state = await checkpoint('remaining-row-shifted');
    assert.equal(Object.keys(state.fields).filter(name => name.startsWith('contacts.')).length, 1);
    record.phase = 'remove-invalid-row';
    await button(page, 'Add contact').click();
    await submit();
    await expectErrors(page, { 'contacts.1.email': 'Enter a valid contact email' });
    await button(page, 'Remove contact 2').click();
    await page.waitForFunction(() => !window.formBenchmark.snapshot().fields['contacts.1.email']);
    state = await checkpoint('removed-error-cleared');
    noErrors(state);
    record.phase = 'submit-dynamic-value';
    await submit();
    await page.waitForFunction(() => window.formBenchmark.snapshot().submissions.length === 1);
    state = await checkpoint('dynamic-submission');
    noErrors(state);
    assert.deepEqual(state.submissions[0].contacts, [{ email: 'second@example.com' }]);
  } else if (scenario === 'conditional-reset') {
    record.phase = 'required-conditional';
    await page.getByRole('checkbox', { name: 'Billing details', exact: true }).check();
    await submit();
    await expectErrors(page, { company: 'Company is required' });
    let state = await checkpoint('conditional-invalid');
    assert.deepEqual(state.submissions, []);
    await input(page, 'company').fill('Example Company');
    await input(page, 'profile.email').fill('changed@example.com');
    record.phase = 'unregister-conditional';
    await page.getByRole('checkbox', { name: 'Billing details', exact: true }).uncheck();
    await page.waitForFunction(() => {
      const state = window.formBenchmark.snapshot();
      return !state.fields.company && state.values.company === undefined;
    });
    state = await checkpoint('hidden-field-retired');
    noErrors(state);
    record.phase = 'reset';
    await button(page, 'Reset').click();
    await page.waitForFunction(
      () => window.formBenchmark.snapshot().fields['profile.email']?.value === 'seed@example.com'
    );
    state = await checkpoint('reset-restores-values');
    noErrors(state);
    assert.deepEqual(state.values.profile, { email: 'seed@example.com' });
    assert.equal(state.values.password, 'initial123');
    assert.equal(state.values.confirmation, 'initial123');
    assert.equal(state.values.username, 'ready');
    assert.deepEqual(state.values.contacts, [{ email: 'first@example.com' }]);
    assert.equal(state.values.company, undefined);
    assert.deepEqual(state.submissions, []);
  } else if (scenario === 'async-validation') {
    record.phase = 'async-race';
    await input(page, 'username').fill('taken');
    await input(page, 'username').press('Tab');
    await waitHeld('taken');
    // This checkpoint intentionally leaves the first HTTP request pending.
    await appearance(page);
    const pending = await snapshot(page);
    record.states.push({ name: 'old-request-pending', state: pending });
    save();
    assert.ok(pending.requests.some(row => row.value === 'taken' && row.state === 'pending'));
    if (pending.invalidReferences.length)
      record.referenceFindings.push({
        name: 'old-request-pending',
        references: pending.invalidReferences
      });
    await input(page, 'username').fill('fresh');
    await input(page, 'username').press('Tab');
    await waitHeld('fresh');
    await release('fresh');
    await page.waitForFunction(() =>
      window.formBenchmark
        .snapshot()
        .requests.some(row => row.value === 'fresh' && row.state === 'received')
    );
    await release('taken');
    let state = await checkpoint('new-result-retained');
    noErrors(state);
    assert.equal(state.values.username, 'fresh');
    record.phase = 'submit-latest';
    await submit();
    await page.waitForFunction(() => window.formBenchmark.snapshot().submissions.length === 1);
    state = await checkpoint('latest-value-submitted');
    noErrors(state);
    assert.equal(state.submissions[0].username, 'fresh');
  } else throw new Error('Unknown form scenario');
  const state = await snapshot(page);
  assert.ok(
    state.inputs.length && state.inputs.every(event => event.trusted),
    'All input events are native'
  );
  assert.ok(
    state.clicks.length && state.clicks.every(event => event.trusted),
    'All button events are native'
  );
  assert.ok(
    state.submits.length && state.submits.every(Boolean),
    'Native form submission events observed'
  );
  assert.deepEqual(record.networkErrors, [], 'Server substitute errors');
  assert.ok(
    state.keys.every(event => event.trusted),
    'All keyboard events are native'
  );
  record.workflowCompleted = true;
  assert.deepEqual(
    record.referenceFindings,
    [],
    'Broken form ID references observed during workflow'
  );
  record.phase = 'completed';
}
