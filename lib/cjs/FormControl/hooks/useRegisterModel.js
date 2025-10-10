'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _FormContext = require("../../Form/FormContext");
function useRegisterModel(name, rule) {
  var _ref = (0, _FormContext.useFormContext)() || {},
    pushFieldRule = _ref.pushFieldRule,
    removeFieldRule = _ref.removeFieldRule;
  var refRule = (0, _react.useRef)(rule);
  refRule.current = rule;
  (0, _react.useEffect)(function () {
    pushFieldRule === null || pushFieldRule === void 0 || pushFieldRule(name, refRule);
    return function () {
      removeFieldRule === null || removeFieldRule === void 0 || removeFieldRule(name);
    };
  }, [name, pushFieldRule, removeFieldRule]);
}
var _default = exports.default = useRegisterModel;