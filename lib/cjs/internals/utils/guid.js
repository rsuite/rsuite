'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.guid = guid;
/**
 * Generates a Globally Unique Identifier (GUID).
 */
function guid() {
  return '_' + Math.random().toString(36).substring(2, 12);
}
var _default = exports.default = guid;