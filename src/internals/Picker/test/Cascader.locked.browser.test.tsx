import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

type Flag = 'enabled' | 'disabled' | 'readOnly' | 'loading';
const snapshot = (page: Page) => page.evaluate(() => window.__RSUITE_CASCADER_LOCK__.snapshot());
const item = (page: Page, value: string) => page.locator(`[role="treeitem"][data-key="${value}"]`);
async function setFlag(page: Page, flag: Flag) {
  await page.evaluate(flag => window.__RSUITE_CASCADER_LOCK__.setFlag(flag), flag);
  await expect.poll(() => page.getByTestId('fixture').getAttribute('data-flag')).toBe(flag);
  await expect.poll(() => page.getByTestId('fixture').getAttribute('data-listening')).toBe('true');
}

describe('Cascader locked interactions', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/Picker/test/Cascader.locked.client.tsx'
    });
    console.info('Cascader locked browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  const open = async (check: boolean, search: boolean) => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(source.url + '/#' + (check ? 'check' : ''));
    await expect
      .poll(() => page.evaluate(() => window.__RSUITE_CASCADER_LOCK__?.snapshot().entered))
      .toBe(true);
    expect(await page.evaluate(() => window.__RSUITE_CASCADER_LOCK__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    if (search) {
      await page.getByRole('searchbox').fill('leaf');
      await item(page, 'alpha').waitFor();
      if (check) await page.keyboard.press('ArrowDown');
      else await item(page, 'alpha').focus();
    } else {
      await page.getByRole('combobox').focus();
      await page.keyboard.press('ArrowDown');
      await item(page, 'alpha').waitFor();
      await page.keyboard.press('ArrowRight');
      await expect
        .poll(() =>
          item(page, 'alpha').evaluateAll(
            nodes => nodes.length === 1 && nodes[0] === document.activeElement
          )
        )
        .toBe(true);
    }
    expect((await snapshot(page)).changes).toEqual([]);
    expect((await snapshot(page)).selections).toEqual([]);
    expect((await snapshot(page)).checks).toEqual([]);
    return { page, errors };
  };

  const expectUnchanged = async (page: Page) => {
    const state = await snapshot(page);
    expect(state.changes).toEqual([]);
    expect(state.selections).toEqual([]);
    expect(state.checks).toEqual([]);
    expect(state.value).toBe(null);
    expect(state.values).toEqual([]);
  };
  const expectSelection = async (page: Page, check: boolean, selected = !check) => {
    const state = await snapshot(page);
    expect(state.changes).toEqual([{ value: check ? ['beta'] : 'beta', trusted: true }]);
    expect(state.selections).toEqual(selected ? [{ value: 'beta', trusted: true }] : []);
    expect(state.checks).toEqual(check ? [{ value: 'beta', checked: true, trusted: true }] : []);
    expect(check ? state.values : state.value).toEqual(check ? ['beta'] : 'beta');
  };

  describe.each([false, true])('MultiCascader=%s', check => {
    describe.each([false, true])('search=%s', search => {
      it.each<Flag>(['enabled', 'disabled', 'readOnly', 'loading'])(
        'preserves keyboard selection after %s transition and unlocking',
        async flag => {
          const { page, errors } = await open(check, search);
          try {
            const alpha = item(page, 'alpha');
            await setFlag(page, flag);
            await page.keyboard.press('ArrowDown');
            const focusAfterDown = await page.evaluate(() =>
              document.activeElement?.getAttribute('data-key')
            );
            await page.keyboard.press('Enter');
            const state = await snapshot(page);
            expect(state.publicKeys).toEqual([
              { key: 'ArrowDown', trusted: true },
              { key: 'Enter', trusted: true }
            ]);
            expect(state.keys.every(event => event.trusted)).toBe(true);
            if (flag !== 'enabled') {
              await expectUnchanged(page);
              if (!search) expect(focusAfterDown).toBe('alpha');
              expect(await alpha.getAttribute('aria-disabled')).toBe('true');
              await setFlag(page, 'enabled');
              expect(await alpha.getAttribute('aria-disabled')).toBe('false');
              await page.keyboard.press('ArrowDown');
              await page.keyboard.press('Enter');
            }
            await expectSelection(page, check);
            expect(errors).toEqual([]);
          } finally {
            await page.close();
          }
        }
      );

      it.each<Flag>(['enabled', 'disabled', 'readOnly', 'loading'])(
        'preserves pointer selection after %s transition and unlocking',
        async flag => {
          const { page, errors } = await open(check, search);
          try {
            const beta = item(page, 'beta');
            const target = check ? beta.getByRole('checkbox') : beta;
            const box = await target.boundingBox();
            expect(box).not.toBeNull();
            await setFlag(page, flag);
            await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
            if (flag !== 'enabled') {
              await expectUnchanged(page);
              expect(await beta.getAttribute('aria-disabled')).toBe('true');
              await setFlag(page, 'enabled');
              expect(await beta.getAttribute('aria-disabled')).toBe('false');
              await target.click();
            }
            await expectSelection(page, check, !check || !search);
            expect(errors).toEqual([]);
          } finally {
            await page.close();
          }
        }
      );
    });
  });
});
