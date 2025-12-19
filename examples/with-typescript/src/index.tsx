import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { CustomProvider } from 'rsuite';

import { Hello } from './components/Hello';

import 'rsuite/dist/rsuite-no-reset.min.css';

const container = document.getElementById('example');

if (container) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const root = createRoot(container);

  root.render(
    <CustomProvider theme={mediaQuery.matches ? 'dark' : 'light'}>
      <Hello compiler="TypeScript" framework="React" />
    </CustomProvider>
  );
}
