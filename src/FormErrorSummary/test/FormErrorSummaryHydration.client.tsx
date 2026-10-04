import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import FormErrorSummaryHydrationFixture from './FormErrorSummaryHydrationFixture';
import '../styles/index.scss';

export interface FormErrorSummaryHydrationResult {
  ready: boolean;
  reactVersion: string;
  errors: string[];
}

declare global {
  interface Window {
    formErrorSummaryHydration: FormErrorSummaryHydrationResult;
  }
}

window.formErrorSummaryHydration = { ready: false, reactVersion: React.version, errors: [] };

function App() {
  React.useEffect(() => {
    window.formErrorSummaryHydration.ready = true;
  }, []);
  return <FormErrorSummaryHydrationFixture />;
}

hydrateRoot(document.getElementById('root')!, <App />, {
  onRecoverableError: error => window.formErrorSummaryHydration.errors.push(String(error))
});
