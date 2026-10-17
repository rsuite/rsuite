import React, { StrictMode } from 'react';
import { createRoot, hydrateRoot, type Root } from 'react-dom/client';
import Fixture from './precedence.native.fixture';
import '@/Button/styles/index.scss';

declare global {
  interface Window {
    __RSUITE_STYLE_HYDRATE__: () => void;
  }
}

const options = new URLSearchParams(location.hash.slice(1));
const rootOptions = { identifierPrefix: options.get('prefix') || '' };
const container = document.getElementById('root')!;
let root: Root;
const app = (
  <StrictMode>
    <Fixture options={options} onUnmount={() => root.unmount()} />
  </StrictMode>
);
if (options.has('hydrate')) {
  window.__RSUITE_STYLE_HYDRATE__ = () => {
    root = hydrateRoot(container, app, rootOptions);
  };
} else {
  root = createRoot(container, rootOptions);
  root.render(app);
}
