'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "percent", "strokeColor", "strokeWidth", "trailColor", "trailWidth", "status", "showInfo", "classPrefix", "vertical"];
import React from 'react';
import PropTypes from 'prop-types';
import { PROGRESS_STATUS_ICON } from "../internals/constants/statusIcons.js";
import { useClassNames } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Progress.Line` component is used to display the progress of current operation.
 * @see https://rsuitejs.com/components/progress/#line
 */
var ProgressLine = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _lineInnerStyle, _percentStyle, _withClassPrefix;
  var _useCustom = useCustom('ProgressLine', props),
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
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
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
  var info = showIcon ? /*#__PURE__*/React.createElement("span", {
    className: prefix("icon-" + (status || ''))
  }, PROGRESS_STATUS_ICON[status]) : /*#__PURE__*/React.createElement("span", {
    className: prefix('info-status')
  }, percent, "%");
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "progressbar",
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-valuenow": percent
  }, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix('line-outer')
  }, /*#__PURE__*/React.createElement("div", {
    className: prefix('line-inner'),
    style: lineInnerStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: prefix('line-bg'),
    style: percentStyle
  }))), showInfo ? /*#__PURE__*/React.createElement("div", {
    className: prefix('info')
  }, info) : null);
});
ProgressLine.displayName = 'ProgressLine';
ProgressLine.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  percent: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  trailColor: PropTypes.string,
  trailWidth: PropTypes.number,
  showInfo: PropTypes.bool,
  vertical: PropTypes.bool,
  status: oneOf(['success', 'fail', 'active'])
};
export default ProgressLine;