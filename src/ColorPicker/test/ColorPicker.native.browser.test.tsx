import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('ColorPicker native browser interaction', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/ColorPicker/test/ColorPicker.native.client.tsx'
    });
    console.info('ColorPicker browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  const open = async (options = '', height = 800, hasTouch = false) => {
    const page = await source.browser.newPage({
      viewport: { width: options.includes('mobile') ? 375 : 1024, height },
      reducedMotion: 'reduce',
      hasTouch
    });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(source.url + '/#' + options);
    await page.getByTestId('runtime').waitFor({ state: 'attached' });
    expect(await page.getByTestId('runtime').getAttribute('data-react')).toBe(source.reactVersion);
    expect(await page.getByTestId('runtime').getAttribute('data-react-dom')).toBe(
      source.reactVersion
    );
    return { page, errors };
  };
  const value = (page: Page) =>
    page.locator('form').evaluate(node => new FormData(node as HTMLFormElement).getAll('brand'));
  const events = async (page: Page) =>
    JSON.parse((await page.getByTestId('events').textContent())!) as {
      value: string | null;
      trusted: boolean;
      pointerType?: string;
    }[];

  it.each(['', 'controlled'])(
    'opens with keyboard and edits every channel with native keys (%s)',
    async mode => {
      const { page, errors } = await open(mode);
      try {
        await page.getByRole('button', { name: 'Before', exact: true }).click();
        await page.keyboard.press('Tab');
        expect(
          await page
            .getByRole('combobox', { name: 'Brand', exact: true })
            .evaluate(node => node === document.activeElement)
        ).toBe(true);
        await page.keyboard.press('Enter');
        const hue = page.getByRole('slider', { name: 'Hue', exact: true });
        await expect.poll(() => hue.evaluate(node => node === document.activeElement)).toBe(true);
        await hue.press('ArrowRight');
        expect(await hue.inputValue()).toBe('1');
        await page.keyboard.press('Tab');
        const saturation = page.getByRole('slider', { name: 'Saturation' });
        expect(await saturation.evaluate(node => node === document.activeElement)).toBe(true);
        await saturation.press('ArrowLeft');
        expect(await saturation.inputValue()).toBe('99');
        await page.keyboard.press('Tab');
        const brightness = page.getByRole('slider', { name: 'Brightness' });
        await brightness.press('ArrowLeft');
        expect(await brightness.inputValue()).toBe('99');
        await page.keyboard.press('Tab');
        const opacity = page.getByRole('slider', { name: 'Opacity' });
        await opacity.press('ArrowLeft');
        expect(await opacity.inputValue()).toBe('99');
        const changes = await events(page);
        expect(changes).toHaveLength(4);
        expect(changes.every(change => change.trusted)).toBe(true);
        expect(await value(page)).toEqual([changes.at(-1)!.value]);
        await opacity.press('Escape');
        await expect
          .poll(() =>
            page.getByRole('combobox', { name: 'Brand', exact: true }).getAttribute('aria-expanded')
          )
          .toBe('false');
        expect(
          await page
            .getByRole('combobox', { name: 'Brand', exact: true })
            .evaluate(node => node === document.activeElement)
        ).toBe(true);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it.each(['', 'rtl'])(
    'tracks a captured pointer outside the area and maps direction (%s)',
    async mode => {
      const { page, errors } = await open(mode);
      try {
        await page.getByRole('combobox', { name: 'Brand', exact: true }).click();
        const area = page.locator('.rs-color-picker-area');
        const rect = (await area.boundingBox())!;
        await page.mouse.move(rect.x + rect.width / 4, rect.y + rect.height / 2);
        await page.mouse.down();
        const saturation = Number(
          await page.getByRole('slider', { name: 'Saturation' }).inputValue()
        );
        expect(saturation).toBeCloseTo(mode === 'rtl' ? 75 : 25, 0);
        expect(
          Number(await page.getByRole('slider', { name: 'Brightness' }).inputValue())
        ).toBeCloseTo(50, 0);
        await page.mouse.move(rect.x + rect.width + 20, rect.y - 20);
        await page.mouse.up();
        expect(await page.getByRole('slider', { name: 'Saturation' }).inputValue()).toBe(
          mode === 'rtl' ? '0' : '100'
        );
        expect(await page.getByRole('slider', { name: 'Brightness' }).inputValue()).toBe('100');
        expect((await events(page)).every(change => change.trusted)).toBe(true);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it('commits text with Enter without submitting the form and recovers from invalid input', async () => {
    const { page, errors } = await open();
    try {
      await page.getByRole('combobox', { name: 'Brand', exact: true }).click();
      const input = page.getByRole('textbox', { name: 'Color value' });
      await input.fill('not a color');
      await input.press('Enter');
      await page.getByRole('alert').waitFor();
      expect(await value(page)).toEqual(['#ff0000']);
      await input.fill('rgb(0 255 0 / 50%)');
      await input.press('Enter');
      expect(await value(page)).toEqual(['#00ff0080']);
      expect(await page.getByTestId('submits').textContent()).toBe('0');
      expect(await events(page)).toEqual([{ value: '#00ff0080', trusted: true }]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it.each([800, 400])(
    'opens one labeled mobile dialog with visible actions at height %s',
    async height => {
      const { page, errors } = await open('mobile', height);
      try {
        const trigger = page.getByRole('combobox', { name: 'Brand', exact: true });
        await trigger.click();
        const dialog = page.getByRole('dialog', { name: 'Brand', exact: true });
        await dialog.waitFor();
        expect(await page.getByRole('dialog').count()).toBe(1);
        expect(await trigger.getAttribute('aria-controls')).toBe(await dialog.getAttribute('id'));
        const doneBounds = (await dialog
          .getByRole('button', { name: 'Done', exact: true })
          .boundingBox())!;
        expect(doneBounds.y + doneBounds.height).toBeLessThanOrEqual(page.viewportSize()!.height);
        await dialog.getByRole('button', { name: 'Success', exact: true }).click();
        expect(await value(page)).toEqual(['#00ff00']);
        await dialog.getByRole('button', { name: 'Done', exact: true }).click();
        await dialog.waitFor({ state: 'detached' });
        expect(await trigger.evaluate(node => node === document.activeElement)).toBe(true);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it('resets through a native reset button and keeps readonly and disabled values distinct', async () => {
    const { page, errors } = await open();
    try {
      await page.getByRole('combobox', { name: 'Brand', exact: true }).click();
      await page.getByRole('button', { name: 'Success', exact: true }).click();
      await page.getByRole('button', { name: 'Done', exact: true }).click();
      await page.getByRole('button', { name: 'Reset', exact: true }).click();
      expect(await value(page)).toEqual(['#ff0000']);
      expect(await events(page)).toEqual([
        expect.objectContaining({ value: '#00ff00', trusted: true })
      ]);
      for (const lock of ['readonly', 'disabled']) {
        await page.goto(source.url + '/#' + lock);
        await page.reload();
        await page.getByTestId('runtime').waitFor({ state: 'attached' });
        const trigger = page.getByRole('combobox', { name: 'Brand', exact: true });
        if (lock === 'readonly') await trigger.click();
        expect(await page.getByRole('dialog').count()).toBe(0);
        expect(await value(page)).toEqual(lock === 'readonly' ? ['#ff0000'] : []);
      }
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it('edits through trusted touch input without scrolling the color area', async () => {
    const { page, errors } = await open('mobile', 800, true);
    try {
      await page.getByRole('combobox', { name: 'Brand', exact: true }).tap();
      const area = page.locator('.rs-color-picker-area');
      const rect = (await area.boundingBox())!;
      await page.touchscreen.tap(rect.x + rect.width / 4, rect.y + rect.height / 2);
      expect(
        Number(await page.getByRole('slider', { name: 'Saturation' }).inputValue())
      ).toBeCloseTo(25, 0);
      expect(
        Number(await page.getByRole('slider', { name: 'Brightness' }).inputValue())
      ).toBeCloseTo(50, 0);
      const changes = await events(page);
      expect(changes.length).toBeGreaterThan(0);
      expect(changes.every(change => change.trusted && change.pointerType === 'touch')).toBe(true);

      if (source.browserName === 'chromium') {
        const session = await page.context().newCDPSession(page);
        try {
          const scrollBefore = await page.evaluate(() => window.scrollY);
          await session.send('Input.dispatchTouchEvent', {
            type: 'touchStart',
            touchPoints: [{ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }]
          });
          await session.send('Input.dispatchTouchEvent', {
            type: 'touchMove',
            touchPoints: [{ x: rect.x + rect.width + 10, y: rect.y - 10 }]
          });
          await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
          expect(await page.getByRole('slider', { name: 'Saturation' }).inputValue()).toBe('100');
          expect(await page.getByRole('slider', { name: 'Brightness' }).inputValue()).toBe('100');
          expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);
          expect((await events(page)).every(change => change.trusted)).toBe(true);
        } finally {
          await session.detach();
        }
      }
      expect(await value(page)).toEqual([(await events(page)).at(-1)!.value]);
      await page.getByRole('button', { name: 'Done', exact: true }).tap();
      await page.getByRole('dialog').waitFor({ state: 'detached' });
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it('keeps desktop actions within a short viewport', async () => {
    const { page, errors } = await open('', 400);
    try {
      await page.getByRole('combobox', { name: 'Brand', exact: true }).click();
      const done = page.getByRole('button', { name: 'Done', exact: true });
      const bounds = (await done.boundingBox())!;
      expect(bounds.y).toBeGreaterThanOrEqual(0);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(400);
      await done.click();
      await page.getByRole('dialog').waitFor({ state: 'detached' });
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
