import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { version as reactDOMVersion } from 'react-dom';
import CarouselHydrationFixture from './CarouselHydrationFixture';

export interface CarouselHydrationResult {
  errors: string[];
  initialIndicators: {
    id: string;
    name: string | null;
    htmlFor: string | undefined;
    associated: boolean;
  }[];
  reactVersion: string;
  reactDOMVersion: string;
  selections: { carousel: string; index: number; trusted: boolean }[];
}

declare global {
  interface Window {
    __RSUITE_CAROUSEL_HYDRATION_RESULT__?: CarouselHydrationResult;
  }
}

const container = document.getElementById('root');

if (!container) {
  throw new Error('Missing hydration root');
}

const errors: string[] = [];
const selections: CarouselHydrationResult['selections'] = [];
const initialIndicators = Array.from(container.querySelectorAll('input[type="radio"]')).map(
  input => {
    const label = input.parentElement?.querySelector('label');
    return {
      id: input.id,
      name: input.getAttribute('name'),
      htmlFor: label?.htmlFor,
      associated: label?.control === input
    };
  }
);
const originalConsoleError = console.error;

console.error = (...args: unknown[]) => {
  errors.push(args.map(String).join(' '));
  originalConsoleError(...args);
};

hydrateRoot(
  container,
  <CarouselHydrationFixture
    onSelect={(carousel, index, event) =>
      selections.push({ carousel, index, trusted: event.nativeEvent.isTrusted })
    }
    onHydrated={() => {
      window.__RSUITE_CAROUSEL_HYDRATION_RESULT__ = {
        errors,
        initialIndicators,
        reactVersion: React.version,
        reactDOMVersion,
        selections
      };
    }}
  />,
  {
    onRecoverableError(error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }
);
