const isElement = (node: HTMLElement) => {
  return node?.nodeType && typeof node?.nodeName === 'string';
};

export default isElement;
