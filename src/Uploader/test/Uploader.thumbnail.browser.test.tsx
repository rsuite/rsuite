import type { ServerResponse } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Uploader.thumbnail.client';

describe('Uploader thumbnail updates with native FileReader', () => {
  const requests: { scenario: string; body: string; response: ServerResponse }[] = [];
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.thumbnail.client.tsx',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url || '/', 'http://localhost');
          if (url.pathname !== '/upload') return next();
          const upload = { scenario: url.searchParams.get('scenario')!, body: '', response };
          request.setEncoding('utf8');
          request.on('data', chunk => {
            upload.body += chunk;
          });
          request.on('end', () => requests.push(upload));
        });
      }
    });
    console.info(
      'Uploader thumbnail browser',
      source.browserName,
      source.browser.version(),
      source.reactVersion
    );
  });
  afterAll(async () => source?.close());
  const open = async () => {
    const page = await source.browser.newPage();
    await page.goto(source.url);
    await page.waitForFunction(() => Boolean(window.__RSUITE_THUMBNAIL__));
    expect(await page.evaluate(() => window.__RSUITE_THUMBNAIL__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    return page;
  };
  const render = (page: Page, options: Parameters<Window['__RSUITE_THUMBNAIL__']['render']>[0]) =>
    page.evaluate(options => window.__RSUITE_THUMBNAIL__.render(options), options);
  const image = async (page: Page, key: 'first' | 'second') => {
    await page.waitForFunction(key => {
      const image = document.querySelector('img');
      return (
        image?.src === window.__RSUITE_THUMBNAIL__.images[key] &&
        image.complete &&
        image.naturalWidth === 60
      );
    }, key);
  };
  const state = (page: Page) => page.getByTestId('thumbnail-state');
  const start = (page: Page) => page.evaluate(() => window.__RSUITE_THUMBNAIL__.start());
  const uploadsFor = (scenario: string) =>
    requests.filter(request => request.scenario === scenario);
  const complete = async (page: Page, scenario: string, index: number) => {
    uploadsFor(scenario)[index].response.end('{}');
    await page.waitForFunction(
      count => window.__RSUITE_THUMBNAIL__.snapshot().successes.length === count,
      index + 1
    );
  };
  for (const listType of ['picture', 'picture-text'] as const) {
    it(`${listType}: replaces and removes the explicit preview URL`, async () => {
      const page = await open();
      try {
        await render(page, { listType, url: 'first' });
        await image(page, 'first');
        await render(page, { listType, url: 'second' });
        expect(await page.locator('img').getAttribute('src')).toBe(
          await page.evaluate(() => window.__RSUITE_THUMBNAIL__.images.second)
        );
        await image(page, 'second');
        await render(page, { listType });
        expect(await page.locator('img').count()).toBe(0);
        expect(await page.evaluate(() => window.__RSUITE_THUMBNAIL__.reads())).toBe(0);
      } finally {
        await page.close();
      }
    });
    it(`${listType}: reads replacement bytes and clears a removed blob`, async () => {
      const page = await open();
      try {
        await render(page, { listType, blob: 'first' });
        await image(page, 'first');
        await render(page, { listType, blob: 'second' });
        expect(await page.getByTestId('thumbnail-state').getAttribute('data-blob-name')).toBe(
          'second.svg'
        );
        await image(page, 'second');
        await render(page, { listType });
        expect(await page.locator('img').count()).toBe(0);
        expect(await page.evaluate(() => window.__RSUITE_THUMBNAIL__.reads())).toBe(2);
      } finally {
        await page.close();
      }
    });
    it(`${listType}: keeps one read while progress metadata changes`, async () => {
      const page = await open();
      try {
        await render(page, { listType, blob: 'first' });
        await image(page, 'first');
        for (const progress of [10, 50, 100])
          await render(page, { listType, blob: 'first', progress });
        await image(page, 'first');
        expect(await page.evaluate(() => window.__RSUITE_THUMBNAIL__.reads())).toBe(1);
      } finally {
        await page.close();
      }
    });
    it(`${listType}: removes an excluded preview and restores it when allowed`, async () => {
      const page = await open();
      try {
        await render(page, { listType, blob: 'first' });
        await image(page, 'first');
        await render(page, { listType, blob: 'first', maxPreviewFileSize: 0 });
        expect(await page.locator('img').count()).toBe(0);
        await render(page, { listType, blob: 'first' });
        await image(page, 'first');
        expect(await page.evaluate(() => window.__RSUITE_THUMBNAIL__.reads())).toBe(2);
      } finally {
        await page.close();
      }
    });
    it(`${listType}: uses the explicit URL until it is removed`, async () => {
      const page = await open();
      try {
        await render(page, { listType, blob: 'second', url: 'first' });
        await image(page, 'first');
        expect(await page.evaluate(() => window.__RSUITE_THUMBNAIL__.reads())).toBe(0);
        await render(page, { listType, blob: 'second' });
        expect(await page.getByTestId('thumbnail-state').getAttribute('data-blob-name')).toBe(
          'second.svg'
        );
        await image(page, 'second');
        expect(await page.evaluate(() => window.__RSUITE_THUMBNAIL__.reads())).toBe(1);
      } finally {
        await page.close();
      }
    });
    it(`${listType}: preserves upload state and a new URL when HTTP completes`, async () => {
      const page = await open();
      const scenario = `${listType}-metadata`;
      const options = { listType, blob: 'first' as const, status: 'inited' as const, scenario };
      try {
        await render(page, options);
        await start(page);
        await expect.poll(() => uploadsFor(scenario).length).toBe(1);
        await expect.poll(() => state(page).getAttribute('data-status')).toBe('uploading');
        // Holding the response does not stop request-body upload progress.
        await expect.poll(() => state(page).getAttribute('data-progress')).toBe('100');
        await render(page, { ...options, url: 'second' });
        expect(await page.locator('img').getAttribute('src')).toBe(
          await page.evaluate(() => window.__RSUITE_THUMBNAIL__.images.second)
        );
        await image(page, 'second');
        expect(await state(page).getAttribute('data-status')).toBe('uploading');
        expect(await state(page).getAttribute('data-progress')).toBe('100');
        await complete(page, scenario, 0);
        await expect.poll(() => state(page).getAttribute('data-status')).toBe('finished');
        expect(await state(page).getAttribute('data-progress')).toBe('100');
        await image(page, 'second');
        expect(uploadsFor(scenario)[0].body).toContain('filename="first.svg"');
      } finally {
        await page.close();
      }
    });
    it(`${listType}: keeps replacement bytes pending when an old HTTP request completes`, async () => {
      const page = await open();
      const scenario = `${listType}-replacement`;
      const options = { listType, status: 'inited' as const, scenario };
      try {
        await render(page, { ...options, blob: 'first' });
        await start(page);
        await expect.poll(() => uploadsFor(scenario).length).toBe(1);
        await render(page, { ...options, blob: 'second' });
        expect(await state(page).getAttribute('data-blob-name')).toBe('second.svg');
        await image(page, 'second');
        await complete(page, scenario, 0);
        expect(await state(page).getAttribute('data-status')).toBe('inited');
        expect(await state(page).getAttribute('data-progress')).toBe('0');
        await image(page, 'second');
        await start(page);
        await expect.poll(() => uploadsFor(scenario).length).toBe(2);
        expect(uploadsFor(scenario)[1].body).toContain('filename="second.svg"');
        await complete(page, scenario, 1);
        expect(await state(page).getAttribute('data-status')).toBe('finished');
        expect(
          (await page.evaluate(() => window.__RSUITE_THUMBNAIL__.snapshot())).successes
        ).toEqual(['first.svg', 'second.svg']);
      } finally {
        await page.close();
      }
    });
    it(`${listType}: cancels an obsolete approval when its blob is replaced`, async () => {
      const page = await open();
      const scenario = `${listType}-approval`;
      const options = { listType, status: 'inited' as const, scenario };
      try {
        await render(page, { ...options, blob: 'first', pending: true });
        await start(page);
        expect((await page.evaluate(() => window.__RSUITE_THUMBNAIL__.snapshot())).approvals).toBe(
          1
        );
        await render(page, { ...options, blob: 'second' });
        expect(await state(page).getAttribute('data-blob-name')).toBe('second.svg');
        await page.evaluate(async () => {
          window.__RSUITE_THUMBNAIL__.approve();
          await Promise.resolve();
        });
        expect(uploadsFor(scenario)).toHaveLength(0);
        await start(page);
        await expect.poll(() => uploadsFor(scenario).length).toBe(1);
        expect(uploadsFor(scenario)[0].body).toContain('filename="second.svg"');
        expect(uploadsFor(scenario)[0].body).not.toContain('filename="first.svg"');
        await complete(page, scenario, 0);
        expect(await state(page).getAttribute('data-status')).toBe('finished');
      } finally {
        await page.close();
      }
    });
  }
});
