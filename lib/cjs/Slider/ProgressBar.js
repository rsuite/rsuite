'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var ProgressBar = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _extends2;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'slider-progress-bar' : _props$classPrefix,
    vertical = props.vertical,
    rtl = props.rtl,
    _props$end = props.end,
    end = _props$end === void 0 ? 0 : _props$end,
    _props$start = props.start,
    start = _props$start === void 0 ? 0 : _props$start,
    style = props.style,
    className = props.className;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var sizeKey = vertical ? 'height' : 'width';
  var dirKey = rtl ? 'right' : 'left';
  var startKey = vertical ? 'bottom' : dirKey;
  var styles = (0, _extends3.default)({}, style, (_extends2 = {}, _extends2[startKey] = start + "%", _extends2[sizeKey] = end - start + "%", _extends2));
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(Component, {
    ref: ref,
    style: styles,
    className: classes,
    "data-testid": "slider-progress-bar"
  });
});
ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = {
  as: _propTypes.default.elementType,
  classPrefix: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  vertical: _propTypes.default.bool,
  rtl: _propTypes.default.bool,
  start: _propTypes.default.number,
  end: _propTypes.default.number
};
var _default = exports.default = ProgressBar;