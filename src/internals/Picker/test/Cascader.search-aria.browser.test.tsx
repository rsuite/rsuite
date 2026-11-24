import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Locator, Page } from 'playwright';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

const popup = (page: Page, name = 'one') => page.locator(`[data-popup="${name}"]`);
const row = (scope: Locator, name: string) => scope.getByRole('treeitem').filter({ hasText: name });
const snapshot = (page: Page) =>
  page.evaluate(() => window.__RSUITE_CASCADE_SEARCH_ARIA__.snapshot());

async function relatedTree(input: Locator, tree: Locator) {
  const treeId = await tree.getAttribute('id');
  expect(treeId).toBeTruthy();
  expect(await input.getAttribute('aria-controls')).toBe(treeId);
  expect(
    await input.evaluate(node => {
      const id = node.getAttribute('aria-controls');
      return Boolean(id && node.ownerDocument.getElementById(id)?.getAttribute('role') === 'tree');
    })
  ).toBe(true);
}

async function activeResult(input: Locator, item: Locator) {
  const id = await item.getAttribute('id');
  expect(id).toBeTruthy();
  await expect.poll(() => input.getAttribute('aria-activedescendant')).toBe(id);
  expect(
    await input.evaluate(node => {
      const tree = node.ownerDocument.getElementById(node.getAttribute('aria-controls') || '');
      const active = node.ownerDocument.getElementById(
        node.getAttribute('aria-activedescendant') || ''
      );
      return Boolean(active && tree?.contains(active));
    })
  ).toBe(true);
}

describe('Cascader search accessibility with native input', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/Picker/test/Cascader.search-aria.client.tsx'
    });
    console.info('Cascader search ARIA browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  async function run(options: Record<string, string>, test: (page: Page) => Promise<void>) {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      await page.goto(`${source.url}/#${new URLSearchParams(options)}`);
      await expect
        .poll(
          async () => {
            const state = await page.evaluate(() =>
              window.__RSUITE_CASCADE_SEARCH_ARIA__?.snapshot()
            );
            return state?.one?.entered && (options.dual !== 'true' || state.two?.entered);
          },
          { timeout: 10000 }
        )
        .toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_CASCADE_SEARCH_ARIA__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await test(page);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }

  async function search(scope: Locator, value = 'target') {
    const input = scope.getByRole('searchbox');
    await input.fill(value);
    await expect.poll(() => scope.getByRole('treeitem').count()).toBe(value === 'target' ? 2 : 1);
    return input;
  }

  for (const kind of ['Cascader', 'MultiCascader']) {
    const multiple = kind === 'MultiCascader';
    describe(kind, () => {
      it('keeps tree ownership when searching and clearing', () =>
        run({ kind }, async page => {
          const scope = popup(page);
          const toggle = page.getByRole('combobox');
          const treeId = await toggle.getAttribute('aria-controls');
          expect(await scope.getByRole('tree').getAttribute('id')).toBe(treeId);
          const input = await search(scope);
          await relatedTree(input, scope.getByRole('tree'));
          expect(await scope.getByRole('tree').getAttribute('id')).toBe(treeId);
          await input.fill('');
          await row(scope, 'Parent').waitFor();
          await relatedTree(input, scope.getByRole('tree'));
          expect(await input.getAttribute('aria-activedescendant')).toBeNull();
        }));

      it('announces mixed siblings without changing native focus or selection', () =>
        run({ kind }, async page => {
          const scope = popup(page);
          const input = await search(scope);
          if (multiple) await input.press('ArrowDown');
          await activeResult(input, row(scope, 'First target'));
          expect(await input.evaluate(node => node === document.activeElement)).toBe(true);
          await input.press('ArrowDown');
          const target = row(scope, 'Second target');
          await activeResult(input, target);
          expect(await target.getAttribute('id')).not.toBe(
            await row(scope, 'First target').getAttribute('id')
          );
          expect(
            await (multiple ? input : target).evaluate(node => node === document.activeElement)
          ).toBe(true);
          await page.keyboard.press('Enter');
          await expect
            .poll(async () => (await snapshot(page)).one.changes)
            .toEqual([{ value: multiple ? ['0'] : '0', trusted: true }]);
        }));

      it.each(['empty', 'quote', 'space'])(
        'references literal %s values with custom fields',
        literal =>
          run({ kind, literal, custom: 'true' }, async page => {
            const scope = popup(page);
            const input = await search(scope, 'First');
            if (multiple) await input.press('ArrowDown');
            await activeResult(input, row(scope, 'First target'));
            expect(await input.evaluate(node => node === document.activeElement)).toBe(true);
            await input.press('Enter');
            const value = { empty: '', quote: 'quote"key', space: 'path with space' }[literal];
            await expect
              .poll(async () => (await snapshot(page)).one.changes)
              .toEqual([{ value: multiple ? [value] : value, trusted: true }]);
          })
      );

      it('never references a filtered-out result or an empty result set', () =>
        run({ kind }, async page => {
          const scope = popup(page);
          const input = await search(scope);
          if (multiple) await input.press('ArrowDown');
          await activeResult(input, row(scope, 'First target'));
          await input.fill('Second');
          await expect.poll(() => scope.getByRole('treeitem').count()).toBe(1);
          if (multiple) {
            expect(await input.getAttribute('aria-activedescendant')).toBeNull();
            await input.press('ArrowDown');
          }
          await activeResult(input, row(scope, 'Second target'));
          await input.fill('no matching leaf');
          await expect.poll(() => scope.getByRole('treeitem').count()).toBe(0);
          await relatedTree(input, scope.getByRole('tree'));
          expect(await input.getAttribute('aria-activedescendant')).toBeNull();
        }));

      it('exposes selection separately from focused results', () =>
        run({ kind, selected: 'true' }, async page => {
          const scope = popup(page);
          await search(scope);
          expect(await row(scope, 'First target').getAttribute('aria-selected')).toBe('true');
          expect(await row(scope, 'Second target').getAttribute('aria-selected')).toBe('false');
          expect(await scope.getByRole('tree').getAttribute('aria-multiselectable')).toBe(
            multiple ? 'true' : null
          );
        }));

      it('keeps the visible picker label on the search tree', () =>
        run({ kind }, async page => {
          const scope = popup(page);
          const label = await scope.getByRole('tree').getAttribute('aria-labelledby');
          expect(label).toBeTruthy();
          await search(scope);
          expect(await scope.getByRole('tree').getAttribute('aria-labelledby')).toBe(label);
          expect(
            await scope
              .getByRole('tree')
              .evaluate(
                node =>
                  node.ownerDocument.getElementById(node.getAttribute('aria-labelledby') || '')
                    ?.textContent
              )
          ).toBe('Picker one');
        }));

      it('announces the enabled neighbor when skipping a disabled result', () =>
        run({ kind, disabled: 'true' }, async page => {
          const scope = popup(page);
          const input = await search(scope);
          await input.press('ArrowDown');
          await activeResult(input, row(scope, 'Second target'));
          expect(await row(scope, 'First target').getAttribute('aria-disabled')).toBe('true');
          await page.keyboard.press('Enter');
          await expect
            .poll(async () => (await snapshot(page)).one.changes)
            .toEqual([{ value: multiple ? ['0'] : '0', trusted: true }]);
        }));

      it('isolates generated tree and result IDs across open instances', () =>
        run({ kind, dual: 'true' }, async page => {
          const ids: string[] = [];
          for (const name of ['one', 'two']) {
            const scope = popup(page, name);
            const input = await search(scope);
            if (multiple) await input.press('ArrowDown');
            await relatedTree(input, scope.getByRole('tree'));
            await activeResult(input, row(scope, 'First target'));
            ids.push(
              (await scope.getByRole('tree').getAttribute('id'))!,
              (await row(scope, 'First target').getAttribute('id'))!
            );
          }
          expect(new Set(ids).size).toBe(4);
          expect(
            await page.evaluate(
              ids =>
                ids.every(
                  id =>
                    Array.from(document.querySelectorAll('[id]')).filter(node => node.id === id)
                      .length === 1
                ),
              ids
            )
          ).toBe(true);
        }));

      it('preserves native pointer selection of the numeric leaf', () =>
        run({ kind }, async page => {
          const scope = popup(page);
          await search(scope);
          const target = row(scope, 'First target');
          await (multiple ? target.getByRole('checkbox') : target).click();
          await expect
            .poll(async () => (await snapshot(page)).one.changes)
            .toEqual([{ value: multiple ? [0] : 0, trusted: true }]);
        }));
    });
  }

  it.each(['CascadeTree', 'MultiCascadeTree'])('identifies standalone %s search results', kind =>
    run({ kind }, async page => {
      const scope = page.locator('[data-fixture="one"]');
      const input = await search(scope);
      await relatedTree(input, scope.getByRole('tree'));
      const ids = await scope
        .getByRole('treeitem')
        .evaluateAll(nodes => nodes.map(node => node.id));
      expect(ids.every(Boolean)).toBe(true);
      expect(new Set(ids).size).toBe(2);
      await input.fill('');
      await row(scope, 'Parent').waitFor();
      expect(await input.getAttribute('aria-controls')).toBeNull();
    })
  );
});
