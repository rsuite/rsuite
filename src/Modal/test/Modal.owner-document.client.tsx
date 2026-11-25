import React, { useState } from 'react';
import ReactDOM, { createPortal, flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Modal from '..';
import Drawer from '../../Drawer';
import '../styles/index.scss';
import '../../Drawer/styles/index.scss';

const frame = document.createElement('iframe');
frame.id = 'modal-frame';
frame.title = 'Modal container';
frame.style.cssText = 'width:900px;height:700px';
const frameLoaded = new Promise<void>(resolve => {
  frame.addEventListener('load', () => resolve(), { once: true });
});
frame.srcdoc = '<!doctype html><html><head></head><body></body></html>';
document.body.append(frame);
await frameLoaded;
const frameDocument = frame.contentDocument!;
document.querySelectorAll('style').forEach(style => {
  frameDocument.head.append(style.cloneNode(true));
});
const root = createRoot(document.getElementById('root')!);
let entered = 0;
let closed = 0;
let renderKey = 0;
let events: { scope: string; key: string; trusted: boolean }[] = [];
for (const [scope, target] of [
  ['parent', document],
  ['frame', frameDocument]
] as const) {
  target.addEventListener('keydown', event => {
    events.push({ scope, key: event.key, trusted: event.isTrusted });
  });
}

interface Options {
  enforceFocus?: boolean;
  keyboard?: boolean;
  autoFocus?: boolean;
  radio?: boolean;
}

function Fixture({ component, options }: { component: 'Modal' | 'Drawer'; options: Options }) {
  const Component = component === 'Modal' ? Modal : Drawer;
  const [open, setOpen] = useState(false);
  return (
    <>
      <button id="parent-opener" onClick={() => setOpen(true)}>
        Open from parent
      </button>
      <button id="parent-outside">Parent outside</button>
      {createPortal(
        <>
          <button id="frame-opener" onClick={() => setOpen(true)}>
            Open in frame
          </button>
          <button id="frame-outside">Frame outside</button>
          <form id="radio-owner">
            <input type="radio" name="shared" defaultChecked aria-label="External checked" />
          </form>
          <Component
            open={open}
            container={frameDocument.body}
            reduceMotion
            animationTimeout={0}
            enforceFocus={options.enforceFocus}
            keyboard={options.keyboard}
            autoFocus={options.autoFocus}
            onEntered={() => entered++}
            onClose={() => {
              closed++;
              setOpen(false);
            }}
          >
            {options.radio && (
              <input type="radio" name="shared" form="radio-owner" aria-label="Inside unchecked" />
            )}
            <button id="first-action">First action</button>
            <button id="last-action">Last action</button>
            <button id="close-action" onClick={() => setOpen(false)}>
              Close explicitly
            </button>
          </Component>
        </>,
        frameDocument.body
      )}
    </>
  );
}

declare global {
  interface Window {
    __RSUITE_MODAL_OWNER_DOCUMENT__: {
      runtime: { react: string; reactDOM: string };
      mount(component: 'Modal' | 'Drawer', options?: Options): void;
      snapshot(): {
        entered: number;
        closed: number;
        frameFocused: string | null;
        wrapperFocused: boolean;
        parentFocused: string | null;
        events: { scope: string; key: string; trusted: boolean }[];
      };
    };
  }
}

window.__RSUITE_MODAL_OWNER_DOCUMENT__ = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount(component, options = {}) {
    entered = 0;
    closed = 0;
    events = [];
    flushSync(() =>
      root.render(<Fixture key={++renderKey} component={component} options={options} />)
    );
  },
  snapshot() {
    return {
      entered,
      closed,
      frameFocused: frameDocument.activeElement?.id || null,
      wrapperFocused: !!frameDocument.activeElement?.matches('[data-testid$="-wrapper"]'),
      parentFocused: document.activeElement?.id || null,
      events
    };
  }
};
