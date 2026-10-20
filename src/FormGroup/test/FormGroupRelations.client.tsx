import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import Fixture, { type RelationsMode } from './FormGroupRelationsFixture';

export interface FormGroupHydrationResult {
  sameInput: boolean;
  errors: string[];
  reactVersion: string;
  events: boolean[];
}

declare global {
  interface Window {
    __FORM_GROUP_CONFIG__: { mode: RelationsMode; identifierPrefix: string };
    __FORM_GROUP_RESULT__?: FormGroupHydrationResult;
    __UNMOUNT_FORM_GROUP__?: () => void;
  }
}

const container = document.getElementById('root')!;
const initialInput = container.querySelector('input');
const errors: string[] = [],
  events: boolean[] = [];
for (const type of ['click', 'keydown'])
  document.addEventListener(type, event => events.push(event.isTrusted), true);
const config = window.__FORM_GROUP_CONFIG__;
const root = hydrateRoot(
  container,
  <Fixture
    mode={config.mode}
    onHydrated={() => {
      window.__FORM_GROUP_RESULT__ = {
        sameInput: initialInput === container.querySelector('input'),
        errors,
        events,
        reactVersion: React.version
      };
    }}
  />,
  {
    identifierPrefix: config.identifierPrefix,
    onRecoverableError: error => errors.push(String(error))
  }
);
window.__UNMOUNT_FORM_GROUP__ = () => root.unmount();
