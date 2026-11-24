import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ServerResponse } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Locator, Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Uploader.focus.client';

describe('Uploader focus after native file actions', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  const requests: string[] = [];
  const pending = new Map<string, ServerResponse>();
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.focus.client.tsx',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url || '/', 'http://localhost');
          if (url.pathname !== '/upload') return next();
          const scenario = url.searchParams.get('scenario')!;
          request.resume();
          request.on('end', () => {
            requests.push(scenario);
            response.setHeader('Content-Type', 'application/json');
            if (scenario === 'retry-pending') pending.set(scenario, response);
            else response.end('{"ok":true}');
          });
        });
      }
    });
    console.info(
      'Uploader focus browser',
      source.browserName,
      source.browser.version(),
      source.reactVersion
    );
  });
  afterAll(async () => {
    for (const response of pending.values()) response.end('{"ok":true}');
    await source?.close();
  });

  const active = (page: Page) => page.evaluate(() => window.__RSUITE_UPLOAD_FOCUS__.active());
  const snapshot = (page: Page) => page.evaluate(() => window.__RSUITE_UPLOAD_FOCUS__.snapshot());
  const tabTo = async (page: Page, label: string) => {
    await page.getByRole('button', { name: 'Before uploader', exact: true }).click();
    for (let index = 0; index < 16; index++) {
      await page.keyboard.press('Tab');
      if ((await active(page)).label === label) return;
    }
    throw new Error(`Tab did not reach ${label}`);
  };
  const isFocused = (locator: Locator) =>
    locator.evaluate(element => {
      const root = element.getRootNode() as Document | ShadowRoot;
      return root.activeElement === element;
    });
  const expectFocus = async (locator: Locator) => {
    expect(await locator.count()).toBe(1);
    expect(await isFocused(locator)).toBe(true);
    await expect
      .poll(() => locator.evaluate(element => getComputedStyle(element).opacity))
      .toBe('1');
    expect(
      await locator.evaluate(element => {
        const style = getComputedStyle(element);
        return (
          style.visibility === 'visible' &&
          element.getClientRects().length > 0 &&
          ((style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) ||
            style.boxShadow !== 'none')
        );
      })
    ).toBe(true);
  };
  const open = async (
    options: Parameters<Window['__RSUITE_UPLOAD_FOCUS__']['mount']>[0],
    forcedColors = false
  ) => {
    const page = await source.browser.newPage();
    await page.emulateMedia({ forcedColors: forcedColors ? 'active' : 'none' });
    await page.goto(source.url);
    await page.waitForFunction(() => Boolean(window.__RSUITE_UPLOAD_FOCUS__));
    expect(await page.evaluate(() => window.__RSUITE_UPLOAD_FOCUS__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    await page.evaluate(options => window.__RSUITE_UPLOAD_FOCUS__.mount(options), options);
    return page;
  };
  const remove = (page: Page, file = 'alpha') =>
    page.getByRole('button', { name: `Remove file: ${file}.txt`, exact: true });
  const trigger = (page: Page) => page.getByRole('button', { name: 'Attachments', exact: true });
  const group = (page: Page, name = 'Attachments') =>
    page.getByRole('group', { name, exact: true });

  describe.each(['text', 'picture-text', 'picture'] as const)('%s', listType => {
    for (const scenario of [
      'remove-middle',
      'remove-last',
      'remove-single',
      'retry',
      'retry-no-remove',
      'remove-disabled-trigger'
    ] as const) {
      it.each(['Enter', 'Space'])(`${scenario} restores visible focus after %s`, async key => {
        const retry = scenario.startsWith('retry');
        const id = `${listType}-${scenario}-${key}`;
        const page = await open(
          {
            listType,
            scenario: id,
            single: !['remove-middle', 'remove-last'].includes(scenario),
            controlled: key === 'Space',
            removable: scenario !== 'retry-no-remove',
            disabled: scenario === 'remove-disabled-trigger'
          },
          key === 'Space'
        );
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(String(error)));
        try {
          const file =
            scenario === 'remove-middle' ? 'beta' : scenario === 'remove-last' ? 'gamma' : 'alpha';
          await tabTo(page, retry ? 'Retry' : `Remove file: ${file}.txt`);
          await page.keyboard.press(key);
          if (retry) {
            await page.waitForFunction(
              () => window.__RSUITE_UPLOAD_FOCUS__.snapshot().successes === 1
            );
            expect(requests.filter(request => request === id)).toHaveLength(1);
          }
          const destination =
            scenario === 'remove-middle'
              ? remove(page, 'gamma')
              : scenario === 'remove-last'
                ? remove(page, 'beta')
                : scenario === 'retry'
                  ? remove(page)
                  : scenario === 'retry-no-remove'
                    ? group(page, 'alpha.txt')
                    : scenario === 'remove-disabled-trigger'
                      ? group(page)
                      : trigger(page);
          await expectFocus(destination);
          const record = await snapshot(page);
          expect(retry ? record.retries : record.removals).toEqual([`${file}.txt`]);
          expect(record.trustedClicks).toEqual([true]);
          expect(record.submissions).toBe(0);
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      });
    }
    it.each(['remove', 'retry'])('respects focus moved by the %s callback', async action => {
      const page = await open({
        listType,
        scenario: `${listType}-${action}-outside`,
        single: true,
        callback: 'outside'
      });
      try {
        await tabTo(page, action === 'retry' ? 'Retry' : 'Remove file: alpha.txt');
        await page.keyboard.press('Enter');
        if (action === 'retry')
          await page.waitForFunction(
            () => window.__RSUITE_UPLOAD_FOCUS__.snapshot().successes === 1
          );
        expect((await active(page)).text).toBe('After uploader');
      } finally {
        await page.close();
      }
    });
    it('retains the retry button for manual upload', async () => {
      const page = await open({
        listType,
        scenario: `${listType}-manual`,
        single: true,
        autoUpload: false
      });
      try {
        await tabTo(page, 'Retry');
        await page.keyboard.press('Space');
        await expectFocus(page.getByRole('button', { name: 'Retry', exact: true }));
        expect((await snapshot(page)).retries).toEqual(['alpha.txt']);
        expect(requests).not.toContain(`${listType}-manual`);
      } finally {
        await page.close();
      }
    });
  });

  it.each(['hidden', 'nonfocusable'] as const)(
    'uses the named group when a %s upload trigger cannot receive focus',
    async triggerType => {
      const page = await open({ scenario: triggerType, single: true, trigger: triggerType });
      try {
        await tabTo(page, 'Remove file: alpha.txt');
        await page.keyboard.press('Enter');
        await expectFocus(group(page));
      } finally {
        await page.close();
      }
    }
  );
  it('focuses a custom link upload trigger without activating it', async () => {
    const page = await open({ scenario: 'custom-link', single: true, trigger: 'link' });
    try {
      await tabTo(page, 'Remove file: alpha.txt');
      await page.keyboard.press('Enter');
      await expectFocus(page.getByRole('link', { name: 'Attachments', exact: true }));
      expect(new URL(page.url()).hash).toBe('');
    } finally {
      await page.close();
    }
  });
  it('uses the preceding file when the next file becomes hidden', async () => {
    const page = await open({ scenario: 'hide-next', callback: 'hide-next' });
    try {
      await tabTo(page, 'Remove file: beta.txt');
      await page.keyboard.press('Enter');
      await expectFocus(remove(page, 'alpha'));
    } finally {
      await page.close();
    }
  });
  it('uses the group when a callback hides the upload trigger', async () => {
    const page = await open({ scenario: 'hide-trigger', single: true, callback: 'hide-trigger' });
    try {
      await tabTo(page, 'Remove file: alpha.txt');
      await page.keyboard.press('Enter');
      await expectFocus(group(page));
    } finally {
      await page.close();
    }
  });
  it.each(['remove', 'retry'])('does not restore after %s unmounts the uploader', async action => {
    const page = await open({ scenario: `${action}-unmount`, single: true, callback: 'unmount' });
    try {
      await tabTo(page, action === 'retry' ? 'Retry' : 'Remove file: alpha.txt');
      await page.keyboard.press('Enter');
      expect(await page.locator('.rs-uploader').count()).toBe(0);
      expect((await active(page)).text).toBe('After uploader');
    } finally {
      await page.close();
    }
  });
  it.each(['blur', 'outside-then-blur'] as const)(
    'respects an explicit %s callback',
    async callback => {
      const page = await open({ scenario: callback, single: true, callback });
      try {
        await tabTo(page, 'Remove file: alpha.txt');
        await page.keyboard.press('Enter');
        expect((await active(page)).tag).toBe('BODY');
      } finally {
        await page.close();
      }
    }
  );
  it('does not steal focus from a pointer action that did not focus the remove button', async () => {
    const page = await open({ scenario: 'pointer', single: true, keepPointerFocus: true });
    try {
      await page.getByRole('button', { name: 'After uploader', exact: true }).focus();
      expect((await active(page)).text).toBe('After uploader');
      await remove(page).click();
      expect((await active(page)).text).toBe('After uploader');
      expect((await snapshot(page)).removals).toEqual(['alpha.txt']);
    } finally {
      await page.close();
    }
  });
  it('does not reclaim focus when a pending retry later completes', async () => {
    const page = await open({ scenario: 'retry-pending', single: true });
    try {
      await tabTo(page, 'Retry');
      await page.keyboard.press('Enter');
      await expect.poll(() => pending.has('retry-pending')).toBe(true);
      await expectFocus(remove(page));
      await page.keyboard.press('Tab');
      expect((await active(page)).text).toBe('After uploader');
      pending.get('retry-pending')!.end('{"ok":true}');
      pending.delete('retry-pending');
      await page.waitForFunction(() => window.__RSUITE_UPLOAD_FOCUS__.snapshot().successes === 1);
      expect((await active(page)).text).toBe('After uploader');
    } finally {
      pending.get('retry-pending')?.end('{"ok":true}');
      pending.delete('retry-pending');
      await page.close();
    }
  });
  it('restores focus within a shadow root', async () => {
    const page = await open({ scenario: 'shadow', single: true, shadow: true });
    try {
      await tabTo(page, 'Remove file: alpha.txt');
      await page.keyboard.press('Enter');
      await expectFocus(trigger(page));
    } finally {
      await page.close();
    }
  });

  it('does not focus a custom link when upload is disabled', async () => {
    const page = await open({
      scenario: 'disabled-link',
      single: true,
      trigger: 'link',
      disabled: true
    });
    try {
      await tabTo(page, 'Remove file: alpha.txt');
      await page.keyboard.press('Enter');
      await expectFocus(group(page));
    } finally {
      await page.close();
    }
  });
  it('does not focus an aria-disabled custom upload trigger', async () => {
    const page = await open({
      scenario: 'aria-disabled-link',
      single: true,
      trigger: 'aria-disabled-link'
    });
    try {
      await tabTo(page, 'Remove file: alpha.txt');
      await page.keyboard.press('Enter');
      await expectFocus(group(page));
    } finally {
      await page.close();
    }
  });
  it('uses the group when the callback makes the uploader readonly', async () => {
    const page = await open({ scenario: 'readonly', single: true, callback: 'make-readonly' });
    try {
      await tabTo(page, 'Remove file: alpha.txt');
      await page.keyboard.press('Enter');
      await expectFocus(group(page));
    } finally {
      await page.close();
    }
  });
  it('preserves native semantics of a custom root when it receives fallback focus', async () => {
    const page = await open({ scenario: 'section', single: true, as: 'section', disabled: true });
    try {
      await tabTo(page, 'Remove file: alpha.txt');
      await page.keyboard.press('Enter');
      await expectFocus(page.getByRole('region', { name: 'Attachments', exact: true }));
    } finally {
      await page.close();
    }
  });
  it('supports consecutive controlled removals without restarting keyboard navigation', async () => {
    const page = await open({ scenario: 'consecutive', controlled: true });
    try {
      await tabTo(page, 'Remove file: beta.txt');
      await page.keyboard.press('Space');
      await expectFocus(remove(page, 'gamma'));
      await page.keyboard.press('Space');
      await expectFocus(remove(page, 'alpha'));
      await page.keyboard.press('Space');
      await expectFocus(trigger(page));
      const record = await snapshot(page);
      expect(record.removals).toEqual(['beta.txt', 'gamma.txt', 'alpha.txt']);
      expect(record.trustedClicks).toEqual([true, true, true]);
      expect(record.submissions).toBe(0);
    } finally {
      await page.close();
    }
  });

  it('paints the file group focus ring outside the picture status overlay', async () => {
    const page = await open(
      { scenario: 'painted-focus', single: true, listType: 'picture', removable: false },
      true
    );
    try {
      await tabTo(page, 'Retry');
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => window.__RSUITE_UPLOAD_FOCUS__.snapshot().successes === 1);
      const row = group(page, 'alpha.txt');
      await expectFocus(row);
      const rect = await row.boundingBox();
      expect(rect).not.toBeNull();
      const focused = (await page.screenshot()).toString('base64');
      await row.evaluate(element =>
        (element as HTMLElement).style.setProperty('outline', 'none', 'important')
      );
      const withoutOutline = (await page.screenshot()).toString('base64');
      await row.evaluate(element => (element as HTMLElement).style.removeProperty('outline'));
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
                  channel =>
                    Math.abs(before.data[index + channel] - after.data[index + channel]) > 30
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
    } finally {
      await page.close();
    }
  });
});
