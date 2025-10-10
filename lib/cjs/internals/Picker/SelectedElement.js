'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _utils = require("../utils");
var SelectedElement = function SelectedElement(props) {
  var selectedItems = props.selectedItems,
    prefix = props.prefix,
    valueKey = props.valueKey,
    labelKey = props.labelKey,
    _props$childrenKey = props.childrenKey,
    childrenKey = _props$childrenKey === void 0 ? 'children' : _props$childrenKey,
    countable = props.countable,
    cascade = props.cascade,
    locale = props.locale;
  var count = selectedItems.length;
  var title = '';
  if (count) {
    title = selectedItems.map(function (item) {
      var label = item[labelKey];
      if (typeof label === 'string' || typeof label === 'number') {
        return label;
      } else if (/*#__PURE__*/_react.default.isValidElement(label)) {
        return (0, _utils.reactToString)(label).join('');
      }
      return '';
    }).join(', ');
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('value-list'),
    title: title
  }, selectedItems.map(function (item, index) {
    var checkAll = cascade && (item.checkAll || item[childrenKey]);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: item[valueKey]
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: prefix('value-item')
    }, item[labelKey], checkAll && locale !== null && locale !== void 0 && locale.checkAll ? " (" + locale.checkAll + ")" : ''), index === count - 1 ? null : /*#__PURE__*/_react.default.createElement("span", {
      className: prefix('value-separator')
    }, ","));
  })), countable ? /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('value-count'),
    title: "" + count
  }, count > 99 ? '99+' : count) : null);
};
var _default = exports.default = SelectedElement;