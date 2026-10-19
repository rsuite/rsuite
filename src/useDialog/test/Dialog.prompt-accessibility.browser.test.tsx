import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Dialog.prompt-accessibility.client';

describe('Prompt labels and validation with native browser events', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/useDialog/test/Dialog.prompt-accessibility.client.tsx'
    });
    console.info('Prompt accessibility browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  it.each([false, true])('labels, corrects and submits prompts, stacked: %s', async stacked => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    try {
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_PROMPT_ACCESSIBILITY__));
      expect(await page.evaluate(() => window.__RSUITE_PROMPT_ACCESSIBILITY__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await page
        .getByRole('button', {
          name: stacked ? 'Open stacked prompts' : 'Open prompt',
          exact: true
        })
        .click();
      await page
        .getByRole('dialog', { name: stacked ? 'Second prompt' : 'First prompt' })
        .waitFor();
      const ids = await page.locator('input').evaluateAll(inputs => inputs.map(input => input.id));
      expect(ids).toHaveLength(stacked ? 2 : 1);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids.every(Boolean)).toBe(true);

      const expected = [] as { prompt: string; value: string }[];
      const errorIds = new Set<string>();
      for (const name of stacked ? ['Second', 'First'] : ['First']) {
        const dialog = page.getByRole('dialog', { name: `${name} prompt` });
        const input = dialog.getByRole('textbox', { name: `${name} name`, exact: true });
        const inputId = await input.getAttribute('id');
        expect(await input.getAttribute('aria-invalid')).not.toBe('true');
        await dialog.getByRole('button', { name: `Save ${name.toLowerCase()}` }).click();
        const error = dialog.getByRole('alert');
        await error.waitFor();
        const errorId = await error.getAttribute('id');
        expect(errorId).toBeTruthy();
        expect(errorIds.has(errorId!)).toBe(false);
        errorIds.add(errorId!);
        expect(await error.textContent()).toBe(`${name} name needs three characters`);
        expect(await input.getAttribute('aria-invalid')).toBe('true');
        expect(await input.getAttribute('aria-describedby')).toBe(errorId);

        await dialog.getByText(`${name} name`, { exact: true }).click();
        expect(await input.evaluate(node => node === node.ownerDocument.activeElement)).toBe(true);
        await input.fill('A');
        expect(await input.getAttribute('aria-invalid')).not.toBe('true');
        expect(await input.getAttribute('aria-describedby')).toBeNull();
        expect(await dialog.getByRole('alert').count()).toBe(0);
        await input.press('Enter');
        await error.waitFor();
        expect(await error.getAttribute('id')).toBe(errorId);
        expect(await input.getAttribute('id')).toBe(inputId);
        expect(await input.getAttribute('aria-describedby')).toBe(errorId);

        await input.fill(`${name} value`);
        await input.press('Enter');
        await dialog.waitFor({ state: 'detached' });
        expected.push({ prompt: name, value: `${name} value` });
        await expect
          .poll(() =>
            page.evaluate(() => window.__RSUITE_PROMPT_ACCESSIBILITY__.snapshot().results)
          )
          .toEqual(expected);
      }
      const result = await page.evaluate(() => window.__RSUITE_PROMPT_ACCESSIBILITY__.snapshot());
      expect(result.clicks.length).toBeGreaterThan(0);
      expect(result.clicks.every(Boolean)).toBe(true);
      expect(result.keys.some(event => event.key === 'Enter')).toBe(true);
      expect(result.keys.every(event => event.trusted)).toBe(true);
      expect(result.errors).toEqual([]);
      expect(result.rejections).toEqual([]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
