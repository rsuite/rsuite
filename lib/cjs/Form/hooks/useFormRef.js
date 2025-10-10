'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = useFormRef;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = require("react");
function useFormRef(ref, props) {
  var rootRef = (0, _react.useRef)(null);
  var imperativeMethods = props.imperativeMethods;
  (0, _react.useImperativeHandle)(ref, function () {
    return (0, _extends2.default)({
      root: rootRef.current
    }, imperativeMethods);
  });
  return rootRef;
}