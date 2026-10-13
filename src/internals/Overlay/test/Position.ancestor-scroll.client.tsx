import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { version as reactDOM } from 'react-dom';
import Whisper from '../../../Whisper';
import Tooltip from '../../../Tooltip';
import CustomProvider from '../../../CustomProvider';
import '../../../Tooltip/styles/index.scss';

const options = new URLSearchParams(location.hash.slice(1));
const fixtureRoot = document.getElementById('root')!;
const mount = document.createElement('div');
fixtureRoot.appendChild(mount);
const find = (selector: string) => fixtureRoot.querySelector<HTMLElement>(selector)!;

// Count active registrations so closing and reopening cannot silently leak listeners.
const registrations: {
  target: EventTarget;
  listener: EventListenerOrEventListenerObject;
  capture: boolean;
}[] = [];
const add = EventTarget.prototype.addEventListener;
const remove = EventTarget.prototype.removeEventListener;
EventTarget.prototype.addEventListener = function (type, listener, options) {
  const capture = typeof options === 'boolean' ? options : !!options?.capture;
  if (
    type === 'scroll' &&
    listener &&
    !registrations.some(
      entry => entry.target === this && entry.listener === listener && entry.capture === capture
    )
  ) {
    registrations.push({ target: this, listener, capture });
  }
  add.call(this, type, listener, options);
};
EventTarget.prototype.removeEventListener = function (type, listener, options) {
  const capture = typeof options === 'boolean' ? options : !!options?.capture;
  const index = registrations.findIndex(
    entry => entry.target === this && entry.listener === listener && entry.capture === capture
  );
  if (type === 'scroll' && index !== -1) registrations.splice(index, 1);
  remove.call(this, type, listener, options);
};
const scrolls: { target: string; trusted: boolean }[] = [];
const recordScroll = (event: Event) => {
  scrolls.push({
    target: event.target === document ? 'document' : (event.target as HTMLElement).id,
    trusted: event.isTrusted
  });
};
fixtureRoot.addEventListener('scroll', recordScroll, true);
document.addEventListener('scroll', event => {
  if (event.target === document) recordScroll(event);
});
let ready = false;
let entered = 0;
let exited = 0;
let measurements = 0;
function Fixture() {
  useEffect(() => {
    const anchor = find('#anchor');
    const getBounds = anchor.getBoundingClientRect;
    anchor.getBoundingClientRect = () => {
      measurements++;
      return getBounds.call(anchor);
    };
    if (options.has('fixed')) document.body.style.minHeight = '1800px';
    if (options.has('slotted')) {
      const shadow = find('#inner').attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<div id="inner-scroll" style="width:320px;height:180px;overflow:auto"><div style="width:900px;height:700px"><slot></slot></div></div>';
      shadow.addEventListener('scroll', recordScroll, true);
    }
    ready = true;
  }, []);
  return (
    <CustomProvider reduceMotion>
      <>
        <div
          id="outer"
          style={{
            position: 'relative',
            margin: 40,
            width: 440,
            height: 300,
            overflow: 'auto',
            border: '1px solid'
          }}
        >
          <div style={{ width: 900, height: 800, padding: 32 }}>
            <div
              id="inner"
              style={{ width: 320, height: 180, overflow: 'auto', border: '1px solid' }}
            >
              <div style={{ width: 900, height: 700 }}>
                <Whisper
                  trigger="click"
                  onEntered={() => entered++}
                  onExited={() => exited++}
                  placement="bottomStart"
                  preventOverflow={options.has('prevent')}
                  container={
                    options.has('portal')
                      ? () => find('#portal')
                      : options.has('custom')
                        ? () => find('#outer')
                        : undefined
                  }
                  speaker={<Tooltip data-testid="overlay">Anchored tooltip</Tooltip>}
                >
                  <button
                    id="anchor"
                    style={{
                      marginLeft: 120,
                      marginTop: 70,
                      width: 100,
                      height: 28,
                      ...(options.has('fixed') ? { position: 'fixed', top: 100, left: 100 } : {})
                    }}
                  >
                    Anchor
                  </button>
                </Whisper>
              </div>
            </div>
          </div>
        </div>
        {options.has('portal') && (
          <div
            id="portal"
            style={{ position: 'relative', margin: 40, width: 440, height: 180, overflow: 'auto' }}
          >
            <div style={{ width: 900, height: 700 }}>Separate portal container</div>
          </div>
        )}
        {options.has('unrelated') && (
          <div id="unrelated" style={{ margin: 40, width: 440, height: 180, overflow: 'auto' }}>
            <div style={{ width: 900, height: 700 }}>Unrelated scroll area</div>
          </div>
        )}
      </>
    </CustomProvider>
  );
}
declare global {
  interface Window {
    __RSUITE_OVERLAY_SCROLL__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => {
        ready: boolean;
        entered: number;
        exited: number;
        listeners: number;
        measurements: number;
        scrolls: typeof scrolls;
      };
      gap: () => { left: number; top: number };
      unmount: () => void;
      resetMeasurements: () => void;
    };
  }
}
window.__RSUITE_OVERLAY_SCROLL__ = {
  runtime: { react: React.version, reactDOM },
  snapshot: () => ({
    ready,
    entered,
    exited,
    listeners: registrations.length,
    measurements,
    scrolls
  }),
  gap: () => {
    const anchor = find('#anchor').getBoundingClientRect();
    const overlay = (
      find('[data-testid="overlay"]') || document.querySelector('[data-testid="overlay"]')!
    ).getBoundingClientRect();
    return { left: overlay.left - anchor.left, top: overlay.top - anchor.bottom };
  },
  unmount: () => root.unmount(),
  resetMeasurements: () => {
    measurements = 0;
  }
};
const root = createRoot(mount);
root.render(<Fixture />);
