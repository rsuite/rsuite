import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { BrowserContext, Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('Independent date picker opening', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  let context: BrowserContext;
  let pageErrors: string[];
  beforeEach(() => {
    pageErrors = [];
  });
  afterEach(() => {
    expect(pageErrors).toEqual([]);
  });
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/DatePicker/test/DatePicker.open-button.client.tsx'
    });
    context = await source.browser.newContext();
    context.on('page', page => {
      page.on('pageerror', error => pageErrors.push(error.message));
    });
    console.info('Runtime', source.browserName, source.browser.version(), source.reactVersion);
  });
  afterAll(async () => source?.close());

  async function gotoFixture(page: Page, query: string) {
    await page.goto(`${source.url}/#${query}`);
    await page.waitForFunction(() => window.__RSUITE_DATE_OPEN_BUTTON__?.snapshot().ready);
    expect(await page.evaluate(() => window.__RSUITE_DATE_OPEN_BUTTON__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
  }

  it.each([false, true])(
    'returns focus after one-tap date selection (controlled=%s)',
    async controlled => {
      const page = await context.newPage();
      try {
        await gotoFixture(page, `kind=DatePicker&filled&oneTap${controlled ? '&controlled' : ''}`);
        const button = page.getByRole('button', { name: 'Open picker', exact: true });
        await button.click();
        await page.getByRole('gridcell', { name: '15 Feb 2024', exact: true }).click();
        await expect.poll(() => page.getByTestId('picker-popup').count()).toBe(0);
        await expect
          .poll(() => button.evaluate(element => element === document.activeElement))
          .toBe(true);
        expect(await page.getByRole('textbox', { name: 'Appointment' }).inputValue()).toBe(
          '2024-02-15'
        );
        expect(
          await page.evaluate(() => window.__RSUITE_DATE_OPEN_BUTTON__.snapshot().callbacks)
        ).toEqual([{ kind: 'open' }, { kind: 'change', trusted: true }, { kind: 'close' }]);
        const input = page.getByRole('textbox', { name: 'Appointment' });
        await input.click();
        await input.evaluate(element => (element as HTMLInputElement).setSelectionRange(0, 0));
        await input.press('ArrowUp');
        await expect.poll(() => input.inputValue()).toBe('2025-02-15');
        expect(await input.evaluate(element => element === document.activeElement)).toBe(true);
        expect(await page.getByTestId('picker-popup').count()).toBe(0);
      } finally {
        await page.close();
      }
    }
  );

  describe.each(['DatePicker', 'DateRangePicker', 'TimePicker', 'TimeRangePicker'])('%s', kind => {
    it('manages focus when pointer activation does not focus the button', async () => {
      const page = await context.newPage();
      try {
        await gotoFixture(page, `kind=${kind}&filled`);
        await page.evaluate(() => {
          document.addEventListener('mousedown', event => {
            if ((event.target as Element).closest('.rs-picker-open-button')) event.preventDefault();
          });
        });
        await page.getByRole('textbox', { name: 'Appointment' }).click();
        const button = page.getByRole('button', { name: 'Open picker', exact: true });
        await button.click();
        await expect
          .poll(() =>
            page
              .getByTestId('picker-popup')
              .evaluate(element => element.contains(document.activeElement))
          )
          .toBe(true);
        await page.keyboard.press('Escape');
        await expect.poll(() => page.getByTestId('picker-popup').count()).toBe(0);
        expect(await button.evaluate(element => element === document.activeElement)).toBe(true);
      } finally {
        await page.close();
      }
    });

    it('keeps expanded state accurate when the opening policy changes', async () => {
      const page = await context.newPage();
      try {
        await gotoFixture(page, `kind=${kind}&filled&policy&imperative`);
        const toggle = page.getByRole('button', { name: 'Toggle policy', exact: true });
        const button = page.getByRole('button', { name: 'Open picker', exact: true });
        const changePolicy = async () => {
          await toggle.focus();
          await page.keyboard.press('Enter');
        };
        await button.click();
        await expect.poll(() => page.getByTestId('picker-popup').isVisible()).toBe(true);
        await changePolicy();
        expect(await button.count()).toBe(0);
        await page.getByRole('button', { name: 'Close by ref', exact: true }).focus();
        await page.keyboard.press('Enter');
        await expect.poll(() => page.getByTestId('picker-popup').count()).toBe(0);
        await changePolicy();
        expect(await button.getAttribute('aria-expanded')).toBe('false');
        expect(await button.getAttribute('aria-controls')).toBe(null);
        await changePolicy();
        await page.getByRole('textbox', { name: 'Appointment' }).click();
        await expect.poll(() => page.getByTestId('picker-popup').isVisible()).toBe(true);
        await changePolicy();
        expect(await button.getAttribute('aria-expanded')).toBe('true');
        expect(await button.getAttribute('aria-controls')).toBe(
          await page.getByTestId('picker-popup').getAttribute('id')
        );
        await page.keyboard.press('Escape');
        await expect.poll(() => page.getByTestId('picker-popup').count()).toBe(0);
        expect(await button.getAttribute('aria-expanded')).toBe('false');
      } finally {
        await page.close();
      }
    });

    it.each([
      { flags: 'zhCN', label: '打开选择器' },
      { flags: 'zhCN&defaults', label: 'Open appointment' },
      { flags: 'zhCN&defaults&instanceLocale', label: 'Choose appointment' },
      { flags: 'legacyLocale', label: 'Open picker' }
    ])('localizes the opening button: $flags', async ({ flags, label }) => {
      const page = await context.newPage();
      try {
        await gotoFixture(page, `kind=${kind}&${flags}`);
        const input = page.getByRole('textbox', { name: 'Appointment' });
        await input.click();
        expect(await page.getByTestId('picker-popup').count()).toBe(0);
        await page.getByRole('button', { name: label, exact: true }).click();
        await expect.poll(() => page.getByTestId('picker-popup').isVisible()).toBe(true);
      } finally {
        await page.close();
      }
    });

    it.each([false, true])(
      'returns focus after OK or a preset (controlled=%s)',
      async controlled => {
        const page = await context.newPage();
        try {
          await gotoFixture(page, `kind=${kind}&filled&preset${controlled ? '&controlled' : ''}`);
          const button = page.getByRole('button', { name: 'Open picker' });
          const input = page.getByRole('textbox', { name: 'Appointment' });
          const snapshot = () =>
            page.evaluate(() => window.__RSUITE_DATE_OPEN_BUTTON__.snapshot().callbacks);
          await button.click();
          await page.getByRole('button', { name: 'OK', exact: true }).click();
          await expect.poll(() => page.getByTestId('picker-popup').count()).toBe(0);
          await expect
            .poll(() => button.evaluate(element => element === document.activeElement))
            .toBe(true);
          expect((await snapshot()).filter(x => x.kind === 'ok')).toEqual([
            { kind: 'ok', trusted: true }
          ]);
          const original = await input.inputValue();
          await page.keyboard.press('Enter');
          await page.getByRole('button', { name: 'Preset', exact: true }).click();
          await expect.poll(() => page.getByTestId('picker-popup').count()).toBe(0);
          await expect
            .poll(() => button.evaluate(element => element === document.activeElement))
            .toBe(true);
          expect(await input.inputValue()).not.toBe(original);
          expect((await snapshot()).filter(x => x.kind === 'shortcut')).toEqual([
            { kind: 'shortcut', trusted: true }
          ]);
          expect((await snapshot()).filter(x => x.kind === 'close')).toHaveLength(2);
          expect((await snapshot()).filter(x => x.kind === 'submit')).toEqual([]);
        } finally {
          await page.close();
        }
      }
    );

    it.each([false, true])(
      'preserves imperative opening and closing (controlled=%s)',
      async controlled => {
        const page = await context.newPage();
        try {
          await gotoFixture(page, `kind=${kind}&imperative${controlled ? '&controlled' : ''}`);
          const opening = page.getByRole('button', { name: 'Open by ref', exact: true });
          const closing = page.getByRole('button', { name: 'Close by ref', exact: true });
          const button = page.getByRole('button', { name: 'Open picker', exact: true });
          await opening.click();
          await expect.poll(() => page.getByTestId('picker-popup').isVisible()).toBe(true);
          expect(await button.getAttribute('aria-expanded')).toBe('true');
          expect(await opening.evaluate(element => element === document.activeElement)).toBe(true);
          // Keyboard activation does not emit the outside mousedown that also closes a picker.
          await closing.focus();
          expect(await page.getByTestId('picker-popup').isVisible()).toBe(true);
          await page.keyboard.press('Enter');
          await expect.poll(() => page.getByTestId('picker-popup').count()).toBe(0);
          expect(await button.getAttribute('aria-expanded')).toBe('false');
          expect(await closing.evaluate(element => element === document.activeElement)).toBe(true);
          expect(
            await page.evaluate(() => window.__RSUITE_DATE_OPEN_BUTTON__.snapshot().callbacks)
          ).toEqual([{ kind: 'open' }, { kind: 'close' }]);
        } finally {
          await page.close();
        }
      }
    );

    it('exposes a default-open popup without stealing initial focus', async () => {
      const page = await context.newPage();
      try {
        await gotoFixture(page, `kind=${kind}&defaultOpen`);
        const popup = page.getByTestId('picker-popup');
        await expect.poll(() => popup.isVisible()).toBe(true);
        const button = page.getByRole('button', { name: 'Open picker', exact: true });
        expect(await button.getAttribute('aria-expanded')).toBe('true');
        expect(await button.getAttribute('aria-controls')).toBe(await popup.getAttribute('id'));
        expect(await page.evaluate(() => document.activeElement === document.body)).toBe(true);
      } finally {
        await page.close();
      }
    });

    it('preserves expanded state when a controlled close request is rejected', async () => {
      const page = await context.newPage();
      try {
        await gotoFixture(page, `kind=${kind}&controlled&denyClose`);
        const button = page.getByRole('button', { name: 'Open picker', exact: true });
        await button.click();
        const popup = page.getByTestId('picker-popup');
        await expect.poll(() => popup.isVisible()).toBe(true);
        await page.keyboard.press('Escape');
        expect(await popup.isVisible()).toBe(true);
        expect(await button.getAttribute('aria-expanded')).toBe('true');
        expect(
          await page.evaluate(() => window.__RSUITE_DATE_OPEN_BUTTON__.snapshot().callbacks)
        ).toEqual([{ kind: 'open' }, { kind: 'close' }]);
      } finally {
        await page.close();
      }
    });

    it.each(['disabled', 'readOnly', 'loading', 'plaintext'])('respects %s', async state => {
      const page = await context.newPage();
      try {
        await gotoFixture(page, `kind=${kind}&filled&${state}`);
        await page.waitForFunction(() => window.__RSUITE_DATE_OPEN_BUTTON__?.snapshot().ready);
        const input = page.getByRole('textbox', { name: 'Appointment' });
        const button = page.getByRole('button', { name: 'Open picker' });
        if (state === 'plaintext') {
          expect(await input.count()).toBe(0);
          expect(await button.count()).toBe(0);
        } else {
          expect(await button.isDisabled()).toBe(true);
          if (state !== 'disabled') {
            const value = await input.inputValue();
            await input.click();
            await input.press('Enter');
            await input.press('ArrowUp');
            expect(await input.inputValue()).toBe(value);
          }
        }
        expect(await page.getByTestId('picker-popup').count()).toBe(0);
        // Read-only inputs retain the browser's native implicit form submission on Enter.
        expect(
          await page.evaluate(() => window.__RSUITE_DATE_OPEN_BUTTON__.snapshot().callbacks)
        ).toEqual(
          state === 'readOnly' || state === 'loading' ? [{ kind: 'submit', trusted: true }] : []
        );
      } finally {
        await page.close();
      }
    });

    it('keeps rejected controlled requests closed', async () => {
      const page = await context.newPage();
      try {
        await gotoFixture(page, `kind=${kind}&controlled&deny`);
        const button = page.getByRole('button', { name: 'Open picker' });
        await button.click();
        expect(await page.getByTestId('picker-popup').count()).toBe(0);
        expect(await button.getAttribute('aria-expanded')).toBe('false');
        expect(await button.getAttribute('aria-controls')).toBe(null);
        expect(await button.evaluate(element => element === document.activeElement)).toBe(true);
        expect(
          await page.evaluate(() => window.__RSUITE_DATE_OPEN_BUTTON__.snapshot().callbacks)
        ).toEqual([{ kind: 'open' }]);
      } finally {
        await page.close();
      }
    });

    it('opens a responsive drawer and returns focus on Escape', async () => {
      const page = await context.newPage();
      await page.setViewportSize({ width: 375, height: 812 });
      try {
        await gotoFixture(page, `kind=${kind}&filled&responsive`);
        const input = page.getByRole('textbox', { name: 'Appointment' });
        await input.click();
        expect(await page.getByTestId('picker-popup').count()).toBe(0);
        const button = page.getByRole('button', { name: 'Open picker' });
        await input.press('Tab');
        await page.keyboard.press('Enter');
        await expect.poll(() => page.locator('.rs-drawer').isVisible()).toBe(true);
        expect(await page.getByTestId('picker-popup').getAttribute('data-breakpoint')).toBe('xs');
        await page.keyboard.press('Escape');
        await expect.poll(() => page.getByTestId('picker-popup').count()).toBe(0);
        await expect
          .poll(() => button.evaluate(element => element === document.activeElement))
          .toBe(true);
      } finally {
        await page.close();
      }
    });

    it.each(['defaults', 'customCaret', 'caretNone', 'renderValue'])(
      'preserves %s customization',
      async customization => {
        const page = await context.newPage();
        try {
          await gotoFixture(page, `kind=${kind}&filled&${customization}`);
          const input = page.getByRole('textbox', { name: 'Appointment' });
          await input.click();
          expect(await page.getByTestId('picker-popup').count()).toBe(0);
          if (customization === 'caretNone') {
            expect(await page.getByRole('button', { name: 'Open picker' }).count()).toBe(0);
            await input.press('Enter');
          } else {
            const button = page.getByRole('button', {
              name: customization === 'defaults' ? 'Open appointment' : 'Open picker'
            });
            if (customization === 'customCaret')
              expect(await button.getByTestId('custom-caret').count()).toBe(1);
            if (customization === 'renderValue') {
              expect(await input.inputValue()).toBe('Appointment value');
              expect(await input.getAttribute('readonly')).not.toBe(null);
            }
            await button.click();
          }
          await expect.poll(() => page.getByTestId('picker-popup').isVisible()).toBe(true);
          if (customization === 'renderValue') {
            expect(await input.inputValue()).not.toBe('Appointment value');
            expect(await input.getAttribute('readonly')).toBe(null);
          }
        } finally {
          await page.close();
        }
      }
    );

    it.each([
      { controlled: false, filled: false, key: 'Enter' },
      { controlled: false, filled: true, key: 'Space' },
      { controlled: true, filled: false, key: 'Space' },
      { controlled: true, filled: true, key: 'Enter' }
    ])(
      'separates editing and opening: $controlled / $filled / $key',
      async ({ controlled, filled, key }) => {
        const page = await context.newPage();
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        try {
          const hash = `kind=${kind}&strict${controlled ? '&controlled' : ''}${filled ? '&filled' : ''}`;
          await gotoFixture(page, `${hash}`);
          await page.waitForFunction(() => window.__RSUITE_DATE_OPEN_BUTTON__?.snapshot().ready);
          const snapshot = () =>
            page.evaluate(() => window.__RSUITE_DATE_OPEN_BUTTON__.snapshot().callbacks);
          const input = page.getByRole('textbox', { name: 'Appointment' });
          const button = page.getByRole('button', { name: 'Open picker' });
          await input.click();
          expect(await page.getByTestId('picker-popup').count()).toBe(0);
          expect(await snapshot()).toEqual([]);
          expect(await button.getAttribute('aria-expanded')).toBe('false');
          expect(await button.getAttribute('aria-controls')).toBe(null);
          if (filled) {
            const original = await input.inputValue();
            await input.evaluate(element => (element as HTMLInputElement).setSelectionRange(0, 0));
            await input.press('ArrowUp');
            await expect.poll(() => input.inputValue()).not.toBe(original);
            expect(await snapshot()).toEqual([{ kind: 'change', trusted: true }]);
            expect(await page.getByTestId('picker-popup').count()).toBe(0);
          }
          await page.keyboard.press('Tab');
          expect(await button.evaluate(element => element === document.activeElement)).toBe(true);
          expect(await button.evaluate(element => getComputedStyle(element).outlineStyle)).toBe(
            'solid'
          );
          expect(await button.evaluate(element => getComputedStyle(element).outlineWidth)).toBe(
            '2px'
          );
          await page.keyboard.press(key);
          await expect.poll(() => page.getByTestId('picker-popup').isVisible()).toBe(true);
          await expect
            .poll(() =>
              page
                .getByTestId('picker-popup')
                .evaluate(element => element.contains(document.activeElement))
            )
            .toBe(true);
          expect(await button.getAttribute('aria-expanded')).toBe('true');
          expect(await button.getAttribute('aria-controls')).toBe(
            await page.getByTestId('picker-popup').getAttribute('id')
          );
          expect((await snapshot()).filter(x => x.kind === 'open')).toHaveLength(1);
          expect((await snapshot()).filter(x => x.kind === 'submit')).toEqual([]);
          await page.keyboard.press('Escape');
          await expect.poll(() => page.getByTestId('picker-popup').count()).toBe(0);
          expect(await button.evaluate(element => element === document.activeElement)).toBe(true);
          expect(await button.getAttribute('aria-expanded')).toBe('false');
          await button.click();
          await expect.poll(() => page.getByTestId('picker-popup').isVisible()).toBe(true);
          await page.getByRole('button', { name: 'Outside', exact: true }).click();
          await expect.poll(() => page.getByTestId('picker-popup').count()).toBe(0);
          expect(
            await page
              .getByRole('button', { name: 'Outside', exact: true })
              .evaluate(element => element === document.activeElement)
          ).toBe(true);
          if (filled) {
            await page.getByRole('button', { name: 'Clear', exact: true }).click();
            await expect.poll(() => input.inputValue()).toBe('');
            expect(await button.isVisible()).toBe(true);
            expect(await page.getByTestId('picker-popup').count()).toBe(0);
            expect((await snapshot()).filter(x => x.kind === 'clean')).toEqual([
              { kind: 'clean', trusted: true }
            ]);
          }
          await input.focus();
          await input.press('Enter');
          await expect.poll(() => page.getByTestId('picker-popup').isVisible()).toBe(true);
          expect(await input.evaluate(element => element === document.activeElement)).toBe(true);
          expect((await snapshot()).filter(x => x.kind === 'open')).toHaveLength(3);
          expect((await snapshot()).filter(x => x.kind === 'close')).toHaveLength(2);
          expect(errors).toEqual([]);
        } finally {
          console.info(
            '[date-open-button]',
            JSON.stringify({
              kind,
              controlled,
              filled,
              key,
              errors,
              ...(await page.evaluate(() => window.__RSUITE_DATE_OPEN_BUTTON__?.snapshot()))
            })
          );
          await page.close();
        }
      }
    );
  });
});
