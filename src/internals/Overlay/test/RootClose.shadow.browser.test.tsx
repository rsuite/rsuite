import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, afterAll, expect, it } from 'vitest';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

let source: Awaited<ReturnType<typeof createSourceBrowser>>;
beforeAll(async () => {
  source = await createSourceBrowser({
    root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
    entry: '/src/internals/Overlay/test/RootClose.shadow.client.tsx'
  });
  console.info('Runtime', source.browserName, source.browser.version(), source.reactVersion);
});
afterAll(async () => source?.close());

const cases = ['light', 'open', 'nested'].flatMap(mode =>
  ['body', 'local'].map(portal => ({ mode, portal, stop: false, disabled: false }))
);
cases.push(
  { mode: 'separate', portal: 'local', stop: false, disabled: false },
  { mode: 'slotted', portal: 'local', stop: false, disabled: false },
  { mode: 'closed-content', portal: 'body', stop: false, disabled: false },
  { mode: 'open', portal: 'local', stop: true, disabled: false },
  { mode: 'open', portal: 'local', stop: false, disabled: true }
);

it.each(cases)(
  'classifies composed clicks mode=$mode portal=$portal stop=$stop disabled=$disabled',
  async ({ mode, portal, stop, disabled }) => {
    const page = await source.browser.newPage({ viewport: { width: 1100, height: 800 } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const snapshot = () => page.evaluate(() => window.__RSUITE_SHADOW_ROOT_CLOSE__.snapshot());
    const click = async (target: 'anchor' | 'action' | 'sibling' | 'outside') => {
      if (target === 'action' && mode === 'closed-content') {
        // The closed root hides its button; its host shares the button's bounds.
        await page.locator('#content-host').click();
        return;
      }
      const names = {
        anchor: 'Anchor',
        action: 'Speaker action',
        sibling: 'Sibling outside',
        outside: 'Document outside'
      };
      await page.getByRole('button', { name: names[target], exact: true }).click();
    };
    const entered = async (count: number) => {
      await expect.poll(async () => (await snapshot()).entered).toBe(count);
    };
    const exited = async (count: number) => {
      await expect.poll(async () => (await snapshot()).exited, { timeout: 1500 }).toBe(count);
      expect((await snapshot()).open).toBe(false);
    };
    try {
      await page.goto(
        `${source.url}/#mode=${mode}&portal=${portal}${stop ? '&stop' : ''}${disabled ? '&disabled' : ''}`
      );
      await page.waitForFunction(() => window.__RSUITE_SHADOW_ROOT_CLOSE__?.snapshot().ready);
      expect(await page.evaluate(() => window.__RSUITE_SHADOW_ROOT_CLOSE__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await click('anchor');
      await entered(1);
      await click('action');
      await page.evaluate(() => window.__RSUITE_SHADOW_ROOT_CLOSE__.settle());
      const inside = await snapshot();
      console.info('[shadow-root-close-inside]', JSON.stringify({ mode, portal, ...inside }));
      expect(inside.actions).toBe(1);
      expect(inside.trustedAction).toBe(true);
      expect(inside.open).toBe(true);
      expect(inside.exited).toBe(0);
      expect(inside.events[inside.events.length - 1]?.insideSpeakerPath).toBe(true);

      await click('sibling');
      if (disabled) {
        await page.evaluate(() => window.__RSUITE_SHADOW_ROOT_CLOSE__.settle());
        expect((await snapshot()).open).toBe(true);
        await click('outside');
        await page.keyboard.press('Escape');
        await page.evaluate(() => window.__RSUITE_SHADOW_ROOT_CLOSE__.settle());
        expect((await snapshot()).open).toBe(true);
        await click('anchor');
        await exited(1);
      } else {
        await exited(1);
        await click('anchor');
        await entered(2);
        await click('outside');
        await exited(2);
        await click('anchor');
        await entered(3);
        await page.getByRole('button', { name: 'Anchor', exact: true }).hover();
        await page.mouse.down();
        await page.evaluate(() => window.__RSUITE_SHADOW_ROOT_CLOSE__.settle());
        const pressed = await snapshot();
        await page.mouse.up();
        expect(pressed.open).toBe(true);
        expect(pressed.exited).toBe(2);
        await exited(3);
      }
      const result = await snapshot();
      console.info('[shadow-root-close]', JSON.stringify({ mode, portal, result, errors }));
      expect(result.events.every(event => event.trusted)).toBe(true);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }
);
