import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('Primary button contrast during native pointer interaction', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Button/test/Button.primary-contrast.client.tsx'
    });
    console.info('Primary contrast browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  it.each(['light', 'dark', 'high-contrast'])(
    'keeps all presets readable throughout hover, press and release in %s',
    async theme => {
      const page = await source.browser.newPage({ viewport: { width: 1000, height: 800 } });
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      try {
        await page.goto(`${source.url}/#theme=${theme}`);
        await page.locator('#loading-7').waitFor();
        const read = (id: string) =>
          page.evaluate(id => window.__RSUITE_PRIMARY_CONTRAST__.measure(id), id);
        const check = (value: Awaited<ReturnType<typeof read>>) => {
          if (value.spinnerContrast !== null) {
            expect(value.spinnerContrast).toBeGreaterThanOrEqual(3);
            expect(value.foreground[3]).toBe(0);
          } else expect(value.textContrast).toBeGreaterThanOrEqual(4.5);
          if (value.glyphContrast !== null) expect(value.glyphContrast).toBeGreaterThanOrEqual(3);
        };
        for (let index = 0; index < 8; index++) {
          for (const kind of ['button', 'anchor', 'icon', 'addon', 'loading']) {
            check(await read(`${kind}-${index}`));
          }
          for (const kind of ['button', 'addon']) {
            const id = `${kind}-${index}`;
            const sample = async (event: string, state: number, action: () => Promise<unknown>) => {
              await page.evaluate(
                ({ id, event }) => window.__RSUITE_PRIMARY_CONTRAST__.start(id, event),
                { id, event }
              );
              await action();
              const values = await page.evaluate(() => window.__RSUITE_PRIMARY_CONTRAST__.finish());
              expect(values.length).toBeGreaterThan(1);
              values.forEach(check);
              const final = values.at(-1)!;
              final.background.forEach((channel, index) =>
                expect(channel).toBeCloseTo(final.targets[state][index], 3)
              );
              final.glyphBackground?.forEach((channel, index) =>
                expect(channel).toBeCloseTo(final.glyphTargets[state][index], 3)
              );
              return values;
            };
            const hover = await sample('pointerenter', 1, () => page.locator(`#${id}`).hover());
            expect(hover.at(-1)?.hover).toBe(true);
            const press = await sample('pointerdown', 2, () => page.mouse.down());
            expect(press.at(-1)?.active).toBe(true);
            await sample('pointerup', 1, () => page.mouse.up());
            await sample('pointerleave', 0, () => page.mouse.move(990, 790));
          }
        }
        await page.locator('#override').focus();
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Tab');
        const explicit = await read('override');
        expect(explicit.focus).toBe(true);
        explicit.foreground.forEach((channel, index) =>
          expect(channel).toBeCloseTo([20, 40, 60, 1][index], 3)
        );
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    },
    90_000
  );

  it('updates label, icon and spinner colors for runtime tokens and reduced motion', async () => {
    const page = await source.browser.newPage({ reducedMotion: 'reduce' });
    try {
      await page.goto(`${source.url}/#theme=light`);
      await page.locator('#loading-7').waitFor();
      for (const background of ['#fff', '#000', '#757575', '#767676', '#ff5733']) {
        const values = await page.evaluate(background => {
          for (const id of ['button-0', 'addon-0', 'loading-0']) {
            const element = document.getElementById(id)!;
            element.style.transition = 'none';
            element.style.setProperty('--rs-btn-primary-bg', background);
            element.style.setProperty('--rs-iconbtn-primary-addon', background);
          }
          return ['button-0', 'addon-0', 'loading-0'].map(
            window.__RSUITE_PRIMARY_CONTRAST__.measure
          );
        }, background);
        expect(values[0].textContrast).toBeGreaterThanOrEqual(4.5);
        expect(values[1].glyphContrast).toBeGreaterThanOrEqual(3);
        expect(values[2].spinnerContrast).toBeGreaterThanOrEqual(3);
        expect(values[2].animation).toBe('none');
      }
    } finally {
      await page.close();
    }
  });
});
