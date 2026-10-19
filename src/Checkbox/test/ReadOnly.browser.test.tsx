import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Locator, Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

const activations = ['control', 'label', 'Space'] as const;
const formData = (page: Page) =>
  page
    .getByTestId('readonly-form')
    .evaluate(form => new FormData(form as HTMLFormElement).getAll('choice'));
async function activate(input: Locator, activation: (typeof activations)[number]) {
  if (activation === 'Space') {
    await input.focus();
    await input.press('Space');
  } else if (activation === 'label')
    await input.locator('xpath=ancestor::label').locator('span').last().click();
  else await input.locator('..').click();
}
async function unlock(page: Page) {
  await page.evaluate(() => window.__RSUITE_READONLY__.unlock());
  await expect
    .poll(() => page.getByTestId('readonly-form').getAttribute('data-locked'))
    .toBe('false');
}

describe('Read-only native controls', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Checkbox/test/ReadOnly.client.tsx'
    });
    console.info('Read-only controls browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());
  const open = async (options: string[]) => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(source.url + '/#' + options.join('&'));
    await expect
      .poll(() => page.evaluate(() => window.__RSUITE_READONLY__?.snapshot().ready))
      .toBe(true);
    expect(await page.evaluate(() => window.__RSUITE_READONLY__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    return { page, errors };
  };
  describe.each(['checkbox', 'radio'] as const)('%s', kind => {
    describe.each([false, true])('defaultChecked=%s', checked => {
      it.each(activations)(
        'preserves checked state and FormData through %s, then unlocks',
        async activation => {
          const { page, errors } = await open([kind, ...(checked ? ['checked'] : [])]);
          try {
            const input = page.getByRole(kind);
            await page.getByRole('button', { name: 'Before' }).click();
            await page.keyboard.press('Tab');
            expect(await input.evaluate(node => node === document.activeElement)).toBe(true);
            for (let i = 0; i < 2; i++) {
              await activate(input, activation);
              expect(await input.isChecked()).toBe(checked);
              expect(await input.getAttribute('aria-checked')).toBe(String(checked));
              expect(await formData(page)).toEqual(checked ? ['yes'] : []);
            }
            expect(
              (await page.evaluate(() => window.__RSUITE_READONLY__.snapshot())).inputChanges
            ).toEqual([]);
            await unlock(page);
            await activate(input, activation);
            const next = kind === 'radio' || !checked;
            expect(await input.isChecked()).toBe(next);
            expect(await input.getAttribute('aria-checked')).toBe(String(next));
            expect(await formData(page)).toEqual(next ? ['yes'] : []);
            expect(
              (await page.evaluate(() => window.__RSUITE_READONLY__.snapshot())).inputChanges
            ).toEqual(kind === 'radio' && checked ? [] : [['yes', next]]);
            expect(errors).toEqual([]);
          } finally {
            await page.close();
          }
        }
      );
    });
    it.each(activations)('preserves group selection with %s, then unlocks', async activation => {
      const { page, errors } = await open([kind, 'group']);
      try {
        const first = page.getByRole(kind, { name: 'First' });
        const second = page.getByRole(kind, { name: 'Second' });
        for (let i = 0; i < 2; i++) {
          await activate(first, activation);
          await activate(second, activation);
        }
        expect(await first.isChecked()).toBe(true);
        expect(await second.isChecked()).toBe(false);
        expect(await second.getAttribute('aria-checked')).toBe('false');
        expect(await formData(page)).toEqual(['first']);
        let state = await page.evaluate(() => window.__RSUITE_READONLY__.snapshot());
        expect(state.changes).toEqual([]);
        expect(state.inputChanges).toEqual([]);
        await unlock(page);
        await activate(second, activation);
        const next = kind === 'checkbox' ? ['first', 'second'] : ['second'];
        expect(await first.isChecked()).toBe(kind === 'checkbox');
        expect(await second.isChecked()).toBe(true);
        expect(await formData(page)).toEqual(next);
        state = await page.evaluate(() => window.__RSUITE_READONLY__.snapshot());
        expect(state.changes).toEqual([kind === 'checkbox' ? next : 'second']);
        expect(state.inputChanges).toEqual([['second', true]]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    });
  });
  describe.each([false, true])('mixed defaultChecked=%s', checked => {
    it.each(activations)('retains indeterminate state through repeated %s', async activation => {
      const { page, errors } = await open(['mixed', ...(checked ? ['checked'] : [])]);
      try {
        const input = page.getByRole('checkbox');
        for (let i = 0; i < 2; i++) {
          await activate(input, activation);
          expect(await input.isChecked()).toBe(checked);
          expect(await input.evaluate(node => (node as HTMLInputElement).indeterminate)).toBe(true);
          expect(await input.getAttribute('aria-checked')).toBe('mixed');
          expect(await formData(page)).toEqual(checked ? ['yes'] : []);
        }
        const state = await page.evaluate(() => window.__RSUITE_READONLY__.snapshot());
        expect(state.inputChanges).toEqual([]);
        expect(state.clicks).toBe(2);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    });
  });
  it.each(activations)(
    'preserves an independent radio peer through %s and unlock',
    async activation => {
      const { page, errors } = await open(['radio', 'independent']);
      try {
        const first = page.getByRole('radio', { name: 'First' });
        const second = page.getByRole('radio', { name: 'Second' });
        for (let i = 0; i < 2; i++) {
          await activate(second, activation);
          expect(await first.isChecked()).toBe(true);
          expect(await second.isChecked()).toBe(false);
          expect(await formData(page)).toEqual(['first']);
        }
        await unlock(page);
        await activate(second, activation);
        expect(await first.isChecked()).toBe(false);
        expect(await second.isChecked()).toBe(true);
        expect(await formData(page)).toEqual(['second']);
        await activate(first, activation);
        expect(await first.isChecked()).toBe(true);
        expect(await second.isChecked()).toBe(false);
        expect(await formData(page)).toEqual(['first']);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );
  it('preserves RadioGroup selection during native arrow navigation, then unlocks', async () => {
    const { page, errors } = await open(['radio', 'group']);
    try {
      const first = page.getByRole('radio', { name: 'First' });
      const second = page.getByRole('radio', { name: 'Second' });
      await first.focus();
      await page.keyboard.press('ArrowRight');
      expect(await first.isChecked()).toBe(true);
      expect(await second.isChecked()).toBe(false);
      expect(await formData(page)).toEqual(['first']);
      expect((await page.evaluate(() => window.__RSUITE_READONLY__.snapshot())).changes).toEqual(
        []
      );
      await unlock(page);
      await first.focus();
      await page.keyboard.press('ArrowRight');
      expect(await first.isChecked()).toBe(false);
      expect(await second.isChecked()).toBe(true);
      expect(await formData(page)).toEqual(['second']);
      expect((await page.evaluate(() => window.__RSUITE_READONLY__.snapshot())).changes).toEqual([
        'second'
      ]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
