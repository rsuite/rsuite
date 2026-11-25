import React, { StrictMode, useEffect, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Image from '../Image';

const options = new URLSearchParams(window.location.hash.slice(1));
const nativeEvents: Event[] = [];
const imageEvents: { source: string | null; type: string; trusted: boolean }[] = [];
const callbacks: {
  source: string | null;
  type: string;
  handler: string;
  trusted: boolean;
  sameEvent: boolean;
  sameTarget: boolean;
}[] = [];
let ready = false;

for (const type of ['load', 'error']) {
  document.addEventListener(
    type,
    event => {
      if (!(event.target instanceof HTMLImageElement)) return;
      nativeEvents.push(event);
      imageEvents.push({
        source: event.target.getAttribute('src'),
        type: event.type,
        trusted: event.isTrusted
      });
    },
    true
  );
}

function ImageCallbacksFixture() {
  const [handler, setHandler] = useState('initial');
  const [src, setSrc] = useState('/image-callbacks/main.svg');
  const mode = options.get('callbacks');
  const onEvent = (event: React.SyntheticEvent<HTMLImageElement>) => {
    callbacks.push({
      source: event.currentTarget.getAttribute('src'),
      type: event.type,
      handler,
      trusted: event.isTrusted,
      sameEvent: nativeEvents.includes(event.nativeEvent),
      sameTarget: event.target === event.currentTarget
    });
  };

  useEffect(() => {
    ready = true;
  }, []);

  return (
    <>
      <button onClick={() => setHandler('latest')}>Change callbacks</button>
      <button onClick={() => setSrc('/image-callbacks/next.svg')}>Change source</button>
      <Image
        alt="Example"
        src={src}
        fallbackSrc={options.has('fallback') ? '/image-callbacks/fallback.svg' : undefined}
        placeholder={<span data-testid="placeholder">Loading</span>}
        {...(mode === 'load' || mode === 'both' ? { onLoad: onEvent } : {})}
        {...(mode === 'error' || mode === 'both' ? { onError: onEvent } : {})}
      />
    </>
  );
}

window.__RSUITE_IMAGE_CALLBACKS__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, imageEvents: [...imageEvents], callbacks: [...callbacks] })
};

declare global {
  interface Window {
    __RSUITE_IMAGE_CALLBACKS__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => {
        ready: boolean;
        imageEvents: typeof imageEvents;
        callbacks: typeof callbacks;
      };
    };
  }
}

const fixture = <ImageCallbacksFixture />;
createRoot(document.getElementById('root')!).render(
  options.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture
);
