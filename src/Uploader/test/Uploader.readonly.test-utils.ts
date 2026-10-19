import type { FileChooser, Page } from 'playwright';
import { expect } from 'vitest';
import type createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Uploader.readonly.client';

type Options = Parameters<Window['__RSUITE_UPLOAD_READONLY__']['mount']>[0];
type Source = Awaited<ReturnType<typeof createSourceBrowser>>;

export function createReadonlyFixture(getSource: () => Source) {
  const snapshot = (page: Page) =>
    page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.snapshot());
  const withPage = async (
    options: Options,
    run: (page: Page, choices: FileChooser[]) => Promise<void>
  ) => {
    const source = getSource();
    const page = await source.browser.newPage();
    const choices: FileChooser[] = [];
    page.on('filechooser', chooser => choices.push(chooser));
    try {
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_UPLOAD_READONLY__));
      expect(await page.evaluate(() => window.__RSUITE_UPLOAD_READONLY__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await page.evaluate(options => window.__RSUITE_UPLOAD_READONLY__.mount(options), options);
      await run(page, choices);
      expect((await snapshot(page)).submissions).toBe(0);
    } finally {
      await page.close();
    }
  };
  const focusInput = async (page: Page) => {
    await page.locator('[data-before]').focus();
    await page.keyboard.press('Tab');
    expect(await page.locator('input[type=file]').evaluate(e => document.activeElement === e)).toBe(
      true
    );
  };
  const settle = (page: Page) =>
    page.evaluate(
      () =>
        new Promise<void>(resolve => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        })
    );
  const selectFiles = async (page: Page, key: string, names: string[]) => {
    const opened = page.waitForEvent('filechooser');
    await page.keyboard.press(key);
    await (
      await opened
    ).setFiles(names.map(name => ({ name, mimeType: 'text/plain', buffer: Buffer.from(name) })));
    await expect.poll(async () => (await snapshot(page)).files).toEqual(names);
  };
  const select = (page: Page, key: string, name: string) => selectFiles(page, key, [name]);
  return { snapshot, withPage, focusInput, settle, select, selectFiles };
}
