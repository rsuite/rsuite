import React from 'react';
import { version as reactDomVersion } from 'react-dom';
import { hydrateRoot } from 'react-dom/client';
import WhisperHydrationFixture, { type HydrationMode } from './WhisperHydrationFixture';

export interface WhisperHydrationResult {
  initialMarkup: string;
  hydratedMarkup: string;
  sameTriggerNodes: boolean[];
  errors: string[];
  reactVersion: string;
  reactDomVersion: string;
  events: { type: string; key?: string; trusted: boolean }[];
}

declare global {
  interface Window {
    __WHISPER_HYDRATION_CONFIG__: { mode: HydrationMode; identifierPrefix: string };
    __WHISPER_HYDRATION_RESULT__?: WhisperHydrationResult;
    __UNMOUNT_WHISPER_HYDRATION__?: () => boolean;
  }
}

const container = document.getElementById('root');
if (!container) throw new Error('Missing hydration root');
const { mode, identifierPrefix } = window.__WHISPER_HYDRATION_CONFIG__;
const initialMarkup = container.innerHTML;
const triggers = Array.from(container.querySelectorAll('[data-trigger]'));
const errors: string[] = [];
const events: WhisperHydrationResult['events'] = [];
for (const type of ['keydown', 'keyup', 'click']) {
  document.addEventListener(
    type,
    event => {
      events.push({
        type,
        key: event instanceof KeyboardEvent ? event.key : undefined,
        trusted: event.isTrusted
      });
    },
    true
  );
}
const onHydrated = () => {
  window.__WHISPER_HYDRATION_RESULT__ = {
    initialMarkup,
    hydratedMarkup: container.innerHTML,
    sameTriggerNodes: triggers.map(
      (node, index) => node === container.querySelectorAll('[data-trigger]')[index]
    ),
    errors,
    reactVersion: React.version,
    reactDomVersion,
    events
  };
};
const root = hydrateRoot(
  container,
  <WhisperHydrationFixture mode={mode} onHydrated={onHydrated} />,
  {
    identifierPrefix,
    onRecoverableError(error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }
);
window.__UNMOUNT_WHISPER_HYDRATION__ = () => {
  root.unmount();
  return true;
};
