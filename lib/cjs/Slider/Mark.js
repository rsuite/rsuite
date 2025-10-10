'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var Mark = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'span' : _props$as,
    mark = props.mark,
    last = props.last,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'slider-mark' : _props$classPrefix,
    className = props.className,
    renderMark = props.renderMark;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    last: last
  }));
  if (renderMark) {
    return /*#__PURE__*/_react.default.createElement(Component, {
      ref: ref,
      className: classes
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: prefix('content')
    }, renderMark(mark)));
  }
  return null;
});
Mark.displayName = 'Mark';
Mark.propTypes = {
  as: _propTypes.default.elementType,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  mark: _propTypes.default.number,
  last: _propTypes.default.bool,
  renderMark: _propTypes.default.func
};
var _default = exports.default = Mark;