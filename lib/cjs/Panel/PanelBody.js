'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Collapse = _interopRequireDefault(require("../Animation/Collapse"));
var _hooks = require("../internals/hooks");
var _ScrollView = _interopRequireDefault(require("../internals/ScrollView"));
var _excluded = ["classPrefix", "children", "collapsible", "expanded", "bodyFill", "role", "id", "labelId", "scrollShadow", "className", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "onScroll"],
  _excluded2 = ["className"];
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var bodyClasses = merge(className, withClassPrefix({
    fill: bodyFill
  }));
  var renderBody = function renderBody(bodyProps) {
    return /*#__PURE__*/_react.default.createElement(_ScrollView.default, (0, _extends2.default)({}, rest, bodyProps, {
      customScrollbar: true,
      className: bodyClasses,
      onScroll: onScroll,
      scrollShadow: scrollShadow
    }), children);
  };
  return collapsible ? /*#__PURE__*/_react.default.createElement(_Collapse.default, {
    in: expanded,
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered,
    onExit: onExit,
    onExiting: onExiting,
    onExited: onExited
  }, function (transitionProps, ref) {
    var className = transitionProps.className,
      rest = (0, _objectWithoutPropertiesLoose2.default)(transitionProps, _excluded2);
    return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, rest, {
      className: merge(className, prefix('collapse')),
      ref: ref
    }), renderBody({
      role: role,
      id: id,
      'aria-labelledby': labelId
    }));
  }) : renderBody();
};
var _default = exports.default = PanelBody;