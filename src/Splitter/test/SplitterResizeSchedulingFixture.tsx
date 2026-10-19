import React from 'react';
import Splitter from '../Splitter';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';
import type { SplitterResizeEvent } from '../useSplitterResize';

interface SchedulingRecord {
  phase: 'start' | 'move' | 'end';
  sizes: number[];
  pointerId: number;
  type: string;
  trusted: boolean;
}

declare global {
  interface Window {
    splitterSchedulingRecords: SchedulingRecord[];
  }
}

/** Exercise accepted feedback with another pointer move before passive effects run. */
export default function SplitterResizeSchedulingFixture({
  advanceDuringLayout = false
}: {
  advanceDuringLayout?: boolean;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = React.useState([40, 60]);
  const source = React.useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const advanced = React.useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!advanceDuringLayout || advanced.current || sizes[0] <= 40 || sizes[0] >= 44) return;
    advanced.current = true;
    const root = rootRef.current!;
    const handle = root.querySelector<HTMLElement>('[role="separator"]')!;
    const down = source.current!;
    const length = Array.from(root.children)
      .filter((_, index) => index % 2 === 0)
      .reduce((sum, panel) => sum + panel.getBoundingClientRect().width, 0);
    // Native down/move/up surround this explicitly synthetic scheduling boundary.
    handle.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        pointerId: down.pointerId,
        isPrimary: true,
        pointerType: 'mouse',
        buttons: 1,
        clientX: down.x + length / 15,
        clientY: down.y
      })
    );
  }, [advanceDuringLayout, sizes]);

  const record = (phase: SchedulingRecord['phase'], next: number[], event: SplitterResizeEvent) => {
    const pointer = event as React.PointerEvent<HTMLElement>;
    window.splitterSchedulingRecords.push({
      phase,
      sizes: next,
      pointerId: pointer.pointerId,
      type: event.type,
      trusted: event.nativeEvent.isTrusted
    });
    return pointer;
  };

  return (
    <Splitter
      ref={rootRef}
      id="scheduled"
      sizes={sizes}
      style={{ width: 640, height: 150 }}
      onResizeStart={(next, event) => {
        const pointer = record('start', next, event);
        source.current = { pointerId: pointer.pointerId, x: pointer.clientX, y: pointer.clientY };
      }}
      onResize={(next, event) => {
        record('move', next, event);
        setSizes(next);
      }}
      onResizeEnd={(next, event) => record('end', next, event)}
    >
      <Splitter.Panel aria-label="Scheduled resize">Navigation</Splitter.Panel>
      <Splitter.Panel>Content</Splitter.Panel>
    </Splitter>
  );
}
