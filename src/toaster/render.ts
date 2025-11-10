import React from 'react';
import { guid } from '@/internals/utils';
import * as ReactDOM from 'react-dom';
import type { CreateRootFn } from '../useCreateRoot';

const majorVersion = parseInt(React.version);
const SuperposedReactDOM = ReactDOM as any;

export const toasterKeyOfContainerElement = 'toasterId';

function getCreateRoot(userCreateRoot?: CreateRootFn) {
  if (userCreateRoot) return userCreateRoot;

  if (majorVersion === 19) {
    console.info('Use CreateRootContextProvider to pass createRoot function from react-dom/client');
  }

  // just to disable the rspack warning
  const secretInternals = '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';
  /**
   * ignore react 18 warnings
   * Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
   */
  ReactDOM[secretInternals].usingClientEntryPoint = true;

  return SuperposedReactDOM.createRoot;
}

export function render(
  element: React.ReactElement<any>,
  container: HTMLElement | null,
  userCreateRoot?: CreateRootFn
): string {
  const mountElement = document.createElement('div');

  mountElement.className = 'rs-toaster-mount-element';

  const containerElement = container as any;

  // Add the detached element to the root
  containerElement.appendChild(mountElement);

  const newContainerId = guid();

  if (!containerElement[toasterKeyOfContainerElement]) {
    // attach the containerId to the containerElement
    containerElement[toasterKeyOfContainerElement] = newContainerId;
  }

  if (majorVersion >= 18) {
    const createRoot = getCreateRoot(userCreateRoot);
    const root = createRoot(mountElement, { identifierPrefix: 'rs-root-' });

    root.render(element);
  } else {
    SuperposedReactDOM.render(element, mountElement);
  }

  return containerElement[toasterKeyOfContainerElement];
}
