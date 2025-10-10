'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _TagList = _interopRequireDefault(require("./TagList"));
var _hooks = require("../internals/hooks");
var _InputSearch = _interopRequireDefault(require("./InputSearch"));
var _templateObject;
var _excluded = ["tags", "inputProps", "readOnly", "disabled", "multiple", "onBlur", "onFocus", "onChange", "inputValue", "inputRef", "editable", "showTagList"];
var TextBox = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var tags = props.tags,
    inputProps = props.inputProps,
    readOnly = props.readOnly,
    disabled = props.disabled,
    multiple = props.multiple,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    onChange = props.onChange,
    inputValue = props.inputValue,
    inputRef = props.inputRef,
    editable = props.editable,
    showTagList = props.showTagList,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)('picker'),
    prefix = _useClassNames.prefix;
  if (!multiple && disabled) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["textbox"]))),
    ref: ref
  }, rest), showTagList ? /*#__PURE__*/_react.default.createElement(_TagList.default, null, tags) : null, editable && /*#__PURE__*/_react.default.createElement(_InputSearch.default, (0, _extends2.default)({}, inputProps, {
    tabIndex: -1,
    readOnly: readOnly,
    onBlur: onBlur,
    onFocus: onFocus,
    inputRef: inputRef,
    onChange: onChange,
    value: inputValue
  })));
});
var _default = exports.default = TextBox;