'use client';
"use strict";

exports.__esModule = true;
exports.attachParent = attachParent;
exports.default = void 0;
/**
 * Attaches a parent object to the given data object.
 */
function attachParent(data, parent) {
  // mark "parent" unenumable
  Object.defineProperty(data, 'parent', {
    value: parent,
    writable: false,
    enumerable: false,
    configurable: true
  });
  return data;
}
var _default = exports.default = attachParent;