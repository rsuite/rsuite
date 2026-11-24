import React, { useLayoutEffect, useRef, useState } from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import NumberInput from '../NumberInput';
import '../styles/index.scss';

export interface WheelOptions {
  controlled: boolean;
  scrollable?: boolean;
  readOnly?: boolean;
  cancel?: boolean;
  parentCancel?: boolean;
}

const root = createRoot(document.getElementById('root')!);
let changes: { value: string | number | null; trusted: boolean }[] = [];
let callbacks: {
  trusted: boolean;
  preventedBefore: boolean;
  preventedAfter: boolean;
  hasNativeEvent: boolean;
  hasIsDefaultPrevented: boolean;
  cancelable: boolean;
}[] = [];
let native: { trusted: boolean; prevented: boolean; deltaX: number; deltaY: number }[] = [];
let order: string[] = [];

function Example({ controlled, scrollable = true, readOnly, cancel, parentCancel }: WheelOptions) {
  const [value, setValue] = useState<string | number | null>(50);
  const panel = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = panel.current!;
    const capture = (event: WheelEvent) => {
      if (parentCancel) event.preventDefault();
    };
    const observe = (event: WheelEvent) => {
      native.push({
        trusted: event.isTrusted,
        prevented: event.defaultPrevented,
        deltaX: event.deltaX,
        deltaY: event.deltaY
      });
    };
    element.addEventListener('wheel', capture, { capture: true, passive: false });
    element.addEventListener('wheel', observe, { passive: true });
    return () => {
      element.removeEventListener('wheel', capture, true);
      element.removeEventListener('wheel', observe);
    };
  }, [parentCancel]);
  return (
    <div
      ref={panel}
      id="scroll-panel"
      style={{ width: 320, height: 200, overflow: 'auto', margin: 24 }}
    >
      <div style={{ width: 1200, height: 1400, padding: 24 }}>
        <NumberInput
          aria-label="Amount"
          style={{ width: 160 }}
          {...(controlled ? { value } : { defaultValue: 50 })}
          scrollable={scrollable}
          readOnly={readOnly}
          min={0}
          max={100}
          onWheel={event => {
            order.push('wheel');
            const preventedBefore = event.defaultPrevented;
            if (cancel) event.preventDefault();
            callbacks.push({
              trusted: event.nativeEvent?.isTrusted ?? event.isTrusted,
              preventedBefore,
              preventedAfter: event.defaultPrevented,
              hasNativeEvent: Boolean(event.nativeEvent),
              hasIsDefaultPrevented: typeof event.isDefaultPrevented === 'function',
              cancelable: event.cancelable
            });
          }}
          onChange={(next, event) => {
            order.push('change');
            changes.push({ value: next, trusted: event.nativeEvent?.isTrusted ?? event.isTrusted });
            if (controlled) setValue(next);
          }}
        />
      </div>
    </div>
  );
}

declare global {
  interface Window {
    __RSUITE_NUMBER_WHEEL__: {
      runtime: { react: string; reactDOM: string };
      mount(options: WheelOptions): void;
      snapshot(): {
        value: string;
        focused: boolean;
        scrollTop: number;
        scrollLeft: number;
        changes: typeof changes;
        callbacks: typeof callbacks;
        native: typeof native;
        order: string[];
      };
    };
  }
}

window.__RSUITE_NUMBER_WHEEL__ = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount(options) {
    changes = [];
    callbacks = [];
    native = [];
    order = [];
    flushSync(() => root.render(<Example {...options} />));
  },
  snapshot() {
    const input = document.querySelector('input')!;
    const panel = document.getElementById('scroll-panel')!;
    return {
      value: input.value,
      focused: document.activeElement === input,
      scrollTop: panel.scrollTop,
      scrollLeft: panel.scrollLeft,
      changes,
      callbacks,
      native,
      order
    };
  }
};
