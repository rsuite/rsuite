'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _ModalContext = require("./ModalContext");
var _CloseButton = _interopRequireDefault(require("../internals/CloseButton"));
var _Close = _interopRequireDefault(require("@rsuite/icons/Close"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _excluded = ["as", "classPrefix", "className", "closeButton", "children", "onClose"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var ModalHeader = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'modal-header' : _props$classPrefix,
    className = props.className,
    _props$closeButton = props.closeButton,
    closeButton = _props$closeButton === void 0 ? true : _props$closeButton,
    children = props.children,
    onClose = props.onClose,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  var context = (0, _react.useContext)(_ModalContext.ModalContext);
  var _ref = context || {},
    isDrawer = _ref.isDrawer,
    onModalClose = _ref.onModalClose;
  var buttonElement = isDrawer ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    icon: /*#__PURE__*/_react.default.createElement(_Close.default, null),
    appearance: "subtle",
    size: "sm",
    className: prefix('close'),
    onClick: (0, _utils.createChainedFunction)(onClose, onModalClose)
  }) : /*#__PURE__*/_react.default.createElement(_CloseButton.default, {
    className: prefix('close'),
    onClick: (0, _utils.createChainedFunction)(onClose, onModalClose)
  });
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), closeButton && buttonElement, children);
});
ModalHeader.displayName = 'ModalHeader';
ModalHeader.propTypes = {
  as: _propTypes.default.elementType,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  closeButton: _propTypes.default.bool,
  children: _propTypes.default.node
};
var _default = exports.default = ModalHeader;