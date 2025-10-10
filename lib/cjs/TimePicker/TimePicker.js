'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _DatePicker = _interopRequireDefault(require("../DatePicker"));
var _CustomProvider = require("../CustomProvider");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var TimePicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('TimePicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    getLocale = _useCustom.getLocale;
  var locale = getLocale('DateTimeFormats');
  var defaultRanges = (0, _react.useMemo)(function () {
    return [{
      label: locale === null || locale === void 0 ? void 0 : locale.now,
      value: function value() {
        return new Date();
      }
    }];
  }, [locale]);
  return /*#__PURE__*/_react.default.createElement(_DatePicker.default, (0, _extends2.default)({
    ref: ref,
    format: locale === null || locale === void 0 ? void 0 : locale.shortTimeFormat,
    ranges: defaultRanges
  }, propsWithDefaults));
});
TimePicker.displayName = 'TimePicker';
var _default = exports.default = TimePicker;