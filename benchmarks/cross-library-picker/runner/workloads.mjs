const bridge = page => page.evaluate(() => window.pickerBenchmark.snapshot());

async function settled(page, predicate, argument) {
  await page.waitForFunction(
    ({ predicateSource, argument }) => {
      const state = window.pickerBenchmark.snapshot();
      return Function(
        'state',
        'argument',
        'return (' + predicateSource + ')(state, argument)'
      )(state, argument);
    },
    { predicateSource: String(predicate), argument },
    { timeout: 12000 }
  );
}

async function trigger(page) {
  const button = page.locator('#root [aria-label="Open items"]');
  return (await button.count()) ? button : page.locator('#root [role="combobox"]');
}

async function open(page) {
  if (!(await bridge(page)).expanded) await (await trigger(page)).click();
  await settled(
    page,
    state => state.expanded && state.popupVisible && state.visibleValues.length > 0
  );
}

async function close(page) {
  if ((await bridge(page)).expanded) await page.keyboard.press('Escape');
  await settled(page, state => !state.expanded);
}

async function input(page) {
  const insidePopup = page.locator('.benchmark-popup input:not([type="hidden"])');
  return (await insidePopup.count())
    ? insidePopup.first()
    : page.locator('#root input[role="combobox"]');
}

async function prepareSearch(page) {
  const element = await input(page);
  await element.click();
  await element.fill('');
  await settled(page, state => state.firstVisible === '1');
  await element.press('ControlOrMeta+A');
}

async function measured(page, condition, action) {
  await page.evaluate(condition => window.pickerBenchmark.arm(condition), condition);
  await action();
  await page.waitForFunction(
    () => ['complete', 'failed'].includes(window.pickerBenchmark.result().status),
    null,
    { timeout: 12000 }
  );
  const result = await page.evaluate(() => window.pickerBenchmark.result());
  if (result.status !== 'complete') throw new Error(result.error);
  if (!result.sample.trusted) throw new Error('Untrusted event');
  return result.sample;
}

export async function runWorkload(page, url, { size, warmups, iterations }) {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const navigate = async () => {
    await page.goto(url);
    await page.waitForFunction(() => window.pickerBenchmark?.ready === true);
  };
  await navigate();
  const metadata = await page.evaluate(() => window.pickerBenchmark.metadata());
  if (!metadata.production) throw new Error('Development fixture is forbidden');
  const firstOpen = await measured(
    page,
    { event: 'pointerdown', kind: 'open', first: '1' },
    async () => (await trigger(page)).click()
  );
  await close(page);

  await open(page);
  const scrollTarget = await page.evaluate(() => {
    const popup = document.querySelector('.benchmark-popup');
    const candidates = [popup, ...popup.querySelectorAll('*')]
      .filter(
        element =>
          element instanceof HTMLElement &&
          element.clientHeight >= 72 &&
          element.scrollHeight > element.clientHeight + 1 &&
          /auto|scroll|hidden/.test(getComputedStyle(element).overflowY)
      )
      .sort((a, b) => b.scrollHeight - a.scrollHeight);
    const target = candidates[0];
    if (!target) return null;
    target.setAttribute('data-benchmark-scroll-target', '');
    return target.scrollHeight;
  });
  if (scrollTarget === null) throw new Error('Expected a real scrollable viewport');
  await page.locator('[data-benchmark-scroll-target]').hover();
  await page.mouse.wheel(0, scrollTarget);
  await page.waitForFunction(
    () => document.querySelector('[data-benchmark-scroll-target]').scrollTop > 0
  );
  await page.locator('[data-benchmark-scroll-target]').evaluate(element => {
    element.scrollTop = element.scrollHeight;
  });
  await settled(page, (state, last) => state.fullyVisibleValues.includes(last), String(size));
  await page.locator('[data-benchmark-scroll-target]').evaluate(element => {
    element.scrollTop = 0;
  });
  await settled(page, state => state.firstVisible === '1');
  await close(page);

  const samples = { warmOpen: [], filterSparse: [], filterEmpty: [], keyboard: [] };
  for (let trial = -warmups; trial < iterations; trial++) {
    const sample = await measured(
      page,
      { event: 'pointerdown', kind: 'open', first: '1' },
      async () => (await trigger(page)).click()
    );
    if (trial >= 0) samples.warmOpen.push(sample);
    await close(page);
  }

  await open(page);
  for (const [name, query, first] of [
    ['filterSparse', 'match', '100'],
    ['filterEmpty', 'no-such-option', null]
  ]) {
    for (let trial = -warmups; trial < iterations; trial++) {
      await prepareSearch(page);
      const sample = await measured(page, { event: 'input', kind: 'filter', first }, () =>
        page.keyboard.insertText(query)
      );
      if (trial >= 0) samples[name].push(sample);
    }
  }

  await prepareSearch(page);
  await page.keyboard.insertText('Item ' + size);
  await settled(page, (state, value) => state.firstVisible === value, String(size));
  await page.keyboard.press('ArrowDown');
  await settled(
    page,
    (state, value) => state.activeReferenceConnected && state.activeValue === value,
    String(size)
  );
  await page.keyboard.press('Enter');
  await settled(page, (state, value) => !state.expanded && state.selected === value, String(size));
  const preflight = {
    trustedWheelProgressPassed: true,
    fullScrollRangeLayoutPassed: true,
    lastItemFilterAndSelectionPassed: true,
    lastValue: String(size)
  };

  for (let trial = -warmups; trial < iterations; trial++) {
    await navigate();
    await open(page);
    let state = await bridge(page);
    if (state.activeValue !== '1') await page.keyboard.press('ArrowDown');
    await settled(page, state => state.activeValue === '1' && state.activeReferenceConnected);
    const keys = [];
    for (let value = 2; value <= 21; value++) {
      keys.push(
        await measured(page, { event: 'keydown', kind: 'key', value: String(value) }, () =>
          page.keyboard.press('ArrowDown')
        )
      );
    }
    await page.keyboard.press('Enter');
    await settled(page, state => !state.expanded && state.selected === '21');
    if (trial >= 0) samples.keyboard.push(keys);
  }
  if (errors.length) throw new Error('Browser errors: ' + errors.join('; '));
  return { metadata, firstOpen, preflight, samples, browserErrors: errors };
}
