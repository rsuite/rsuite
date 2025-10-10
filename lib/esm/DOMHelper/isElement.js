'use client';
var isElement = function isElement(value) {
  return (value === null || value === void 0 ? void 0 : value.nodeType) === 1 && typeof (value === null || value === void 0 ? void 0 : value.nodeName) === 'string';
};
export default isElement;