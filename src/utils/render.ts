import React from 'react';
import * as ReactDOM from 'react-dom';

const majorVersion = parseInt(React.version);
const SuperposedReactDOM = ReactDOM as any;

function render(element: React.ReactElement<any>, container: HTMLElement) {
  const mountElement = document.createElement('div');

  mountElement.className = 'rs-mount-element';

  const containerElement = (container || document.body) as any;

  // Add the detached element to the root
  containerElement.appendChild(mountElement);

  if (majorVersion >= 18) {
    /**
     * ignore react 18 warnings
     * Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
     */
    ReactDOM['__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'].usingClientEntryPoint = true;

    const { createRoot } = SuperposedReactDOM;

    const root =
      containerElement.__root || createRoot(mountElement, { identifierPrefix: 'rs-root-' });

    root.render(element);

    containerElement.__root = root;

    return root;
  }

  SuperposedReactDOM.render(element, mountElement);

  return {
    unmount: () => {
      SuperposedReactDOM.unmountComponentAtNode(mountElement);
      containerElement.removeChild(mountElement);
    }
  };
}

export default render;
