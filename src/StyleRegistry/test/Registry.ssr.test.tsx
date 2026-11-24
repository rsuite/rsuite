import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createStyleRegistry from '@/createStyleRegistry';
import { StyleManager } from '@/internals/styled-system/style-manager';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import { createRegistryFixture, type RegistrySpec } from './Registry.fixture';

const scenarios = [false, true];
const specsFor = (strict: boolean): RegistrySpec[] => [
  { id: 'first', prefix: 'account:', color: '#123456', padding: 7, strict },
  { id: 'second', prefix: 'account', color: '#654321', padding: 13, strict }
];
const read = (page: Page, id: string) =>
  page.getByTestId(id).evaluate(node => {
    const style = getComputedStyle(node);
    return { color: style.color, padding: style.paddingTop };
  });

describe('server style registry hydration', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  const styleChunks: string[][] = [];
  beforeAll(async () => {
    if (process.env.VITE_RSUITE_REACT_VERSION) {
      expect(React.version).toBe(process.env.VITE_RSUITE_REACT_VERSION);
    }
    const documents = scenarios.map(strict => {
      const specs = specsFor(strict);
      const registry = createStyleRegistry();
      const chunks: string[] = [];
      const roots = specs.map(spec => {
        const markup = renderToString(createRegistryFixture(registry, spec), {
          identifierPrefix: spec.prefix
        });
        const element = registry.getStyleElement();
        expect(element).not.toBeNull();
        chunks.push(renderToStaticMarkup(element!));
        registry.flush();
        expect(registry.getStyleElement()).toBeNull();
        return `<div id="root-${spec.id}">${markup}</div>`;
      });
      styleChunks.push(chunks);
      expect(StyleManager.styleMap.size).toBe(0);
      expect(StyleManager.styleElement).toBeNull();
      const config = JSON.stringify(specs).replace(/</g, '\\u003c');
      return `<!doctype html><html><head>${chunks.join('')}</head><body>${roots.join('')}<script id="registry-config" type="application/json">${config}</script><script type="module" src="/src/StyleRegistry/test/Registry.client.tsx"></script></body></html>`;
    });
    const retrySpecs = specsFor(false);
    const retryRegistry = createStyleRegistry();
    renderToString(createRegistryFixture(retryRegistry, retrySpecs[0]), {
      identifierPrefix: retrySpecs[0].prefix
    });
    const abandonedStyles = renderToStaticMarkup(retryRegistry.getStyleElement()!);
    retryRegistry.flush();
    retrySpecs[0] = { ...retrySpecs[0], padding: undefined };
    const retryRoots = retrySpecs.map(
      spec =>
        `<div id="root-${spec.id}">${renderToString(createRegistryFixture(retryRegistry, spec), {
          identifierPrefix: spec.prefix
        })}</div>`
    );
    const finalStyles = renderToStaticMarkup(retryRegistry.getStyleElement()!);
    const retryConfig = JSON.stringify(retrySpecs).replace(/</g, '\\u003c');
    documents.push(
      `<!doctype html><html><head>${abandonedStyles}${finalStyles}</head><body>${retryRoots.join('')}<script id="registry-config" type="application/json">${retryConfig}</script><script type="module" src="/src/StyleRegistry/test/Registry.client.tsx"></script></body></html>`
    );
    source = await createSourceBrowser({
      root: process.cwd(),
      entry: '/src/StyleRegistry/test/Registry.client.tsx',
      hmr: false,
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          const url = new URL(request.url || '/', 'http://localhost');
          const index = Number(url.searchParams.get('case'));
          if (url.pathname !== '/' || !url.searchParams.has('case') || !documents[index])
            return next();
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.setHeader(
            'Content-Security-Policy',
            "style-src 'nonce-registry-test'; style-src-attr 'none'"
          );
          response.end(await server.transformIndexHtml('/', documents[index]));
        });
      }
    });
    expect(source.reactVersion).toBe(React.version);
  });
  afterAll(async () => source?.close());

  const open = async (index: number) => {
    const page = await source.browser.newPage({ viewport: { width: 1280, height: 800 } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    const response = await page.goto(source.url + '/?case=' + index);
    expect(response?.headers()['content-security-policy']).toContain("'nonce-registry-test'");
    await expect
      .poll(() => page.evaluate(() => typeof window.__RSUITE_REGISTRY_TEST__))
      .toBe('object');
    expect(await read(page, 'first')).toEqual({ color: 'rgb(18, 52, 86)', padding: '17px' });
    expect(await read(page, 'second')).toEqual({ color: 'rgb(101, 67, 33)', padding: '23px' });
    expect(await page.locator('[style]').count()).toBe(0);
    return { page, errors };
  };

  const hydrate = async (page: Page, id: string) => {
    const before = await page.getByTestId(id).elementHandle();
    await page.evaluate(id => window.__RSUITE_REGISTRY_TEST__.hydrate(id), id);
    await expect.poll(() => page.getByTestId(id).getAttribute('data-ready')).toBe('true');
    expect(await page.getByTestId(id).getAttribute('data-react')).toBe(source.reactVersion);
    expect(await page.getByTestId(id).getAttribute('data-react-dom')).toBe(source.reactVersion);
    expect(await page.getByTestId(id).evaluate((node, original) => node === original, before)).toBe(
      true
    );
    expect(await page.evaluate(() => window.__RSUITE_REGISTRY_TEST__.errors)).toEqual([]);
  };

  it('keeps the final snapshot styled before hydration after an abandoned render reused its React ids', async () => {
    const page = await source.browser.newPage({ viewport: { width: 1280, height: 800 } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      const response = await page.goto(source.url + '/?case=2');
      expect(response?.headers()['content-security-policy']).toContain("'nonce-registry-test'");
      await expect
        .poll(() => page.evaluate(() => typeof window.__RSUITE_REGISTRY_TEST__))
        .toBe('object');
      expect(await read(page, 'first')).toEqual({ color: 'rgb(18, 52, 86)', padding: '0px' });
      expect(await read(page, 'second')).toEqual({ color: 'rgb(101, 67, 33)', padding: '23px' });
      await hydrate(page, 'first');
      expect(await read(page, 'first')).toEqual({ color: 'rgb(18, 52, 86)', padding: '0px' });
      await page.evaluate(() => window.__RSUITE_REGISTRY_TEST__.unmount('first'));
      await expect.poll(() => page.locator('style[data-rs-style-registry-client]').count()).toBe(0);
      expect(await read(page, 'second')).toEqual({ color: 'rgb(101, 67, 33)', padding: '23px' });
      expect(await page.locator('style[data-rs-style-registry]').count()).toBe(1);
      await hydrate(page, 'second');
      await page.evaluate(() => window.__RSUITE_REGISTRY_TEST__.unmount('second'));
      await expect.poll(() => page.locator('style[data-rs-style-registry-client]').count()).toBe(0);
      expect(await page.locator('style[data-rs-style-registry]').count()).toBe(0);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it.each(scenarios.map((strict, index) => ({ strict, index })))(
    'keeps an unhydrated sibling styled when another owner unmounts (StrictMode=$strict)',
    async ({ index }) => {
      const { page, errors } = await open(index);
      try {
        await hydrate(page, 'first');
        await page.evaluate(() => window.__RSUITE_REGISTRY_TEST__.unmount('first'));
        await expect.poll(() => page.getByTestId('first').count()).toBe(0);
        expect(await read(page, 'second')).toEqual({ color: 'rgb(101, 67, 33)', padding: '23px' });
        expect(await page.locator('style[data-rs-style-registry]').count()).toBe(1);
        await hydrate(page, 'second');
        await page.evaluate(() => window.__RSUITE_REGISTRY_TEST__.unmount('second'));
        await expect
          .poll(() => page.locator('style[data-rs-style-registry-client]').count())
          .toBe(0);
        expect(await page.locator('style[data-rs-style-registry]').count()).toBe(0);
        expect(errors).toEqual([]);
      } catch (error) {
        console.info(
          'Registry transport failure',
          await page.evaluate(() =>
            Array.from(
              document.querySelectorAll<HTMLStyleElement>('style[data-rs-style-registry]')
            ).map(element => {
              const state = JSON.parse(element.getAttribute('data-rs-style-state')!);
              return {
                owner: element.getAttribute('data-rs-style-registry'),
                text: element.textContent,
                actualLength: element.textContent!.length,
                framedLength: state.rules?.reduce(
                  (sum: number, row: [unknown, number, number]) => sum + row[1] + row[2] + 6,
                  0
                ),
                frames: state.rules ?? state.inputs,
                css: Array.from(element.sheet?.cssRules || [], rule => rule.cssText)
              };
            })
          )
        );
        throw error;
      } finally {
        await page.close();
      }
    }
  );

  it.each(scenarios.map((strict, index) => ({ strict, index })))(
    'removes old server declarations and ignores stale late chunks (StrictMode=$strict)',
    async ({ index }) => {
      const { page, errors } = await open(index);
      try {
        await hydrate(page, 'first');
        await hydrate(page, 'second');
        await page.evaluate(() =>
          window.__RSUITE_REGISTRY_TEST__.update('first', { color: undefined })
        );
        await expect.poll(() => page.getByTestId('first').getAttribute('data-color')).toBe('');
        expect(await read(page, 'first')).toEqual({ color: 'rgb(0, 0, 0)', padding: '17px' });
        await page.evaluate(() =>
          window.__RSUITE_REGISTRY_TEST__.update('second', { padding: undefined })
        );
        await expect.poll(() => page.getByTestId('second').getAttribute('data-padding')).toBe('');
        expect(await read(page, 'second')).toEqual({ color: 'rgb(101, 67, 33)', padding: '0px' });
        await page.evaluate(
          html => window.__RSUITE_REGISTRY_TEST__.append(html),
          styleChunks[index].join('')
        );
        await expect.poll(() => page.locator('style[data-rs-style-registry]').count()).toBe(0);
        expect(await read(page, 'first')).toEqual({ color: 'rgb(0, 0, 0)', padding: '17px' });
        expect(await read(page, 'second')).toEqual({ color: 'rgb(101, 67, 33)', padding: '0px' });
        await page.evaluate(() => window.__RSUITE_REGISTRY_TEST__.update('first', { padding: 11 }));
        await expect
          .poll(() => read(page, 'first'))
          .toEqual({ color: 'rgb(0, 0, 0)', padding: '21px' });
        await page.evaluate(() =>
          window.__RSUITE_REGISTRY_TEST__.update('second', { color: '#234567' })
        );
        await expect
          .poll(() => read(page, 'second'))
          .toEqual({ color: 'rgb(35, 69, 103)', padding: '0px' });
        expect(await page.locator('style[data-rs-style-registry]').count()).toBe(0);
        await page.evaluate(() => {
          window.__RSUITE_REGISTRY_TEST__.unmount('first');
          window.__RSUITE_REGISTRY_TEST__.unmount('second');
        });
        await expect
          .poll(() => page.locator('style[data-rs-style-registry-client]').count())
          .toBe(0);
        expect(errors).toEqual([]);
        expect(await page.evaluate(() => window.__RSUITE_REGISTRY_TEST__.errors)).toEqual([]);
      } catch (error) {
        console.info(
          'Registry transport failure',
          await page.evaluate(() =>
            Array.from(
              document.querySelectorAll<HTMLStyleElement>('style[data-rs-style-registry]')
            ).map(element => {
              const state = JSON.parse(element.getAttribute('data-rs-style-state')!);
              return {
                owner: element.getAttribute('data-rs-style-registry'),
                text: element.textContent,
                actualLength: element.textContent!.length,
                framedLength: state.rules?.reduce(
                  (sum: number, row: [unknown, number, number]) => sum + row[1] + row[2] + 6,
                  0
                ),
                frames: state.rules ?? state.inputs,
                css: Array.from(element.sheet?.cssRules || [], rule => rule.cssText)
              };
            })
          )
        );
        throw error;
      } finally {
        await page.close();
      }
    }
  );
});
