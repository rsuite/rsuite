'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["data", "loading", "expanded", "hasChildren"];
import React from 'react';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import ArrowLeftIcon from '@rsuite/icons/ArrowLeft';
import Spinner from '@rsuite/icons/Spinner';
import { useClassNames } from "../internals/hooks/index.js";
import { useTreeCustomRenderer } from "../internals/Tree/TreeProvider.js";
import { useCustom } from "../CustomProvider/index.js";
function TreeNodeToggle(props) {
  var data = props.data,
    loading = props.loading,
    expanded = props.expanded,
    hasChildren = props.hasChildren,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  var _useTreeCustomRendere = useTreeCustomRenderer(),
    renderTreeIcon = _useTreeCustomRendere.renderTreeIcon;
  var _useClassNames = useClassNames('tree-node'),
    prefix = _useClassNames.prefix;
  var IconElementType = expanded ? ArrowDownIcon : rtl ? ArrowLeftIcon : ArrowRightIcon;
  var icon = /*#__PURE__*/React.createElement(IconElementType, {
    className: prefix('toggle-icon')
  });
  if (loading) {
    icon = /*#__PURE__*/React.createElement("div", {
      className: prefix('loading-icon')
    }, /*#__PURE__*/React.createElement(Spinner, {
      spin: true
    }));
  }
  if (data !== undefined && typeof renderTreeIcon === 'function') {
    var customIcon = renderTreeIcon(data, expanded);
    icon = customIcon !== null ? /*#__PURE__*/React.createElement("div", {
      className: prefix('custom-icon')
    }, customIcon) : icon;
  }
  return hasChildren ? /*#__PURE__*/React.createElement("div", _extends({
    tabIndex: -1,
    role: "button",
    "aria-busy": loading ? true : undefined,
    "data-ref": data.refKey,
    className: prefix('toggle')
  }, rest), icon) : /*#__PURE__*/React.createElement("div", {
    className: prefix('toggle-placeholder')
  });
}
export default TreeNodeToggle;