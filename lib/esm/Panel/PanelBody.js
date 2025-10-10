'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["classPrefix", "children", "collapsible", "expanded", "bodyFill", "role", "id", "labelId", "scrollShadow", "className", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "onScroll"],
  _excluded2 = ["className"];
import React from 'react';
import Collapse from "../Animation/Collapse.js";
import { useClassNames } from "../internals/hooks/index.js";
import ScrollView from "../internals/ScrollView/index.js";
var PanelBody = function PanelBody(props) {
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'panel-body' : _props$classPrefix,
    children = props.children,
    collapsible = props.collapsible,
    expanded = props.expanded,
    bodyFill = props.bodyFill,
    role = props.role,
    id = props.id,
    labelId = props.labelId,
    scrollShadow = props.scrollShadow,
    className = props.className,
    onEnter = props.onEnter,
    onEntering = props.onEntering,
    onEntered = props.onEntered,
    onExit = props.onExit,
    onExiting = props.onExiting,
    onExited = props.onExited,
    onScroll = props.onScroll,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var bodyClasses = merge(className, withClassPrefix({
    fill: bodyFill
  }));
  var renderBody = function renderBody(bodyProps) {
    return /*#__PURE__*/React.createElement(ScrollView, _extends({}, rest, bodyProps, {
      customScrollbar: true,
      className: bodyClasses,
      onScroll: onScroll,
      scrollShadow: scrollShadow
    }), children);
  };
  return collapsible ? /*#__PURE__*/React.createElement(Collapse, {
    in: expanded,
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered,
    onExit: onExit,
    onExiting: onExiting,
    onExited: onExited
  }, function (transitionProps, ref) {
    var className = transitionProps.className,
      rest = _objectWithoutPropertiesLoose(transitionProps, _excluded2);
    return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
      className: merge(className, prefix('collapse')),
      ref: ref
    }), renderBody({
      role: role,
      id: id,
      'aria-labelledby': labelId
    }));
  }) : renderBody();
};
export default PanelBody;