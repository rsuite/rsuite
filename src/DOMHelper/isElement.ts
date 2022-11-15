const isElement = (value: any): value is HTMLElement => {
  return value?.nodeType === 1 && typeof value?.nodeName === 'string';
};

export default isElement;
