import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync, version as reactDOM } from 'react-dom';
import Whisper, { WhisperInstance } from '../../../Whisper';
import Tooltip from '../../../Tooltip';
import CustomProvider from '../../../CustomProvider';
import '../../../Tooltip/styles/index.scss';

const options = new URLSearchParams(location.hash.slice(1));
const mode = options.get('mode') || 'anchor-height';
const custom = options.has('custom');
const whisper = React.createRef<WhisperInstance>();
const find = (selector: string) => document.querySelector<HTMLElement>(selector)!;
const rect = (node: HTMLElement) => {
  const { left, top, width, height, right, bottom } =
    Element.prototype.getBoundingClientRect.call(node);
  return { left, top, width, height, right, bottom };
};
let ready = false;
let entered = 0;
let exited = 0;
let measurements = 0;
let lastMeasured = Date.now();
let trusted = false;
let manual: { elapsed: number; firstLeft: number; secondLeft: number } | undefined;

function change() {
  if (mode === 'anchor-height') find('#anchor').style.height = '80px';
  else if (mode === 'anchor-width') find('#anchor').style.width = '200px';
  else if (mode === 'container-width') find('#container').style.width = '300px';
  else if (mode === 'container-height') find('#container').style.height = '180px';
  else if (mode === 'overlay-width') find('[data-testid="overlay"]').style.width = '180px';
  else if (mode === 'manual') {
    const start = Date.now();
    flushSync(() => {
      find('#container').style.width = '380px';
      whisper.current?.updatePosition();
    });
    const firstLeft = rect(find('[data-testid="overlay"]')).left;
    flushSync(() => {
      find('#container').style.width = '300px';
      whisper.current?.updatePosition();
    });
    manual = {
      elapsed: Date.now() - start,
      firstLeft,
      secondLeft: rect(find('[data-testid="overlay"]')).left
    };
  }
}

function Fixture() {
  useEffect(() => {
    const anchor = find('#anchor');
    const getBounds = anchor.getBoundingClientRect;
    anchor.getBoundingClientRect = () => {
      measurements++;
      lastMeasured = Date.now();
      return getBounds.call(anchor);
    };
    ready = true;
  }, []);
  const centered = mode === 'anchor-width' || mode === 'overlay-width';
  return (
    <CustomProvider reduceMotion>
      <button
        onClick={event => {
          trusted = event.nativeEvent.isTrusted;
          change();
        }}
      >
        Change size
      </button>
      <button onClick={() => whisper.current?.close()}>Close overlay</button>
      <button
        onClick={() => {
          find('#anchor').style.width = '230px';
          find('#anchor').style.height = '95px';
          find('#container').style.width = '290px';
        }}
      >
        Resize closed nodes
      </button>
      <button onClick={() => (find('#unrelated').style.width = '240px')}>Resize unrelated</button>
      <div id="unrelated" style={{ width: 120, height: 20 }} />
      <div id="container" style={{ position: 'relative', margin: 40, width: 440, height: 320 }}>
        <Whisper
          ref={whisper}
          trigger="none"
          defaultOpen
          placement={
            mode === 'container-height' ? 'autoVerticalStart' : centered ? 'bottom' : 'bottomStart'
          }
          preventOverflow={mode.startsWith('container') || mode === 'manual'}
          container={custom ? () => find('#container') : undefined}
          onEntered={() => entered++}
          onExited={() => exited++}
          speaker={
            <Tooltip
              data-testid="overlay"
              arrow={false}
              style={{
                margin: 0,
                transform: 'none',
                width: 140,
                height: 30,
                maxWidth: 'none',
                padding: 0
              }}
            >
              Resizable tooltip
            </Tooltip>
          }
        >
          <button
            id="anchor"
            style={{ position: 'absolute', top: 100, left: 220, width: 100, height: 28 }}
          >
            Anchor
          </button>
        </Whisper>
      </div>
    </CustomProvider>
  );
}

const snapshot = () => ({
  ready,
  entered,
  exited,
  measurements,
  lastMeasured,
  trusted,
  manual,
  anchor: rect(find('#anchor')),
  container: rect(find('#container')),
  overlay: find('[data-testid="overlay"]') ? rect(find('[data-testid="overlay"]')) : null,
  placement: find('[data-testid="overlay"]')?.dataset.placement
});
declare global {
  interface Window {
    __RSUITE_OVERLAY_RESIZE__: {
      runtime: { react: string; reactDOM: string };
      snapshot: typeof snapshot;
      resetMeasurements: () => void;
      settle: () => Promise<void>;
    };
  }
}
window.__RSUITE_OVERLAY_RESIZE__ = {
  runtime: { react: React.version, reactDOM },
  snapshot,
  resetMeasurements: () => {
    measurements = 0;
  },
  settle: () =>
    new Promise<void>(resolve => {
      let frames = 12;
      const next = () => {
        if (--frames) requestAnimationFrame(next);
        else resolve();
      };
      requestAnimationFrame(next);
    })
};
createRoot(document.getElementById('root')!).render(<Fixture />);
