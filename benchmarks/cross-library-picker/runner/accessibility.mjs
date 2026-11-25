import assert from 'node:assert/strict';
import { bounded } from './diagnostics.mjs';
import { referenceFailures } from './accessibility-report.mjs';

export const axeOptions = {
  runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }
};

export const snapshot = page => page.evaluate(() => window.pickerBenchmark.snapshot());

export async function runAxe(page, options = axeOptions, timeoutMs = 30000) {
  return bounded(
    () => page.evaluate(options => window.axe.run(document, options), options),
    timeoutMs,
    'Accessibility scan'
  );
}

async function relationships(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll('[role="combobox"]')].map(element => ({
      html: element.outerHTML,
      expanded: element.getAttribute('aria-expanded') === 'true',
      references: [
        'aria-controls',
        'aria-activedescendant',
        'aria-labelledby',
        'aria-describedby'
      ].map(attribute => ({
        attribute,
        value: element.getAttribute(attribute),
        targets: (element.getAttribute(attribute) ?? '')
          .split(/\s+/)
          .filter(Boolean)
          .map(id => {
            const target = document.getElementById(id);
            return {
              id,
              exists: !!target,
              role: target?.getAttribute('role'),
              ariaHidden: target ? !!target.closest('[aria-hidden="true"]') : null,
              text: target?.textContent?.slice(0, 100)
            };
          })
      }))
    }))
  );
}

async function settledAppearance(page) {
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every(animation => !animation.pending && animation.playState !== 'running')
  );
  await page.evaluate(
    () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
  return page.evaluate(() =>
    [...document.querySelectorAll('[data-bench-value]')].slice(0, 3).map(element => {
      const ancestors = [];
      for (let node = element; node; node = node.parentElement) {
        const style = getComputedStyle(node);
        ancestors.push({
          tag: node.tagName,
          className: String(node.className),
          opacity: style.opacity,
          background: style.backgroundColor
        });
      }
      return { html: element.outerHTML, color: getComputedStyle(element).color, ancestors };
    })
  );
}

async function captureState(page, state) {
  const appearance = await settledAppearance(page);
  const refs = await relationships(page);
  return {
    state,
    settledAppearance: appearance,
    snapshot: await snapshot(page),
    relationships: refs,
    referenceFailures: referenceFailures(refs),
    axe: await runAxe(page)
  };
}

/** The same four visible states and native keyboard path for every adapter. */
export async function auditPicker(page, url, axePath, axeVersion, record, save) {
  record.phase = 'navigation';
  await page.goto(url);
  await page.waitForFunction(() => window.pickerBenchmark?.ready === true);
  await page.addScriptTag({ path: axePath });
  record.axeVersion = await page.evaluate(() => window.axe.version);
  assert.equal(
    record.axeVersion,
    axeVersion,
    'Injected axe version differs from the recorded engine'
  );
  record.metadata = await page.evaluate(() => window.pickerBenchmark.metadata());
  record.phase = 'scan-closed';
  record.states.push(await captureState(page, 'closed'));
  save();
  record.phase = 'opening';
  const button = page.locator('#root [aria-label="Open items"]');
  await ((await button.count()) ? button : page.locator('#root [role="combobox"]')).click();
  await page.waitForFunction(() => {
    const state = window.pickerBenchmark.snapshot();
    return state.expanded && state.popupVisible && state.visibleValues.length > 0;
  });
  record.phase = 'scan-open';
  record.states.push(await captureState(page, 'open'));
  save();
  assert.equal(await page.getByRole('combobox', { name: 'Items', exact: true }).count(), 1);
  if ((await snapshot(page)).activeValue !== '1') await page.keyboard.press('ArrowDown');
  for (let value = 1; value <= 21; value++) {
    record.phase = 'keyboard-navigation';
    record.expectedActiveValue = String(value);
    if (value > 1) await page.keyboard.press('ArrowDown');
    await page.waitForFunction(value => {
      const state = window.pickerBenchmark.snapshot();
      return (
        state.activeValue === String(value) &&
        state.activeReferenceConnected &&
        state.fullyVisibleValues.includes(String(value))
      );
    }, value);
  }
  delete record.expectedActiveValue;
  record.phase = 'scan-keyboard-scrolled';
  record.states.push(await captureState(page, 'keyboard-scrolled'));
  save();
  record.phase = 'empty-search';
  const popupInput = page.locator('.benchmark-popup input:not([type="hidden"])');
  await (
    (await popupInput.count()) ? popupInput.first() : page.locator('#root input[role="combobox"]')
  ).fill('no-such-option');
  await page.waitForFunction(() => {
    const state = window.pickerBenchmark.snapshot();
    return state.expanded && state.emptyVisible && state.visibleValues.length === 0;
  });
  record.phase = 'scan-empty-search';
  record.states.push(await captureState(page, 'empty-search'));
  save();
}

/** A separate injected fault proves the pinned engine actually detects a known defect. */
async function labelControl(page) {
  await page.evaluate(() => {
    const input = document.createElement('input');
    input.id = 'a11y-negative-control';
    document.body.appendChild(input);
  });
  try {
    assert.equal(
      await page.getByRole('textbox').count(),
      1,
      'Known fault must be in the accessibility tree'
    );
    const result = await runAxe(page, { runOnly: { type: 'rule', values: ['label'] } });
    assert.ok(
      result.violations.some(
        rule =>
          rule.id === 'label' &&
          rule.nodes.some(node => node.target.includes('#a11y-negative-control'))
      ),
      'axe did not detect the injected unlabelled input'
    );
    return { rule: 'label', knownUnlabelledInputDetected: true, injectedElementRemoved: true };
  } finally {
    await page.locator('#a11y-negative-control').evaluate(element => element.remove());
  }
}

export async function verifyEngineControl(browser, axePath) {
  // A library popup may hide unrelated DOM; verify the engine in an isolated document.
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.setDefaultTimeout(12000);
  try {
    await page.setContent(
      '<!doctype html><html lang="en"><head><title>Accessibility engine control</title></head><body><main>Engine control</main></body></html>'
    );
    await page.addScriptTag({ path: axePath });
    return { ...(await labelControl(page)), isolatedDocument: true };
  } finally {
    await page.close();
  }
}
