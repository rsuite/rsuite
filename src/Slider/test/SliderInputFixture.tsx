import React, { useEffect, useRef, useState } from 'react';
import Slider from '../Slider';
import RangeSlider from '../../RangeSlider';
import CustomProvider from '../../CustomProvider';

type Value = number | [number, number];
export interface SliderInputFixtureProps {
  range?: boolean;
  controlled?: boolean;
  constrained?: boolean;
  rtl?: boolean;
  vertical?: boolean;
  theme?: 'light' | 'dark' | 'high-contrast';
  onReady?: (snapshot: () => { changes: Value[]; commits: Value[] }) => void;
}

export default function SliderInputFixture({
  range,
  controlled,
  constrained,
  rtl,
  vertical,
  theme = 'light',
  onReady
}: SliderInputFixtureProps) {
  const [value, setValue] = useState<Value>(range ? [20, 60] : 20);
  const changes = useRef<Value[]>([]);
  const commits = useRef<Value[]>([]);
  useEffect(() => {
    onReady?.(() => ({ changes: [...changes.current], commits: [...commits.current] }));
  }, [onReady]);
  const common = {
    min: 10,
    max: 80,
    step: 5,
    vertical,
    tooltip: false,
    'aria-label': 'Amount',
    style: vertical ? { height: 300, width: 6 } : { width: 300 },
    onChange: (next: Value) => {
      changes.current.push(Array.isArray(next) ? [...next] : next);
      if (controlled) setValue(next);
    },
    onChangeCommitted: (next: Value) => {
      commits.current.push(Array.isArray(next) ? [...next] : next);
    }
  };
  return (
    <CustomProvider rtl={rtl} theme={theme}>
      <div dir={rtl ? 'rtl' : 'ltr'} style={{ padding: 40 }}>
        <button>Before</button>
        <div style={{ padding: '40px 20px' }}>
          {range ? (
            <RangeSlider
              {...common}
              defaultValue={[20, 60]}
              value={controlled ? (value as [number, number]) : undefined}
              constraint={constrained ? ([start, end]) => end - start >= 30 : undefined}
            />
          ) : (
            <Slider
              {...common}
              defaultValue={20}
              value={controlled ? (value as number) : undefined}
            />
          )}
        </div>
        <button>After</button>
      </div>
    </CustomProvider>
  );
}
