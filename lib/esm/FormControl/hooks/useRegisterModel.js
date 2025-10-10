'use client';
import { useRef, useEffect } from 'react';
import { useFormContext } from "../../Form/FormContext.js";
function useRegisterModel(name, rule) {
  var _ref = useFormContext() || {},
    pushFieldRule = _ref.pushFieldRule,
    removeFieldRule = _ref.removeFieldRule;
  var refRule = useRef(rule);
  refRule.current = rule;
  useEffect(function () {
    pushFieldRule === null || pushFieldRule === void 0 || pushFieldRule(name, refRule);
    return function () {
      removeFieldRule === null || removeFieldRule === void 0 || removeFieldRule(name);
    };
  }, [name, pushFieldRule, removeFieldRule]);
}
export default useRegisterModel;