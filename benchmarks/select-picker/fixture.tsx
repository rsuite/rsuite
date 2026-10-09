import React from 'react';
import { createRoot } from 'react-dom/client';
import SelectPicker from 'rsuite-benchmark/SelectPicker';
import 'rsuite-benchmark/styles';
import { createMeasurement, snapshot } from './measure';

const size = Number(new URLSearchParams(location.search).get('size'));
if (!Number.isSafeInteger(size) || size < 100) throw new Error('Invalid fixture size');

const generationStart = performance.now();
const data = Array.from({ length: size }, (_, index) => ({
  value: index + 1,
  label: 'Item ' + (index + 1) + ((index + 1) % 100 === 0 ? ' match' : '')
}));
const dataGenerationMs = performance.now() - generationStart;
const measurement = createMeasurement();
const mountStart = performance.now();
let closedMountMs = 0;
let selectedValue: unknown;

const benchmark = {
  ...measurement,
  snapshot,
  metadata: () => ({
    reactVersion: React.version,
    production: import.meta.env.PROD,
    dataGenerationMs,
    closedMountMs,
    size,
    listHeight: 180,
    itemSize: 36,
    overscanCount: 2,
    devicePixelRatio: window.devicePixelRatio
  }),
  selectedValue: () => selectedValue,
  ready: false
};

declare global {
  interface Window {
    selectPickerBenchmark: typeof benchmark;
  }
}
window.selectPickerBenchmark = benchmark;

const mounted = new MutationObserver(() => {
  if (!document.querySelector('[role="combobox"]')) return;
  closedMountMs = performance.now() - mountStart;
  mounted.disconnect();
  document.fonts.ready.then(() => {
    benchmark.ready = true;
  });
});
mounted.observe(document.getElementById('root')!, { childList: true, subtree: true });
createRoot(document.getElementById('root')!).render(
  <SelectPicker
    id="benchmark-picker"
    data={data}
    virtualized
    searchable
    responsive={false}
    placement="bottomStart"
    listboxMaxHeight={180}
    listProps={{ itemSize: 36, overscanCount: 2 }}
    style={{ width: 240 }}
    onChange={value => {
      selectedValue = value;
    }}
  />
);
