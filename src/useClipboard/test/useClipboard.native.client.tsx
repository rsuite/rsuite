import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import useClipboard from '../useClipboard';

const copies: { trusted: boolean; active: boolean; text: string; result?: boolean }[] = [];
const pastes: { trusted: boolean; text: string }[] = [];

function Example() {
  const [text, setText] = useState('');
  const { copied, error, copy } = useClipboard({ timeout: 0 });

  return (
    <>
      <textarea
        aria-label="Text to copy"
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <button
        onClick={async event => {
          const operation: (typeof copies)[number] = {
            trusted: event.nativeEvent.isTrusted,
            active: navigator.userActivation.isActive,
            text
          };
          copies.push(operation);
          operation.result = await copy(text);
        }}
      >
        Copy
      </button>
      <output data-testid="feedback" data-copied={copied}>
        {error ? error.message : copied ? 'Copied' : 'Ready'}
      </output>
      <textarea
        aria-label="Paste destination"
        onPaste={event => {
          pastes.push({
            trusted: event.nativeEvent.isTrusted,
            text: event.clipboardData.getData('text/plain')
          });
        }}
      />
    </>
  );
}

declare global {
  interface Window {
    __RSUITE_NATIVE_CLIPBOARD__: {
      runtime: { react: string; reactDOM: string };
      snapshot(): {
        secure: boolean;
        available: boolean;
        focused: boolean;
        copies: typeof copies;
        pastes: typeof pastes;
        copied: boolean;
        feedback: string | null;
      };
    };
  }
}

window.__RSUITE_NATIVE_CLIPBOARD__ = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  snapshot() {
    const feedback = document.querySelector('[data-testid="feedback"]');
    return {
      secure: window.isSecureContext,
      available: typeof navigator.clipboard?.writeText === 'function',
      focused: document.hasFocus(),
      copies,
      pastes,
      copied: feedback?.getAttribute('data-copied') === 'true',
      feedback: feedback?.textContent ?? null
    };
  }
};

createRoot(document.getElementById('root')!).render(<Example />);
