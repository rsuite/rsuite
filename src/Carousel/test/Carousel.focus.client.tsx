import React, { StrictMode } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import CarouselFocusFixture from './CarouselFocusFixture';
import '../styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
const selections: { index: number; trusted: boolean }[] = [];
const errors: string[] = [];
let ready = false;
const fixture = (
  <CarouselFocusFixture
    controlled={options.has('controlled')}
    autoplay={options.has('autoplay')}
    preserveInert={options.has('preserve')}
    vector={(options.get('vector') || undefined) as 'native' | 'custom' | undefined}
    placement={(options.get('placement') || 'bottom') as 'bottom' | 'right'}
    onReady={() => {
      ready = true;
    }}
    onSelect={(index, trusted) => selections.push({ index, trusted })}
  />
);
const content = options.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture;
const root = document.getElementById('root')!;
window.__RSUITE_CAROUSEL_FOCUS__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, selections: [...selections], errors: [...errors] }),
  hydrate: () => {
    hydrateRoot(root, content, {
      onRecoverableError(error) {
        errors.push(String(error));
      }
    });
  }
};
if (!root.hasAttribute('data-hydrate')) createRoot(root).render(content);

declare global {
  interface Window {
    __RSUITE_CAROUSEL_FOCUS__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { ready: boolean; selections: typeof selections; errors: string[] };
      hydrate: () => void;
    };
  }
}
