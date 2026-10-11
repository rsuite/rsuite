import React, { StrictMode, useEffect, useRef, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import type { Option } from '../../types';
import '../../../styles/_themes.scss';
import '../../../SelectPicker/styles/index.scss';
import '../../../CheckPicker/styles/index.scss';

type Mode = 'all' | 'filtered' | 'removed' | 'empty' | 'disabled' | 'loading' | 'distant';
const options = new URLSearchParams(window.location.hash.slice(1));
const data = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Disabled zero', value: 0 },
  { label: 'Café', value: '0' },
  ...Array.from({ length: 100 }, (_, i) => ({ label: `Option ${i}`, value: `option-${i}` }))
];

function Fixture() {
  const [mode, setMode] = useState<Mode>('all');
  const events = useRef({
    entered: false,
    selections: [] as { value: unknown; trusted: boolean }[],
    changes: [] as unknown[]
  });
  useEffect(() => {
    window.__RSUITE_LIST_RESULTS__ = {
      runtime: { react: React.version, reactDOM: reactDOMVersion },
      setMode,
      snapshot: () => ({ mode, ...events.current })
    };
  });
  const common = {
    id: 'results-picker',
    data: mode === 'removed' ? data.slice(1) : data,
    defaultOpen: true,
    virtualized: options.has('virtualized'),
    listboxMaxHeight: 180,
    loading: mode === 'loading',
    disabledItemValues:
      mode === 'distant'
        ? data.slice(0, -1).map(item => item.value)
        : mode === 'disabled'
          ? [0, 'alpha']
          : [0],
    searchBy: (_query: string, _label: React.ReactNode, item: Option) =>
      mode !== 'empty' && (mode !== 'filtered' || item.value === 0 || item.value === '0'),
    onEntered: () => {
      events.current.entered = true;
    },
    onSelect: (_value: unknown, item: Option, event: React.SyntheticEvent) => {
      events.current.selections.push({ value: item?.value, trusted: event.nativeEvent.isTrusted });
    },
    onChange: (value: unknown) => events.current.changes.push(value)
  };
  return (
    <div style={{ padding: 24 }} data-mode={mode} data-testid="fixture">
      {options.has('check') ? (
        <CheckPicker<any> {...common} defaultValue={['alpha']} />
      ) : (
        <SelectPicker<any> {...common} defaultValue="alpha" />
      )}
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Fixture />
  </StrictMode>
);

declare global {
  interface Window {
    __RSUITE_LIST_RESULTS__: {
      runtime: { react: string; reactDOM: string };
      setMode: (mode: Mode) => void;
      snapshot: () => {
        mode: Mode;
        entered: boolean;
        selections: { value: unknown; trusted: boolean }[];
        changes: unknown[];
      };
    };
  }
}
