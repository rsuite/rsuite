import React from 'react';
import { createRoot } from 'react-dom/client';
import { guid } from '@/internals/utils';
import { RSUITE_TOASTER_ID } from '@/internals/symbols';

export function render(element: React.ReactElement<any>, container: HTMLElement | null): string {
  const mountElement = document.createElement('div');

  mountElement.className = 'rs-toaster-mount-element';

  const containerElement = container as any;

  // Add the detached element to the root
  containerElement.appendChild(mountElement);

  if (!containerElement[RSUITE_TOASTER_ID]) {
    // Attach the containerId to the containerElement
    containerElement[RSUITE_TOASTER_ID] = guid();
  }

  const root = createRoot(mountElement, { identifierPrefix: 'rs-root-' });

  root.render(element);

  return containerElement[RSUITE_TOASTER_ID];
}
