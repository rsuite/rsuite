import React from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { hydrateRoot } from 'react-dom/client';
import FormErrorSummaryHydrationFixture from './FormErrorSummaryHydrationFixture';
import '../styles/index.scss';

export interface FormErrorSummaryHydrationResult {
  ready: boolean;
  reactVersion: string;
  reactDOMVersion: string;
  errors: string[];
  unmount: () => void;
}

declare global {
  interface Window {
    formErrorSummaryHydration: FormErrorSummaryHydrationResult;
  }
}

window.formErrorSummaryHydration = {
  ready: false,
  reactVersion: React.version,
  reactDOMVersion,
  errors: [],
  unmount: () => root.unmount()
};

function App() {
  React.useEffect(() => {
    window.formErrorSummaryHydration.ready = true;
  }, []);
  return <FormErrorSummaryHydrationFixture />;
}

const root = hydrateRoot(document.getElementById('root')!, <App />, {
  onRecoverableError: error => window.formErrorSummaryHydration.errors.push(String(error))
});
