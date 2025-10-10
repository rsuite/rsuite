'use client';
import React from 'react';
import * as ReactDOM from 'react-dom';
var majorVersion = parseInt(React.version);
var SuperposedReactDOM = ReactDOM;

/**
 * Renders a React element into a container element.
 *
 */
export function render(element, container) {
  var mountElement = document.createElement('div');
  mountElement.className = 'rs-mount-element';
  var containerElement = container || document.body;

  // Add the detached element to the root
  containerElement.appendChild(mountElement);
  if (majorVersion >= 18) {
    /**
     * ignore react 18 warnings
     * Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
     */
    ReactDOM['__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'].usingClientEntryPoint = true;
    var createRoot = SuperposedReactDOM.createRoot;
    var root = containerElement.__root || createRoot(mountElement, {
      identifierPrefix: 'rs-root-'
    });
    root.render(element);
    containerElement.__root = root;
    return root;
  }
  SuperposedReactDOM.render(element, mountElement);
  return {
    unmount: function unmount() {
      SuperposedReactDOM.unmountComponentAtNode(mountElement);
      containerElement.removeChild(mountElement);
    }
  };
}
export default render;