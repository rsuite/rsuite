'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _InputPicker = _interopRequireDefault(require("../InputPicker/InputPicker"));
var _InputPickerContext = require("../InputPicker/InputPickerContext");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["tagProps", "trigger", "onTagRemove", "renderMenuItemCheckbox", "renderValue"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * `TagPicker` component enables multi-selection by tags and supports new options.
 *
 * @see https://rsuitejs.com/components/tag-picker/
 */
var TagPicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('TagPicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$ta = propsWithDefaults.tagProps,
    tagProps = _propsWithDefaults$ta === void 0 ? {} : _propsWithDefaults$ta,
    _propsWithDefaults$tr = propsWithDefaults.trigger,
    trigger = _propsWithDefaults$tr === void 0 ? 'Enter' : _propsWithDefaults$tr,
    onTagRemove = propsWithDefaults.onTagRemove,
    renderMenuItemCheckbox = propsWithDefaults.renderMenuItemCheckbox,
    renderValue = propsWithDefaults.renderValue,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      multi: true,
      trigger: trigger,
      tagProps: tagProps,
      onTagRemove: onTagRemove,
      renderCheckbox: renderMenuItemCheckbox
    };
  }, [onTagRemove, renderMenuItemCheckbox, tagProps, trigger]);
  return /*#__PURE__*/_react.default.createElement(_InputPickerContext.TagProvider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(_InputPicker.default, (0, _extends2.default)({
    renderValue: renderValue
  }, rest, {
    ref: ref
  })));
});
TagPicker.displayName = 'TagPicker';
var _default = exports.default = TagPicker;