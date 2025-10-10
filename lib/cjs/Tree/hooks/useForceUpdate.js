'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
function useForceUpdate() {
  var _useState = (0, _react.useState)(Object.create(null)),
    dispatch = _useState[1];
  var forceUpdate = (0, _react.useCallback)(function () {
    dispatch(Object.create(null));
  }, [dispatch]);
  return forceUpdate;
}
var _default = exports.default = useForceUpdate;