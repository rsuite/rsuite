import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync, version as reactDOM } from 'react-dom';
import Modal from '..';

type Mode = 'closed' | 'close' | 'replace';
const mode = new URLSearchParams(location.hash.slice(1)).get('mode') as Mode;
const references: { tag: string; kind: string; reference: WeakRef<object> }[] = [];
let observed = '';
let mounted = false;
let revision = 0;
let controls: { replace(): void; commit(): void; show(): void; hide(): void; unmount(): void };

function makeCallback(tag: string) {
  const payload = { tag, bytes: new Uint8Array(1024 * 1024) };
  const callback = () => {
    observed = payload.tag;
  };
  references.push(
    { tag, kind: 'payload', reference: new WeakRef(payload) },
    { tag, kind: 'callback', reference: new WeakRef(callback) }
  );
  return callback;
}

function showDialog() {
  controls.show();
}

function hideDialog() {
  controls.hide();
}

function Fixture() {
  const [callback, setCallback] = useState<(() => void) | undefined>(() => makeCallback('old'));
  const [open, setOpen] = useState(mode !== 'closed');
  const [present, setPresent] = useState(true);
  const [tick, setTick] = useState(0);
  mounted = present;
  revision = tick;
  controls = {
    replace: () =>
      flushSync(() => {
        setCallback(() => makeCallback('current'));
        if (mode !== 'replace') setOpen(false);
      }),
    commit: () => flushSync(() => setTick(value => value + 1)),
    show: () => flushSync(() => setOpen(true)),
    hide: () => flushSync(() => setOpen(false)),
    unmount: () =>
      flushSync(() => {
        setPresent(false);
        setCallback(undefined);
      })
  };
  return (
    <>
      <button onClick={showDialog}>Open dialog</button>
      {present && (
        <Modal reduceMotion open={open} onOpen={callback} onClose={hideDialog} animationTimeout={0}>
          <Modal.Header>
            <Modal.Title>{`Dialog ${tick}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button>{`Content ${tick}`}</button>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

const snapshot = () => ({
  observed,
  mounted,
  revision,
  live: references.filter(item => item.reference.deref()).map(({ tag, kind }) => ({ tag, kind }))
});

declare global {
  interface Window {
    __RSUITE_MODAL_RETENTION__: {
      runtime: { react: string; reactDOM: string };
      snapshot: typeof snapshot;
      replace(): void;
      commit(): void;
      hide(): void;
      unmount(): void;
    };
  }
}

window.__RSUITE_MODAL_RETENTION__ = {
  runtime: { react: React.version, reactDOM },
  snapshot,
  replace: () => controls.replace(),
  commit: () => controls.commit(),
  hide: () => controls.hide(),
  unmount: () => controls.unmount()
};
createRoot(document.getElementById('root')!).render(<Fixture />);
