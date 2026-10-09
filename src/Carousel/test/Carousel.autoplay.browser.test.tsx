import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type { Page } from 'playwright';

describe('Carousel autoplay controls', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Carousel/test/Carousel.autoplay.client.tsx'
    });
    console.info('Carousel autoplay browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  async function open(
    options: Record<string, string> = {},
    reducedMotion = false,
    hasTouch = false
  ) {
    const page = await source.browser.newPage({ hasTouch });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.emulateMedia({ reducedMotion: reducedMotion ? 'reduce' : 'no-preference' });
    // Installation starts time flowing. Pause forward before the app creates any timers.
    await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
    await page.clock.pauseAt(new Date('2026-01-01T01:00:00Z'));
    await page.goto(`${source.url}/#${new URLSearchParams(options)}`);
    await expect
      .poll(() => page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__?.snapshot().ready))
      .toBe(true);
    expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    return { page, errors };
  }
  const changes = (page: Page) =>
    page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.snapshot().slides);
  async function tick(page: Page) {
    await page.clock.runFor(1000);
  }

  it('continues autoplay when there is no interaction', async () => {
    const { page, errors } = await open();
    try {
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      await tick(page);
      expect(await changes(page)).toEqual([1, 0]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it.each([false, true])(
    'stops on focus and stays stopped after blur, StrictMode: %s',
    async strict => {
      const { page, errors } = await open(strict ? { strict: '' } : {});
      try {
        await page.getByTestId('before').focus();
        await page.getByTestId('first-action').focus();
        await tick(page);
        expect(await changes(page)).toEqual([]);
        await page.getByTestId('after').focus();
        await tick(page);
        expect(await changes(page)).toEqual([]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it('pauses on pointer hover and resumes when the pointer leaves', async () => {
    const { page, errors } = await open();
    try {
      await page.getByTestId('carousel').hover();
      await tick(page);
      expect(await changes(page)).toEqual([]);
      await page.getByTestId('after').hover();
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it('offers a first-tab-stop rotation control with an action label', async () => {
    const { page, errors } = await open();
    try {
      await page.getByTestId('before').focus();
      await page.keyboard.press('Tab');
      const start = page.getByRole('button', { name: 'Start slide rotation', exact: true });
      expect(await start.count()).toBe(1);
      expect(await start.evaluate(node => document.activeElement === node)).toBe(true);
      expect(await start.getAttribute('aria-pressed')).toBeNull();
      await page.keyboard.press('Space');
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      const stop = page.getByRole('button', { name: 'Stop slide rotation', exact: true });
      expect(await stop.count()).toBe(1);
      await page.keyboard.press('Space');
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it.each<Record<string, string>>([{}, { provider: 'true' }])(
    'does not auto-start with reduced motion: %j',
    async options => {
      const { page, errors } = await open(options, true);
      try {
        await tick(page);
        expect(await changes(page)).toEqual([]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it('allows the provider to override the system motion preference', async () => {
    const { page, errors } = await open({ provider: 'false' }, true);
    try {
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it('does not restart when pointer focus precedes a Stop click', async () => {
    const { page, errors } = await open();
    try {
      await page.getByRole('button', { name: 'Stop slide rotation', exact: true }).click();
      await page.getByTestId('after').hover();
      await tick(page);
      expect(await changes(page)).toEqual([]);
      await page.getByRole('button', { name: 'Start slide rotation', exact: true }).click();
      await tick(page);
      expect(await changes(page)).toEqual([]);
      await page.getByTestId('after').hover();
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it('permits an explicit restart with reduced motion and stops on a later focus move', async () => {
    const { page, errors } = await open({}, true);
    try {
      await page.getByTestId('before').focus();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      await page.keyboard.press('Tab');
      expect(
        await page.getByTestId('second-action').evaluate(node => document.activeElement === node)
      ).toBe(true);
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      expect(
        await page
          .getByTestId('carousel-slider')
          .evaluate(node => getComputedStyle(node).transitionDuration)
      ).toBe('0s');
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it('stays stopped after the system motion preference changes back', async () => {
    const { page, errors } = await open();
    try {
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await expect
        .poll(() => page.getByRole('button', { name: 'Start slide rotation', exact: true }).count())
        .toBe(1);
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it('resumes from a touch activation without requiring the finger to hover away', async () => {
    const { page, errors } = await open({}, false, true);
    try {
      await page.getByRole('button', { name: 'Stop slide rotation', exact: true }).tap();
      await tick(page);
      expect(await changes(page)).toEqual([]);
      await page.getByRole('button', { name: 'Start slide rotation', exact: true }).tap();
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  for (const mode of ['automatic', 'touch', 'reduced motion', 'paused']) {
    it(`preserves ${mode} playback across Activity reconnection`, async context => {
      const { page, errors } = await open(
        { activity: '', strict: '' },
        mode === 'reduced motion',
        mode === 'touch'
      );
      try {
        if (!(await page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.activitySupported))) {
          context.skip();
        }
        if (mode === 'touch') {
          await page.getByRole('button', { name: 'Stop slide rotation', exact: true }).tap();
          await page.getByRole('button', { name: 'Start slide rotation', exact: true }).tap();
        } else if (mode === 'reduced motion') {
          await page.getByTestId('before').focus();
          await page.keyboard.press('Tab');
          await page.keyboard.press('Space');
        } else if (mode === 'paused') {
          await page.getByTestId('first-action').focus();
        }
        await page.getByTestId('outside-activity').focus();
        await tick(page);
        expect(await changes(page)).toEqual(mode === 'paused' ? [] : [1]);
        await page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.setActivityMode('hidden'));
        await expect.poll(() => page.getByTestId('carousel').isVisible()).toBe(false);
        await tick(page);
        expect(await changes(page)).toEqual(mode === 'paused' ? [] : [1]);
        await page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.setActivityMode('visible'));
        await expect.poll(() => page.getByTestId('carousel').isVisible()).toBe(true);
        await tick(page);
        expect(await changes(page)).toEqual(mode === 'paused' ? [] : [1, 0]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    });
  }

  it('honors a motion preference changed while Activity was hidden', async context => {
    const { page, errors } = await open({ activity: '', strict: '' });
    try {
      if (!(await page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.activitySupported))) {
        context.skip();
      }
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      await page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.setActivityMode('hidden'));
      await expect.poll(() => page.getByTestId('carousel').isVisible()).toBe(false);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.evaluate(() => window.__RSUITE_CAROUSEL_AUTOPLAY__.setActivityMode('visible'));
      await expect
        .poll(() => page.getByRole('button', { name: 'Start slide rotation', exact: true }).count())
        .toBe(1);
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await tick(page);
      expect(await changes(page)).toEqual([1]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
