import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import SplitterResizeSchedulingFixture from './SplitterResizeSchedulingFixture';
import '../styles/index.scss';

window.splitterSchedulingRecords = [];

hydrateRoot(
  document.getElementById('root')!,
  <SplitterResizeSchedulingFixture
    advanceDuringLayout={new URLSearchParams(location.search).has('advance')}
  />
);

requestAnimationFrame(() =>
  requestAnimationFrame(() => {
    window.splitterHydrated = true;
  })
);
