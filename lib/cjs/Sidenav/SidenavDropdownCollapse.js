'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Collapse = _interopRequireDefault(require("../Animation/Collapse"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var _excluded = ["className", "classPrefix", "open"],
  _excluded2 = ["className"];
var SidenavDropdownCollapse = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu' : _props$classPrefix,
    open = props.open,
    restProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(_Collapse.default, {
    in: open,
    exitedClassName: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["collapse-out"]))),
    exitingClassName: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["collapsing"]))),
    enteredClassName: prefix(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteralLoose2.default)(["collapse-in"]))),
    enteringClassName: prefix(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteralLoose2.default)(["collapsing"])))
  }, function (transitionProps, transitionRef) {
    var transitionClassName = transitionProps.className,
      transitionRestProps = (0, _objectWithoutPropertiesLoose2.default)(transitionProps, _excluded2);
    return /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
      ref: (0, _utils.mergeRefs)(ref, transitionRef),
      role: "group",
      className: (0, _classnames.default)(classes, transitionClassName)
    }, restProps, transitionRestProps));
  });
});
SidenavDropdownCollapse.displayName = 'Sidenav.Dropdown.Collapse';
SidenavDropdownCollapse.propTypes = {
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  open: _propTypes.default.bool
};
var _default = exports.default = SidenavDropdownCollapse;