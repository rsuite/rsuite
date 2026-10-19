import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import SplitterHydrationFixture from './SplitterHydrationFixture';
import '../styles/index.scss';

window.splitterHydrationErrors = [];
window.splitterResizeRecords = [];
window.splitterReactVersion = React.version;
window.splitterServerHTML = document.getElementById('root')!.innerHTML;

hydrateRoot(document.getElementById('root')!, <SplitterHydrationFixture />, {
  onRecoverableError: error => window.splitterHydrationErrors.push(String(error))
});

requestAnimationFrame(() =>
  requestAnimationFrame(() => {
    window.splitterHydrated = true;
  })
);
