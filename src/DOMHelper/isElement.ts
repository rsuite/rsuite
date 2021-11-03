const isElement = (node: HTMLElement) => {
  return node?.nodeType === 1 && typeof node?.nodeName === 'string';
};

export default isElement;
