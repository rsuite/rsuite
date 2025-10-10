'use client';
"use strict";

exports.__esModule = true;
exports.default = exports.FormValueProvider = exports.FormValueContext = exports.FormProvider = exports.FormContext = void 0;
exports.useFormContext = useFormContext;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var FormContext = exports.FormContext = /*#__PURE__*/_react.default.createContext({});
var FormValueContext = exports.FormValueContext = /*#__PURE__*/_react.default.createContext({});
var FormProvider = exports.FormProvider = FormContext.Provider;
var FormValueProvider = exports.FormValueProvider = FormValueContext.Provider;
function useFormContext() {
  return (0, _react.useContext)(FormContext);
}
var _default = exports.default = FormContext;