'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "name", "accept", "multiple", "disabled", "readOnly", "children", "classPrefix", "className", "draggable", "locale", "onChange", "onDragEnter", "onDragLeave", "onDragOver", "onDrop"];
import React, { useCallback, useRef, useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Button from "../Button/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { isIE11 } from "../internals/utils/index.js";
var UploadTrigger = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _children$props;
  var _props$as = props.as,
    Component = _props$as === void 0 ? Button : _props$as,
    name = props.name,
    accept = props.accept,
    multiple = props.multiple,
    disabled = props.disabled,
    readOnly = props.readOnly,
    children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'uploader-trigger' : _props$classPrefix,
    className = props.className,
    draggable = props.draggable,
    locale = props.locale,
    onChange = props.onChange,
    onDragEnter = props.onDragEnter,
    onDragLeave = props.onDragLeave,
    onDragOver = props.onDragOver,
    onDrop = props.onDrop,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var rootRef = useRef(null);
  var _useState = useState(false),
    dragOver = _useState[0],
    setDragOver = _useState[1];
  var inputRef = useRef(null);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix({
    disabled: disabled,
    customize: children,
    'drag-over': dragOver
  }));
  var handleClick = useCallback(function () {
    var _inputRef$current;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.click();
  }, []);
  var handleClearInput = useCallback(function () {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);
  var handleDragEnter = useCallback(function (event) {
    if (draggable) {
      event.preventDefault();
      setDragOver(true);
    }
    onDragEnter === null || onDragEnter === void 0 || onDragEnter(event);
  }, [draggable, onDragEnter]);
  var handleDragLeave = useCallback(function (event) {
    if (draggable) {
      event.preventDefault();
      setDragOver(false);
    }
    onDragLeave === null || onDragLeave === void 0 || onDragLeave(event);
  }, [draggable, onDragLeave]);
  var handleDragOver = useCallback(function (event) {
    draggable && event.preventDefault();
    onDragOver === null || onDragOver === void 0 || onDragOver(event);
  }, [draggable, onDragOver]);
  var handleDrop = useCallback(function (event) {
    if (draggable) {
      event.preventDefault();
      setDragOver(false);
      onChange === null || onChange === void 0 || onChange(event);
    }
    onDrop === null || onDrop === void 0 || onDrop(event);
  }, [draggable, onChange, onDrop]);
  var handleChange = useCallback(function (event) {
    if (isIE11()) {
      var _event$target;
      /**
       * IE11 triggers onChange event of file input when element.value is assigned
       * https://github.com/facebook/react/issues/8793
       */
      if (((_event$target = event.target) === null || _event$target === void 0 || (_event$target = _event$target.files) === null || _event$target === void 0 ? void 0 : _event$target.length) > 0) {
        onChange === null || onChange === void 0 || onChange(event);
      }
      return;
    }
    onChange === null || onChange === void 0 || onChange(event);
  }, [onChange]);
  useImperativeHandle(ref, function () {
    return {
      root: rootRef.current,
      clearInput: handleClearInput
    };
  });

  // Prepare button props with event handlers conditionally applied
  var buttonProps = _extends({}, rest, {
    disabled: disabled,
    className: prefix('btn')
  }, !disabled && !readOnly && {
    onClick: handleClick,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop
  });
  var trigger = children ? (/*#__PURE__*/React.cloneElement(React.Children.only(children), _extends({}, buttonProps, {
    className: merge((_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.className, prefix('btn'))
  }))) : /*#__PURE__*/React.createElement(Component, buttonProps, locale === null || locale === void 0 ? void 0 : locale.upload);
  return /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    className: classes
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    name: name,
    multiple: multiple,
    disabled: disabled,
    readOnly: readOnly,
    accept: accept,
    ref: inputRef,
    onChange: handleChange
  }), trigger);
});
UploadTrigger.displayName = 'UploadTrigger';
UploadTrigger.propTypes = {
  locale: PropTypes.any,
  name: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
  draggable: PropTypes.bool,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func
};
export default UploadTrigger;