import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';

const majorVersion = parseInt(React.version);
const SuperposedReactDOM = ReactDOM as any;

function render(element: React.ReactElement<any>, container: HTMLElement) {
  const mountElement = document.createElement('div');

  const rootElement = container || document.body;

  if (majorVersion >= 18) {
    const root = rootElement.root || ReactDOMClient.createRoot(rootElement);

    root.render(element);

    rootElement.root = root;

    return root;
  }

  // Add the detached element to the root
  rootElement.appendChild(mountElement);

  SuperposedReactDOM.render(element, mountElement);

  return {
    unmount: () => {
      SuperposedReactDOM.unmountComponentAtNode(mountElement);
      rootElement.removeChild(mountElement);
    }
  };
}

export default render;
