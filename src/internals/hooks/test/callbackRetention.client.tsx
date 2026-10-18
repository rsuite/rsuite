import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync, version as reactDOM } from 'react-dom';
import Button from '../../../Button';
import useEventCallback from '../useEventCallback';
import useCustomConfig from '../useCustomConfig';

type Mode = 'event' | 'config' | 'button';
type Handler = () => string;
const mode = new URLSearchParams(location.hash.slice(1)).get('mode') as Mode;
const references: { tag: string; kind: string; reference: WeakRef<object> }[] = [];
let observed = '';
let controls: { replace(tag: string): void; commit(): void; unmount(): void };
let mounted = true;
let revision = 0;

// Create payloads outside the rendering scopes so fixture closures cannot own
// superseded props. Observations keep only WeakRefs and scalar values.
function makeHandler(tag: string): Handler {
  const payload = { tag, bytes: new Uint8Array(1024 * 1024) };
  const callback = () => {
    observed = payload.tag;
    return payload.tag;
  };
  references.push(
    { tag, kind: 'payload', reference: new WeakRef(payload) },
    { tag, kind: 'callback', reference: new WeakRef(callback) }
  );
  return callback;
}

function EventProbe({ callback, revision }: { callback: Handler; revision: number }) {
  const stable = useEventCallback(callback);
  return (
    <button id="target" data-revision={revision} onClick={stable}>
      Target
    </button>
  );
}

function ConfigProbe({ callback, revision }: { callback: Handler; revision: number }) {
  const { propsWithDefaults } = useCustomConfig('Button', {
    onClick: callback,
    'data-revision': revision
  });
  return (
    <button id="target" {...propsWithDefaults}>
      Target
    </button>
  );
}

function Fixture() {
  const [callback, setCallback] = useState<Handler | undefined>(() => makeHandler('old'));
  const [isMounted, setMounted] = useState(true);
  const [renderRevision, setRevision] = useState(0);
  mounted = isMounted;
  revision = renderRevision;
  controls = {
    replace: tag => flushSync(() => setCallback(() => makeHandler(tag))),
    commit: () => flushSync(() => setRevision(value => value + 1)),
    unmount: () =>
      flushSync(() => {
        setMounted(false);
        setCallback(undefined);
      })
  };
  return isMounted && callback ? (
    mode === 'event' ? (
      <EventProbe callback={callback} revision={renderRevision} />
    ) : mode === 'config' ? (
      <ConfigProbe callback={callback} revision={renderRevision} />
    ) : (
      <Button id="target" data-revision={renderRevision} ripple={false} onClick={callback}>
        {`Target ${renderRevision}`}
      </Button>
    )
  ) : null;
}

const snapshot = () => ({
  observed,
  mounted,
  revision,
  live: references.filter(item => item.reference.deref()).map(({ tag, kind }) => ({ tag, kind }))
});

declare global {
  interface Window {
    __RSUITE_CALLBACK_RETENTION__: {
      runtime: { react: string; reactDOM: string };
      replace(tag: string): void;
      commit(): void;
      unmount(): void;
      snapshot: typeof snapshot;
    };
  }
}

window.__RSUITE_CALLBACK_RETENTION__ = {
  runtime: { react: React.version, reactDOM },
  replace: tag => controls.replace(tag),
  commit: () => controls.commit(),
  unmount: () => controls.unmount(),
  snapshot
};
createRoot(document.getElementById('root')!).render(<Fixture />);
