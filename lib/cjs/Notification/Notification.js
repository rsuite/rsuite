'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _useDelayedClosure2 = _interopRequireDefault(require("../toaster/hooks/useDelayedClosure"));
var _CloseButton = _interopRequireDefault(require("../internals/CloseButton"));
var _statusIcons = require("../internals/constants/statusIcons");
var _hooks = require("../internals/hooks");
var _propTypes2 = require("../internals/propTypes");
var _utils = require("../internals/utils");
var _CustomProvider = require("../CustomProvider");
var _templateObject, _templateObject2;
var _excluded = ["as", "classPrefix", "closable", "duration", "className", "type", "header", "children", "onClose"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `Notification` component is used to display global messages and notifications.
 *
 * @see https://rsuitejs.com/components/notification
 */
var Notification = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Notification', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'notification' : _propsWithDefaults$cl,
    closable = propsWithDefaults.closable,
    _propsWithDefaults$du = propsWithDefaults.duration,
    duration = _propsWithDefaults$du === void 0 ? 4500 : _propsWithDefaults$du,
    className = propsWithDefaults.className,
    type = propsWithDefaults.type,
    header = propsWithDefaults.header,
    children = propsWithDefaults.children,
    onClose = propsWithDefaults.onClose,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useState = (0, _react.useState)('show'),
    display = _useState[0],
    setDisplay = _useState[1];
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var isMounted = (0, _hooks.useIsMounted)();
  var targetRef = _react.default.useRef(null);

  // Timed close message
  var _useDelayedClosure = (0, _useDelayedClosure2.default)({
      targetRef: targetRef,
      onClose: onClose,
      duration: duration
    }),
    clear = _useDelayedClosure.clear;

  // Click to trigger to close the message
  var handleClose = (0, _hooks.useEventCallback)(function (event) {
    setDisplay('hiding');
    onClose === null || onClose === void 0 || onClose(event);
    clear();
    setTimeout(function () {
      if (isMounted()) {
        setDisplay('hide');
      }
    }, 1000);
  });
  var renderHeader = function renderHeader() {
    if (!header) {
      return null;
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('title')
    }, type ? /*#__PURE__*/_react.default.createElement("div", {
      className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["title-with-icon"])))
    }, _statusIcons.MESSAGE_STATUS_ICONS[type], header) : /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('title')
    }, header));
  };
  if (display === 'hide') {
    return null;
  }
  var classes = merge(className, withClassPrefix(type, display, {
    closable: closable
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "alert"
  }, rest, {
    ref: (0, _utils.mergeRefs)(targetRef, ref),
    className: classes
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["content"])))
  }, renderHeader(), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('description')
  }, typeof children === 'function' ? children() : children)), closable && /*#__PURE__*/_react.default.createElement(_CloseButton.default, {
    onClick: handleClose
  }));
});
Notification.displayName = 'Notification';
Notification.propTypes = {
  as: _propTypes.default.elementType,
  duration: _propTypes.default.number,
  header: _propTypes.default.node,
  closable: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  type: (0, _propTypes2.oneOf)(['info', 'success', 'warning', 'error']),
  onClose: _propTypes.default.func
};
var _default = exports.default = Notification;