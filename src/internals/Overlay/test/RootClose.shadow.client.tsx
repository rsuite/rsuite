import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { version as reactDOM } from 'react-dom';
import Whisper, { WhisperInstance } from '../../../Whisper';
import Tooltip from '../../../Tooltip';
import CustomProvider from '../../../CustomProvider';
import '../../../Tooltip/styles/index.scss';

const options = new URLSearchParams(location.hash.slice(1));
const mode = options.get('mode') || 'light';
const portal = options.get('portal') || 'body';
const host = document.getElementById('root')!;
host.id = 'fixture-host';
const whisper = React.createRef<WhisperInstance>();
let ready = false;
let entered = 0;
let exited = 0;
let actions = 0;
let trustedAction = false;
let widgetButton: HTMLButtonElement | null = null;

function shadowMount(element: HTMLElement) {
  const shadow = element.attachShadow({ mode: 'open' });
  document.querySelectorAll('style').forEach(style => shadow.appendChild(style.cloneNode(true)));
  const mount = document.createElement('div');
  shadow.appendChild(mount);
  return { shadow, mount };
}

let mount = host;
let externalPortal: HTMLElement | undefined;
if (mode === 'open' || mode === 'nested' || mode === 'separate') {
  mount = shadowMount(host).mount;
  if (mode === 'nested') {
    mount.id = 'nested-host';
    mount = shadowMount(mount).mount;
  }
} else if (mode === 'slotted') {
  const { shadow, mount: portalMount } = shadowMount(host);
  const slot = document.createElement('slot');
  slot.name = 'content';
  shadow.prepend(slot);
  mount = document.createElement('div');
  mount.slot = 'content';
  host.appendChild(mount);
  externalPortal = portalMount;
}
if (mode === 'separate') {
  const otherHost = document.createElement('div');
  otherHost.id = 'portal-host';
  document.body.appendChild(otherHost);
  externalPortal = shadowMount(otherHost).mount;
}
if (externalPortal) externalPortal.style.cssText = 'position:relative;width:600px;height:320px';
const find = (selector: string) => mount.querySelector<HTMLElement>(selector)!;
const container = () =>
  portal === 'body' ? document.body : externalPortal || find('#local-container');
const speaker = () => container()?.querySelector<HTMLElement>('#speaker') || null;
const outside = document.createElement('button');
outside.textContent = 'Document outside';
outside.style.cssText = 'position:fixed;right:20px;top:20px';
document.body.appendChild(outside);

function recordAction(event: MouseEvent | React.MouseEvent) {
  actions++;
  trustedAction = 'nativeEvent' in event ? event.nativeEvent.isTrusted : event.isTrusted;
}

function ClosedContent() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const shadow = ref.current!.attachShadow({ mode: 'closed' });
    const button = document.createElement('button');
    button.textContent = 'Speaker action';
    button.style.cssText = 'width:120px;height:30px';
    button.addEventListener('click', recordAction);
    shadow.appendChild(button);
    widgetButton = button;
    return () => {
      widgetButton = null;
    };
  }, []);
  return <div ref={ref} id="content-host" />;
}

function Fixture() {
  useEffect(() => {
    ready = true;
  }, []);
  return (
    <CustomProvider reduceMotion>
      <div
        id="local-container"
        style={{ position: 'relative', margin: 40, width: 600, height: 320 }}
      >
        <Whisper
          ref={whisper}
          trigger="click"
          placement="bottomStart"
          rootClose={!options.has('disabled')}
          container={container}
          onEntered={() => entered++}
          onExited={() => exited++}
          speaker={
            <Tooltip
              id="speaker"
              arrow={false}
              style={{ width: 180, height: 70, margin: 0, transform: 'none', padding: 10 }}
            >
              {mode === 'closed-content' ? (
                <ClosedContent />
              ) : (
                <button id="speaker-action" onClick={recordAction}>
                  Speaker action
                </button>
              )}
            </Tooltip>
          }
        >
          <button id="anchor" style={{ position: 'absolute', left: 180, top: 90 }}>
            Anchor
          </button>
        </Whisper>
        <button
          id="sibling"
          style={{ position: 'absolute', left: 20, top: 230 }}
          onMouseDown={event => {
            if (options.has('stop')) event.stopPropagation();
          }}
        >
          Sibling outside
        </button>
      </div>
    </CustomProvider>
  );
}

type MouseRecord = { trusted: boolean; target: string; insideSpeakerPath: boolean };
const events: MouseRecord[] = [];
document.addEventListener(
  'mousedown',
  event => {
    events.push({
      trusted: event.isTrusted,
      target: (event.target as Element).id,
      insideSpeakerPath: !!speaker() && event.composedPath().includes(speaker()!)
    });
  },
  true
);
const point = (node: HTMLElement | null) => {
  if (!node?.isConnected) return null;
  const rect = node.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
};
const snapshot = () => ({
  ready,
  entered,
  exited,
  actions,
  trustedAction,
  open: whisper.current?.getState().open,
  anchor: point(find('#anchor')),
  action: point(widgetButton || speaker()?.querySelector('button') || null),
  sibling: point(find('#sibling')),
  outside: point(outside),
  events
});
declare global {
  interface Window {
    __RSUITE_SHADOW_ROOT_CLOSE__: {
      runtime: { react: string; reactDOM: string };
      snapshot: typeof snapshot;
      settle: () => Promise<void>;
    };
  }
}
window.__RSUITE_SHADOW_ROOT_CLOSE__ = {
  runtime: { react: React.version, reactDOM },
  snapshot,
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
createRoot(mount).render(<Fixture />);
