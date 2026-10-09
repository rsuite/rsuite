import React, { StrictMode } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import DefaultLocaleFixture, { LocaleAction } from './DefaultLocaleFixture';
import '../../Toggle/styles/index.scss';
import '../../Pagination/styles/index.scss';
import '../../Breadcrumb/styles/index.scss';

const actions: LocaleAction[] = [];
const errors: string[] = [];
let ready = false;
const fixture = (
  <DefaultLocaleFixture
    onReady={() => {
      ready = true;
    }}
    onAction={action => actions.push(action)}
  />
);
const content = new URLSearchParams(location.hash.slice(1)).has('strict') ? (
  <StrictMode>{fixture}</StrictMode>
) : (
  fixture
);
const root = document.getElementById('root')!;
window.__RSUITE_DEFAULT_LOCALE__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, actions: [...actions], errors: [...errors] }),
  hydrate: () => {
    hydrateRoot(root, content, { onRecoverableError: error => errors.push(String(error)) });
  }
};
if (!root.hasAttribute('data-hydrate')) createRoot(root).render(content);

declare global {
  interface Window {
    __RSUITE_DEFAULT_LOCALE__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { ready: boolean; actions: LocaleAction[]; errors: string[] };
      hydrate: () => void;
    };
  }
}
