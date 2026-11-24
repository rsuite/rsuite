import React, { StrictMode } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import CarouselSemanticsFixture from './CarouselSemanticsFixture';
import '../styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
let ready = false;
const errors: string[] = [];
const content = (
  <StrictMode>
    <CarouselSemanticsFixture
      translated={options.has('translated')}
      partial={options.has('partial')}
      landmark={options.has('landmark')}
      onReady={() => {
        ready = true;
      }}
    />
  </StrictMode>
);
const root = document.getElementById('root')!;
window.__RSUITE_CAROUSEL_SEMANTICS__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, errors: [...errors] }),
  hydrate: () =>
    hydrateRoot(root, content, { onRecoverableError: error => errors.push(String(error)) })
};
if (!root.hasAttribute('data-hydrate')) createRoot(root).render(content);

declare global {
  interface Window {
    __RSUITE_CAROUSEL_SEMANTICS__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { ready: boolean; errors: string[] };
      hydrate: () => void;
    };
  }
}
