'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.useInternalId = useInternalId;
var _react = require("react");
var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));
/**
 * Used for generating unique ID for DOM elements
 */
function useInternalId(namespace) {
  var idRef = (0, _react.useRef)();
  if (!idRef.current) {
    idRef.current = (0, _uniqueId.default)("internal://" + namespace);
  }
  (0, _react.useDebugValue)(idRef.current);
  return idRef.current;
}
var _default = exports.default = useInternalId;