import React, { StrictMode, useEffect, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Image from '../Image';

const options = new URLSearchParams(window.location.hash.slice(1));
const events: { source: string; type: string; trusted: boolean }[] = [];
let ready = false;

for (const type of ['load', 'error']) {
  document.addEventListener(
    type,
    event => {
      if (event.target instanceof HTMLImageElement) {
        events.push({
          source: new URL(event.target.currentSrc).pathname,
          type: event.type,
          trusted: event.isTrusted
        });
      }
    },
    true
  );
}

function ImageResponsiveFixture() {
  const [src, setSrc] = useState(
    options.has('srcSetOnly') ? undefined : '/image-responsive/main.svg'
  );
  const [srcSet, setSrcSet] = useState(
    `/image-responsive/selected.svg ${options.get('descriptor')}`
  );
  useEffect(() => {
    ready = true;
  }, []);

  return (
    <>
      <button
        onClick={() => setSrcSet(`/image-responsive/recovered.svg ${options.get('descriptor')}`)}
      >
        Replace source set
      </button>
      <button onClick={() => setSrc('/image-responsive/updated-main.svg')}>Replace source</button>
      <Image
        alt="Responsive example"
        src={src}
        srcSet={srcSet}
        sizes="48px"
        fallbackSrc={options.get('fallback') || undefined}
        placeholder={<span data-testid="placeholder">Loading</span>}
      />
    </>
  );
}

window.__RSUITE_IMAGE_RESPONSIVE__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, events: [...events] })
};

declare global {
  interface Window {
    __RSUITE_IMAGE_RESPONSIVE__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { ready: boolean; events: typeof events };
    };
  }
}

const fixture = <ImageResponsiveFixture />;
createRoot(document.getElementById('root')!).render(
  options.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture
);
