'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "children", "info", "uppercase"];
import React from 'react';
import PropTypes from 'prop-types';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';
import Whisper from "../Whisper/index.js";
import Tooltip from "../Tooltip/index.js";
import IconButton from "../IconButton/index.js";
import { useClassNames } from "../internals/hooks/index.js";
var StatLabel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'dt' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'stat-label' : _props$classPrefix,
    className = props.className,
    children = props.children,
    info = props.info,
    uppercase = props.uppercase,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    uppercase: uppercase
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: classes
  }, rest), children, info && /*#__PURE__*/React.createElement(Whisper, {
    placement: "top",
    trigger: 'click',
    enterable: true,
    speaker: /*#__PURE__*/React.createElement(Tooltip, null, info)
  }, /*#__PURE__*/React.createElement(IconButton, {
    circle: true,
    size: "xs",
    appearance: "subtle",
    icon: /*#__PURE__*/React.createElement(InfoOutlineIcon, null)
  })));
});
StatLabel.displayName = 'StatLabel';
StatLabel.propTypes = {
  info: PropTypes.node,
  uppercase: PropTypes.bool
};
export default StatLabel;