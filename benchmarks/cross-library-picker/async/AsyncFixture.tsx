import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Adapter from 'async-adapter';
import { componentSnapshot } from './snapshot';
import { useAsyncItems } from './useAsyncItems';
import '../src/fixture.css';
import './types';

const mode = new URLSearchParams(location.search).get('mode');
if (!['standard', 'virtualized'].includes(mode ?? '')) throw new Error('Invalid mode');

function AsyncFixture() {
  const { state, onQuery, requests } = useAsyncItems();
  const [selected, setSelected] = useState<string | null>(null);
  const selections = useRef<Array<string | null>>([]);
  const keys = useRef<Array<{ key: string; trusted: boolean }>>([]);
  const inputs = useRef<Array<{ value: string; trusted: boolean }>>([]);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      keys.current.push({ key: event.key, trusted: event.isTrusted });
      if (keys.current.length > 100) keys.current.shift();
    };
    document.addEventListener('keydown', keydown, true);
    const input = (event: Event) => {
      if (!(event.target instanceof HTMLInputElement)) return;
      inputs.current.push({ value: event.target.value, trusted: event.isTrusted });
      if (inputs.current.length > 100) inputs.current.shift();
    };
    document.addEventListener('input', input, true);
    return () => {
      document.removeEventListener('keydown', keydown, true);
      document.removeEventListener('input', input, true);
    };
  }, []);
  useEffect(() => {
    window.pickerAsync = {
      ready: true,
      metadata: () => ({
        library: __LIBRARY__,
        reactVersion: React.version,
        production: import.meta.env.PROD,
        mode,
        initialSize: 1000,
        sharedAppOwnsTransportOrdering: true
      }),
      snapshot: () => ({
        ...componentSnapshot(state.items),
        query: state.query,
        loading: state.loading,
        error: state.error,
        itemValues: state.items.map(item => item.value),
        requests: requests.current.map(row => ({ ...row })),
        selections: [...selections.current],
        keys: [...keys.current],
        inputs: [...inputs.current]
      })
    };
  });
  return (
    <main className="benchmark-host">
      <div aria-busy={state.loading}>
        <Adapter
          items={state.items}
          virtualized={mode === 'virtualized'}
          value={selected}
          onQuery={onQuery}
          onSelectionChange={value => {
            selections.current.push(value);
            setSelected(value);
          }}
        />
      </div>
      <output data-bench-selected={selected ?? ''}>{selected}</output>
      <p role="status" aria-live="polite">
        {state.loading ? 'Searching' : state.error ? 'Search failed' : 'Search ready'}
      </p>
    </main>
  );
}
createRoot(document.getElementById('root')!).render(<AsyncFixture />);
