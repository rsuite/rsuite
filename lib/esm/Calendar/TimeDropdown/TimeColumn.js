'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["prefix", "title", "children"];
import React from 'react';
import ScrollView from "../../internals/ScrollView/index.js";
var TimeColumn = function TimeColumn(props) {
  var prefix = props.prefix,
    title = props.title,
    children = props.children,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  return /*#__PURE__*/React.createElement("div", {
    className: prefix('column')
  }, /*#__PURE__*/React.createElement("div", {
    className: prefix('column-title')
  }, title), /*#__PURE__*/React.createElement(ScrollView, _extends({
    customScrollbar: true,
    as: "ul",
    role: "listbox"
  }, rest), children));
};
export default TimeColumn;