import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync, version as reactDOM } from 'react-dom';
import CommandPalette from '..';

type Mode = 'closed' | 'close' | 'filtered';
type CatalogItem = { value: string; label: string; payload: { tag: string; bytes: Uint8Array } };
const mode = new URLSearchParams(location.hash.slice(1)).get('mode') as Mode;
const references: { tag: string; kind: string; reference: WeakRef<object> }[] = [];
let selected = '';
let revision = 0;
let mounted = false;
let controls: {
  clear(): void;
  restore(): void;
  commit(): void;
  show(): void;
  hide(): void;
  unmount(): void;
};

function makeCatalog(tag: string): CatalogItem[] {
  const payload = { tag, bytes: new Uint8Array(1024 * 1024) };
  const item = { value: tag, label: `Command ${tag}`, payload };
  const catalog = [item];
  for (const [kind, value] of [
    ['payload', payload],
    ['item', item],
    ['catalog', catalog]
  ] as const) {
    references.push({ tag, kind, reference: new WeakRef(value) });
  }
  return catalog;
}

function showPalette() {
  controls.show();
}

function hidePalette() {
  controls.hide();
}

function selectCommand(_value: string, item: CatalogItem) {
  selected = item.payload.tag;
}

function Fixture() {
  const [catalog, setCatalog] = useState(() => makeCatalog('old'));
  const [open, setOpen] = useState(mode !== 'closed');
  const [present, setPresent] = useState(true);
  const [tick, setTick] = useState(0);
  revision = tick;
  mounted = present;
  controls = {
    clear: () =>
      flushSync(() => {
        setOpen(false);
        setCatalog([]);
      }),
    restore: () => flushSync(() => setCatalog(makeCatalog('current'))),
    commit: () => flushSync(() => setTick(value => value + 1)),
    show: () => flushSync(() => setOpen(true)),
    hide: () => flushSync(() => setOpen(false)),
    unmount: () =>
      flushSync(() => {
        setPresent(false);
        setCatalog([]);
      })
  };
  return (
    <>
      <button onClick={showPalette}>Open commands</button>
      {present && (
        <CommandPalette
          reduceMotion
          data-revision={tick}
          title={`Commands ${tick}`}
          data={catalog}
          open={open}
          filter={mode === 'filtered'}
          animationTimeout={0}
          onClose={hidePalette}
          onSelect={selectCommand}
        />
      )}
    </>
  );
}

const snapshot = () => ({
  mounted,
  revision,
  selected,
  live: references.filter(item => item.reference.deref()).map(({ tag, kind }) => ({ tag, kind }))
});

declare global {
  interface Window {
    __RSUITE_COMMAND_CATALOG_RETENTION__: {
      runtime: { react: string; reactDOM: string };
      snapshot: typeof snapshot;
      clear(): void;
      restore(): void;
      commit(): void;
      unmount(): void;
    };
  }
}

window.__RSUITE_COMMAND_CATALOG_RETENTION__ = {
  runtime: { react: React.version, reactDOM },
  snapshot,
  clear: () => controls.clear(),
  restore: () => controls.restore(),
  commit: () => controls.commit(),
  unmount: () => controls.unmount()
};
createRoot(document.getElementById('root')!).render(<Fixture />);
