import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Locator, Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Uploader.preview.client';

const targets = [
  { listType: 'text', slot: 'filename' },
  { listType: 'picture-text', slot: 'thumbnail' },
  { listType: 'picture-text', slot: 'filename' },
  { listType: 'picture', slot: 'thumbnail' }
] as const;

describe('Uploader previews with native keyboard events', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.preview.client.tsx'
    });
    console.info(
      'Uploader preview browser',
      source.browserName,
      source.browser.version(),
      source.reactVersion
    );
  });
  afterAll(async () => {
    await source?.close();
  });

  const open = async (
    options: Parameters<Window['__RSUITE_PREVIEW__']['mount']>[0],
    forced = false
  ) => {
    const page = await source.browser.newPage();
    await page.emulateMedia({ forcedColors: forced ? 'active' : 'none' });
    await page.goto(source.url);
    await page.waitForFunction(() => Boolean(window.__RSUITE_PREVIEW__));
    expect(await page.evaluate(() => window.__RSUITE_PREVIEW__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    await page.evaluate(options => window.__RSUITE_PREVIEW__.mount(options), options);
    return page;
  };
  const target = (page: Page, slot: 'thumbnail' | 'filename') =>
    page.locator(
      slot === 'thumbnail'
        ? '.rs-uploader-file-item-btn-preview'
        : '.rs-uploader-file-item-title[data-rs-uploader-action="preview"]'
    );
  const focused = (locator: Locator) =>
    locator.evaluate(element => element.ownerDocument.activeElement === element);
  const tabTo = async (page: Page, locator: Locator) => {
    expect(await locator.count()).toBe(1);
    const before = page.getByRole('button', { name: 'Before uploader', exact: true });
    await before.focus();
    expect(await focused(before)).toBe(true);
    // Safari on macOS uses Option+Tab to include links in native keyboard navigation.
    const key =
      source.browserName === 'webkit' &&
      process.platform === 'darwin' &&
      (await locator.evaluate(element => element.matches('a[href]')))
        ? 'Alt+Tab'
        : 'Tab';
    for (let index = 0; index < 20; index++) {
      await page.keyboard.press(key);
      if (await focused(locator)) return;
    }
    throw new Error('Preview target was not reachable with Tab');
  };
  const visibleFocus = async (locator: Locator, slot: 'thumbnail' | 'filename') => {
    expect(await locator.count()).toBe(1);
    expect(await focused(locator)).toBe(true);
    expect(
      await locator.evaluate((element, slot) => {
        const target = slot === 'thumbnail' ? element.closest('.rs-uploader-file-item')! : element;
        const style = getComputedStyle(target);
        return (
          element.matches(':focus-visible') &&
          target.getClientRects().length > 0 &&
          style.visibility === 'visible' &&
          style.outlineStyle !== 'none' &&
          parseFloat(style.outlineWidth) > 0
        );
      }, slot)
    ).toBe(true);
  };
  const expectPaintedOutline = async (page: Page, row: Locator) => {
    const rect = await row.boundingBox();
    expect(rect).not.toBeNull();
    const focused = (await page.screenshot()).toString('base64');
    const original = await row.evaluate(element => (element as HTMLElement).style.cssText);
    await row.evaluate(element =>
      (element as HTMLElement).style.setProperty('outline', 'none', 'important')
    );
    const withoutOutline = (await page.screenshot()).toString('base64');
    await row.evaluate((element, original) => {
      (element as HTMLElement).style.cssText = original;
    }, original);
    const paintedPixels = await page.evaluate(
      async ({ focused, withoutOutline, rect }) => {
        const decode = async (base64: string) => {
          const image = new Image();
          image.src = `data:image/png;base64,${base64}`;
          await image.decode();
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext('2d')!;
          context.drawImage(image, 0, 0);
          return context.getImageData(0, 0, canvas.width, canvas.height);
        };
        const [before, after] = await Promise.all([decode(focused), decode(withoutOutline)]);
        let changed = 0;
        for (
          let y = Math.max(0, Math.floor(rect.y) - 4);
          y < Math.min(before.height, Math.ceil(rect.y + rect.height) + 4);
          y++
        ) {
          for (
            let x = Math.max(0, Math.floor(rect.x) - 4);
            x < Math.min(before.width, Math.ceil(rect.x + rect.width) + 4);
            x++
          ) {
            if (x >= rect.x && x < rect.x + rect.width && y >= rect.y && y < rect.y + rect.height)
              continue;
            const index = (y * before.width + x) * 4;
            if (
              [0, 1, 2].some(
                channel => Math.abs(before.data[index + channel] - after.data[index + channel]) > 30
              )
            )
              changed++;
          }
        }
        return changed;
      },
      { focused, withoutOutline, rect: rect! }
    );
    expect(paintedPixels).toBeGreaterThan(100);
  };

  const expectPreview = async (page: Page, name = 'example.png', count = 1) => {
    const state = await page.evaluate(() => window.__RSUITE_PREVIEW__.snapshot());
    expect(state.previews).toEqual(
      Array.from({ length: count }, () => ({
        name,
        type: 'click',
        trusted: true,
        target: 'BUTTON'
      }))
    );
    expect(state.submissions).toBe(0);
  };

  for (const { listType, slot } of targets) {
    for (const mode of ['normal', 'no-image'] as const) {
      it.each(['Enter', 'Space'])(
        `${listType} ${slot} ${mode}: activates once with %s and pointer`,
        async key => {
          const page = await open({ listType, mode }, key === 'Space');
          try {
            const preview = target(page, slot);
            await tabTo(page, preview);
            await visibleFocus(preview, slot);
            expect(
              await preview.evaluate(el => ({ tag: el.tagName, type: el.getAttribute('type') }))
            ).toEqual({ tag: 'BUTTON', type: 'button' });
            await page.keyboard.press(key);
            await expectPreview(page);
            await preview.click();
            await expectPreview(page, 'example.png', 2);
          } finally {
            await page.close();
          }
        }
      );
    }
    it.each(['readonly', 'plaintext', 'disabled-upload'] as const)(
      `${listType} ${slot}: preserves preview in %s mode`,
      async mode => {
        const page = await open({ listType, mode });
        try {
          const preview = target(page, slot);
          await tabTo(page, preview);
          await page.keyboard.press('Space');
          await expectPreview(page);
        } finally {
          await page.close();
        }
      }
    );
    it(`${listType} ${slot}: exposes the accessible default through custom renderers`, async () => {
      const page = await open({ listType, mode: 'custom-default' });
      try {
        const preview = target(page, slot);
        expect(await preview.count()).toBe(1);
        expect(await preview.getAttribute(`data-custom-${slot}`)).toBe('true');
        await tabTo(page, preview);
        await visibleFocus(preview, slot);
        await page.keyboard.press('Enter');
        await expectPreview(page);
      } finally {
        await page.close();
      }
    });
  }

  for (const listType of ['text', 'picture-text', 'picture'] as const) {
    it(`${listType}: skips disabled file preview buttons`, async () => {
      const page = await open({ listType, mode: 'disabled-file' });
      try {
        const previews = page.getByRole('button', { name: 'Preview: example.png', exact: true });
        expect(await previews.count()).toBe(listType === 'picture-text' ? 2 : 1);
        for (const preview of await previews.all()) expect(await preview.isDisabled()).toBe(true);
        await tabTo(page, page.getByRole('button', { name: 'After uploader', exact: true }));
        expect(
          (await page.evaluate(() => window.__RSUITE_PREVIEW__.snapshot())).previews
        ).toHaveLength(0);
      } finally {
        await page.close();
      }
    });
    it(`${listType}: has no preview tab stop without a callback`, async () => {
      const page = await open({ listType, mode: 'no-handler' });
      try {
        expect(await page.getByRole('button', { name: /^Preview/ }).count()).toBe(0);
        await tabTo(page, page.getByRole('button', { name: 'After uploader', exact: true }));
        expect(
          (await page.evaluate(() => window.__RSUITE_PREVIEW__.snapshot())).previews
        ).toHaveLength(0);
      } finally {
        await page.close();
      }
    });
    it(`${listType}: leaves replacement renderer controls in the consumer's ownership`, async () => {
      const page = await open({ listType, mode: 'custom-owned' });
      try {
        expect(await page.getByRole('button', { name: /^Preview/ }).count()).toBe(0);
        expect(await page.locator('button button, button a, a button').count()).toBe(0);
        const link = page.getByRole('link', {
          name: listType === 'picture' ? 'Custom thumbnail' : 'Custom filename',
          exact: true
        });
        await tabTo(page, link);
        await page.keyboard.press('Enter');
        const state = await page.evaluate(() => window.__RSUITE_PREVIEW__.snapshot());
        expect(state.custom).toBe(1);
        expect(state.previews).toHaveLength(0);
        expect(state.submissions).toBe(0);
        expect(new URL(page.url()).hash).toBe('#consumer-preview');
      } finally {
        await page.close();
      }
    });
  }

  it('preserves focus assigned by the preview callback', async () => {
    const page = await open({ listType: 'picture', mode: 'move-focus' });
    try {
      await tabTo(page, target(page, 'thumbnail'));
      await page.keyboard.press('Enter');
      await expectPreview(page);
      expect(await focused(page.getByRole('button', { name: 'After uploader', exact: true }))).toBe(
        true
      );
    } finally {
      await page.close();
    }
  });
  it('recovers removal focus to the next preview when removal becomes unavailable', async () => {
    const page = await open({ listType: 'text', mode: 'focus-next' });
    try {
      await tabTo(page, page.getByRole('button', { name: 'Remove file: beta.txt', exact: true }));
      await page.keyboard.press('Enter');
      const preview = page.getByRole('button', { name: 'Preview: gamma.txt', exact: true });
      await visibleFocus(preview, 'filename');
      await page.keyboard.press('Enter');
      await expectPreview(page, 'gamma.txt');
    } finally {
      await page.close();
    }
  });
  for (const listType of ['picture', 'picture-text'] as const) {
    it.each(['error', 'uploading'] as const)(
      `${listType}: paints thumbnail focus outside the %s overlay`,
      async status => {
        const page = await open({ listType, status }, true);
        try {
          const preview = target(page, 'thumbnail');
          await tabTo(page, preview);
          await visibleFocus(preview, 'thumbnail');
          await expectPaintedOutline(page, page.locator('.rs-uploader-file-item'));
          await page.keyboard.press('Enter');
          await expectPreview(page);
        } finally {
          await page.close();
        }
      }
    );
  }
});
