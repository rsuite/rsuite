import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import CommandPaletteHydrationFixture from './CommandPalette.hydration';

export function renderCommandPaletteHydration() {
  if (typeof window !== 'undefined' || typeof document !== 'undefined') {
    throw new Error('CommandPalette SSR must run in Node without a DOM.');
  }
  return {
    html: renderToString(<CommandPaletteHydrationFixture />),
    react: React.version,
    reactDOM: ReactDOM.version,
    domAvailable: false
  };
}
