import React, { StrictMode } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import ReadOnlyFixture from './ReadOnlyFixture';
import '../../styles/_themes.scss';
import '../styles/index.scss';
import '../../Radio/styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
let ready = false;
let unlock = () => {};
let snapshot = () => ({ changes: [] as unknown[], inputChanges: [] as unknown[], clicks: 0 });
const errors: string[] = [];
const content = (
  <StrictMode>
    <ReadOnlyFixture
      kind={options.has('radio') ? 'radio' : 'checkbox'}
      group={options.has('group')}
      independent={options.has('independent')}
      defaultChecked={options.has('checked')}
      mixed={options.has('mixed')}
      onReady={api => {
        snapshot = api.snapshot;
        unlock = api.unlock;
        ready = true;
      }}
    />
  </StrictMode>
);
const root = document.getElementById('root')!;
window.__RSUITE_READONLY__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, errors: [...errors], ...snapshot() }),
  unlock: () => unlock(),
  hydrate: () =>
    hydrateRoot(root, content, { onRecoverableError: error => errors.push(String(error)) })
};
if (!root.hasAttribute('data-hydrate')) createRoot(root).render(content);

declare global {
  interface Window {
    __RSUITE_READONLY__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => {
        ready: boolean;
        errors: string[];
        changes: unknown[];
        inputChanges: unknown[];
        clicks: number;
      };
      unlock: () => void;
      hydrate: () => void;
    };
  }
}
