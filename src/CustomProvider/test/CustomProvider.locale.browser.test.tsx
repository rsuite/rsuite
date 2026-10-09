import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('CustomProvider default locale native interaction', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/CustomProvider/test/CustomProvider.locale.client.tsx'
    });
    console.info('CustomProvider default locale browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  it.each([false, true])(
    'updates configured names while preserving user state, StrictMode: %s',
    async strict => {
      const page = await source.browser.newPage();
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
      });
      try {
        await page.goto(`${source.url}/#${strict ? 'strict' : ''}`);
        await page.waitForFunction(() => window.__RSUITE_DEFAULT_LOCALE__?.snapshot().ready);
        expect(await page.evaluate(() => window.__RSUITE_DEFAULT_LOCALE__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });
        expect(await page.getByRole('switch', { name: 'Default on 1', exact: true }).count()).toBe(
          1
        );
        await page.getByRole('switch', { name: 'Default on 1', exact: true }).press('Space');
        expect(
          await page.getByRole('switch', { name: 'Default off 1', exact: true }).isChecked()
        ).toBe(false);
        await page.getByRole('button', { name: 'Default next 1', exact: true }).click();
        expect(await page.getByTestId('page').textContent()).toBe('2');
        await page.getByRole('button', { name: 'Show folders 1', exact: true }).click();
        expect(await page.getByText('Account', { exact: true }).count()).toBe(1);
        await page.getByRole('button', { name: 'Change defaults', exact: true }).click();
        expect(
          await page.getByRole('switch', { name: 'Default off 2', exact: true }).isChecked()
        ).toBe(false);
        expect(
          await page.getByRole('button', { name: 'Default next 2', exact: true }).count()
        ).toBe(1);
        expect(await page.getByTestId('page').textContent()).toBe('2');
        expect(await page.getByText('Account', { exact: true }).count()).toBe(1);
        await page.getByRole('button', { name: 'Override instance', exact: true }).click();
        expect(
          await page.getByRole('switch', { name: 'Instance off', exact: true }).isChecked()
        ).toBe(false);
        await page.getByRole('button', { name: 'Remove defaults', exact: true }).click();
        expect(
          await page.getByRole('switch', { name: 'Instance off', exact: true }).isChecked()
        ).toBe(false);
        expect(await page.getByRole('button', { name: 'Next', exact: true }).count()).toBe(1);
        await page.getByRole('button', { name: 'Instance previous', exact: true }).click();
        expect(await page.getByTestId('page').textContent()).toBe('1');
        expect(
          await page.evaluate(() => window.__RSUITE_DEFAULT_LOCALE__.snapshot().actions)
        ).toEqual([
          { control: 'toggle', value: false, trusted: true },
          { control: 'page', value: 2 },
          { control: 'page', value: 1 }
        ]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );
});
