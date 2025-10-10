'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useState, useRef, useImperativeHandle, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { partitionHTMLProps, isIE, guid } from "../internals/utils/index.js";
var sizerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre'
};
var copyStyles = function copyStyles(styles, node) {
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
};
/**
 * Use a dynamic input width.
 * The width is automatically adjusted according to the length of the input text characters.
 * @param props
 * @param sizerRef
 * @param placeholderRef
 */
var useInputWidth = function useInputWidth(props, sizerRef, placeholderRef) {
  var _props$minWidth = props.minWidth,
    minWidth = _props$minWidth === void 0 ? 1 : _props$minWidth,
    placeholder = props.placeholder,
    value = props.value,
    onAutosize = props.onAutosize;
  var _useState = useState(minWidth),
    inputWidth = _useState[0],
    setInputWidth = _useState[1];
  useEffect(function () {
    if (!sizerRef.current || typeof sizerRef.current.scrollWidth === 'undefined') {
      return;
    }
    var width;
    if (placeholder && !value && placeholderRef.current) {
      width = Math.max(sizerRef.current.scrollWidth, placeholderRef.current.scrollWidth) + 10;
    } else {
      width = sizerRef.current.scrollWidth + 10;
    }
    if (width < minWidth) {
      width = minWidth;
    }
    if (width !== inputWidth) {
      setInputWidth(width);
      onAutosize === null || onAutosize === void 0 || onAutosize(width);
    }
  }, [minWidth, placeholder, inputWidth, value, placeholderRef, sizerRef, onAutosize]);
  return inputWidth;
};
var InputAutosize = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var uniqueId = useMemo(function () {
    return guid();
  }, []);
  var defaultValue = props.defaultValue,
    value = props.value,
    style = props.style,
    className = props.className,
    placeholder = props.placeholder,
    inputClassName = props.inputClassName,
    inputStyle = props.inputStyle,
    _props$inputId = props.inputId,
    inputId = _props$inputId === void 0 ? uniqueId : _props$inputId,
    tabIndex = props.tabIndex;
  var rootRef = useRef(null);
  var inputRef = useRef(null);
  var sizerRef = useRef(null);
  var placeholderRef = useRef(null);
  useImperativeHandle(ref, function () {
    return {
      root: rootRef.current,
      input: inputRef.current
    };
  });
  var sizerValue = [defaultValue, value, ''].reduce(function (previousValue, currentValue) {
    if (previousValue !== null && previousValue !== undefined) {
      return previousValue;
    }
    return currentValue;
  });
  var inputWidth = useInputWidth(props, sizerRef, placeholderRef);
  var wrapperStyle = _extends({
    display: 'inline-block'
  }, style);
  var nextInputStyle = _extends({
    boxSizing: 'content-box',
    width: inputWidth + "px"
  }, inputStyle);
  useEffect(function () {
    if (!window.getComputedStyle) {
      return;
    }
    var input = inputRef.current;
    var inputStyles = input && window.getComputedStyle(input);
    if (!inputStyles) {
      return;
    }
    if (sizerRef.current) {
      copyStyles(inputStyles, sizerRef.current);
    }
    if (placeholderRef.current) {
      copyStyles(inputStyles, placeholderRef.current);
    }
  }, []);
  var _partitionHTMLProps = partitionHTMLProps(props),
    htmlInputProps = _partitionHTMLProps[0];
  htmlInputProps.className = inputClassName;
  htmlInputProps.style = nextInputStyle;
  htmlInputProps.tabIndex = tabIndex;
  if (isIE()) {
    // On Internet Explorer, an `x` symbol will appear in the input box.
    // By setting an id, matching the style, hiding the `x` symbol by the style.
    htmlInputProps.id = inputId;
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    className: className,
    style: wrapperStyle
  }, isIE() ? /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: "input#" + inputId + "::-ms-clear {display: none;}"
    }
  }) : null, /*#__PURE__*/React.createElement("input", _extends({}, htmlInputProps, {
    ref: inputRef,
    type: "text"
  })), /*#__PURE__*/React.createElement("div", {
    ref: sizerRef,
    style: sizerStyle
  }, sizerValue), placeholder ? /*#__PURE__*/React.createElement("div", {
    ref: placeholderRef,
    style: sizerStyle
  }, placeholder) : null);
});
InputAutosize.displayName = 'InputAutosize';
InputAutosize.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  inputId: PropTypes.string,
  inputClassName: PropTypes.string,
  inputStyle: PropTypes.object,
  minWidth: PropTypes.number,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.any,
  onAutosize: PropTypes.func
};
export default InputAutosize;