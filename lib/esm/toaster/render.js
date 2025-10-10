'use client';
import React from 'react';
import { guid } from "../internals/utils/index.js";
import * as ReactDOM from 'react-dom';
var majorVersion = parseInt(React.version);
var SuperposedReactDOM = ReactDOM;
export var toasterKeyOfContainerElement = 'toasterId';
export function render(element, container) {
  var mountElement = document.createElement('div');
  mountElement.className = 'rs-toaster-mount-element';
  var containerElement = container;

  // Add the detached element to the root
  containerElement.appendChild(mountElement);
  var newContainerId = guid();
  if (!containerElement[toasterKeyOfContainerElement]) {
    // attach the containerId to the containerElement
    containerElement[toasterKeyOfContainerElement] = newContainerId;
  }
  if (majorVersion >= 18) {
    /**
     * ignore react 18 warnings
     * Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
     */
    ReactDOM['__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'].usingClientEntryPoint = true;
    var createRoot = SuperposedReactDOM.createRoot;
    var root = createRoot(mountElement, {
      identifierPrefix: 'rs-root-'
    });
    root.render(element);
  } else {
    SuperposedReactDOM.render(element, mountElement);
  }
  return containerElement[toasterKeyOfContainerElement];
}