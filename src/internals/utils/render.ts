import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Renders a React element into a container element.
 *
 */
export async function render(element: React.ReactElement<any>, container: HTMLElement) {
  const mountElement = document.createElement('div');

  mountElement.className = 'rs-mount-element';

  const containerElement = (container || document.body) as any;

  // Add the detached element to the root
  containerElement.appendChild(mountElement);

  const root =
    containerElement.__root || createRoot(mountElement, { identifierPrefix: 'rs-root-' });

  root.render(element);

  containerElement.__root = root;

  return root;
}

export default render;
