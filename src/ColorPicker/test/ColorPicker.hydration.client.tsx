import React, { StrictMode } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { hydrateRoot } from 'react-dom/client';
import ColorPickerHydrationFixture from './ColorPickerHydrationFixture';
import '../../styles/index.scss';

const options = new URLSearchParams(location.hash.slice(1));
const errors: string[] = [];
let ready = false;

window.__RSUITE_COLOR_HYDRATION__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, errors: [...errors] }),
  hydrate: () => {
    hydrateRoot(
      document.getElementById('root')!,
      <StrictMode>
        <ColorPickerHydrationFixture
          controlled={options.has('controlled')}
          initiallyOpen={options.has('open')}
          mobile={options.has('mobile')}
          onReady={() => {
            ready = true;
          }}
        />
      </StrictMode>,
      { onRecoverableError: error => errors.push(String(error)) }
    );
  }
};

declare global {
  interface Window {
    __RSUITE_COLOR_HYDRATION__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { ready: boolean; errors: string[] };
      hydrate: () => void;
    };
  }
}
