import React, { StrictMode, useCallback, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Avatar from '../Avatar';

const imageEvents: { id: number; source: string; type: string; trusted: boolean; width: number }[] =
  [];
const failures: { source: string; handler: string; trusted: boolean }[] = [];
const images: HTMLImageElement[] = [];
const NativeImage = window.Image;

// Observe real preload events; requests, decoding and event dispatch remain native.
window.Image = new Proxy(NativeImage, {
  construct(target, args) {
    const image = Reflect.construct(target, args) as HTMLImageElement;
    const id = images.push(image);
    for (const type of ['load', 'error']) {
      image.addEventListener(type, event => {
        imageEvents.push({
          id,
          source: image.src,
          type,
          trusted: event.isTrusted,
          width: image.naturalWidth
        });
      });
    }
    return image;
  }
});

function AvatarRequestsFixture() {
  const [source, setSource] = useState<string | undefined>('/avatar-images/A.svg');
  const [mounted, setMounted] = useState(true);
  const [handler, setHandler] = useState('initial');
  const onError = useCallback(
    (event: Event | string) => {
      if (typeof event === 'string') throw new Error('Expected a native image error');
      failures.push({
        source: (event.target as HTMLImageElement).src,
        handler,
        trusted: event.isTrusted
      });
    },
    [handler]
  );

  return (
    <>
      <button onClick={() => setSource('/avatar-images/B.svg')}>Use B</button>
      <button onClick={() => setSource(undefined)}>Clear source</button>
      <button onClick={() => setMounted(false)}>Unmount</button>
      <button onClick={() => setHandler('latest')}>Change error handler</button>
      {mounted && (
        <Avatar data-testid="avatar" src={source} onError={onError}>
          Fallback
        </Avatar>
      )}
    </>
  );
}

window.__RSUITE_AVATAR_REQUESTS__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({
    imageEvents: [...imageEvents],
    failures: [...failures],
    nativeImages: images.every(image => image instanceof HTMLImageElement),
    images: images.map((image, index) => ({
      id: index + 1,
      source: image.src,
      complete: image.complete
    })),
    readyState: document.readyState,
    avatar: document.querySelector('[data-testid="avatar"]')?.innerHTML ?? null
  })
};

declare global {
  interface Window {
    __RSUITE_AVATAR_REQUESTS__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => {
        imageEvents: typeof imageEvents;
        failures: typeof failures;
        nativeImages: boolean;
        images: { id: number; source: string; complete: boolean }[];
        readyState: DocumentReadyState;
        avatar: string | null;
      };
    };
  }
}

const fixture = <AvatarRequestsFixture />;
createRoot(document.getElementById('root')!).render(
  window.location.hash === '#strict' ? <StrictMode>{fixture}</StrictMode> : fixture
);
