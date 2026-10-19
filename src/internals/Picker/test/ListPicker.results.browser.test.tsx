import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

type Mode = Parameters<Window['__RSUITE_LIST_RESULTS__']['setMode']>[0];
const snapshot = (page: Page) => page.evaluate(() => window.__RSUITE_LIST_RESULTS__.snapshot());
async function setMode(page: Page, mode: Mode) {
  await page.evaluate(mode => window.__RSUITE_LIST_RESULTS__.setMode(mode), mode);
  await expect.poll(() => page.getByTestId('fixture').getAttribute('data-mode')).toBe(mode);
}
const activeOption = (page: Page) =>
  page.getByRole('combobox').evaluate(node => {
    const id = node.getAttribute('aria-activedescendant');
    const option = id && document.getElementById(id);
    return option
      ? { text: option.textContent, disabled: option.getAttribute('aria-disabled') }
      : id;
  });

describe('List picker result focus', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/Picker/test/ListPicker.results.client.tsx'
    });
    console.info('List picker result focus browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  const open = async (check: boolean, virtualized: boolean, mode: Mode = 'all', query = 'cafe') => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(
      source.url +
        '/#' +
        [check ? 'check' : '', virtualized ? 'virtualized' : '', `mode=${mode}`].join('&')
    );
    await expect.poll(async () => (await snapshot(page)).entered).toBe(true);
    expect(await page.evaluate(() => window.__RSUITE_LIST_RESULTS__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    await page.getByRole('searchbox').focus();
    if (query) await page.keyboard.type(query);
    expect(await activeOption(page)).toEqual(
      mode === 'all' ? { text: 'Alpha', disabled: 'false' } : null
    );
    return { page, errors };
  };

  describe.each([false, true])('CheckPicker=%s', check => {
    describe.each([false, true])('virtualized=%s', virtualized => {
      it.each<Mode>(['empty-data', 'empty', 'all-disabled'])(
        'selects the first arriving result for an active search after %s',
        async mode => {
          const { page, errors } = await open(check, virtualized, mode);
          try {
            await setMode(page, 'filtered');
            expect((await snapshot(page)).changes).toEqual([]);
            const aria = await activeOption(page);
            expect(
              await page.getByRole('searchbox').evaluate(node => node === document.activeElement)
            ).toBe(true);
            await page.keyboard.press('Enter');
            expect((await snapshot(page)).selections).toEqual([{ value: '0', trusted: true }]);
            expect(aria).toEqual({ text: 'Café', disabled: 'false' });
            expect((await snapshot(page)).changes).toEqual([check ? ['alpha', '0'] : '0']);
            expect(errors).toEqual([]);
          } finally {
            await page.close();
          }
        }
      );

      it('does not initialize focus when results arrive before the user searches', async () => {
        const { page, errors } = await open(check, virtualized, 'empty-data', '');
        try {
          await setMode(page, 'filtered');
          expect(await activeOption(page)).toBeNull();
          await page.keyboard.press('Enter');
          expect((await snapshot(page)).selections).toEqual([]);
          expect((await snapshot(page)).changes).toEqual([]);
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      });

      it('mounts a distant first result after an initially empty search', async () => {
        const { page, errors } = await open(check, virtualized, 'empty-data');
        try {
          await setMode(page, 'distant');
          await expect
            .poll(() => activeOption(page))
            .toEqual({ text: 'Option 99', disabled: 'false' });
          expect(
            await page.getByRole('searchbox').evaluate(node => node === document.activeElement)
          ).toBe(true);
          await page.keyboard.press('Enter');
          expect((await snapshot(page)).selections).toEqual([
            { value: 'option-99', trusted: true }
          ]);
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      });

      it.each<Mode>(['filtered', 'removed', 'disabled'])(
        'selects the first eligible result after %s changes without another keystroke',
        async mode => {
          const { page, errors } = await open(check, virtualized);
          try {
            await setMode(page, mode);
            expect((await snapshot(page)).changes).toEqual([]);
            const aria = await activeOption(page);
            expect(
              await page.getByRole('searchbox').evaluate(node => node === document.activeElement)
            ).toBe(true);
            await page.keyboard.press('Enter');
            // Assert selection first so a failure also exposes invisible-option activation.
            expect((await snapshot(page)).selections).toEqual([{ value: '0', trusted: true }]);
            expect(aria).toEqual({ text: 'Café', disabled: 'false' });
            expect((await snapshot(page)).changes).toEqual([check ? ['alpha', '0'] : '0']);
            expect(errors).toEqual([]);
          } finally {
            await page.close();
          }
        }
      );

      it('clears the active descendant and ignores Enter for empty results', async () => {
        const { page, errors } = await open(check, virtualized);
        try {
          await setMode(page, 'empty');
          const aria = await activeOption(page);
          await page.keyboard.press('Enter');
          expect((await snapshot(page)).selections).toEqual([]);
          expect((await snapshot(page)).changes).toEqual([]);
          expect(aria).toBeNull();
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      });

      it('mounts a distant eligible replacement without moving input focus', async () => {
        const { page, errors } = await open(check, virtualized);
        try {
          await setMode(page, 'distant');
          await expect
            .poll(() => activeOption(page))
            .toEqual({ text: 'Option 99', disabled: 'false' });
          expect(
            await page.getByRole('searchbox').evaluate(node => node === document.activeElement)
          ).toBe(true);
          await page.keyboard.press('Enter');
          expect((await snapshot(page)).selections).toEqual([
            { value: 'option-99', trusted: true }
          ]);
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      });

      it('keeps a retained focus mounted after options move beyond the rendered range', async () => {
        const { page, errors } = await open(check, virtualized);
        try {
          await setMode(page, 'reordered');
          await expect.poll(() => activeOption(page)).toEqual({ text: 'Alpha', disabled: 'false' });
          expect((await snapshot(page)).changes).toEqual([]);
          expect(
            await page.getByRole('searchbox').evaluate(node => node === document.activeElement)
          ).toBe(true);
          await page.keyboard.press('Enter');
          expect((await snapshot(page)).selections).toEqual([{ value: 'alpha', trusted: true }]);
          expect((await snapshot(page)).changes).toEqual([check ? [] : 'alpha']);
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      });

      it('preserves an eligible focus through result updates', async () => {
        const { page, errors } = await open(check, virtualized);
        try {
          await page.keyboard.press('ArrowDown');
          await expect.poll(() => activeOption(page)).toEqual({ text: 'Café', disabled: 'false' });
          await setMode(page, 'filtered');
          expect(await activeOption(page)).toEqual({ text: 'Café', disabled: 'false' });
          await page.getByRole('searchbox').focus();
          await page.keyboard.press('Enter');
          expect((await snapshot(page)).selections).toEqual([{ value: '0', trusted: true }]);
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      });

      it('keeps search editable during loading and reconciles completed results', async () => {
        const { page, errors } = await open(check, virtualized);
        try {
          await setMode(page, 'loading');
          await page.keyboard.press('Enter');
          expect((await snapshot(page)).selections).toEqual([]);
          expect(await page.getByRole('searchbox').isEditable()).toBe(true);
          await page.keyboard.type('!');
          expect(await page.getByRole('searchbox').inputValue()).toBe('cafe!');
          await setMode(page, 'filtered');
          expect(await activeOption(page)).toEqual({ text: 'Café', disabled: 'false' });
          await page.getByRole('searchbox').focus();
          await page.keyboard.press('Enter');
          expect((await snapshot(page)).selections).toEqual([{ value: '0', trusted: true }]);
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      });
    });
  });
});
