'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var isElement = function isElement(value) {
  return (value === null || value === void 0 ? void 0 : value.nodeType) === 1 && typeof (value === null || value === void 0 ? void 0 : value.nodeName) === 'string';
};
var _default = exports.default = isElement;