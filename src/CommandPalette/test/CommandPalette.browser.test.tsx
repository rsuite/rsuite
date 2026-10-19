import { dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './CommandPalette.client';

describe('CommandPalette native browser interaction', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  let ssrDirectory: string | undefined;
  let ssrFile: string | undefined;
  const nodeRequire = createRequire(import.meta.url);
  beforeAll(async () => {
    const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
    const runtimeRoot =
      process.env.RSUITE_TEST_RUNTIME_ROOT ||
      dirname(dirname(nodeRequire.resolve('react/package.json')));
    const runtimeRequire = createRequire(join(runtimeRoot, 'react/package.json'));
    ssrDirectory = await mkdtemp(join(tmpdir(), 'rsuite-command-ssr-'));
    ssrFile = join(ssrDirectory, 'renderer.cjs');
    await build({
      absWorkingDir: root,
      entryPoints: [join(root, 'src/CommandPalette/test/CommandPalette.ssr-renderer.tsx')],
      outfile: ssrFile,
      bundle: true,
      platform: 'node',
      format: 'cjs',
      jsx: 'transform',
      define: { __DEV__: 'true', 'process.env.NODE_ENV': '"development"' },
      plugins: [
        {
          name: 'command-ssr-exact-react-runtime',
          setup(builder) {
            builder.onResolve({ filter: /^react(?:-dom)?(?:\/.*)?$/ }, args => ({
              path: runtimeRequire.resolve(args.path)
            }));
          }
        }
      ]
    });
    const payload = nodeRequire(ssrFile).renderCommandPaletteHydration();
    source = await createSourceBrowser({
      root,
      entry: '/src/CommandPalette/test/CommandPalette.client.tsx',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          if (request.url !== '/command-palette-ssr') return next();
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify(payload));
        });
      }
    });
    console.info('CommandPalette runtime', {
      browser: source.browserName,
      browserVersion: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => {
    try {
      await source?.close();
    } finally {
      if (ssrFile) delete nodeRequire.cache[ssrFile];
      if (ssrDirectory) await rm(ssrDirectory, { recursive: true, force: true });
    }
  });
  const snapshot = (page: Page) =>
    page.evaluate(() => window.__RSUITE_COMMAND_PALETTE__.snapshot());
  const run = async (
    options: Parameters<Window['__RSUITE_COMMAND_PALETTE__']['mount']>[0],
    test: (page: Page) => Promise<void>
  ) => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    try {
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_COMMAND_PALETTE__));
      expect(await page.evaluate(() => window.__RSUITE_COMMAND_PALETTE__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await page.evaluate(options => window.__RSUITE_COMMAND_PALETTE__.mount(options), options);
      await test(page);
      expect(errors).toEqual([]);
      expect((await snapshot(page)).events.every(event => event.trusted)).toBe(true);
      expect((await snapshot(page)).selections.every(event => event.trusted)).toBe(true);
    } finally {
      await page.close();
    }
  };
  const open = async (page: Page) => {
    await page.locator('#command-opener').focus();
    await page.keyboard.press('Enter');
    await page.getByRole('option', { name: 'Open projects' }).waitFor();
    expect(
      await page
        .getByRole('combobox')
        .evaluate(element => element === element.ownerDocument.activeElement)
    ).toBe(true);
  };

  it('selects once with trusted keys, prevents form submission and restores the opener', () =>
    run({}, async page => {
      await open(page);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.getByRole('dialog').waitFor({ state: 'detached' });
      expect((await snapshot(page)).selections).toEqual([{ value: 0, index: 2, trusted: true }]);
      expect((await snapshot(page)).submitted).toBe(0);
      expect(
        await page
          .locator('#command-opener')
          .evaluate(element => element === document.activeElement)
      ).toBe(true);
    }));

  it('keeps input focus through pointer interaction and ignores disabled commands', () =>
    run({}, async page => {
      await open(page);
      const disabled = page.getByRole('option', { name: 'Archive project' });
      const box = await disabled.boundingBox();
      expect(box).not.toBeNull();
      // Locator.click waits for aria-disabled=false. Use an actual trusted
      // mouse action here to test the disabled option's browser behavior.
      await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
      expect((await snapshot(page)).selections).toEqual([]);
      expect(
        await page.getByRole('combobox').evaluate(element => element === document.activeElement)
      ).toBe(true);
      await page.getByRole('option', { name: 'Open settings' }).click();
      expect((await snapshot(page)).selections).toEqual([{ value: 0, index: 2, trusted: true }]);
    }));

  it('preserves native Home/End text caret movement', () =>
    run({ filter: false, editingControl: true }, async page => {
      await open(page);
      const control = page.getByRole('textbox', { name: 'Native editing control' });
      await control.fill('projects');
      await page.keyboard.press('Home');
      const nativeHome = await control.evaluate(
        element => (element as HTMLInputElement).selectionStart
      );
      await page.keyboard.press('End');
      const nativeEnd = await control.evaluate(
        element => (element as HTMLInputElement).selectionStart
      );
      await page.getByRole('combobox').fill('projects');
      await page.keyboard.press('Home');
      expect(
        await page
          .getByRole('combobox')
          .evaluate(element => (element as HTMLInputElement).selectionStart)
      ).toBe(nativeHome);
      await page.keyboard.press('End');
      expect(
        await page
          .getByRole('combobox')
          .evaluate(element => (element as HTMLInputElement).selectionStart)
      ).toBe(nativeEnd);
      console.info('CommandPalette native editing control', {
        browser: source.browserName,
        nativeHome,
        nativeEnd
      });
    }));

  it('keeps options out of the native Tab sequence and wraps within the dialog', () =>
    run({}, async page => {
      await open(page);
      await page.keyboard.press('Tab');
      expect(
        await page.locator('#nested-opener').evaluate(element => element === document.activeElement)
      ).toBe(true);
      await page.keyboard.press('Shift+Tab');
      expect(
        await page.getByRole('combobox').evaluate(element => element === document.activeElement)
      ).toBe(true);
      await page.keyboard.press('Shift+Tab');
      expect(
        await page
          .getByRole('button', { name: 'Close' })
          .evaluate(element => element === document.activeElement)
      ).toBe(true);
      await page.keyboard.press('Shift+Tab');
      expect(
        await page.locator('#close-command').evaluate(element => element === document.activeElement)
      ).toBe(true);
    }));

  it('isolates Escape in a nested dialog and restores each focus owner', () =>
    run({}, async page => {
      await open(page);
      await page.locator('#nested-opener').focus();
      await page.keyboard.press('Enter');
      await page.getByRole('dialog', { name: 'Command help' }).waitFor();
      await page.keyboard.press('Escape');
      await page.getByRole('dialog', { name: 'Command help' }).waitFor({ state: 'detached' });
      expect((await snapshot(page)).closed).toBe(0);
      expect(
        await page.locator('#nested-opener').evaluate(element => element === document.activeElement)
      ).toBe(true);
      await page.keyboard.press('Escape');
      await page.getByRole('dialog').waitFor({ state: 'detached' });
      expect((await snapshot(page)).closed).toBe(1);
      expect(
        await page
          .locator('#command-opener')
          .evaluate(element => element === document.activeElement)
      ).toBe(true);
    }));

  it('focuses and restores the opener in the container document', () =>
    run({ inFrame: true }, async page => {
      const content = page.frameLocator('#command-frame');
      await content.locator('#command-opener').focus();
      await page.keyboard.press('Enter');
      await content.getByRole('option', { name: 'Open projects' }).waitFor();
      expect(
        await content
          .getByRole('combobox')
          .evaluate(element => element === element.ownerDocument.activeElement)
      ).toBe(true);
      await page.keyboard.press('Escape');
      await content.getByRole('dialog').waitFor({ state: 'detached' });
      expect(
        await content
          .locator('#command-opener')
          .evaluate(element => element === element.ownerDocument.activeElement)
      ).toBe(true);
    }));

  it('does not select a stale result while the caller replaces async data', () =>
    run({ filter: false }, async page => {
      await open(page);
      await page.keyboard.press('ArrowDown');
      await page.evaluate(() => window.__RSUITE_COMMAND_PALETTE__.update({ loading: true }));
      expect(await page.getByRole('option').count()).toBe(0);
      await page.keyboard.press('Enter');
      expect((await snapshot(page)).selections).toEqual([]);
      expect((await snapshot(page)).submitted).toBe(0);
      await page.evaluate(() =>
        window.__RSUITE_COMMAND_PALETTE__.update({
          loading: false,
          data: [{ value: 'new', label: 'New command' }]
        })
      );
      await page.getByRole('option', { name: 'New command' }).waitFor();
      await page.keyboard.press('Enter');
      expect((await snapshot(page)).selections).toEqual([
        { value: 'new', index: 0, trusted: true }
      ]);
    }));

  it('honors selection cancellation for both pointer and keyboard', () =>
    run({ preventClose: true }, async page => {
      await open(page);
      await page.getByRole('option', { name: 'Open settings' }).click();
      await page.keyboard.press('Enter');
      expect((await snapshot(page)).selections).toHaveLength(2);
      expect((await snapshot(page)).closed).toBe(0);
      expect(await page.getByRole('dialog').count()).toBe(1);
    }));

  it('refocuses search before retry removes the focused error action', () =>
    run({ searchLocale: 'invalid_locale' }, async page => {
      await page.getByRole('button', { name: 'Open commands' }).click();
      await page.getByRole('alert').waitFor();
      await page.getByRole('button', { name: 'Try again' }).click();
      expect(
        await page.getByRole('combobox').evaluate(element => element === document.activeElement)
      ).toBe(true);
      await page.evaluate(() => window.__RSUITE_COMMAND_PALETTE__.update({ searchLocale: 'en' }));
      await page.getByRole('option', { name: 'Open projects' }).waitFor();
      expect(await page.getByRole('alert').count()).toBe(0);
    }));

  it.each([1000, 5000])('renders all %s commands and records native navigation latency', count =>
    run({ count, filter: false, preventClose: true }, async page => {
      await page.locator('#command-opener').click();
      await page.getByRole('option').last().waitFor();
      expect(await page.getByRole('option').count()).toBe(count);
      for (let index = 0; index < 12; index++) await page.keyboard.press('ArrowDown');
      await page.evaluate(
        () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
      );
      const measurements = (await snapshot(page)).latencies
        .filter(item => item.key === 'ArrowDown')
        .map(item => item.milliseconds)
        .sort((a, b) => a - b);
      expect(measurements).toHaveLength(12);
      console.info('CommandPalette observed key-to-next-frame ms', {
        browser: source.browserName,
        count,
        median: measurements[6],
        max: measurements[11]
      });
      const descendant = await page.getByRole('combobox').getAttribute('aria-activedescendant');
      expect(await page.locator(`[id="${descendant}"]`).getAttribute('aria-label')).toBe(
        'Command 00012'
      );
    })
  );

  it('respects autoFocus=false while retaining native Escape handling', () =>
    run({ autoFocus: false }, async page => {
      await page.locator('#command-opener').focus();
      await page.keyboard.press('Enter');
      await page.getByRole('option', { name: 'Open projects' }).waitFor();
      expect(
        await page
          .locator('#command-opener')
          .evaluate(element => element === document.activeElement)
      ).toBe(true);
      await page.keyboard.press('Escape');
      await page.getByRole('dialog').waitFor({ state: 'detached' });
      expect((await snapshot(page)).closed).toBe(1);
    }));

  it('restores the actual native focus owner after opening by pointer', () =>
    run({}, async page => {
      await page.locator('#outside').focus();
      await page.locator('#command-opener').click();
      await page.getByRole('option', { name: 'Open projects' }).waitFor();
      const openingFocus = (await snapshot(page)).openingFocus;
      expect(openingFocus).not.toBe('');
      await page.keyboard.press('Escape');
      await page.getByRole('dialog').waitFor({ state: 'detached' });
      const restored = await page.evaluate(() => {
        const active = document.activeElement;
        return `${active?.tagName}|${active?.id}|${active?.getAttribute('data-testid') ?? ''}`;
      });
      expect(restored).toBe(openingFocus);
      console.info('CommandPalette pointer focus control', {
        browser: source.browserName,
        openingFocus,
        restored
      });
    }));

  it('hydrates the server portal snapshot with distinct, mounted active descendants', () =>
    run({}, async page => {
      const warnings: string[] = [];
      page.on('console', message => {
        if (message.type() === 'error') warnings.push(message.text());
      });
      const response = await page.request.get(`${source.url}/command-palette-ssr`);
      expect(response.ok(), await response.text()).toBe(true);
      const payload = await response.json();
      expect(payload).toEqual({
        html: '',
        react: source.reactVersion,
        reactDOM: source.reactVersion,
        domAvailable: false
      });
      await page.evaluate(html => window.__RSUITE_COMMAND_PALETTE__.hydrate(html), payload.html);
      await page.waitForFunction(() => document.querySelectorAll('[role="option"]').length === 6);
      await page.evaluate(
        () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
      );
      const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[role="combobox"]')).map(input => {
          const list = document.getElementById(input.getAttribute('aria-controls') || '');
          const active = document.getElementById(input.getAttribute('aria-activedescendant') || '');
          return {
            listId: list?.id,
            activeId: active?.id,
            mountedInOwnList: Boolean(active && list?.contains(active))
          };
        })
      );
      expect(links).toHaveLength(2);
      expect(new Set(links.map(item => item.listId)).size).toBe(2);
      expect(new Set(links.map(item => item.activeId)).size).toBe(2);
      expect(links.every(item => item.mountedInOwnList)).toBe(true);
      expect((await snapshot(page)).hydrationErrors).toEqual([]);
      expect(warnings).toEqual([]);
    }));
});
