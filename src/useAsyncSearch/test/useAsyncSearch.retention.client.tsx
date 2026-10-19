import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { version as reactDOM } from 'react-dom';
import useAsyncSearch from '..';

type Mode = 'success' | 'error' | 'pending';
interface Item {
  id: string;
  payload: Uint8Array;
}

const mode = new URLSearchParams(location.hash.slice(1)).get('mode') as Mode;
const references: WeakRef<object>[] = [];
let controls: { disable(): void; commit(): void } | undefined;
let calls = 0;
let aborts = 0;
let state = { status: '', items: 0, error: '', revision: 0 };

function clearControlsOnUnmount() {
  return () => {
    controls = undefined;
  };
}

function Probe() {
  const [data, setData] = useState<Item[]>(() => {
    const item = { id: 'previous', payload: new Uint8Array(1024 * 1024) };
    references.push(new WeakRef(item));
    return [item];
  });
  const [enabled, setEnabled] = useState(true);
  const [revision, setRevision] = useState(0);
  const result = useAsyncSearch({
    query: '',
    enabled,
    dependencies: [data],
    search: ({ signal }) => {
      calls++;
      signal.addEventListener('abort', () => aborts++, { once: true });
      if (mode === 'pending') return new Promise<Item[]>(() => {});
      if (mode === 'error') {
        const error = Object.assign(new Error('Previous failure'), {
          payload: new Uint8Array(1024 * 1024)
        });
        references.push(new WeakRef(error));
        throw error;
      }
      return data;
    }
  });

  controls = {
    disable() {
      setEnabled(false);
      setData([]);
    },
    commit() {
      setRevision(value => value + 1);
    }
  };
  useEffect(() => {
    // Keep only scalar observations; storing the returned items/error would
    // make the fixture itself retain the objects under test.
    state = {
      status: result.status,
      items: result.items.length,
      error: result.error?.message ?? '',
      revision
    };
  });
  useEffect(clearControlsOnUnmount, []);
  return null;
}

function Fixture() {
  const [mounted, setMounted] = useState(false);
  const [, setRevision] = useState(0);
  return (
    <>
      <button onClick={() => setMounted(true)}>Mount search</button>
      <button onClick={() => controls?.disable()}>Disable and release data</button>
      <button
        onClick={() => {
          if (controls) controls.commit();
          else setRevision(value => value + 1);
        }}
      >
        Commit unrelated render
      </button>
      <button onClick={() => setMounted(false)}>Unmount search</button>
      {mounted && <Probe />}
    </>
  );
}

const snapshot = () => ({
  mode,
  ...state,
  calls,
  aborts,
  mounted: Boolean(controls),
  observedObjects: references.length,
  liveObjects: references.filter(reference => reference.deref()).length
});

declare global {
  interface Window {
    __RSUITE_ASYNC_SEARCH_RETENTION__: {
      runtime: { react: string; reactDOM: string };
      snapshot: typeof snapshot;
      settle(): Promise<void>;
    };
  }
}

window.__RSUITE_ASYNC_SEARCH_RETENTION__ = {
  runtime: { react: React.version, reactDOM },
  snapshot,
  settle: () =>
    new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
};
createRoot(document.getElementById('root')!).render(<Fixture />);
