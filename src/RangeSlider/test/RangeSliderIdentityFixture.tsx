import React, { useEffect, useRef, useState } from 'react';
import RangeSlider, { Range } from '../RangeSlider';

export type OwnerMode = 'reject' | 'accept' | 'defer' | 'normalize-above' | 'normalize-below';
export interface IdentityBridge {
  renderOwner: () => void;
  accept: () => void;
  update: (value: Range) => void;
  snapshot: () => { changes: Range[]; commits: Range[]; renders: number };
}
interface Props {
  mode?: OwnerMode;
  uncontrolled?: boolean;
  coincident?: boolean;
  onReady?: (bridge: IdentityBridge) => void;
}

export default function RangeSliderIdentityFixture({
  mode = 'reject',
  uncontrolled,
  coincident,
  onReady
}: Props) {
  const initial: Range = coincident ? [60, 60] : [20, 60];
  const [value, setValue] = useState(initial);
  const [renders, setRenders] = useState(0);
  const changes = useRef<Range[]>([]);
  const commits = useRef<Range[]>([]);
  const pending = useRef<Range | undefined>(undefined);
  useEffect(() => {
    onReady?.({
      renderOwner: () => setRenders(count => count + 1),
      accept: () => {
        if (pending.current) setValue([...pending.current]);
      },
      update: setValue,
      snapshot: () => ({ changes: [...changes.current], commits: [...commits.current], renders })
    });
  }, [onReady, renders]);
  return (
    <div style={{ padding: 40 }} data-testid="fixture" data-renders={renders}>
      <button>Before</button>
      <div style={{ padding: '40px 20px' }}>
        <RangeSlider
          min={10}
          max={80}
          step={5}
          tooltip={false}
          aria-label="Amount"
          defaultValue={initial}
          value={uncontrolled ? undefined : value}
          style={{ width: 300 }}
          onChange={next => {
            changes.current.push([...next]);
            pending.current = [...next];
            if (mode === 'accept') setValue(next);
            if (mode === 'normalize-above') setValue([next[0], Math.min(next[1], 75)]);
            if (mode === 'normalize-below') setValue(next[0] === 60 ? [55, 60] : next);
          }}
          onChangeCommitted={next => commits.current.push([...next])}
        />
      </div>
      <button>After</button>
    </div>
  );
}
