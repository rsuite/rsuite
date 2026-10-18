import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import { createReadonlyFixture } from './Uploader.readonly.test-utils';

describe('Uploader read-only native file input', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.readonly.client.tsx'
    });
    console.info('Uploader read-only browser', source.browserName, source.reactVersion);
  });
  afterAll(async () => source?.close());

  const { snapshot, withPage, focusInput, settle, select, selectFiles } = createReadonlyFixture(
    () => source
  );

  describe.each(['default', 'button', 'div'] as const)('%s trigger', shape => {
    it.each(['Enter', 'Space'])('blocks native %s while read-only', async key => {
      await withPage({ shape, readOnly: true }, async (page, choices) => {
        await focusInput(page);
        await page.keyboard.press(key);
        await settle(page);
        const result = await snapshot(page);
        expect(result.inputClicks).toEqual([{ trusted: true, prevented: true }]);
        expect(choices).toHaveLength(0);
        expect(result.changes).toEqual([]);
        expect(result.disabled).toBe(false);
        expect(
          await page.locator('input[type=file]').evaluate(e => document.activeElement === e)
        ).toBe(true);
      });
    });

    it.each(['Enter', 'Space'])('keeps native %s file selection when editable', async key => {
      await withPage({ shape }, async (page, choices) => {
        await focusInput(page);
        await select(page, key, 'editable.txt');
        expect(choices).toHaveLength(1);
        const result = await snapshot(page);
        expect(result.changes).toEqual([['editable.txt']]);
        expect(result.inputClicks).toEqual([{ trusted: true, prevented: false }]);
      });
    });

    it('updates read-only behavior without losing the input, selected files or FormData', async () => {
      await withPage({ shape }, async (page, choices) => {
        await focusInput(page);
        const input = page.locator('input[type=file]');
        const original = await input.elementHandle();
        await select(page, 'Enter', 'kept.txt');
        await page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.readOnly(true));
        expect(await input.evaluate((e, original) => e === original, original)).toBe(true);
        await input.focus();
        for (const key of ['Enter', 'Space']) await page.keyboard.press(key);
        await settle(page);
        const result = await snapshot(page);
        expect(result.inputClicks.slice(-2)).toEqual([
          { trusted: true, prevented: true },
          { trusted: true, prevented: true }
        ]);
        expect(choices).toHaveLength(1);
        expect(result.changes).toEqual([['kept.txt']]);
        expect(result.files).toEqual(['kept.txt']);
        expect(result.formFiles).toEqual(['kept.txt']);
        expect(result.disabled).toBe(false);
        await page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.readOnly(false));
        await input.focus();
        await select(page, 'Space', 'again.txt');
        expect(choices).toHaveLength(2);
        expect((await snapshot(page)).changes).toEqual([['kept.txt'], ['kept.txt', 'again.txt']]);
      });
    });

    it.each([
      { mode: 'readOnly', selected: false },
      { mode: 'readOnly', selected: true },
      { mode: 'disabled', selected: false },
      { mode: 'disabled', selected: true }
    ] as const)(
      'rejects a late $mode selection (existing files: $selected)',
      async ({ mode, selected }) => {
        await withPage({ shape }, async (page, choices) => {
          await focusInput(page);
          const input = page.locator('input[type=file]');
          const original = await input.elementHandle();
          if (selected) await select(page, 'Enter', 'kept.txt');
          const before = await snapshot(page);
          const opened = page.waitForEvent('filechooser');
          await input.focus();
          await page.keyboard.press('Enter');
          const chooser = await opened;
          await page.evaluate(mode => window.__RSUITE_UPLOAD_READONLY__[mode](true), mode);
          await chooser.setFiles({
            name: 'late.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('late.txt')
          });
          await settle(page);
          const result = await snapshot(page);
          expect(result.changes).toEqual(before.changes);
          expect(result.nativeChanges).toBe(before.nativeChanges);
          expect(result.nativeInputs).toBe(before.nativeInputs);
          expect(result.files).toEqual(before.files);
          expect(result.formFiles).toEqual(mode === 'readOnly' ? before.formFiles : []);
          expect(await input.evaluate((e, original) => e === original, original)).toBe(true);
          expect(
            await input.evaluate(async e =>
              Promise.all(Array.from((e as HTMLInputElement).files!, file => file.text()))
            )
          ).toEqual(before.files);
          await page.evaluate(mode => window.__RSUITE_UPLOAD_READONLY__[mode](false), mode);
          expect((await snapshot(page)).formFiles).toEqual(before.formFiles);
          await input.focus();
          await select(page, 'Space', 'late.txt');
          await expect
            .poll(async () => (await snapshot(page)).changes)
            .toEqual([...before.changes, [...(before.changes.at(-1) || []), 'late.txt']]);
          expect(choices).toHaveLength(selected ? 3 : 2);
        });
      }
    );

    it('keeps a cleared input empty when an outstanding picker returns', async () => {
      await withPage({ shape }, async page => {
        await focusInput(page);
        await select(page, 'Enter', 'kept.txt');
        const opened = page.waitForEvent('filechooser');
        await page.locator('input[type=file]').focus();
        await page.keyboard.press('Enter');
        const chooser = await opened;
        await page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.removeFirst());
        await page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.readOnly(true));
        const before = await snapshot(page);
        expect(before.files).toEqual([]);
        await chooser.setFiles({
          name: 'late.txt',
          mimeType: 'text/plain',
          buffer: Buffer.from('late.txt')
        });
        await settle(page);
        const result = await snapshot(page);
        expect(result.changes).toEqual([['kept.txt'], []]);
        expect(result.nativeChanges).toBe(before.nativeChanges);
        expect(result.nativeInputs).toBe(before.nativeInputs);
        expect(result.files).toEqual([]);
        expect(result.formFiles).toEqual(before.formFiles);
      });
    });

    it('retains a valid selection when its callback makes the control read-only', async () => {
      await withPage({ shape, lockOnChange: true }, async page => {
        await focusInput(page);
        await select(page, 'Enter', 'accepted.txt');
        await expect.poll(async () => (await snapshot(page)).readOnly).toBe(true);
        const result = await snapshot(page);
        expect(result.changes).toEqual([['accepted.txt']]);
        expect(result.nativeChanges).toBe(1);
        expect(result.nativeInputs).toBe(1);
        expect(result.formFiles).toEqual(['accepted.txt']);
      });
    });

    it('accepts an outstanding selection when the control is editable again', async () => {
      await withPage({ shape }, async page => {
        await focusInput(page);
        const opened = page.waitForEvent('filechooser');
        await page.keyboard.press('Enter');
        const chooser = await opened;
        await page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.readOnly(true));
        await page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.readOnly(false));
        await chooser.setFiles({
          name: 'accepted.txt',
          mimeType: 'text/plain',
          buffer: Buffer.from('accepted.txt')
        });
        await settle(page);
        expect((await snapshot(page)).changes).toEqual([['accepted.txt']]);
        expect((await snapshot(page)).nativeChanges).toBe(1);
      });
    });

    it('keeps disabled input out of sequential focus', async () => {
      await withPage({ shape, disabled: true }, async (page, choices) => {
        await page.locator('[data-before]').focus();
        await page.keyboard.press('Tab');
        expect(await page.locator('[data-after]').evaluate(e => document.activeElement === e)).toBe(
          true
        );
        expect(choices).toHaveLength(0);
      });
    });
  });

  it.each(['readOnly', 'disabled'] as const)(
    'preserves multiple files after a late %s result',
    async mode => {
      await withPage({ shape: 'default', multiple: true }, async page => {
        await focusInput(page);
        await selectFiles(page, 'Enter', ['alpha.txt', 'beta.txt']);
        const before = await snapshot(page);
        const opened = page.waitForEvent('filechooser');
        await page.locator('input[type=file]').focus();
        await page.keyboard.press('Enter');
        const chooser = await opened;
        await page.evaluate(mode => window.__RSUITE_UPLOAD_READONLY__[mode](true), mode);
        await chooser.setFiles({
          name: 'late.txt',
          mimeType: 'text/plain',
          buffer: Buffer.from('late.txt')
        });
        await settle(page);
        await page.evaluate(mode => window.__RSUITE_UPLOAD_READONLY__[mode](false), mode);
        const result = await snapshot(page);
        expect(result.changes).toEqual(before.changes);
        expect(result.nativeChanges).toBe(before.nativeChanges);
        expect(result.nativeInputs).toBe(before.nativeInputs);
        expect(result.files).toEqual(['alpha.txt', 'beta.txt']);
        expect(result.formFiles).toEqual(['alpha.txt', 'beta.txt']);
      });
    }
  );

  it('rejects a read-only native file change that did not start with a click', async () => {
    await withPage({ shape: 'default', readOnly: true }, async page => {
      const before = await snapshot(page);
      await page.locator('input[type=file]').setInputFiles({
        name: 'late.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('late.txt')
      });
      await settle(page);
      const result = await snapshot(page);
      expect(result.changes).toEqual([]);
      expect(result.nativeChanges).toBe(0);
      expect(result.nativeInputs).toBe(0);
      expect(result.files).toEqual([]);
      expect(result.formFiles).toEqual(before.formFiles);
    });
  });

  it('rejects a late selection after its fieldset becomes disabled', async () => {
    await withPage({ shape: 'default', fieldset: true }, async page => {
      await focusInput(page);
      await select(page, 'Enter', 'kept.txt');
      const before = await snapshot(page);
      const opened = page.waitForEvent('filechooser');
      await page.locator('input[type=file]').focus();
      await page.keyboard.press('Enter');
      const chooser = await opened;
      await page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.fieldset(true));
      expect((await snapshot(page)).disabled).toBe(false);
      expect((await snapshot(page)).effectiveDisabled).toBe(true);
      await chooser.setFiles({
        name: 'late.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('late.txt')
      });
      await settle(page);
      const result = await snapshot(page);
      expect(result.changes).toEqual(before.changes);
      expect(result.nativeChanges).toBe(before.nativeChanges);
      expect(result.nativeInputs).toBe(before.nativeInputs);
      expect(result.files).toEqual(before.files);
      expect(result.formFiles).toEqual([]);
      await page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.fieldset(false));
      expect((await snapshot(page)).formFiles).toEqual(before.formFiles);
    });
  });

  it.each([false, true])(
    'respects native form reset while a picker is open (prevented: %s)',
    async preventReset => {
      await withPage({ shape: 'default', preventReset }, async page => {
        await focusInput(page);
        await select(page, 'Enter', 'kept.txt');
        const opened = page.waitForEvent('filechooser');
        await page.locator('input[type=file]').focus();
        await page.keyboard.press('Enter');
        const chooser = await opened;
        await page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.reset());
        await page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.readOnly(true));
        const before = await snapshot(page);
        expect(before.files).toEqual(preventReset ? ['kept.txt'] : []);
        await chooser.setFiles({
          name: 'late.txt',
          mimeType: 'text/plain',
          buffer: Buffer.from('late.txt')
        });
        await settle(page);
        const result = await snapshot(page);
        expect(result.changes).toEqual(before.changes);
        expect(result.nativeChanges).toBe(before.nativeChanges);
        expect(result.nativeInputs).toBe(before.nativeInputs);
        expect(result.files).toEqual(before.files);
        expect(result.formFiles).toEqual(before.formFiles);
      });
    }
  );

  describe.each(['default', 'button'] as const)('%s visible trigger', shape => {
    it.each(['Enter', 'Space'])('still opens the file chooser with %s', async key => {
      await withPage({ shape }, async (page, choices) => {
        await focusInput(page);
        await page.keyboard.press('Tab');
        expect(
          await page.locator('.rs-uploader-trigger-btn').evaluate(e => document.activeElement === e)
        ).toBe(true);
        await select(page, key, 'visible.txt');
        expect(choices).toHaveLength(1);
        expect((await snapshot(page)).changes).toEqual([['visible.txt']]);
      });
    });
    it.each(['Enter', 'Space'])('does not open the read-only chooser with %s', async key => {
      await withPage({ shape, readOnly: true }, async (page, choices) => {
        await focusInput(page);
        await page.keyboard.press('Tab');
        expect(
          await page.locator('.rs-uploader-trigger-btn').evaluate(e => document.activeElement === e)
        ).toBe(true);
        await page.keyboard.press(key);
        await settle(page);
        expect(choices).toHaveLength(0);
        expect((await snapshot(page)).changes).toEqual([]);
      });
    });
  });
});
