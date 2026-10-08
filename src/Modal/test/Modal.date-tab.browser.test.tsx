import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Modal.date-tab.client';

describe('Modal native date Tab navigation in a source browser', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Modal/test/Modal.date-tab.client.tsx',
      runtimeRoot: process.env.RSUITE_MODAL_RUNTIME_ROOT,
      dependencyRoot: process.env.RSUITE_MODAL_DEPENDENCY_ROOT
    });
    console.info('Modal date browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  it.each(
    ['Modal', 'Drawer'].flatMap(component =>
      [false, true].map(enforceFocus => ({ component, enforceFocus }))
    )
  )(
    'keeps the native day field for $component enforceFocus=$enforceFocus',
    async ({ component, enforceFocus }) => {
      const page = await source.browser.newPage({ locale: 'en-US' });
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      try {
        await page.goto(source.url);
        await page.waitForFunction(() => Boolean(window.__RSUITE_MODAL_DATE_TAB__));
        const runtime = await page.evaluate(() => window.__RSUITE_MODAL_DATE_TAB__.runtime);
        expect(runtime).toEqual({ react: source.reactVersion, reactDOM: source.reactVersion });
        await page.evaluate(
          ({ component, enforceFocus }) =>
            window.__RSUITE_MODAL_DATE_TAB__.mount(component as 'Modal' | 'Drawer', enforceFocus),
          { component, enforceFocus }
        );
        await page.waitForFunction(() => window.__RSUITE_MODAL_DATE_TAB__.snapshot().entered === 1);
        await page.locator('#native-date').focus();
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowUp');
        const result = await page.evaluate(() => window.__RSUITE_MODAL_DATE_TAB__.snapshot());
        expect(result.value).toBe('2024-01-16');
        expect(result.focused).toBe(true);
        expect(result.events.map(({ key, trusted }) => ({ key, trusted }))).toEqual([
          { key: 'Tab', trusted: true },
          { key: 'ArrowUp', trusted: true }
        ]);
        expect(result.events[0].prevented).toBe(false);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );
});
