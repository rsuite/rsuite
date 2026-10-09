import React, { StrictMode, useEffect, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Image from '../Image';

const options = new URLSearchParams(window.location.hash.slice(1));
const events: { source: string | null; type: string; trusted: boolean }[] = [];
let ready = false;

for (const type of ['load', 'error']) {
  document.addEventListener(
    type,
    event => {
      if (event.target instanceof HTMLImageElement) {
        events.push({
          source: event.target.getAttribute('src'),
          type: event.type,
          trusted: event.isTrusted
        });
      }
    },
    true
  );
}

function ImageSourceFixture() {
  const [src, setSrc] = useState<string | undefined>(
    options.has('empty') ? undefined : '/image-source/main.svg'
  );
  useEffect(() => {
    ready = true;
  }, []);

  return (
    <>
      <button onClick={() => setSrc(undefined)}>Clear to undefined</button>
      <button onClick={() => setSrc('')}>Clear to empty string</button>
      <button onClick={() => setSrc('/image-source/main.svg')}>Restore source</button>
      <Image
        alt="Example"
        src={src}
        fallbackSrc={options.has('fallback') ? '/image-source/fallback.svg' : undefined}
        placeholder={<span data-testid="placeholder">Loading</span>}
      />
    </>
  );
}

window.__RSUITE_IMAGE_SOURCE__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, events: [...events] })
};

declare global {
  interface Window {
    __RSUITE_IMAGE_SOURCE__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { ready: boolean; events: typeof events };
    };
  }
}

const fixture = <ImageSourceFixture />;
createRoot(document.getElementById('root')!).render(
  options.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture
);
