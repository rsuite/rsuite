import React, { StrictMode } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import PortalContainerFixture, { PortalKind } from './PortalContainerFixture';
import '../../../styles/_themes.scss';
import '../../../Modal/styles/index.scss';
import '../../../Drawer/styles/index.scss';
import '../../../Tooltip/styles/index.scss';
import '../../../toaster/styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
let ready = false;
let setContainer: (id: string) => void = () => {};
let resolutions = () => 0;
const errors: string[] = [];
const content = (
  <StrictMode>
    <PortalContainerFixture
      kind={(options.get('kind') || 'modal') as PortalKind}
      initiallyOpen={options.has('open')}
      onReady={api => {
        setContainer = api.setContainer;
        resolutions = api.resolutions;
        ready = true;
      }}
    />
  </StrictMode>
);
const root = document.getElementById('root')!;
if (!document.getElementById('portal-a')) {
  for (const id of ['portal-a', 'portal-b']) {
    const target = document.createElement('div');
    target.id = id;
    document.body.appendChild(target);
  }
}
window.__RSUITE_PORTAL_CONTAINER__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, errors: [...errors], resolutions: resolutions() }),
  setContainer: id => setContainer(id),
  hydrate: () =>
    hydrateRoot(root, content, { onRecoverableError: error => errors.push(String(error)) })
};
if (!root.hasAttribute('data-hydrate')) createRoot(root).render(content);

declare global {
  interface Window {
    __RSUITE_PORTAL_CONTAINER__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { ready: boolean; errors: string[]; resolutions: number };
      setContainer: (id: string) => void;
      hydrate: () => void;
    };
  }
}
