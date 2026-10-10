import React, { StrictMode, useEffect, useRef, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Slider from '../Slider';
import RangeSlider from '../../RangeSlider';
import '../styles/index.scss';

type Value = number | [number, number];
const options = new URLSearchParams(window.location.hash.slice(1));
const range = options.get('kind') === 'range';
const controlled = options.get('controlled') === 'true';
const lockedProp = options.get('lockedProp') === 'disabled' ? 'disabled' : 'readOnly';

function Fixture() {
  const [locked, setLocked] = useState(options.get('locked') === 'true');
  const [ownedValue, setOwnedValue] = useState<Value>(range ? [20, 60] : 20);
  const changes = useRef<Value[]>([]);
  const commits = useRef<Value[]>([]);
  const onChange = (value: Value) => {
    changes.current.push(Array.isArray(value) ? [...value] : value);
    if (controlled) setOwnedValue(value);
  };
  const onChangeCommitted = (value: Value) => {
    commits.current.push(Array.isArray(value) ? [...value] : value);
  };

  useEffect(() => {
    window.__RSUITE_SLIDER_LOCKED__ = {
      runtime: { react: React.version, reactDOM: reactDOMVersion },
      lock: setLocked,
      update: setOwnedValue,
      snapshot: () => ({ changes: [...changes.current], commits: [...commits.current] })
    };
  }, []);

  const common = {
    [lockedProp]: locked,
    min: 10,
    max: 80,
    step: 5,
    tooltip: false,
    'aria-label': 'Amount',
    style: { width: 300 },
    onChange,
    onChangeCommitted
  };

  return (
    <div data-testid="fixture" data-locked={locked} style={{ padding: 32 }}>
      <button>Before</button>
      {range ? (
        <RangeSlider
          {...common}
          defaultValue={[20, 60]}
          value={controlled ? (ownedValue as [number, number]) : undefined}
        />
      ) : (
        <Slider
          {...common}
          defaultValue={20}
          value={controlled ? (ownedValue as number) : undefined}
        />
      )}
      <button>After</button>
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
    __RSUITE_SLIDER_LOCKED__: {
      runtime: { react: string; reactDOM: string };
      lock: (locked: boolean) => void;
      update: (value: Value) => void;
      snapshot: () => { changes: Value[]; commits: Value[] };
    };
  }
}
