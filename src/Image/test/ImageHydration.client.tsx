import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import ImageHydrationFixture from './ImageHydrationFixture';

export interface HydrationResult {
  errors: string[];
  initialMarkup: string;
  hydratedMarkup: string;
}

declare global {
  interface Window {
    __RSUITE_HYDRATION_RESULT__?: HydrationResult;
  }
}

const container = document.getElementById('root');

if (!container) {
  throw new Error('Missing hydration root');
}

const errors: string[] = [];
const initialMarkup = container.innerHTML;
const originalConsoleError = console.error;

console.error = (...args: unknown[]) => {
  errors.push(args.map(String).join(' '));
  originalConsoleError(...args);
};

hydrateRoot(container, <ImageHydrationFixture />, {
  onRecoverableError(error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
});

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    window.__RSUITE_HYDRATION_RESULT__ = {
      errors,
      initialMarkup,
      hydratedMarkup: container.innerHTML
    };
  });
});
