'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _statusIcons = require("../internals/constants/statusIcons");
var _hooks = require("../internals/hooks");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "className", "percent", "strokeColor", "strokeWidth", "trailColor", "trailWidth", "status", "showInfo", "classPrefix", "vertical"];
/**
 * The `Progress.Line` component is used to display the progress of current operation.
 * @see https://rsuitejs.com/components/progress/#line
 */
var ProgressLine = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _lineInnerStyle, _percentStyle, _withClassPrefix;
  var _useCustom = (0, _CustomProvider.useCustom)('ProgressLine', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$pe = propsWithDefaults.percent,
    percent = _propsWithDefaults$pe === void 0 ? 0 : _propsWithDefaults$pe,
    strokeColor = propsWithDefaults.strokeColor,
    strokeWidth = propsWithDefaults.strokeWidth,
    trailColor = propsWithDefaults.trailColor,
    trailWidth = propsWithDefaults.trailWidth,
    status = propsWithDefaults.status,
    _propsWithDefaults$sh = propsWithDefaults.showInfo,
    showInfo = _propsWithDefaults$sh === void 0 ? true : _propsWithDefaults$sh,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'progress' : _propsWithDefaults$cl,
    vertical = propsWithDefaults.vertical,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var lineInnerStyle = (_lineInnerStyle = {
    backgroundColor: trailColor
  }, _lineInnerStyle[vertical ? 'width' : 'height'] = trailWidth || strokeWidth, _lineInnerStyle);
  var percentStyle = (_percentStyle = {}, _percentStyle[vertical ? 'height' : 'width'] = percent + "%", _percentStyle.backgroundColor = strokeColor, _percentStyle[vertical ? 'width' : 'height'] = strokeWidth, _percentStyle);
  var classes = merge(className, withClassPrefix('line', (_withClassPrefix = {
    'line-vertical': vertical
  }, _withClassPrefix["line-" + status] = !!status, _withClassPrefix)));
  var showIcon = status && status !== 'active';
  var info = showIcon ? /*#__PURE__*/_react.default.createElement("span", {
    className: prefix("icon-" + (status || ''))
  }, _statusIcons.PROGRESS_STATUS_ICON[status]) : /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('info-status')
  }, percent, "%");
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "progressbar",
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-valuenow": percent
  }, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('line-outer')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('line-inner'),
    style: lineInnerStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('line-bg'),
    style: percentStyle
  }))), showInfo ? /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('info')
  }, info) : null);
});
ProgressLine.displayName = 'ProgressLine';
ProgressLine.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  percent: _propTypes.default.number,
  strokeColor: _propTypes.default.string,
  strokeWidth: _propTypes.default.number,
  trailColor: _propTypes.default.string,
  trailWidth: _propTypes.default.number,
  showInfo: _propTypes.default.bool,
  vertical: _propTypes.default.bool,
  status: (0, _propTypes2.oneOf)(['success', 'fail', 'active'])
};
var _default = exports.default = ProgressLine;