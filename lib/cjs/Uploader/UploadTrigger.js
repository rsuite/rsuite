'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Button = _interopRequireDefault(require("../Button"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _excluded = ["as", "name", "accept", "multiple", "disabled", "readOnly", "children", "classPrefix", "className", "draggable", "locale", "onChange", "onDragEnter", "onDragLeave", "onDragOver", "onDrop"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var UploadTrigger = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _children$props;
  var _props$as = props.as,
    Component = _props$as === void 0 ? _Button.default : _props$as,
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var rootRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    dragOver = _useState[0],
    setDragOver = _useState[1];
  var inputRef = (0, _react.useRef)(null);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix({
    disabled: disabled,
    customize: children,
    'drag-over': dragOver
  }));
  var handleClick = (0, _react.useCallback)(function () {
    var _inputRef$current;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.click();
  }, []);
  var handleClearInput = (0, _react.useCallback)(function () {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);
  var handleDragEnter = (0, _react.useCallback)(function (event) {
    if (draggable) {
      event.preventDefault();
      setDragOver(true);
    }
    onDragEnter === null || onDragEnter === void 0 || onDragEnter(event);
  }, [draggable, onDragEnter]);
  var handleDragLeave = (0, _react.useCallback)(function (event) {
    if (draggable) {
      event.preventDefault();
      setDragOver(false);
    }
    onDragLeave === null || onDragLeave === void 0 || onDragLeave(event);
  }, [draggable, onDragLeave]);
  var handleDragOver = (0, _react.useCallback)(function (event) {
    draggable && event.preventDefault();
    onDragOver === null || onDragOver === void 0 || onDragOver(event);
  }, [draggable, onDragOver]);
  var handleDrop = (0, _react.useCallback)(function (event) {
    if (draggable) {
      event.preventDefault();
      setDragOver(false);
      onChange === null || onChange === void 0 || onChange(event);
    }
    onDrop === null || onDrop === void 0 || onDrop(event);
  }, [draggable, onChange, onDrop]);
  var handleChange = (0, _react.useCallback)(function (event) {
    if ((0, _utils.isIE11)()) {
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
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      root: rootRef.current,
      clearInput: handleClearInput
    };
  });

  // Prepare button props with event handlers conditionally applied
  var buttonProps = (0, _extends2.default)({}, rest, {
    disabled: disabled,
    className: prefix('btn')
  }, !disabled && !readOnly && {
    onClick: handleClick,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop
  });
  var trigger = children ? (/*#__PURE__*/_react.default.cloneElement(_react.default.Children.only(children), (0, _extends2.default)({}, buttonProps, {
    className: merge((_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.className, prefix('btn'))
  }))) : /*#__PURE__*/_react.default.createElement(Component, buttonProps, locale === null || locale === void 0 ? void 0 : locale.upload);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: rootRef,
    className: classes
  }, /*#__PURE__*/_react.default.createElement("input", {
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
  locale: _propTypes.default.any,
  name: _propTypes.default.string,
  multiple: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  accept: _propTypes.default.string,
  onChange: _propTypes.default.func,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.element,
  draggable: _propTypes.default.bool,
  onDragEnter: _propTypes.default.func,
  onDragLeave: _propTypes.default.func,
  onDragOver: _propTypes.default.func,
  onDrop: _propTypes.default.func
};
var _default = exports.default = UploadTrigger;