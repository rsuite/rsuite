import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { serveStatic } from './static-server.mjs';

// Use the SDK's frozen Playwright installation for both local and CI execution.
const require = createRequire(new URL('../../package.json', import.meta.url));
const { chromium, firefox } = require('playwright');
const storybook = path.resolve(import.meta.dirname, '..');
const results = path.join(storybook, 'test-results');
fs.mkdirSync(results, { recursive: true });
const index = JSON.parse(
  fs.readFileSync(path.join(storybook, 'storybook-static/index.json'), 'utf8')
);
for (const id of [
  'welcome--docs',
  'components-button--default',
  'components-button--disabled',
  'components-selectpicker--default',
  'components-form--default',
  'components-table--default'
]) {
  assert(index.entries[id], `Missing Storybook entry: ${id}`);
}
const report = {
  playwright: require('playwright/package.json').version,
  entries: Object.keys(index.entries).length,
  scope:
    'Storybook development workflows; the single-story axe report does not establish library-wide accessibility conformance.',
  browsers: []
};
const server = await serveStatic(path.join(storybook, 'storybook-static'));
const style = node => {
  const css = getComputedStyle(node);
  return { font: css.fontFamily, color: css.color, background: css.backgroundColor };
};
const settle = node =>
  Promise.all(
    node.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {}))
  );

try {
  for (const [name, engine] of Object.entries({ chromium, firefox })) {
    const browser = await engine.launch();
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      colorScheme: 'light'
    });
    const row = { name, version: browser.version(), errors: [], httpErrors: [], passed: false };
    report.browsers.push(row);
    page.on('pageerror', error => row.errors.push(String(error)));
    page.on('response', response => {
      if (response.status() >= 400 && response.url().startsWith(server.origin)) {
        row.httpErrors.push({
          status: response.status(),
          url: response.url().replace(server.origin, '')
        });
      }
    });
    const frame = page.frameLocator('#storybook-preview-iframe');
    const visit = id => page.goto(server.origin + '/?path=' + id);
    try {
      await visit('/story/components-button--default');
      await frame.getByRole('button', { name: 'Button', exact: true }).waitFor();
      await page.getByRole('tab', { name: /^Controls/ }).click();
      const children = page
        .getByRole('row')
        .filter({ has: page.getByText('children', { exact: true }) });
      await children.locator('textarea, input[type="text"]').first().fill('Edited in Controls');
      const button = frame.getByRole('button', { name: 'Edited in Controls', exact: true });
      await button.waitFor();
      row.controlsEditApplied = true;

      await page.getByRole('tab', { name: /^Actions/ }).click();
      await page.getByRole('button', { name: 'Clear', exact: true }).waitFor();
      await button.click();
      await page
        .getByText(/^onClick:/)
        .first()
        .waitFor();
      row.actionLogged = true;

      await page.mouse.move(100, 100);
      await button.evaluate(settle);
      row.light = await button.evaluate(style);
      assert(row.light.font.includes('sans-serif'), 'SDK global font style was not loaded');
      await page.getByRole('button', { name: 'Change theme to dark mode', exact: true }).click();
      await frame.locator('body.rs-theme-dark').waitFor();
      await button.evaluate(settle);
      row.dark = await button.evaluate(style);
      assert(
        row.light.background !== row.dark.background || row.light.color !== row.dark.color,
        'Theme class changed without changing the rendered component colors'
      );
      await page.getByRole('button', { name: 'Change theme to light mode', exact: true }).click();
      await frame.locator('body.rs-theme-light').waitFor();
      row.themesApplied = true;

      await visit('/story/components-button--default&args=disabled:true');
      const disabled = frame.getByRole('button', { name: 'Button', exact: true });
      await disabled.waitFor();
      await frame.locator('button:disabled').waitFor();
      assert(
        await disabled.isDisabled(),
        'Generated public prop metadata did not accept the disabled argument'
      );
      row.propMetadataApplied = true;
      await page.getByRole('tab', { name: /^Accessibility/ }).click();
      await page.getByText('No accessibility violations found.', { exact: true }).waitFor();
      row.accessibilityReport = await page.locator('#storybook-panel-root').innerText();

      await visit('/story/components-button--disabled');
      await frame.locator('button:disabled').first().waitFor();
      await visit('/docs/welcome--docs');
      // The heading contains an accessible anchor whose name changes between Storybook versions.
      await frame
        .locator('h1')
        .filter({ hasText: /^React Suite$/ })
        .waitFor();
      assert.equal(
        await frame.getByRole('link', { name: 'Documentation', exact: true }).getAttribute('href'),
        'https://rsuitejs.com'
      );
      row.welcomeDocs = true;

      await visit('/story/components-selectpicker--default');
      const combo = frame.getByRole('combobox');
      await combo.click();
      const option = frame.getByRole('option').first();
      await option.waitFor();
      const label = await option.innerText();
      await option.click();
      assert((await combo.innerText()).includes(label));
      row.pickerSelection = label;

      await visit('/story/components-form--default');
      const input = frame.getByRole('textbox').first();
      await input.fill('Storybook form smoke');
      assert.equal(await input.inputValue(), 'Storybook form smoke');
      row.formInput = true;
      await visit('/story/components-table--default');
      await frame.getByRole('columnheader').first().waitFor();
      row.tableRows = await frame.getByRole('row').count();
      assert(row.tableRows > 2);
      assert.deepEqual(row.errors, []);
      assert.deepEqual(row.httpErrors, []);
      row.passed = true;
    } catch (error) {
      row.error = String(error.stack);
      await page.screenshot({ path: path.join(results, name + '-failure.png') }).catch(() => {});
    } finally {
      await browser.close();
    }
  }
} finally {
  await server.close();
  fs.writeFileSync(path.join(results, 'smoke.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify(report, null, 2));
assert(
  report.browsers.length === 2 && report.browsers.every(row => row.passed),
  'Storybook smoke failed'
);
