import assert from 'node:assert/strict';
import { bounded } from './diagnostics.mjs';

const snapshot = page => page.evaluate(() => window.pickerAsync.snapshot());
const results = query => {
  const term = query.toLowerCase();
  const prefix = term.includes('initial')
    ? 'initial'
    : term.includes('recover')
      ? 'recover'
      : term.includes('alpha')
        ? 'alpha'
        : term.includes('beta')
          ? 'beta'
          : null;
  if (!prefix) return [];
  const title = prefix === 'recover' ? 'Recovered' : prefix[0].toUpperCase() + prefix.slice(1);
  const rows = Array.from({ length: 30 }, (_, index) => ({
    value: prefix + '-' + (index + 1),
    label: title + ' ' + (index + 1),
    disabled: index === 1
  }));
  return /\d/.test(term) ? rows.filter(item => item.label.toLowerCase() === term) : rows;
};
export async function runAsyncScenario(page, url, scenario, record, save) {
  const held = new Map();
  const waiters = new Map();
  const released = new Set();
  record.network = [];
  record.networkErrors = [];
  record.states = [];
  const fulfill = (route, query, status = 200) =>
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(
        status === 200 ? { items: results(query) } : { error: 'Controlled server failure' }
      )
    });
  await page.route('**/items?**', route =>
    (async () => {
      const query = new URL(route.request().url()).searchParams.get('query') ?? '';
      record.network.push({
        query,
        held: record.phase === 'race-order' && ['alpha', 'beta'].includes(query)
      });
      if (record.phase === 'race-order' && ['alpha', 'beta'].includes(query)) {
        if (released.has(query)) {
          await fulfill(route, query);
          return;
        }
        const routes = held.get(query) ?? [];
        routes.push(route);
        held.set(query, routes);
        waiters.get(query)?.(routes);
        return;
      }
      await fulfill(route, query, query === 'error' ? 500 : 200);
    })().catch(async error => {
      record.networkErrors.push(String(error));
      save();
      await route.abort().catch(() => {});
    })
  );
  const waitHeld = query =>
    bounded(
      () =>
        held.has(query)
          ? Promise.resolve(held.get(query))
          : new Promise(resolve => waiters.set(query, resolve)),
      12000,
      'Expected request ' + query
    );
  const release = async query => {
    released.add(query);
    for (const route of held.get(query) ?? []) await fulfill(route, query);
  };
  const checkpoint = async name => {
    await page.waitForFunction(() =>
      document
        .getAnimations()
        .every(animation => !animation.pending && animation.playState !== 'running')
    );
    await page.evaluate(
      () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    );
    const state = await snapshot(page);
    record.states.push({ name, state });
    save();
    assert.deepEqual(state.idReferenceFailures, [], 'Stale fixture ID reference at ' + name);
    return state;
  };
  const settleRequests = async () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      await page.waitForFunction(() => {
        const s = window.pickerAsync.snapshot();
        return !s.loading && s.requests.every(r => r.outcome !== 'pending');
      });
      await page.waitForFunction(() =>
        document
          .getAnimations()
          .every(animation => !animation.pending && animation.playState !== 'running')
      );
      await page.evaluate(
        () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      );
      const state = await snapshot(page);
      if (!state.loading && state.requests.every(r => r.outcome !== 'pending')) return;
    }
    throw new Error('Selection-triggered search requests did not settle');
  };
  const open = async () => {
    if ((await snapshot(page)).expanded) return;
    const button = page.locator('#root [aria-label="Open items"]');
    await ((await button.count()) ? button : page.locator('#root [role="combobox"]')).click();
    await page.waitForFunction(() => {
      const state = window.pickerAsync.snapshot();
      return state.expanded && state.popupVisible;
    });
  };
  const input = async () => {
    const popupInput = page.locator('.benchmark-popup input:not([type="hidden"])');
    return (await popupInput.count())
      ? popupInput.first()
      : page.locator('#root input[role="combobox"]');
  };
  const search = async query => {
    await open();
    await (await input()).fill(query);
  };
  record.phase = 'navigation';
  await page.goto(url);
  await page.waitForFunction(() => window.pickerAsync?.ready);
  record.metadata = await page.evaluate(() => window.pickerAsync.metadata());
  assert.equal(record.metadata.production, true);
  assert.equal(record.metadata.reactVersion, '19.0.0');
  await open();
  if (scenario === 'response-order') {
    record.phase = 'race-order';
    await search('alpha');
    await waitHeld('alpha');
    await page.waitForFunction(() => {
      const s = window.pickerAsync.snapshot();
      return s.loading && s.query === 'alpha' && s.visibleValues.length === 0;
    });
    await checkpoint('alpha-pending');
    await search('beta');
    await waitHeld('beta');
    await release('beta');
    await page.waitForFunction(() => {
      const s = window.pickerAsync.snapshot();
      return !s.loading && s.itemValues[0] === 'beta-1' && s.firstVisible === 'beta-1';
    });
    await release('alpha');
    await page.waitForFunction(() => {
      const older = window.pickerAsync.snapshot().requests.filter(r => r.query === 'alpha');
      return older.length > 0 && older.every(r => r.outcome === 'ignored');
    });
    const state = await checkpoint('newer-response-retained');
    assert.ok(state.itemValues.every(value => value.startsWith('beta-')));
    record.phase = 'keyboard-selection';
    const currentInput = await input();
    await currentInput.focus();
    for (let index = 0; index < 4 && (await snapshot(page)).activeValue !== 'beta-1'; index++)
      await page.keyboard.press('ArrowDown');
    await page.waitForFunction(() => window.pickerAsync.snapshot().activeValue === 'beta-1');
    await page.keyboard.press('ArrowDown');
    await page.waitForFunction(() => {
      const s = window.pickerAsync.snapshot();
      return (
        s.activeValue === 'beta-3' &&
        s.activeReferenceConnected &&
        s.fullyVisibleValues.includes('beta-3')
      );
    });
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => window.pickerAsync.snapshot().selected === 'beta-3');
    await settleRequests();
    const selected = await checkpoint('disabled-result-skipped-and-selected');
    assert.deepEqual(selected.selections, ['beta-3']);
    assert.ok(selected.keys.length && selected.keys.every(key => key.trusted));
    assert.ok(
      ['alpha', 'beta'].every(value =>
        selected.inputs.some(input => input.value === value && input.trusted)
      )
    );
  } else {
    record.phase = 'initial-selection';
    await page.locator('[data-bench-value="initial-1"]').click();
    await page.waitForFunction(() => window.pickerAsync.snapshot().selected === 'initial-1');
    await settleRequests();
    record.phase = 'server-error';
    await search('error');
    await page.waitForFunction(() => {
      const s = window.pickerAsync.snapshot();
      return !s.loading && s.error?.includes('500');
    });
    let state = await checkpoint('failed-search');
    assert.equal(state.selected, 'initial-1');
    assert.deepEqual(state.selections, ['initial-1']);
    record.phase = 'empty-response';
    await search('none');
    await page.waitForFunction(() => {
      const s = window.pickerAsync.snapshot();
      return !s.loading && !s.error && s.itemValues.length === 0 && s.emptyVisible;
    });
    state = await checkpoint('empty-search');
    assert.equal(state.selected, 'initial-1');
    record.phase = 'successful-recovery';
    await search('recover');
    await page.waitForFunction(() => {
      const s = window.pickerAsync.snapshot();
      return !s.loading && s.firstVisible === 'recover-1';
    });
    await page.locator('[data-bench-value="recover-3"]').click();
    await page.waitForFunction(() => window.pickerAsync.snapshot().selected === 'recover-3');
    await settleRequests();
    state = await checkpoint('recovered-selection');
    assert.deepEqual(state.selections, ['initial-1', 'recover-3']);
    assert.ok(
      ['error', 'none', 'recover'].every(value =>
        state.inputs.some(input => input.value === value && input.trusted)
      )
    );
  }
  assert.deepEqual(record.networkErrors, [], 'Async server substitute failed');
  record.phase = 'completed';
}
