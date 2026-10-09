import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type { Page } from 'playwright';
import type {} from './Modal.owner-document.client';

describe('Modal containers in another document', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Modal/test/Modal.owner-document.client.tsx'
    });
    console.info('Modal owner document browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  const snapshot = (page: Page) =>
    page.evaluate(() => window.__RSUITE_MODAL_OWNER_DOCUMENT__.snapshot());

  describe.each(['Modal', 'Drawer'] as const)('%s', component => {
    const run = async (
      options: Parameters<Window['__RSUITE_MODAL_OWNER_DOCUMENT__']['mount']>[1],
      test: (page: Page) => Promise<void>
    ) => {
      const page = await source.browser.newPage();
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      try {
        await page.goto(source.url);
        await page.waitForFunction(() => Boolean(window.__RSUITE_MODAL_OWNER_DOCUMENT__));
        expect(await page.evaluate(() => window.__RSUITE_MODAL_OWNER_DOCUMENT__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });
        await page.evaluate(
          ({ component, options }) =>
            window.__RSUITE_MODAL_OWNER_DOCUMENT__.mount(component, options),
          { component, options }
        );
        await test(page);
        expect(errors).toEqual([]);
        expect((await snapshot(page)).events.every(event => event.trusted)).toBe(true);
      } finally {
        await page.close();
      }
    };
    const open = async (page: Page, fromParent = false) => {
      if (fromParent) await page.locator('#parent-opener').click();
      else await page.frameLocator('#modal-frame').locator('#frame-opener').click();
      await page.waitForFunction(
        () => window.__RSUITE_MODAL_OWNER_DOCUMENT__.snapshot().entered === 1
      );
    };

    it('closes on Escape in its own document', () =>
      run({}, async page => {
        await open(page);
        await page.keyboard.press('Escape');
        expect((await snapshot(page)).closed).toBe(1);
        expect((await snapshot(page)).events).toContainEqual({
          scope: 'frame',
          key: 'Escape',
          trusted: true
        });
      }));

    it('restores its iframe opener after an explicit close', () =>
      run({}, async page => {
        await open(page);
        await page.frameLocator('#modal-frame').locator('#close-action').click();
        await page.frameLocator('#modal-frame').getByRole('dialog').waitFor({ state: 'detached' });
        expect((await snapshot(page)).frameFocused).toBe('frame-opener');
      }));

    it('keeps the previous parent-document opener as the restore target', () =>
      run({}, async page => {
        await open(page, true);
        await page.frameLocator('#modal-frame').locator('#close-action').click();
        await page.frameLocator('#modal-frame').getByRole('dialog').waitFor({ state: 'detached' });
        expect((await snapshot(page)).parentFocused).toBe('parent-opener');
      }));

    it('enforces focus within the iframe document', () =>
      run({}, async page => {
        await open(page);
        await page.frameLocator('#modal-frame').locator('#frame-outside').focus();
        expect((await snapshot(page)).wrapperFocused).toBe(true);
      }));

    it('allows external iframe focus when enforcement is disabled', () =>
      run({ enforceFocus: false }, async page => {
        await open(page);
        await page.frameLocator('#modal-frame').locator('#frame-outside').focus();
        expect((await snapshot(page)).frameFocused).toBe('frame-outside');
      }));

    it('preserves the opener when autoFocus is disabled and still handles Escape', () =>
      run({ autoFocus: false }, async page => {
        await open(page);
        expect((await snapshot(page)).frameFocused).toBe('frame-opener');
        await page.keyboard.press('Escape');
        expect((await snapshot(page)).closed).toBe(1);
      }));

    it('releases focus and keyboard listeners on close and restores a new opener on reopen', () =>
      run({}, async page => {
        await open(page);
        await page.frameLocator('#modal-frame').locator('#close-action').click();
        await page.frameLocator('#modal-frame').getByRole('dialog').waitFor({ state: 'detached' });
        await page.frameLocator('#modal-frame').locator('#frame-outside').focus();
        await page.keyboard.press('Escape');
        expect((await snapshot(page)).frameFocused).toBe('frame-outside');
        expect((await snapshot(page)).closed).toBe(0);
        await page.locator('#parent-opener').click();
        await page.waitForFunction(
          () => window.__RSUITE_MODAL_OWNER_DOCUMENT__.snapshot().entered === 2
        );
        await page.keyboard.press('Escape');
        await page.frameLocator('#modal-frame').getByRole('dialog').waitFor({ state: 'detached' });
        expect((await snapshot(page)).closed).toBe(1);
        expect((await snapshot(page)).parentFocused).toBe('parent-opener');
      }));

    it('does not close for Escape dispatched in the parent document', () =>
      run({ enforceFocus: false }, async page => {
        await open(page);
        await page.locator('#parent-outside').focus();
        await page.keyboard.press('Escape');
        expect((await snapshot(page)).closed).toBe(0);
        expect((await snapshot(page)).events).toContainEqual({
          scope: 'parent',
          key: 'Escape',
          trusted: true
        });
      }));

    it('retains keyboard=false and wraps native Tab inside the iframe', () =>
      run({ keyboard: false }, async page => {
        await open(page);
        await page.frameLocator('#modal-frame').locator('#close-action').focus();
        await page.keyboard.press('Escape');
        expect((await snapshot(page)).closed).toBe(0);
        await page.keyboard.press('Tab');
        expect((await snapshot(page)).frameFocused).toBe('first-action');
        await page.keyboard.press('Shift+Tab');
        expect((await snapshot(page)).frameFocused).toBe('close-action');
      }));

    it('excludes a foreign-realm radio whose checked group member is outside', () =>
      run({ radio: true }, async page => {
        await open(page);
        await page.keyboard.press('Tab');
        expect((await snapshot(page)).frameFocused).toBe('first-action');
      }));
  });
});
