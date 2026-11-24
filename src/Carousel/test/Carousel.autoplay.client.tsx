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
const Activity = (
  React as typeof React & {
    Activity?: React.ComponentType<{ mode: 'visible' | 'hidden'; children: React.ReactNode }>;
  }
).Activity;
const client = root.hasAttribute('data-hydrate') ? undefined : createRoot(root);
const renderActivity = (mode: 'visible' | 'hidden') => {
  client?.render(
    options.has('activity') && Activity ? (
      <>
        <button data-testid="outside-activity">Outside Activity</button>
        <Activity mode={mode}>{content}</Activity>
      </>
    ) : (
      content
    )
  );
};

window.__RSUITE_CAROUSEL_AUTOPLAY__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  activitySupported: !!Activity,
  setActivityMode: renderActivity,
  snapshot: () => ({ ready, slides: [...slides], errors: [...errors] }),
  hydrate: () => {
    hydrateRoot(root, content, { onRecoverableError: error => errors.push(String(error)) });
  }
};
renderActivity('visible');

declare global {
  interface Window {
    __RSUITE_CAROUSEL_AUTOPLAY__: {
      runtime: { react: string; reactDOM: string };
      activitySupported: boolean;
      setActivityMode: (mode: 'visible' | 'hidden') => void;
      snapshot: () => { ready: boolean; slides: number[]; errors: string[] };
      hydrate: () => void;
    };
  }
}
