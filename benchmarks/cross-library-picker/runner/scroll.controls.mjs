import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium, firefox } from 'playwright';
import { scrollViewport } from './scroll.mjs';

const results = [];
for (const [name, launcher] of Object.entries({ chromium, firefox })) {
  const browser = await launcher.launch();
  try {
    for (const control of [
      'wheel progress then range',
      'ignore synthetic completion',
      'range completion',
      'no-op range',
      'previous scroll completion'
    ]) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      page.setDefaultTimeout(12000);
      try {
        await page.setContent(
          '<div id="viewport" style="height:180px;width:240px;overflow:auto"><div style="height:36000px">Native scroll control</div></div>'
        );
        await page.evaluate(() => {
          const element = document.querySelector('#viewport');
          window.events = [];
          for (const type of ['wheel', 'scroll', 'scrollend']) {
            element.addEventListener(
              type,
              event => {
                window.events.push({ type, trusted: event.isTrusted, top: element.scrollTop });
              },
              { capture: true, passive: true }
            );
          }
        });
        const viewport = page.locator('#viewport');
        if (control === 'wheel progress then range' || control === 'ignore synthetic completion') {
          await viewport.hover();
          await page.mouse.wheel(0, 36000);
          await page.waitForFunction(() => document.querySelector('#viewport').scrollTop > 0);
          if (control === 'ignore synthetic completion') {
            // Chromium may consume the whole wheel delta and already be at the bottom.
            // Start this independent synthetic-event control at the top so it changes position.
            await scrollViewport(page, viewport, 'top');
            await viewport.evaluate(element =>
              element.addEventListener(
                'scroll',
                () => {
                  element.dispatchEvent(new Event('scrollend'));
                },
                { once: true }
              )
            );
          }
          await scrollViewport(page, viewport, 'bottom');
          const events = await page.evaluate(() => window.events);
          assert(events.some(event => event.type === 'wheel' && event.trusted));
          assert(events.some(event => event.type === 'scroll' && event.trusted && event.top > 0));
          assert(
            events.some(
              event => event.type === 'scrollend' && event.trusted && event.top === 35820
            ),
            'Native range write must complete before the next operation'
          );
          if (control === 'ignore synthetic completion') {
            assert(
              events.some(event => event.type === 'scrollend' && !event.trusted),
              'Synthetic completion control must run'
            );
          }
          await scrollViewport(page, viewport, 'top');
          assert.equal(await viewport.evaluate(element => element.scrollTop), 0);
        } else if (control === 'previous scroll completion') {
          // A real previous scroll finishes while the observer is installed, before
          // the requested write. Its completion must not release the next operation.
          const movingViewport = {
            async evaluateHandle(callback, argument) {
              const observation = await viewport.evaluateHandle(callback, argument);
              await viewport.evaluate(element => {
                element.scrollTop = 90;
              });
              await page.waitForFunction(() =>
                window.events.some(
                  event => event.type === 'scrollend' && event.trusted && event.top === 90
                )
              );
              return observation;
            }
          };
          await scrollViewport(page, movingViewport, 'bottom');
          const events = await page.evaluate(() => window.events);
          assert(
            events.some(event => event.type === 'scrollend' && event.trusted && event.top === 90)
          );
          assert(
            events.some(
              event => event.type === 'scrollend' && event.trusted && event.top === 35820
            ),
            'The previous operation must not complete the requested range write'
          );
        } else {
          if (control === 'range completion') {
            await scrollViewport(page, viewport, 'bottom');
            const bottom = await page.evaluate(() => window.events);
            assert(
              bottom.some(
                event => event.type === 'scrollend' && event.trusted && event.top === 35820
              )
            );
            await scrollViewport(page, viewport, 'top');
            const events = await page.evaluate(() => window.events);
            assert(
              events.some(event => event.type === 'scrollend' && event.trusted && event.top === 0)
            );
          } else {
            await scrollViewport(page, viewport, 'top');
            assert.deepEqual(await page.evaluate(() => window.events), []);
            await scrollViewport(page, viewport, 'bottom');
            const count = await page.evaluate(() => window.events.length);
            await scrollViewport(page, viewport, 'bottom');
            assert.equal(await page.evaluate(() => window.events.length), count);
          }
        }
        results.push({
          browser: name,
          version: browser.version(),
          control,
          status: 'passed',
          events: await page.evaluate(() => window.events)
        });
        console.log('PASS', name, control);
      } catch (error) {
        results.push({
          browser: name,
          version: browser.version(),
          control,
          status: 'failed',
          error: String(error.stack || error),
          message: error.message,
          events: await page.evaluate(() => window.events)
        });
        console.error('FAIL', name, control, error);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}
await fs.mkdir(new URL('../results/', import.meta.url), { recursive: true });
await fs.writeFile(
  new URL('../results/scroll-controls.json', import.meta.url),
  JSON.stringify(results, null, 2) + '\n'
);
if (results.some(result => result.status === 'failed')) process.exitCode = 1;
