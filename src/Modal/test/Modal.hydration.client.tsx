import React, { StrictMode } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { hydrateRoot } from 'react-dom/client';
import ModalHydrationFixture from './ModalHydrationFixture';
import '../../styles/_themes.scss';
import '../styles/index.scss';
import '../../Drawer/styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
let ready = false;
let events: () => string[] = () => [];
const errors: string[] = [];

window.__RSUITE_MODAL_HYDRATION__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, events: events(), errors: [...errors] }),
  hydrate: () =>
    hydrateRoot(
      document.getElementById('root')!,
      <StrictMode>
        <ModalHydrationFixture
          kind={options.get('kind') === 'drawer' ? 'drawer' : 'modal'}
          customContainer={options.has('custom')}
          reduceMotion={options.has('reduced')}
          onReady={readEvents => {
            events = readEvents;
            ready = true;
          }}
        />
      </StrictMode>,
      { onRecoverableError: error => errors.push(String(error)) }
    )
};

declare global {
  interface Window {
    __RSUITE_MODAL_HYDRATION__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { ready: boolean; events: string[]; errors: string[] };
      hydrate: () => void;
    };
  }
}
