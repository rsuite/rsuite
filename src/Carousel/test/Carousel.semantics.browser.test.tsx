import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type { Accessibility } from 'playwright';

type AccessibilityNode = NonNullable<Awaited<ReturnType<Accessibility['snapshot']>>>;

function descendants(node: AccessibilityNode | null): AccessibilityNode[] {
  return node ? [node, ...(node.children || []).flatMap(descendants)] : [];
}

describe('Carousel native container and slide semantics', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Carousel/test/Carousel.semantics.client.tsx'
    });
    console.info('Carousel semantics browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  it.each([
    {
      query: '',
      title: 'Destinations',
      role: 'group',
      description: 'carousel',
      slide: 'slide',
      position: '1 of 3'
    },
    {
      query: 'translated',
      title: '精选目的地',
      role: 'group',
      description: '轮播',
      slide: '幻灯片',
      position: '第 1 张，共 3 张'
    },
    {
      query: 'translated&partial',
      title: '精选目的地',
      role: 'group',
      description: 'stories',
      slide: '幻灯片',
      position: '1/3'
    },
    {
      query: 'landmark',
      title: 'Destinations',
      role: 'region',
      description: 'photo gallery',
      slide: 'slide',
      position: '1 of 3'
    }
  ])('exposes native accessible groups and retains slide content: $query', async fixture => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      await page.goto(source.url + '/#' + fixture.query);
      await expect
        .poll(() => page.evaluate(() => window.__RSUITE_CAROUSEL_SEMANTICS__?.snapshot().ready))
        .toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_SEMANTICS__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      const carousel = page.getByTestId('carousel');
      expect(await carousel.getAttribute('role')).toBe(fixture.role);
      expect(await carousel.getAttribute('aria-roledescription')).toBe(fixture.description);
      const root = await carousel.elementHandle();
      expect(root).not.toBeNull();
      // Inspect each engine's accessibility tree, including display:contents wrappers.
      const snapshot = () => page.accessibility.snapshot({ root: root!, interestingOnly: false });
      let tree = await snapshot();
      expect(tree).toMatchObject({
        role: fixture.role,
        name: fixture.title,
        roledescription: expect.any(String)
      });
      const slideGroups = (tree: AccessibilityNode | null) =>
        (tree?.children || [])
          .flatMap(descendants)
          .filter(node => node.role === 'group' && node.roledescription);
      const groups = slideGroups(tree);
      expect(groups.map(node => node.name)).toEqual([fixture.position]);
      expect(
        await carousel
          .getByRole('group', { name: fixture.position, exact: true })
          .getAttribute('aria-roledescription')
      ).toBe(fixture.slide);
      expect(
        descendants(tree).some(
          node =>
            node.role === (source.browserName === 'chromium' ? 'image' : 'img') &&
            node.name === 'Lake'
        )
      ).toBe(true);
      const image = page.getByRole('img', { name: 'Lake' });
      expect(await image.evaluate(node => node.tagName)).toBe('IMG');
      const imageBounds = await image.boundingBox();
      expect(imageBounds?.width).toBeCloseTo(400, 2);
      expect(imageBounds?.height).toBeCloseTo(200, 2);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      expect(await page.getByRole('radio', { name: 'City skyline', exact: true }).isChecked()).toBe(
        true
      );
      await expect
        .poll(async () => slideGroups(await snapshot()).map(node => node.name))
        .toEqual(['City skyline']);
      tree = await snapshot();
      expect(descendants(tree).some(node => node.role === 'article')).toBe(true);
      expect(await page.getByRole('button', { name: 'View city' }).count()).toBe(1);
      expect(descendants(tree).some(node => node.name === 'Lake')).toBe(false);

      await page.keyboard.press('ArrowRight');
      expect(await page.getByRole('radio', { name: 'Map', exact: true }).isChecked()).toBe(true);
      await expect
        .poll(async () => slideGroups(await snapshot()).map(node => node.name))
        .toEqual(['Map']);
      const svg = page.getByRole('img', { name: 'Map' });
      expect(await svg.evaluate(node => node.tagName)).toBe('svg');
      const svgBounds = await svg.boundingBox();
      expect(svgBounds?.width).toBeCloseTo(400, 2);
      expect(svgBounds?.height).toBeCloseTo(200, 2);
      expect(await page.getByRole('button', { name: 'View city' }).count()).toBe(0);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
