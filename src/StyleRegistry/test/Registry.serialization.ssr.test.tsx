import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createStyleRegistry from '@/createStyleRegistry';
import { readStyleInputs } from '@/internals/styled-system/registry/style-input';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import { createRegistryFixture, type RegistrySpec } from './Registry.fixture';

it('rejects malformed or truncated transport without returning partial inputs', () => {
  const input = [
    'rs-box-test',
    'box',
    0,
    [
      ['--rs-box-c', '#123456'],
      ['--rs-box-p', [['xs', '5px'], ['md', '19px'], ['lg']]],
      ['--rs-box-ff']
    ]
  ];
  const valid = JSON.stringify({ version: 3, inputs: [input] });
  expect(readStyleInputs(valid)).toEqual([
    {
      componentId: 'rs-box-test',
      prefix: 'box',
      version: 0,
      cssVars: {
        '--rs-box-c': '#123456',
        '--rs-box-p': { xs: '5px', md: '19px', lg: undefined },
        '--rs-box-ff': undefined
      }
    }
  ]);
  for (const state of [
    null,
    '{',
    JSON.stringify({ version: 2, rules: [] }),
    JSON.stringify({ version: 3, inputs: [['rs-box-test', 'box', -1, []]] }),
    JSON.stringify({ version: 3, inputs: [['rs-box-test', 'box', 0.5, []]] }),
    JSON.stringify({ version: 3, inputs: [['rs-box-test', 'box', Number.MAX_SAFE_INTEGER, []]] }),
    JSON.stringify({ version: 3, inputs: [['rs-box-test', 'box', 0, [['x', {}]]]] }),
    JSON.stringify({ version: 3, inputs: [['rs-box-test', 'box', 0, [['x'], ['x']]]] })
  ])
    expect(readStyleInputs(state)).toBeNull();
  expect(readStyleInputs(valid.slice(0, -1))).toBeNull();
  expect(readStyleInputs(valid + 'extra')).toBeNull();
});

const fonts = [
  'Font, /*\r\n*/ serif',
  'Font, /*\f*/ serif',
  'Font, /*\0*/ serif',
  'Font, /*\ud800*/ serif',
  'Font, /*Ω🧪*/ serif',
  '"</style><script>window.__registryInjected=true</script>"'
];

describe('serialized stylesheet input normalization', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    if (process.env.VITE_RSUITE_REACT_VERSION) {
      expect(React.version).toBe(process.env.VITE_RSUITE_REACT_VERSION);
    }
    const registry = createStyleRegistry();
    const specs: RegistrySpec[] = fonts.map((fontFamily, index) => ({
      id: 'edge-' + index,
      prefix: index === 5 ? 'dialog.Ω🧪/"</style>:' : `edge-${index}:`,
      color: '#123456',
      padding: 7,
      fontFamily
    }));
    const roots = specs.map(
      spec =>
        `<div id="root-${spec.id}">${renderToString(createRegistryFixture(registry, spec), {
          identifierPrefix: spec.prefix
        })}</div>`
    );
    const styles = renderToStaticMarkup(registry.getStyleElement()!);
    const config = JSON.stringify(specs).replace(/</g, '\\u003c');
    const html = `<!doctype html><html><head>${styles}</head><body>${roots.join('')}<script id="registry-config" type="application/json">${config}</script><script type="module" src="/src/StyleRegistry/test/Registry.client.tsx"></script></body></html>`;
    source = await createSourceBrowser({
      root: process.cwd(),
      entry: '/src/StyleRegistry/test/Registry.client.tsx',
      hmr: false,
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (request.url !== '/') return next();
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.setHeader(
            'Content-Security-Policy',
            "style-src 'nonce-registry-test'; style-src-attr 'none'"
          );
          response.end(await server.transformIndexHtml('/', html));
        });
      }
    });
    expect(source.reactVersion).toBe(React.version);
  });
  afterAll(async () => source?.close());

  it('keeps normalized CSS and unsafe root prefixes styled through genuine hydration', async () => {
    const page = await source.browser.newPage({ viewport: { width: 1280, height: 800 } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      const response = await page.goto(source.url);
      expect(response?.headers()['content-security-policy']).toContain("'nonce-registry-test'");
      await expect
        .poll(() => page.evaluate(() => typeof window.__RSUITE_REGISTRY_TEST__))
        .toBe('object');
      for (let index = 0; index < fonts.length; index++) {
        const id = 'edge-' + index;
        const target = page.getByTestId(id);
        const read = () =>
          target.evaluate(node => {
            const style = getComputedStyle(node);
            return [
              style.color,
              style.paddingTop,
              node.classList.length,
              node.hasAttribute('style')
            ];
          });
        expect(await read()).toEqual(['rgb(18, 52, 86)', '17px', 1, false]);
        if (index < 5)
          expect(await target.evaluate(node => getComputedStyle(node).fontFamily)).toBe(
            'Font, serif'
          );
        const before = await target.elementHandle();
        await page.evaluate(id => window.__RSUITE_REGISTRY_TEST__.hydrate(id), id);
        await expect.poll(() => target.getAttribute('data-ready')).toBe('true');
        expect(await target.getAttribute('data-react')).toBe(source.reactVersion);
        expect(await target.getAttribute('data-react-dom')).toBe(source.reactVersion);
        expect(await target.evaluate((node, original) => node === original, before)).toBe(true);
        expect(await read()).toEqual(['rgb(18, 52, 86)', '17px', 1, false]);
      }
      expect(await page.locator('style[data-rs-style-registry]').count()).toBe(0);
      expect(await page.evaluate(() => window.__registryInjected)).toBeUndefined();
      expect(await page.evaluate(() => window.__RSUITE_REGISTRY_TEST__.errors)).toEqual([]);
      await page.evaluate(() => {
        for (let index = 0; index < 6; index++)
          window.__RSUITE_REGISTRY_TEST__.unmount('edge-' + index);
      });
      await expect.poll(() => page.locator('style[data-rs-style-registry-client]').count()).toBe(0);
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
  });
});
