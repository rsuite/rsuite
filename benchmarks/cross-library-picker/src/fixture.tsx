import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Adapter from 'benchmark-adapter';
import { createMeasurement, snapshot } from './measurement';
import { listHeight, rowHeight } from './shared';
import './fixture.css';

const params = new URLSearchParams(location.search);
const size = Number(params.get('size'));
const virtualized = params.get('mode') === 'virtualized';
if (!Number.isSafeInteger(size) || size < 100 || size > 100000) throw new Error('Invalid size');
if (!['standard', 'virtualized'].includes(params.get('mode') ?? ''))
  throw new Error('Invalid mode');
const dataStart = performance.now();
const items = Array.from({ length: size }, (_, index) => ({
  value: String(index + 1),
  label: 'Item ' + (index + 1) + ((index + 1) % 100 === 0 ? ' match' : '')
}));
const dataGenerationMs = performance.now() - dataStart;
const measurement = createMeasurement();
const mountStart = performance.now();
let closedMountMs = 0;
window.pickerBenchmark = {
  ready: false,
  ...measurement,
  snapshot,
  metadata: () => ({
    library: __LIBRARY__,
    reactVersion: React.version,
    production: import.meta.env.PROD,
    size,
    virtualized,
    dataGenerationMs,
    closedMountMs,
    listHeight,
    rowHeight,
    devicePixelRatio,
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches
  })
};

function Fixture() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <main className="benchmark-host">
      <Adapter items={items} virtualized={virtualized} onSelectionChange={setSelected} />
      <output data-bench-selected={selected ?? ''}>{selected}</output>
    </main>
  );
}
const observer = new MutationObserver(() => {
  if (!document.querySelector('#root [role="combobox"]')) return;
  closedMountMs = performance.now() - mountStart;
  observer.disconnect();
  document.fonts.ready.then(() =>
    requestAnimationFrame(() => {
      window.pickerBenchmark.ready = true;
    })
  );
});
observer.observe(document.getElementById('root')!, { subtree: true, childList: true });
createRoot(document.getElementById('root')!).render(<Fixture />);
