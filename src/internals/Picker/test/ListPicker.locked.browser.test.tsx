import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

type Flag = 'enabled' | 'disabled' | 'readOnly' | 'loading';
const snapshot = (page: Page) => page.evaluate(() => window.__RSUITE_LIST_PICKER_LOCK__.snapshot());
async function setFlag(page: Page, flag: Flag) {
  await page.evaluate(flag => window.__RSUITE_LIST_PICKER_LOCK__.setFlag(flag), flag);
  await expect.poll(() => page.getByTestId('fixture').getAttribute('data-flag')).toBe(flag);
  await expect.poll(() => page.getByTestId('fixture').getAttribute('data-listening')).toBe('true');
}

describe('List picker locked interactions', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/Picker/test/ListPicker.locked.client.tsx'
    });
    console.info('List picker locked browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  const open = async (check: boolean, virtualized: boolean) => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(
      source.url + '/#' + [check ? 'check' : '', virtualized ? 'virtualized' : ''].join('&')
    );
    await expect
      .poll(() => page.evaluate(() => window.__RSUITE_LIST_PICKER_LOCK__?.snapshot().entered))
      .toBe(true);
    expect(await page.evaluate(() => window.__RSUITE_LIST_PICKER_LOCK__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    return { page, errors };
  };
  const expectSelection = async (page: Page, check: boolean) => {
    const state = await snapshot(page);
    expect(state.changes).toEqual([{ value: check ? ['beta'] : 'beta', trusted: true }]);
    expect(state.selections).toEqual([{ value: 'beta', trusted: true }]);
    expect(check ? state.values : state.value).toEqual(check ? ['beta'] : 'beta');
  };

  describe.each([false, true])('CheckPicker=%s', check => {
    describe.each([false, true])('virtualized=%s', virtualized => {
      it.each<Flag>(['enabled', 'disabled', 'readOnly', 'loading'])(
        'preserves keyboard selection after %s transition and unlocking',
        async flag => {
          const { page, errors } = await open(check, virtualized);
          try {
            const owner = page.getByRole('combobox');
            await owner.focus();
            expect(await owner.evaluate(node => node === document.activeElement)).toBe(true);
            await page.keyboard.press('ArrowDown');
            const alpha = page.getByRole('option', { name: 'Alpha', exact: true });
            await expect
              .poll(() => alpha.evaluate(node => node === document.activeElement))
              .toBe(true);
            const before = (await snapshot(page)).publicKeys.length;
            await setFlag(page, flag);
            await page.keyboard.press('ArrowDown');
            const focusAfterDown = await page.evaluate(() =>
              document.activeElement?.textContent?.trim()
            );
            await page.keyboard.press('Enter');
            const state = await snapshot(page);
            expect(state.publicKeys.slice(before)).toEqual([
              { key: 'ArrowDown', trusted: true },
              { key: 'Enter', trusted: true }
            ]);
            expect(state.keys.every(event => event.trusted)).toBe(true);
            if (flag === 'enabled') expect(focusAfterDown).toBe('Beta');
            else {
              expect(focusAfterDown).toBe('Alpha');
              expect(state.changes).toEqual([]);
              expect(state.selections).toEqual([]);
              expect(await alpha.getAttribute('aria-disabled')).toBe('true');
              expect(await alpha.evaluate(node => node === document.activeElement)).toBe(true);
              await setFlag(page, 'enabled');
              expect(await alpha.getAttribute('aria-disabled')).toBe('false');
              await page.keyboard.press('ArrowDown');
              await expect
                .poll(() =>
                  page
                    .getByRole('option', { name: 'Beta', exact: true })
                    .evaluate(node => node === document.activeElement)
                )
                .toBe(true);
              await page.keyboard.press('Enter');
            }
            await expectSelection(page, check);
            expect(errors).toEqual([]);
          } finally {
            await page.close();
          }
        }
      );

      it.each<Flag>(['disabled', 'readOnly', 'loading'])(
        'preserves pointer selection after %s transition and unlocking',
        async flag => {
          const { page, errors } = await open(check, virtualized);
          try {
            const beta = page.getByText('Beta', { exact: true });
            const box = await beta.boundingBox();
            expect(box).not.toBeNull();
            await setFlag(page, flag);
            await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
            expect((await snapshot(page)).changes).toEqual([]);
            expect((await snapshot(page)).selections).toEqual([]);
            expect(
              await page
                .getByRole('option', { name: 'Beta', exact: true })
                .getAttribute('aria-disabled')
            ).toBe('true');
            await setFlag(page, 'enabled');
            expect(
              await page
                .getByRole('option', { name: 'Beta', exact: true })
                .getAttribute('aria-disabled')
            ).toBe('false');
            await beta.click();
            await expectSelection(page, check);
            expect(errors).toEqual([]);
          } finally {
            await page.close();
          }
        }
      );
    });
  });
});
