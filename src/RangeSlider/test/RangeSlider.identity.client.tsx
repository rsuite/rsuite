import React, { StrictMode } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import RangeSliderIdentityFixture, {
  IdentityBridge,
  OwnerMode
} from './RangeSliderIdentityFixture';
import '../../Slider/styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
let bridge: IdentityBridge | undefined;
const errors: string[] = [];
const content = (
  <StrictMode>
    <RangeSliderIdentityFixture
      mode={(options.get('mode') || 'reject') as OwnerMode}
      uncontrolled={options.has('uncontrolled')}
      coincident={options.has('coincident')}
      onReady={next => {
        bridge = next;
      }}
    />
  </StrictMode>
);
const root = document.getElementById('root')!;
const clientRoot = root.hasAttribute('data-hydrate') ? undefined : createRoot(root);
const Activity = (
  React as typeof React & {
    Activity?: React.ComponentType<{ mode: 'visible' | 'hidden'; children: React.ReactNode }>;
  }
).Activity;
const renderActivity = (mode: 'visible' | 'hidden') => {
  clientRoot?.render(
    options.has('activity') && Activity ? <Activity mode={mode}>{content}</Activity> : content
  );
};
window.__RSUITE_RANGE_IDENTITY__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready: Boolean(bridge), errors: [...errors], ...bridge?.snapshot() }),
  activitySupported: Boolean(Activity),
  setActivityMode: renderActivity,
  renderOwner: () => bridge?.renderOwner(),
  accept: () => bridge?.accept(),
  update: value => bridge?.update(value),
  hydrate: () =>
    hydrateRoot(root, content, { onRecoverableError: error => errors.push(String(error)) })
};
renderActivity('visible');

declare global {
  interface Window {
    __RSUITE_RANGE_IDENTITY__: Omit<IdentityBridge, 'snapshot'> & {
      runtime: { react: string; reactDOM: string };
      activitySupported: boolean;
      setActivityMode: (mode: 'visible' | 'hidden') => void;
      snapshot: () => Partial<ReturnType<IdentityBridge['snapshot']>> & {
        ready: boolean;
        errors: string[];
      };
      hydrate: () => void;
    };
  }
}
