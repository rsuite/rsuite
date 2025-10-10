'use client';
import React from 'react';
import { reactToString } from "../utils/index.js";
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
      } else if (/*#__PURE__*/React.isValidElement(label)) {
        return reactToString(label).join('');
      }
      return '';
    }).join(', ');
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: prefix('value-list'),
    title: title
  }, selectedItems.map(function (item, index) {
    var checkAll = cascade && (item.checkAll || item[childrenKey]);
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: item[valueKey]
    }, /*#__PURE__*/React.createElement("span", {
      className: prefix('value-item')
    }, item[labelKey], checkAll && locale !== null && locale !== void 0 && locale.checkAll ? " (" + locale.checkAll + ")" : ''), index === count - 1 ? null : /*#__PURE__*/React.createElement("span", {
      className: prefix('value-separator')
    }, ","));
  })), countable ? /*#__PURE__*/React.createElement("span", {
    className: prefix('value-count'),
    title: "" + count
  }, count > 99 ? '99+' : count) : null);
};
export default SelectedElement;