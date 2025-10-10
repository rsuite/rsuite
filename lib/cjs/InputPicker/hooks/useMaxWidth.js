'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _getWidth = _interopRequireDefault(require("dom-lib/getWidth"));
function useMaxWidth(triggerRef) {
  var _useState = (0, _react.useState)(100),
    maxWidth = _useState[0],
    setMaxWidth = _useState[1];
  (0, _react.useEffect)(function () {
    var _triggerRef$current;
    // In multiple selection, you need to set a maximum width for the input.
    if ((_triggerRef$current = triggerRef.current) !== null && _triggerRef$current !== void 0 && _triggerRef$current.root) {
      var _triggerRef$current2;
      setMaxWidth((0, _getWidth.default)((_triggerRef$current2 = triggerRef.current) === null || _triggerRef$current2 === void 0 ? void 0 : _triggerRef$current2.root));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return maxWidth;
}
var _default = exports.default = useMaxWidth;