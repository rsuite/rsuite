import React from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import NumberInput from '../NumberInput';
import '../styles/index.scss';

const root = createRoot(document.getElementById('root')!);
let changes: { value: string | number | null; trusted: boolean }[] = [];
let blurs = 0;

function Example({ controlled }: { controlled: boolean }) {
  const [value, setValue] = React.useState<string | number | null>(0);
  return (
    <div style={{ width: 240, margin: 32 }}>
      <NumberInput
        aria-label="Amount"
        {...(controlled ? { value } : { defaultValue: 0 })}
        decimalSeparator=","
        step={0.1}
        onChange={(nextValue, event) => {
          changes.push({
            value: nextValue,
            trusted: event.nativeEvent?.isTrusted ?? event.isTrusted
          });
          if (controlled) setValue(nextValue);
        }}
        onBlur={() => blurs++}
      />
    </div>
  );
}

declare global {
  interface Window {
    __RSUITE_NUMBER_DECIMAL__: {
      runtime: { react: string; reactDOM: string };
      mount(controlled: boolean): void;
      snapshot(): {
        value: string;
        focused: boolean;
        changes: typeof changes;
        blurs: number;
      };
    };
  }
}

window.__RSUITE_NUMBER_DECIMAL__ = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount(controlled) {
    changes = [];
    blurs = 0;
    flushSync(() => root.render(<Example controlled={controlled} />));
  },
  snapshot() {
    const input = document.querySelector('input')!;
    return { value: input.value, focused: document.activeElement === input, changes, blurs };
  }
};
