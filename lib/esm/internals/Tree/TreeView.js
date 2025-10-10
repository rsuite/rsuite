'use client';
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["as", "children", "treeRootClassName", "multiselectable", "style", "height"];
import React from 'react';
import useCombobox from "../Picker/hooks/useCombobox.js";
import ScrollView from "../ScrollView/index.js";
import { useTreeContextProps } from "./TreeProvider.js";
var ScrollShadowView = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(ScrollView, _extends({
    scrollShadow: true,
    ref: ref
  }, props));
});
var TreeView = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    as = _props$as === void 0 ? 'div' : _props$as,
    children = props.children,
    treeRootClassName = props.treeRootClassName,
    multiselectable = props.multiselectable,
    style = props.style,
    height = props.height,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useTreeContextProps = useTreeContextProps(),
    scrollShadow = _useTreeContextProps.scrollShadow,
    virtualized = _useTreeContextProps.virtualized;
  var _useCombobox = useCombobox(),
    id = _useCombobox.id,
    labelId = _useCombobox.labelId,
    popupType = _useCombobox.popupType;

  // If the tree is virtualized, the scroll shadow is not needed.
  var Component = scrollShadow && !virtualized ? ScrollShadowView : as;

  // If the tree is virtualized, the height is not needed.
  var viewStyles = _extends({
    height: virtualized ? undefined : height
  }, style);
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "tree",
    style: viewStyles,
    id: id ? id + "-" + popupType : undefined,
    "aria-multiselectable": multiselectable,
    "aria-labelledby": labelId,
    ref: ref
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: treeRootClassName
  }, children));
});
export default TreeView;