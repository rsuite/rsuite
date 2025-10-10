'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
var ProgressBar = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var sizeKey = vertical ? 'height' : 'width';
  var dirKey = rtl ? 'right' : 'left';
  var startKey = vertical ? 'bottom' : dirKey;
  var styles = _extends({}, style, (_extends2 = {}, _extends2[startKey] = start + "%", _extends2[sizeKey] = end - start + "%", _extends2));
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Component, {
    ref: ref,
    style: styles,
    className: classes,
    "data-testid": "slider-progress-bar"
  });
});
ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  vertical: PropTypes.bool,
  rtl: PropTypes.bool,
  start: PropTypes.number,
  end: PropTypes.number
};
export default ProgressBar;