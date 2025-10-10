'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "strokeWidth", "trailWidth", "width", "percent", "strokeLinecap", "className", "showInfo", "status", "classPrefix", "style", "gapDegree", "gapPosition", "trailColor", "strokeColor"];
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { PROGRESS_STATUS_ICON } from "../internals/constants/statusIcons.js";
import { useClassNames } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Progress.Circle` component is used to display the progress of current operation.
 * @see https://rsuitejs.com/components/progress/#circle
 */
var ProgressCircle = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _withClassPrefix;
  var _useCustom = useCustom('ProgressCircle', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$st = propsWithDefaults.strokeWidth,
    strokeWidth = _propsWithDefaults$st === void 0 ? 6 : _propsWithDefaults$st,
    _propsWithDefaults$tr = propsWithDefaults.trailWidth,
    trailWidth = _propsWithDefaults$tr === void 0 ? 6 : _propsWithDefaults$tr,
    width = propsWithDefaults.width,
    _propsWithDefaults$pe = propsWithDefaults.percent,
    percent = _propsWithDefaults$pe === void 0 ? 0 : _propsWithDefaults$pe,
    _propsWithDefaults$st2 = propsWithDefaults.strokeLinecap,
    strokeLinecap = _propsWithDefaults$st2 === void 0 ? 'round' : _propsWithDefaults$st2,
    className = propsWithDefaults.className,
    _propsWithDefaults$sh = propsWithDefaults.showInfo,
    showInfo = _propsWithDefaults$sh === void 0 ? true : _propsWithDefaults$sh,
    status = propsWithDefaults.status,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'progress' : _propsWithDefaults$cl,
    style = propsWithDefaults.style,
    _propsWithDefaults$ga = propsWithDefaults.gapDegree,
    gapDegree = _propsWithDefaults$ga === void 0 ? 0 : _propsWithDefaults$ga,
    _propsWithDefaults$ga2 = propsWithDefaults.gapPosition,
    gapPosition = _propsWithDefaults$ga2 === void 0 ? 'top' : _propsWithDefaults$ga2,
    trailColor = propsWithDefaults.trailColor,
    strokeColor = propsWithDefaults.strokeColor,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var getPathStyles = useCallback(function () {
    var radius = 50 - strokeWidth / 2;
    var x1 = 0;
    var y1 = -radius;
    var x2 = 0;
    var y2 = -2 * radius;
    switch (gapPosition) {
      case 'left':
        x1 = -radius;
        y1 = 0;
        x2 = 2 * radius;
        y2 = 0;
        break;
      case 'right':
        x1 = radius;
        y1 = 0;
        x2 = -2 * radius;
        y2 = 0;
        break;
      case 'bottom':
        y1 = radius;
        y2 = 2 * radius;
        break;
      default:
    }
    var pathString = "M 50,50 m " + x1 + "," + y1 + " a " + radius + "," + radius + " 0 1 1 " + x2 + "," + -y2 + " a " + radius + "," + radius + " 0 1 1 " + -x2 + "," + y2;
    var len = Math.PI * 2 * radius;
    var trailPathStyle = {
      stroke: trailColor,
      strokeDasharray: len - gapDegree + "px " + len + "px",
      strokeDashoffset: "-" + gapDegree / 2 + "px"
    };
    var strokePathStyle = {
      stroke: strokeColor,
      strokeDasharray: percent / 100 * (len - gapDegree) + "px " + len + "px",
      strokeDashoffset: "-" + gapDegree / 2 + "px"
    };
    return {
      pathString: pathString,
      trailPathStyle: trailPathStyle,
      strokePathStyle: strokePathStyle
    };
  }, [gapDegree, gapPosition, percent, strokeColor, strokeWidth, trailColor]);
  var _getPathStyles = getPathStyles(),
    pathString = _getPathStyles.pathString,
    trailPathStyle = _getPathStyles.trailPathStyle,
    strokePathStyle = _getPathStyles.strokePathStyle;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix('circle', (_withClassPrefix = {}, _withClassPrefix["circle-" + (status || '')] = !!status, _withClassPrefix)));
  var showIcon = status && status !== 'active';
  var info = showIcon ? /*#__PURE__*/React.createElement("span", {
    className: prefix("icon-" + (status || ''))
  }, PROGRESS_STATUS_ICON[status]) : /*#__PURE__*/React.createElement("span", {
    key: 1
  }, percent, "%");
  return /*#__PURE__*/React.createElement(Component, {
    role: "progressbar",
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-valuenow": percent,
    ref: ref,
    className: classes,
    style: style
  }, showInfo ? /*#__PURE__*/React.createElement("span", {
    className: prefix('circle-info')
  }, info) : null, /*#__PURE__*/React.createElement("svg", _extends({
    className: prefix('svg'),
    viewBox: "0 0 100 100",
    width: width
  }, rest), /*#__PURE__*/React.createElement("path", {
    className: prefix('trail'),
    d: pathString,
    strokeWidth: trailWidth || strokeWidth,
    fillOpacity: "0",
    style: trailPathStyle
  }), /*#__PURE__*/React.createElement("path", {
    d: pathString,
    strokeLinecap: strokeLinecap,
    className: prefix('stroke'),
    strokeWidth: percent === 0 ? 0 : strokeWidth,
    fillOpacity: "0",
    style: strokePathStyle
  })));
});
ProgressCircle.displayName = 'ProgressCircle';
ProgressCircle.propTypes = {
  className: PropTypes.string,
  strokeColor: PropTypes.string,
  strokeLinecap: oneOf(['butt', 'round', 'square']),
  trailColor: PropTypes.string,
  percent: PropTypes.number,
  strokeWidth: PropTypes.number,
  trailWidth: PropTypes.number,
  width: PropTypes.number,
  gapDegree: PropTypes.number,
  gapPosition: oneOf(['top', 'bottom', 'left', 'right']),
  showInfo: PropTypes.bool,
  status: oneOf(['success', 'fail', 'active']),
  classPrefix: PropTypes.string
};
export default ProgressCircle;