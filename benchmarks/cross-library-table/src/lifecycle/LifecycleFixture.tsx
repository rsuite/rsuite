import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Adapter from 'lifecycle-adapter';
import { rowsForPhase, phaseText } from './domain';
import type { Phase } from './types';
import '../fixture.css';
declare const __LIBRARY__: string;
function LifecycleFixture() {
  const [phase, setPhase] = useState<Phase>('loaded');
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <main>
      <h1>Loading and empty ledger — {__LIBRARY__}</h1>
      <button
        disabled={phase !== 'loaded'}
        onClick={() => {
          setSelected([]);
          setPhase('loading');
        }}
      >
        Start loading
      </button>
      <button disabled={phase !== 'loading'} onClick={() => setPhase('empty')}>
        Resolve empty
      </button>
      <button disabled={phase !== 'empty'} onClick={() => setPhase('recovered')}>
        Recover data
      </button>
      <output aria-label="Selected entry IDs">{JSON.stringify(selected)}</output>
      <p role="status" data-app-phase={phase}>
        {phaseText[phase]}
      </p>
      <section aria-label="Lifecycle ledger">
        <Adapter
          rows={rowsForPhase(phase)}
          loading={phase === 'loading'}
          selected={selected}
          onSelected={setSelected}
        />
      </section>
    </main>
  );
}
createRoot(document.getElementById('root')!).render(<LifecycleFixture />);
