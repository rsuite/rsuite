'use client';
import React from 'react';
import Icon from '@rsuite/icons/Icon';
import InputGroup from "../../InputGroup/index.js";
import CloseButton from "../CloseButton/index.js";
import Loader from "../../Loader/index.js";
import { useClassNames } from "../hooks/index.js";
import { useCustom } from "../../CustomProvider/index.js";
var PickerIndicator = function PickerIndicator(_ref) {
  var loading = _ref.loading,
    caretAs = _ref.caretAs,
    onClose = _ref.onClose,
    showCleanButton = _ref.showCleanButton,
    _ref$as = _ref.as,
    Component = _ref$as === void 0 ? InputGroup.Addon : _ref$as,
    disabled = _ref.disabled;
  var _useCustom = useCustom(),
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('common'),
    clear = _getLocale.clear;
  var _useClassNames = useClassNames('picker'),
    prefix = _useClassNames.prefix;
  var addon = function addon() {
    if (loading) {
      return /*#__PURE__*/React.createElement(Loader, {
        className: prefix('loader'),
        "data-testid": "spinner"
      });
    }
    if (showCleanButton && !disabled) {
      return /*#__PURE__*/React.createElement(CloseButton, {
        className: prefix('clean'),
        tabIndex: -1,
        locale: {
          closeLabel: clear
        },
        onClick: onClose
      });
    }
    return caretAs && /*#__PURE__*/React.createElement(Icon, {
      as: caretAs,
      className: prefix('caret-icon'),
      "data-testid": "caret"
    });
  };
  var props = Component === InputGroup.Addon ? {
    disabled: disabled
  } : undefined;
  return /*#__PURE__*/React.createElement(Component, props, addon());
};
export default PickerIndicator;