'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Icon = _interopRequireDefault(require("@rsuite/icons/Icon"));
var _InputGroup = _interopRequireDefault(require("../../InputGroup"));
var _CloseButton = _interopRequireDefault(require("../CloseButton"));
var _Loader = _interopRequireDefault(require("../../Loader"));
var _hooks = require("../hooks");
var _CustomProvider = require("../../CustomProvider");
var PickerIndicator = function PickerIndicator(_ref) {
  var loading = _ref.loading,
    caretAs = _ref.caretAs,
    onClose = _ref.onClose,
    showCleanButton = _ref.showCleanButton,
    _ref$as = _ref.as,
    Component = _ref$as === void 0 ? _InputGroup.default.Addon : _ref$as,
    disabled = _ref.disabled;
  var _useCustom = (0, _CustomProvider.useCustom)(),
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('common'),
    clear = _getLocale.clear;
  var _useClassNames = (0, _hooks.useClassNames)('picker'),
    prefix = _useClassNames.prefix;
  var addon = function addon() {
    if (loading) {
      return /*#__PURE__*/_react.default.createElement(_Loader.default, {
        className: prefix('loader'),
        "data-testid": "spinner"
      });
    }
    if (showCleanButton && !disabled) {
      return /*#__PURE__*/_react.default.createElement(_CloseButton.default, {
        className: prefix('clean'),
        tabIndex: -1,
        locale: {
          closeLabel: clear
        },
        onClick: onClose
      });
    }
    return caretAs && /*#__PURE__*/_react.default.createElement(_Icon.default, {
      as: caretAs,
      className: prefix('caret-icon'),
      "data-testid": "caret"
    });
  };
  var props = Component === _InputGroup.default.Addon ? {
    disabled: disabled
  } : undefined;
  return /*#__PURE__*/_react.default.createElement(Component, props, addon());
};
var _default = exports.default = PickerIndicator;