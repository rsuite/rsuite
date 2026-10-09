import React, { StrictMode } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import CarouselAutoplayFixture from './CarouselAutoplayFixture';
import '../styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
const slides: number[] = [];
const errors: string[] = [];
let ready = false;
const fixture = (
  <CarouselAutoplayFixture
    reduceMotion={options.has('provider') ? options.get('provider') === 'true' : undefined}
    onReady={() => {
      ready = true;
    }}
    onSlideStart={index => slides.push(index)}
  />
);
const content = options.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture;
const root = document.getElementById('root')!;

window.__RSUITE_CAROUSEL_AUTOPLAY__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, slides: [...slides], errors: [...errors] }),
  hydrate: () => {
    hydrateRoot(root, content, { onRecoverableError: error => errors.push(String(error)) });
  }
};
if (!root.hasAttribute('data-hydrate')) createRoot(root).render(content);

declare global {
  interface Window {
    __RSUITE_CAROUSEL_AUTOPLAY__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { ready: boolean; slides: number[]; errors: string[] };
      hydrate: () => void;
    };
  }
}
