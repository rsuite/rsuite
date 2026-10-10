import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type { Page } from 'playwright';

const valueKeys = [
  'ArrowUp',
  'ArrowRight',
  'ArrowDown',
  'ArrowLeft',
  'Home',
  'End',
  'PageUp',
  'PageDown'
];
const kinds = ['single', 'range'] as const;
const lockedProps = ['disabled', 'readOnly'] as const;
const transitions = kinds.flatMap(kind =>
  lockedProps.flatMap(lockedProp =>
    [false, true].map(controlled => ({ kind, lockedProp, controlled: String(controlled) }))
  )
);

const values = (page: Page) =>
  page.getByRole('slider').evaluateAll(nodes =>
    nodes.map(node => ({
      value: Number((node as HTMLInputElement).value),
      announced: Number(node.getAttribute('aria-valuenow'))
    }))
  );

describe('Slider native keyboard locking', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Slider/test/Slider.locked.client.tsx'
    });
    console.info('Slider locked keyboard browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  const openFixture = async (options: Record<string, string>) => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(source.url + '/#' + new URLSearchParams(options));
    await expect
      .poll(() => page.evaluate(() => Boolean(window.__RSUITE_SLIDER_LOCKED__)))
      .toBe(true);
    expect(await page.evaluate(() => window.__RSUITE_SLIDER_LOCKED__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    return { page, errors };
  };

  it.each(transitions)(
    'stops keyboard changes after $kind becomes $lockedProp, controlled: $controlled',
    async options => {
      const { page, errors } = await openFixture(options);
      try {
        await page.getByRole('button', { name: 'Before' }).click();
        await page.keyboard.press('Tab');
        const handle = page.getByTestId('slider-handle').first();
        expect(await handle.evaluate(node => node === document.activeElement)).toBe(true);
        await page.keyboard.press('ArrowUp');
        expect((await values(page))[0]).toEqual({ value: 25, announced: 25 });
        await page.evaluate(() => window.__RSUITE_SLIDER_LOCKED__.lock(true));
        await expect
          .poll(() => page.getByTestId('fixture').getAttribute('data-locked'))
          .toBe('true');

        if (options.controlled === 'true') {
          await page.evaluate(kind => {
            window.__RSUITE_SLIDER_LOCKED__.update(kind === 'range' ? [35, 70] : 35);
          }, options.kind);
          await expect.poll(async () => (await values(page))[0].value).toBe(35);
        }
        const frozen = await values(page);
        const snapshot = await page.evaluate(() => window.__RSUITE_SLIDER_LOCKED__.snapshot());
        for (const key of valueKeys) {
          await page.keyboard.press(key);
          expect(await values(page)).toEqual(frozen);
          expect(await page.evaluate(() => window.__RSUITE_SLIDER_LOCKED__.snapshot())).toEqual(
            snapshot
          );
        }

        await page.evaluate(() => window.__RSUITE_SLIDER_LOCKED__.lock(false));
        await expect
          .poll(() => page.getByTestId('fixture').getAttribute('data-locked'))
          .toBe('false');
        await page.getByRole('button', { name: 'Before' }).click();
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        const expected = options.controlled === 'true' ? 30 : 20;
        expect((await values(page))[0]).toEqual({ value: expected, announced: expected });
        const after = await page.evaluate(() => window.__RSUITE_SLIDER_LOCKED__.snapshot());
        expect(after.changes).toHaveLength(2);
        expect(after.commits).toEqual([]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it.each(['false', 'true'])(
    'keeps a read-only range unchanged through native Tab navigation, controlled: %s',
    async controlled => {
      const { page, errors } = await openFixture({
        kind: 'range',
        lockedProp: 'readOnly',
        locked: 'true',
        controlled
      });
      try {
        await page.getByRole('button', { name: 'Before' }).click();
        for (const index of [0, 1]) {
          await page.keyboard.press('Tab');
          expect(
            await page
              .getByTestId('slider-handle')
              .nth(index)
              .evaluate(node => node === document.activeElement)
          ).toBe(true);
          for (const key of valueKeys) await page.keyboard.press(key);
          expect(await values(page)).toEqual([
            { value: 20, announced: 20 },
            { value: 60, announced: 60 }
          ]);
        }
        await page.keyboard.press('Tab');
        expect(
          await page
            .getByRole('button', { name: 'After' })
            .evaluate(node => node === document.activeElement)
        ).toBe(true);
        expect(await page.evaluate(() => window.__RSUITE_SLIDER_LOCKED__.snapshot())).toEqual({
          changes: [],
          commits: []
        });
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it.each(kinds.flatMap(kind => lockedProps.map(lockedProp => ({ kind, lockedProp }))))(
    'keeps native range-input values unchanged while $kind is $lockedProp',
    async options => {
      const { page, errors } = await openFixture({ ...options, locked: 'true' });
      try {
        const input = page.getByRole('slider').first();
        await input.focus();
        const frozen = await values(page);
        for (const key of valueKeys) {
          await page.keyboard.press(key);
          expect(await values(page)).toEqual(frozen);
          expect(await page.evaluate(() => window.__RSUITE_SLIDER_LOCKED__.snapshot())).toEqual({
            changes: [],
            commits: []
          });
        }
        await page.keyboard.press('Tab');
        expect(await input.evaluate(node => node === document.activeElement)).toBe(false);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );
});
