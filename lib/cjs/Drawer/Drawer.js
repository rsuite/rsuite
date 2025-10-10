'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Slide = _interopRequireDefault(require("../Animation/Slide"));
var _Modal = _interopRequireDefault(require("../Modal"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _DrawerBody = _interopRequireDefault(require("./DrawerBody"));
var _DrawerHeader = _interopRequireDefault(require("./DrawerHeader"));
var _DrawerActions = _interopRequireDefault(require("./DrawerActions"));
var _DrawerFooter = _interopRequireDefault(require("./DrawerFooter"));
var _DrawerTitle = _interopRequireDefault(require("./DrawerTitle"));
var _excluded = ["className", "placement", "classPrefix", "animation", "closeButton"];
/**
 * The Drawer component is used to display extra content from a main content.
 * @see https://rsuitejs.com/components/drawer
 */
var Drawer = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Drawer', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var className = propsWithDefaults.className,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'right' : _propsWithDefaults$pl,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'drawer' : _propsWithDefaults$cl,
    _propsWithDefaults$an = propsWithDefaults.animation,
    animation = _propsWithDefaults$an === void 0 ? _Slide.default : _propsWithDefaults$an,
    _propsWithDefaults$cl2 = propsWithDefaults.closeButton,
    closeButton = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, prefix(placement));
  var animationProps = {
    placement: placement
  };
  return /*#__PURE__*/_react.default.createElement(_Modal.default, (0, _extends2.default)({}, rest, {
    ref: ref,
    overflow: false,
    classPrefix: classPrefix,
    className: classes,
    animation: animation,
    animationProps: animationProps,
    isDrawer: true,
    closeButton: closeButton
  }));
});
_DrawerBody.default.displayName = 'DrawerBody';
_DrawerHeader.default.displayName = 'DrawerHeader';
_DrawerActions.default.displayName = 'DrawerActions';
_DrawerFooter.default.displayName = 'DrawerFooter';
_DrawerTitle.default.displayName = 'DrawerTitle';
Drawer.Body = _DrawerBody.default;
Drawer.Header = _DrawerHeader.default;
Drawer.Actions = _DrawerActions.default;
Drawer.Footer = (0, _utils.deprecateComponent)(_DrawerFooter.default, '<Drawer.Footer> has been deprecated, use <Drawer.Actions> instead.');
Drawer.Title = _DrawerTitle.default;
Drawer.displayName = 'Drawer';
Drawer.propTypes = (0, _extends2.default)({}, _Modal.default.propTypes, {
  classPrefix: _propTypes.default.string,
  placement: (0, _propTypes2.oneOf)(['top', 'right', 'bottom', 'left']),
  children: _propTypes.default.node,
  className: _propTypes.default.string
});
var _default = exports.default = Drawer;