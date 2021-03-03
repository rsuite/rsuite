import * as helpers from 'dom-lib';
export * from 'dom-lib';

const DOMHelper = {
  ...helpers,
  isElement: (node: HTMLElement) => {
    return node?.nodeType && typeof node?.nodeName === 'string';
  }
};

export default DOMHelper;
