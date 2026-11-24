import React, { StrictMode } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import SliderInputFixture, { SliderInputFixtureProps } from './SliderInputFixture';
import '../../styles/_themes.scss';
import '../styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
let ready = false;
let snapshot = () => ({
  changes: [] as (number | [number, number])[],
  commits: [] as (number | [number, number])[]
});
const errors: string[] = [];
const content = (
  <StrictMode>
    <SliderInputFixture
      range={options.has('range')}
      controlled={options.has('controlled')}
      constrained={options.has('constrained')}
      rtl={options.has('rtl')}
      vertical={options.has('vertical')}
      theme={(options.get('theme') || 'light') as SliderInputFixtureProps['theme']}
      onReady={getSnapshot => {
        snapshot = getSnapshot;
        ready = true;
      }}
    />
  </StrictMode>
);
const root = document.getElementById('root')!;
window.__RSUITE_SLIDER_INPUT__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, errors: [...errors], ...snapshot() }),
  hydrate: () =>
    hydrateRoot(root, content, { onRecoverableError: error => errors.push(String(error)) })
};
if (!root.hasAttribute('data-hydrate')) createRoot(root).render(content);

declare global {
  interface Window {
    __RSUITE_SLIDER_INPUT__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => {
        ready: boolean;
        errors: string[];
        changes: (number | [number, number])[];
        commits: (number | [number, number])[];
      };
      hydrate: () => void;
    };
  }
}
