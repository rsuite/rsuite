import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, afterAll, it, expect } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';
let source: Awaited<ReturnType<typeof createSourceBrowser>>;
beforeAll(async () => {
  source = await createSourceBrowser({
    root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
    entry: '/src/internals/Overlay/test/Position.ancestor-scroll.client.tsx'
  });
  console.info('Runtime', source.browserName, source.browser.version(), source.reactVersion);
});
afterAll(async () => source?.close());
const gap = (page: Page) => page.evaluate(() => window.__RSUITE_OVERLAY_SCROLL__.gap());
it.each([
  { custom: false, prevent: false, slotted: false },
  { custom: false, prevent: true, slotted: false },
  { custom: true, prevent: false, slotted: false },
  { custom: true, prevent: true, slotted: false },
  { custom: false, prevent: false, slotted: true },
  { custom: false, prevent: true, slotted: true },
  { custom: true, prevent: false, slotted: true },
  { custom: true, prevent: true, slotted: true }
])(
  'follows nested scrolling custom=$custom prevent=$prevent slotted=$slotted',
  async ({ custom, prevent, slotted }) => {
    const page = await source.browser.newPage({ viewport: { width: 1100, height: 800 } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      await page.goto(
        `${source.url}/#${custom ? 'custom&' : ''}${slotted ? 'slotted&' : ''}${prevent ? 'prevent' : ''}`
      );
      await page.waitForFunction(() => window.__RSUITE_OVERLAY_SCROLL__?.snapshot().ready);
      expect(await page.evaluate(() => window.__RSUITE_OVERLAY_SCROLL__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await page.getByRole('button', { name: 'Anchor', exact: true }).click();
      await page.waitForFunction(() => window.__RSUITE_OVERLAY_SCROLL__.snapshot().entered === 1);
      await page.getByTestId('overlay').evaluate(async element => {
        await Promise.all(element.getAnimations().map(animation => animation.finished));
      });
      const before = await gap(page);
      const innerSelector = slotted ? '#inner-scroll' : '#inner';
      const inner = (await page.locator(innerSelector).boundingBox())!;
      await page.mouse.move(inner.x + 12, inner.y + 12);
      await page.mouse.wheel(35, 40);
      await expect
        .poll(() => page.locator(innerSelector).evaluate(el => el.scrollTop))
        .toBeGreaterThan(0);
      await page.evaluate(
        () =>
          new Promise<void>(resolve =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
          )
      );
      const afterInner = await gap(page);
      const outer = (await page.locator('#outer').boundingBox())!;
      await page.mouse.move(outer.x + outer.width - 12, outer.y + 12);
      await page.mouse.wheel(30, 20);
      await expect
        .poll(() => page.locator('#outer').evaluate(el => el.scrollTop))
        .toBeGreaterThan(0);
      await page.evaluate(
        () =>
          new Promise<void>(resolve =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
          )
      );
      const afterOuter = await gap(page);
      const snapshot = await page.evaluate(() => window.__RSUITE_OVERLAY_SCROLL__.snapshot());
      console.info(
        '[overlay-scroll]',
        JSON.stringify({ custom, prevent, before, afterInner, afterOuter, ...snapshot, errors })
      );
      expect(
        snapshot.scrolls.some(x => x.target === (slotted ? 'inner-scroll' : 'inner') && x.trusted)
      ).toBe(true);
      expect(snapshot.scrolls.some(x => x.target === 'outer' && x.trusted)).toBe(true);
      expect(errors).toEqual([]);
      expect(afterInner.left).toBeCloseTo(before.left, 0);
      expect(afterInner.top).toBeCloseTo(before.top, 0);
      expect(afterOuter.left).toBeCloseTo(before.left, 0);
      expect(afterOuter.top).toBeCloseTo(before.top, 0);
      await page.getByRole('button', { name: 'Anchor', exact: true }).click();
      await page.waitForFunction(() => window.__RSUITE_OVERLAY_SCROLL__.snapshot().exited === 1);
      const closedListeners = await page.evaluate(
        () => window.__RSUITE_OVERLAY_SCROLL__.snapshot().listeners
      );
      expect(closedListeners).toBeLessThan(snapshot.listeners);
      await page.getByRole('button', { name: 'Anchor', exact: true }).click();
      await page.waitForFunction(() => window.__RSUITE_OVERLAY_SCROLL__.snapshot().entered === 2);
      await page.getByTestId('overlay').evaluate(async element => {
        await Promise.all(element.getAnimations().map(animation => animation.finished));
      });
      // onEntered can precede passive positioning effects in React 18.
      await expect.poll(async () => (await gap(page)).left).toBeCloseTo(before.left, 0);
      await expect.poll(async () => (await gap(page)).top).toBeCloseTo(before.top, 0);
      await expect
        .poll(() => page.evaluate(() => window.__RSUITE_OVERLAY_SCROLL__.snapshot().listeners))
        .toBe(snapshot.listeners);
      await page.evaluate(() => window.__RSUITE_OVERLAY_SCROLL__.unmount());
      expect(await page.evaluate(() => window.__RSUITE_OVERLAY_SCROLL__.snapshot().listeners)).toBe(
        closedListeners
      );
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }
);

it('follows the separate portal container when the trigger does not scroll', async () => {
  const page = await source.browser.newPage({ viewport: { width: 1100, height: 900 } });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(`${source.url}/#portal`);
    await page.waitForFunction(() => window.__RSUITE_OVERLAY_SCROLL__?.snapshot().ready);
    expect(await page.evaluate(() => window.__RSUITE_OVERLAY_SCROLL__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    await page.getByRole('button', { name: 'Anchor', exact: true }).click();
    await page.waitForFunction(() => window.__RSUITE_OVERLAY_SCROLL__.snapshot().entered === 1);
    await page.getByTestId('overlay').evaluate(async element => {
      await Promise.all(element.getAnimations().map(animation => animation.finished));
    });
    const before = await gap(page);
    const anchor = await page.locator('#anchor').boundingBox();
    const portal = (await page.locator('#portal').boundingBox())!;
    await page.mouse.move(portal.x + 20, portal.y + 20);
    await page.mouse.wheel(35, 40);
    await expect
      .poll(() => page.locator('#portal').evaluate(el => el.scrollTop))
      .toBeGreaterThan(0);
    await expect.poll(() => gap(page)).toEqual(before);
    expect(await page.locator('#anchor').boundingBox()).toEqual(anchor);
    expect(
      await page.evaluate(() =>
        window.__RSUITE_OVERLAY_SCROLL__
          .snapshot()
          .scrolls.some(event => event.target === 'portal' && event.trusted)
      )
    ).toBe(true);
    expect(errors).toEqual([]);
  } finally {
    await page.close();
  }
});

it.each([false, true])(
  'follows a fixed trigger during document scrolling prevent=%s',
  async prevent => {
    const page = await source.browser.newPage({ viewport: { width: 1100, height: 900 } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      await page.goto(`${source.url}/#fixed&${prevent ? 'prevent' : ''}`);
      await page.waitForFunction(() => window.__RSUITE_OVERLAY_SCROLL__?.snapshot().ready);
      expect(await page.evaluate(() => window.__RSUITE_OVERLAY_SCROLL__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await page.getByRole('button', { name: 'Anchor', exact: true }).click();
      await page.waitForFunction(() => window.__RSUITE_OVERLAY_SCROLL__.snapshot().entered === 1);
      await page.getByTestId('overlay').evaluate(async element => {
        await Promise.all(element.getAnimations().map(animation => animation.finished));
      });
      const before = await gap(page);
      const anchor = await page.locator('#anchor').boundingBox();
      await page.mouse.move(1000, 700);
      await page.mouse.wheel(0, 60);
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
      await expect.poll(() => gap(page)).toEqual(before);
      expect(await page.locator('#anchor').boundingBox()).toEqual(anchor);
      expect(
        await page.evaluate(() =>
          window.__RSUITE_OVERLAY_SCROLL__
            .snapshot()
            .scrolls.some(event => event.target === 'document' && event.trusted)
        )
      ).toBe(true);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }
);

it('does not measure the trigger when an unrelated area scrolls', async () => {
  const page = await source.browser.newPage({ viewport: { width: 1100, height: 900 } });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(`${source.url}/#unrelated`);
    await page.waitForFunction(() => window.__RSUITE_OVERLAY_SCROLL__?.snapshot().ready);
    expect(await page.evaluate(() => window.__RSUITE_OVERLAY_SCROLL__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    await page.getByRole('button', { name: 'Anchor', exact: true }).click();
    await page.waitForFunction(() => window.__RSUITE_OVERLAY_SCROLL__.snapshot().entered === 1);
    await page.getByTestId('overlay').evaluate(async element => {
      await Promise.all(element.getAnimations().map(animation => animation.finished));
    });
    const before = await gap(page);
    const unrelated = (await page.locator('#unrelated').boundingBox())!;
    await page.mouse.move(unrelated.x + 20, unrelated.y + 20);
    await page.evaluate(
      () =>
        new Promise<void>(resolve =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        )
    );
    await page.evaluate(() => window.__RSUITE_OVERLAY_SCROLL__.resetMeasurements());
    await page.mouse.wheel(35, 40);
    await expect
      .poll(() => page.locator('#unrelated').evaluate(el => el.scrollTop))
      .toBeGreaterThan(0);
    await page.evaluate(
      () =>
        new Promise<void>(resolve =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        )
    );
    const snapshot = await page.evaluate(() => window.__RSUITE_OVERLAY_SCROLL__.snapshot());
    expect(snapshot.measurements).toBe(0);
    expect(snapshot.scrolls.some(event => event.target === 'unrelated' && event.trusted)).toBe(
      true
    );
    expect(await gap(page)).toEqual(before);
    expect(errors).toEqual([]);
  } finally {
    await page.close();
  }
});
