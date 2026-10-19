import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Uploader.queue-approval.client';

describe('Uploader queue approval with real file inputs', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.queue-approval.client.tsx'
    });
    console.info(
      'Uploader queue approval browser',
      source.browserName,
      source.browser.version(),
      source.reactVersion
    );
  });
  afterAll(async () => source?.close());

  const modes = [
    'allowed',
    'sync false',
    'false',
    'rejected',
    'already rejected',
    'unmounted true',
    'unmounted false',
    'unmounted rejected'
  ];
  for (const controlled of [false, true])
    for (const strict of [false, true])
      for (const mode of modes) {
        it(`${mode}, controlled=${controlled}, strict=${strict}`, async () => {
          const page = await source.browser.newPage();
          const errors: string[] = [];
          page.on('pageerror', error => errors.push(error.message));
          const snapshot = () => page.evaluate(() => window.__RSUITE_QUEUE_APPROVAL__.snapshot());
          try {
            await page.goto(source.url);
            await page.waitForFunction(() => Boolean(window.__RSUITE_QUEUE_APPROVAL__));
            expect(await page.evaluate(() => window.__RSUITE_QUEUE_APPROVAL__.runtime)).toEqual({
              react: source.reactVersion,
              reactDOM: source.reactVersion
            });
            await page.evaluate(options => window.__RSUITE_QUEUE_APPROVAL__.mount(options), {
              mode,
              controlled,
              strict
            });
            const input = page.locator('input[type="file"]');
            const file = {
              name: 'approved.txt',
              mimeType: 'text/plain',
              buffer: Buffer.from('queue approval bytes')
            };
            await input.setInputFiles(file);
            await expect.poll(async () => (await snapshot()).approvals).toEqual([['approved.txt']]);
            if (mode.startsWith('unmounted')) {
              await page.getByRole('button', { name: 'Unmount uploader' }).click();
              expect(await page.locator('output').textContent()).toBe('unmounted');
            }
            await page.evaluate(mode => window.__RSUITE_QUEUE_APPROVAL__.settle(mode), mode);
            // Cross a task boundary after the approval's promise microtasks settle.
            await page.evaluate(() => new Promise<void>(resolve => setTimeout(resolve, 0)));
            expect((await snapshot()).rejections).toEqual([]);
            expect(errors).toEqual([]);
            if (mode === 'allowed') {
              await expect.poll(async () => (await snapshot()).changes).toEqual([['approved.txt']]);
              expect(await page.locator('.rs-uploader-file-item').count()).toBe(1);
            } else {
              expect((await snapshot()).changes).toEqual([]);
              expect(await page.locator('.rs-uploader-file-item').count()).toBe(0);
              if (!mode.startsWith('unmounted')) {
                expect(await input.inputValue()).toBe('');
                await input.setInputFiles(file);
                await expect
                  .poll(async () => (await snapshot()).changes)
                  .toEqual([['approved.txt']]);
                expect((await snapshot()).approvals).toEqual([['approved.txt'], ['approved.txt']]);
                expect(await page.locator('.rs-uploader-file-item').count()).toBe(1);
              }
            }
            expect((await snapshot()).uploadCallbacks).toEqual([]);
          } finally {
            await page.close();
          }
        });
      }
});
