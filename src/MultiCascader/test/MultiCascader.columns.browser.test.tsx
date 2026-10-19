import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

const snapshot = (page: Page) =>
  page.evaluate(() => window.__RSUITE_MULTI_CASCADER_COLUMNS__.snapshot());
const item = (page: Page, name: string) => page.getByRole('treeitem', { name, exact: true });
const expectFocus = async (page: Page, name: string) => {
  await expect
    .poll(() =>
      item(page, name).evaluateAll(
        nodes => nodes.length === 1 && nodes[0] === document.activeElement
      )
    )
    .toBe(true);
};

describe('MultiCascader native column navigation', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/MultiCascader/test/MultiCascader.columns.client.tsx'
    });
    console.info('MultiCascader column navigation browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  async function run(scenario: string, check: (page: Page) => Promise<void>) {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      await page.goto(`${source.url}/#${scenario}`);
      await expect
        .poll(() =>
          page.evaluate(() => window.__RSUITE_MULTI_CASCADER_COLUMNS__?.snapshot().entered)
        )
        .toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_MULTI_CASCADER_COLUMNS__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await check(page);
      expect((await snapshot(page)).keys.every(event => event.trusted)).toBe(true);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }
  async function enter(page: Page, name = 'Parent') {
    await page.getByRole('combobox').focus();
    await page.keyboard.press('ArrowDown');
    await expectFocus(page, name);
  }
  async function expectChecked(page: Page, name: string, value: (string | number)[]) {
    await expect
      .poll(() => page.getByRole('checkbox', { name, exact: true }).isChecked())
      .toBe(true);
    const state = await snapshot(page);
    expect(state.changes).toEqual([{ value, trusted: true }]);
    expect(state.checks).toEqual([{ value, rawLeaf: true, checked: true, trusted: true }]);
  }

  it.each(['numeric', 'string'])(
    'retains the leaf column for %s values and returns to its parent',
    async scenario => {
      await run(scenario, async page => {
        await enter(page);
        expect(await item(page, 'Child').isVisible()).toBe(true);
        await page.keyboard.press('ArrowRight');
        await expectFocus(page, 'Child');
        expect(await page.getByRole('group').count()).toBe(2);
        await page.keyboard.press('ArrowLeft');
        await expectFocus(page, 'Parent');
        expect(await item(page, 'Child').isVisible()).toBe(true);
        const state = await snapshot(page);
        expect(state.changes).toEqual([]);
        expect(state.selections).toEqual([]);
        expect(state.keys.filter(event => event.key.startsWith('Arrow'))).toHaveLength(3);
      });
    }
  );

  it.each(['standard', 'custom'])(
    'keeps a controlled multilevel path with %s keys and skips disabled children',
    async scenario => {
      await run(scenario, async page => {
        await enter(page, 'Root');
        await page.keyboard.press('ArrowRight');
        await expectFocus(page, 'Branch');
        await page.keyboard.press('ArrowRight');
        await expectFocus(page, 'Enabled leaf');
        expect(await page.getByRole('group').count()).toBe(3);
        expect(await item(page, 'Disabled leaf').getAttribute('aria-disabled')).toBe('true');
        await page.keyboard.press('Enter');
        await expectChecked(page, 'Enabled leaf', [42]);
        await page.keyboard.press('ArrowLeft');
        await expectFocus(page, 'Branch');
        await page.keyboard.press('ArrowLeft');
        await expectFocus(page, 'Root');
        expect(await item(page, 'Branch').isVisible()).toBe(true);
        expect(await item(page, 'Enabled leaf').count()).toBe(0);
        expect(await page.getByRole('group').count()).toBe(2);
        expect(await page.getByRole('combobox').textContent()).toContain('Enabled leaf');
        expect((await snapshot(page)).changes).toEqual([{ value: [42], trusted: true }]);
        expect((await snapshot(page)).selections).toEqual([]);
      });
    }
  );

  it('uses loaded child parent relationships without fetching again during navigation', async () => {
    await run('async', async page => {
      await item(page, 'Parent').click();
      expect((await snapshot(page)).loadCalls).toBe(1);
      await page.evaluate(() => window.__RSUITE_MULTI_CASCADER_COLUMNS__.resolveChildren());
      await item(page, 'Loaded child').waitFor();
      await item(page, 'Parent').focus();
      await page.keyboard.press('ArrowRight');
      await expectFocus(page, 'Loaded child');
      await page.keyboard.press('Enter');
      await expectChecked(page, 'Loaded child', [42]);
      await page.keyboard.press('ArrowLeft');
      await expectFocus(page, 'Parent');
      expect(await item(page, 'Loaded child').isVisible()).toBe(true);
      const state = await snapshot(page);
      expect(state.loadCalls).toBe(1);
      expect(state.selections).toEqual([{ path: ['parent'], rawParent: true, trusted: true }]);
    });
  });

  it('keeps the parent path when entering and leaving columns in RTL', async () => {
    await run('rtl', async page => {
      await enter(page);
      await page.keyboard.press('ArrowLeft');
      await expectFocus(page, 'Child');
      await page.keyboard.press('ArrowRight');
      await expectFocus(page, 'Parent');
      expect(await item(page, 'Child').isVisible()).toBe(true);
    });
  });

  it('preserves external focus assigned by a public column focus handler', async () => {
    await run('column-focus', async page => {
      await enter(page);
      await page.keyboard.press('ArrowRight');
      expect(await item(page, 'Child').isVisible()).toBe(true);
      expect(
        await page
          .getByRole('button', { name: 'Outside action' })
          .evaluate(node => node === document.activeElement)
      ).toBe(true);
    });
  });

  it('preserves mouse-selected paths, controlled raw values and callback focus ownership', async () => {
    await run('mouse', async page => {
      await item(page, 'Parent').click();
      expect(await item(page, 'Child').isVisible()).toBe(true);
      await page.getByRole('checkbox', { name: 'Child', exact: true }).click();
      await expectChecked(page, 'Child', ['child']);
      expect(
        await page
          .getByRole('button', { name: 'Outside action' })
          .evaluate(node => node === document.activeElement)
      ).toBe(true);
      expect((await snapshot(page)).selections[0]).toEqual({
        path: ['parent'],
        rawParent: true,
        trusted: true
      });
      expect(await item(page, 'Child').isVisible()).toBe(true);
    });
  });
});
