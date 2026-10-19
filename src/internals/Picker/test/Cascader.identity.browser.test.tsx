import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

type Options = {
  kind?: string;
  view?: string;
  scenario?: string;
  reverse?: string;
  custom?: string;
  initial?: string;
};
const row = (page: Page, name: string) => page.getByRole('treeitem').filter({ hasText: name });
const checked = async (page: Page, name: string, value: boolean) => {
  await expect.poll(() => row(page, name).getByRole('checkbox').isChecked()).toBe(value);
};
const focus = async (page: Page, name: string) => {
  await expect
    .poll(() =>
      row(page, name).evaluateAll(
        nodes => nodes.length === 1 && nodes[0] === document.activeElement
      )
    )
    .toBe(true);
};
const snapshot = (page: Page) => page.evaluate(() => window.__RSUITE_CASCADE_IDENTITY__.snapshot());
const reorder = async (page: Page) => {
  const revision = (await snapshot(page)).revision;
  await page.evaluate(() => window.__RSUITE_CASCADE_IDENTITY__.reorder());
  await expect.poll(async () => (await snapshot(page)).revision).toBeGreaterThan(revision);
};

describe('Cascader mixed value identity with native input', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/Picker/test/Cascader.identity.client.tsx'
    });
    console.info('Cascader typed identity browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  async function run(options: Options, test: (page: Page) => Promise<void>) {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      await page.goto(`${source.url}/#${new URLSearchParams(options)}`);
      await expect
        .poll(() => page.evaluate(() => window.__RSUITE_CASCADE_IDENTITY__?.snapshot().entered), {
          timeout: 10000
        })
        .toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_CASCADE_IDENTITY__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await test(page);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }

  async function enter(page: Page, view: string) {
    if (view === 'search') {
      await page.getByRole('searchbox').pressSequentially('target');
      await row(page, 'First target').waitFor();
    } else {
      await page.getByRole('combobox').focus();
      await page.keyboard.press('ArrowDown');
      await focus(page, 'Parent');
      await page.keyboard.press('ArrowRight');
    }
  }

  async function toggle(
    options: Options,
    target: string,
    value: string | number,
    before: (string | number)[] = []
  ) {
    const view = options.view || 'column';
    await run(options, async page => {
      await enter(page, view);
      if (view === 'search') await page.keyboard.press('ArrowDown');
      if (target === 'Second target' && options.scenario !== 'disabled')
        await page.keyboard.press('ArrowDown');
      if (view === 'column') await focus(page, target);
      else
        expect(
          await page.getByRole('searchbox').evaluate(node => node === document.activeElement)
        ).toBe(true);
      await page.keyboard.press('Enter');
      await checked(page, target, true);
      if (target === 'Second target') await checked(page, 'First target', before.length > 0);
      await page.keyboard.press('Enter');
      await checked(page, target, false);
      const state = await snapshot(page);
      expect(state.changes).toEqual([
        { value: [...before, value], trusted: true, originalEvent: true },
        { value: before, trusted: true, originalEvent: true }
      ]);
      expect(state.checks).toEqual(
        [true, false].map((checked, index) => ({
          value: index === 0 ? [...before, value] : before,
          leaf: value,
          checked,
          originalLeaf: true,
          trusted: true,
          originalEvent: true
        }))
      );
      expect(state.keys.map(event => event.key)).toEqual([
        ...(view === 'search' ? [...'target', 'ArrowDown'] : ['ArrowDown', 'ArrowRight']),
        ...(target === 'Second target' && options.scenario !== 'disabled' ? ['ArrowDown'] : []),
        'Enter',
        'Enter'
      ]);
      expect(state.keys.every(event => event.trusted)).toBe(true);
      if (options.scenario === 'disabled')
        expect(await row(page, 'First target').getAttribute('aria-disabled')).toBe('true');
      if (view === 'search')
        expect(
          await page.getByRole('searchbox').evaluate(node => node === document.activeElement)
        ).toBe(true);
      else await focus(page, target);
    });
  }

  for (const view of ['column', 'search']) {
    describe(`MultiCascader ${view}`, () => {
      it.each([false, true])('toggles the second mixed sibling, reverse=%s', reverse =>
        toggle({ view, reverse: String(reverse) }, 'Second target', reverse ? 0 : '0')
      );
      it.each(['quote', 'slash'])('toggles literal value %s', scenario =>
        toggle(
          { view, scenario },
          'First target',
          scenario === 'quote' ? 'quote"key' : 'path\\segment'
        )
      );
      it('keeps checked values after raw child objects reorder', () =>
        run({ view, scenario: 'reorder' }, async page => {
          if (view === 'search') await enter(page, view);
          await reorder(page);
          if (view === 'column') await enter(page, view);
          else {
            // Flattened search results update after the fixture's data revision.
            await expect
              .poll(() => page.getByRole('treeitem').allTextContents())
              .toEqual([
                expect.stringContaining('Second target'),
                expect.stringContaining('First target')
              ]);
            await page.keyboard.press('ArrowDown');
          }
          await checked(page, 'Second target', true);
          await checked(page, 'First target', false);
          if (view === 'column') await focus(page, 'Second target');
          await page.keyboard.press('Enter');
          await page.keyboard.press('ArrowDown');
          if (view === 'column') await focus(page, 'First target');
          await page.keyboard.press('Enter');
          await page.keyboard.press('Enter');
          const state = await snapshot(page);
          expect(state.changes).toEqual(
            [[], [0], []].map(value => ({ value, trusted: true, originalEvent: true }))
          );
          expect(state.checks.map(check => check.leaf)).toEqual(['0', 0, 0]);
          expect(state.checks.map(check => check.checked)).toEqual([false, true, false]);
          expect(
            state.checks.every(check => check.originalLeaf && check.trusted && check.originalEvent)
          ).toBe(true);
          await checked(page, 'First target', false);
          if (view === 'search')
            expect(
              await page.getByRole('searchbox').evaluate(node => node === document.activeElement)
            ).toBe(true);
        }));
    });
  }
  it.each([false, true])(
    'reads the focused checkbox with its sibling selected, custom=%s',
    custom =>
      toggle(
        { scenario: 'checked', custom: String(custom), reverse: String(custom) },
        'Second target',
        custom ? 0 : '0',
        [custom ? '0' : 0]
      )
  );
  it.each(['zero', 'empty'])('toggles falsy leaf %s', scenario =>
    toggle({ scenario }, 'First target', scenario === 'zero' ? 0 : '')
  );
  it('skips a disabled numeric sibling', () =>
    toggle({ scenario: 'disabled' }, 'Second target', '0'));
  it('retains the readOnly guard after focusing a leaf', () =>
    run({ scenario: 'distinct' }, async page => {
      await enter(page, 'column');
      await focus(page, 'First target');
      await page.evaluate(() => window.__RSUITE_CASCADE_IDENTITY__.lock());
      await expect.poll(async () => (await snapshot(page)).locked).toBe(true);
      await page.keyboard.press('Enter');
      const state = await snapshot(page);
      expect(state.changes).toEqual([]);
      expect(state.checks).toEqual([]);
      await checked(page, 'First target', false);
    }));
  it('preserves distinct-value search toggling', () =>
    toggle({ view: 'search', scenario: 'distinct' }, 'Second target', 'second-key'));
  it('uses custom search fields with the numeric sibling selected', () =>
    toggle({ view: 'search', scenario: 'checked', custom: 'true' }, 'Second target', '0', [0]));

  it('preserves direct MultiCascadeTree raw callbacks when search results reorder', () =>
    run({ kind: 'MultiCascadeTree', scenario: 'reorder', initial: 'number' }, async page => {
      await enter(page, 'search');
      await checked(page, 'First target', true);
      await checked(page, 'Second target', false);
      await reorder(page);
      expect(await page.getByRole('treeitem').allTextContents()).toEqual([
        'ParentSecond target',
        'ParentFirst target'
      ]);
      await checked(page, 'First target', true);
      await checked(page, 'Second target', false);
      expect(
        await page.getByRole('searchbox').evaluate(node => node === document.activeElement)
      ).toBe(true);
      await row(page, 'Second target').getByRole('checkbox').click();
      await row(page, 'First target').getByRole('checkbox').click();
      const state = await snapshot(page);
      expect(state.changes).toEqual(
        [[0, '0'], ['0']].map(value => ({ value, trusted: true, originalEvent: true }))
      );
      expect(state.checks.map(check => check.leaf)).toEqual(['0', 0]);
      expect(state.checks.map(check => check.checked)).toEqual([true, false]);
      expect(
        state.checks.every(check => check.originalLeaf && check.trusted && check.originalEvent)
      ).toBe(true);
      expect(state.keys).toEqual([...'target'].map(key => ({ key, trusted: true })));
    }));

  for (const view of ['column', 'search']) {
    it.each([
      { reverse: 'false', custom: 'false' },
      { reverse: 'true', custom: 'false' },
      { reverse: 'false', custom: 'true' }
    ])(`selects the raw mixed value in Cascader ${view}: %j`, options =>
      run({ kind: 'Cascader', view, ...options }, async page => {
        await enter(page, view);
        await page.keyboard.press('ArrowDown');
        await focus(page, 'Second target');
        await page.keyboard.press('Enter');
        const state = await snapshot(page);
        const value = options.reverse === 'true' ? 0 : '0';
        expect(state.changes).toEqual([{ value, trusted: true, originalEvent: true }]);
        expect(state.selections.at(-1)).toEqual({
          value,
          originalLeaf: true,
          trusted: true,
          originalEvent: true
        });
        expect(state.keys.every(event => event.trusted)).toBe(true);
      })
    );
    it.each(['Cascader', 'MultiCascader', 'CascadeTree', 'MultiCascadeTree'])(
      `preserves raw DOM row identity in %s ${view}`,
      kind =>
        run({ kind, view, scenario: 'rows' }, async page => {
          if (view === 'search') await enter(page, view);
          const first = row(page, 'First target');
          const second = row(page, 'Second target');
          await first.waitFor();
          await second.waitFor();
          const handles = [await first.elementHandle(), await second.elementHandle()];
          await reorder(page);
          expect(await first.evaluate((node, original) => node === original, handles[0])).toBe(
            true
          );
          expect(await second.evaluate((node, original) => node === original, handles[1])).toBe(
            true
          );
          expect(await page.getByRole('treeitem').allTextContents()).toEqual([
            'Second target',
            'First target'
          ]);
          const state = await snapshot(page);
          expect(state.changes).toEqual([]);
          expect(state.checks).toEqual([]);
          if (view === 'search')
            expect(
              await page.getByRole('searchbox').evaluate(node => node === document.activeElement)
            ).toBe(true);
        })
    );
  }

  it.each([false, true])('selects a loaded child with custom fields=%s', custom =>
    run({ kind: 'Cascader', scenario: 'loaded', custom: String(custom) }, async page => {
      await row(page, 'Parent').click();
      await row(page, 'First target').waitFor();
      await enter(page, 'column');
      await focus(page, 'First target');
      await page.keyboard.press('Enter');
      const state = await snapshot(page);
      expect(state.loadCalls).toBe(1);
      expect(state.changes).toEqual([{ value: 0, trusted: true, originalEvent: true }]);
      expect(state.selections.at(-1)).toEqual({
        value: 0,
        originalLeaf: true,
        trusted: true,
        originalEvent: true
      });
      expect(state.keys).toEqual(
        ['ArrowDown', 'ArrowRight', 'Enter'].map(key => ({ key, trusted: true }))
      );
    })
  );
});
