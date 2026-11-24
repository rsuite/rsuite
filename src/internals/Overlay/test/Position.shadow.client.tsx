import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { version as reactDOM } from 'react-dom';
import Whisper from '../../../Whisper';
import Tooltip from '../../../Tooltip';
import CustomProvider from '../../../CustomProvider';
import type { Placement } from '../../types';
import '../../../Tooltip/styles/index.scss';

const options = new URLSearchParams(location.hash.slice(1));
const mode = options.get('mode') || 'light';
const custom = options.has('custom');
const followCursor = options.has('cursor');
const placement = (options.get('placement') || 'bottomStart') as Placement;
let ready = false;
let entered = 0;
let trustedClick = false;
let trustedMove = false;
let iframe: HTMLIFrameElement | undefined;
let fixtureDocument = document;
if (options.has('frame')) {
  iframe = document.createElement('iframe');
  iframe.style.cssText = 'width:720px;height:440px;border:0;display:block';
  // Firefox replaces the initial about:blank document when the frame loads.
  await new Promise<void>(resolve => {
    iframe!.addEventListener('load', () => resolve(), { once: true });
    document.getElementById('root')!.appendChild(iframe!);
  });
  fixtureDocument = iframe.contentDocument!;
  document
    .querySelectorAll('style')
    .forEach(style => fixtureDocument.head.appendChild(style.cloneNode(true)));
}
fixtureDocument.documentElement.dir = options.has('rtl') ? 'rtl' : 'ltr';
if (options.has('scrolled')) {
  fixtureDocument.body.style.minWidth = '1800px';
  fixtureDocument.body.style.minHeight = '1800px';
}
const host = iframe
  ? fixtureDocument.body.appendChild(fixtureDocument.createElement('div'))
  : document.getElementById('root')!;
function createShadow(parent: HTMLElement, closed: boolean) {
  const shadow = parent.attachShadow({ mode: closed ? 'closed' : 'open' });
  fixtureDocument
    .querySelectorAll('style')
    .forEach(style => shadow.appendChild(style.cloneNode(true)));
  const mount = fixtureDocument.createElement('div');
  shadow.appendChild(mount);
  return mount;
}
let mount = mode === 'light' ? host : createShadow(host, mode === 'closed');
if (mode === 'nested') mount = createShadow(mount, false);
const find = (selector: string) => mount.querySelector<HTMLElement>(selector)!;
const overlay = () =>
  find('[data-testid="overlay"]') ||
  fixtureDocument.querySelector<HTMLElement>('[data-testid="overlay"]')!;
const bounds = (element: HTMLElement) => {
  const { left, top, right, bottom, width, height } = element.getBoundingClientRect();
  return { left, top, right, bottom, width, height };
};
function Fixture() {
  useEffect(() => {
    if (options.has('scrolled')) {
      fixtureDocument.defaultView!.scrollTo(60, 90);
      if (custom) {
        find('#container').scrollTop = 30;
        find('#container').scrollLeft = 40;
      }
    }
    ready = true;
  }, []);
  return (
    <CustomProvider reduceMotion rtl={options.has('rtl')}>
      <div
        id="container"
        style={{
          position: 'relative',
          margin: 40,
          width: 620,
          height: 500,
          border: '3px solid',
          padding: 20,
          overflow: options.has('scrolled') && custom ? 'auto' : undefined
        }}
      >
        <Whisper
          trigger={followCursor ? 'hover' : 'click'}
          followCursor={followCursor}
          placement={placement}
          preventOverflow
          container={custom ? () => find('#container') : () => fixtureDocument.body}
          onEntered={() => entered++}
          speaker={
            <Tooltip
              data-testid="overlay"
              arrow={false}
              style={{ padding: 0, width: 120, height: 30, margin: 0, transform: 'none' }}
            >
              Shadow tooltip
            </Tooltip>
          }
        >
          <button
            id="anchor"
            onClick={event => {
              trustedClick = event.nativeEvent.isTrusted;
            }}
            onMouseMove={event => {
              trustedMove = event.nativeEvent.isTrusted;
            }}
            style={{
              marginLeft: 130,
              marginTop: iframe ? 270 : 180,
              width: 100,
              height: 28,
              ...(options.has('fixed') ? { position: 'fixed', left: 220, top: 200, margin: 0 } : {})
            }}
          >
            Anchor
          </button>
        </Whisper>
        {options.has('scrolled') && custom && <div style={{ width: 1000, height: 1000 }} />}
      </div>
    </CustomProvider>
  );
}
declare global {
  interface Window {
    __RSUITE_SHADOW_POSITION__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => {
        ready: boolean;
        entered: number;
        anchor: ReturnType<typeof bounds> | null;
        overlay: ReturnType<typeof bounds> | null;
        placement: string | undefined;
        connected: boolean;
        documentContains: boolean;
        trustedClick: boolean;
        trustedMove: boolean;
        pointerOffset: { left: number; top: number };
        frameDocumentCurrent: boolean;
      };
      settle: () => Promise<void>;
    };
  }
}
window.__RSUITE_SHADOW_POSITION__ = {
  runtime: { react: React.version, reactDOM },
  snapshot: () => ({
    ready,
    entered,
    anchor: find('#anchor') ? bounds(find('#anchor')) : null,
    overlay: overlay() ? bounds(overlay()) : null,
    placement: overlay()?.dataset.placement,
    connected: !!find('#anchor')?.isConnected,
    documentContains: fixtureDocument.documentElement.contains(find('#anchor')),
    trustedClick,
    trustedMove,
    frameDocumentCurrent: !iframe || iframe.contentDocument === fixtureDocument,
    pointerOffset: {
      left: iframe?.getBoundingClientRect().left || 0,
      top: iframe?.getBoundingClientRect().top || 0
    }
  }),
  settle: async () => {
    await Promise.all(
      overlay()
        .getAnimations()
        .map(animation => animation.finished)
    );
    await new Promise<void>(resolve =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    );
  }
};
createRoot(mount).render(<Fixture />);
