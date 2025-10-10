'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.overlayPropTypes = exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Position = _interopRequireDefault(require("./Position"));
var _hooks = require("../hooks");
var _utils = require("../utils");
var _Fade = _interopRequireDefault(require("../../Animation/Fade"));
var _OverlayContext = _interopRequireDefault(require("./OverlayContext"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var overlayPropTypes = exports.overlayPropTypes = {
  container: _propTypes.default.any,
  children: _propTypes.default.any,
  childrenProps: _propTypes.default.object,
  className: _propTypes.default.string,
  containerPadding: _propTypes.default.number,
  placement: _propTypes.default.any,
  preventOverflow: _propTypes.default.bool,
  open: _propTypes.default.bool,
  rootClose: _propTypes.default.bool,
  transition: _propTypes.default.any,
  triggerTarget: _propTypes.default.any,
  onClose: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func
};

/**
 * Overlay is a powerful component that helps you create floating components.
 * @private
 */
var Overlay = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useContext = (0, _react.useContext)(_OverlayContext.default),
    overlayContainer = _useContext.overlayContainer;
  var _props$container = props.container,
    container = _props$container === void 0 ? overlayContainer : _props$container,
    containerPadding = props.containerPadding,
    placement = props.placement,
    rootClose = props.rootClose,
    children = props.children,
    childrenProps = props.childrenProps,
    _props$transition = props.transition,
    Transition = _props$transition === void 0 ? _Fade.default : _props$transition,
    open = props.open,
    preventOverflow = props.preventOverflow,
    triggerTarget = props.triggerTarget,
    onClose = props.onClose,
    onExited = props.onExited,
    onExit = props.onExit,
    onExiting = props.onExiting,
    onEnter = props.onEnter,
    onEntering = props.onEntering,
    onEntered = props.onEntered,
    followCursor = props.followCursor,
    cursorPosition = props.cursorPosition;
  var _useState = (0, _react.useState)(!open),
    exited = _useState[0],
    setExited = _useState[1];
  var overlayTarget = (0, _react.useRef)(null);
  if (open) {
    if (exited) setExited(false);
  } else if (!Transition && !exited) {
    setExited(true);
  }
  var mountOverlay = open || Transition && !exited;
  var handleExited = (0, _react.useCallback)(function (args) {
    setExited(true);
    onExited === null || onExited === void 0 || onExited(args);
  }, [onExited]);
  (0, _hooks.useRootClose)(onClose, {
    triggerTarget: triggerTarget,
    overlayTarget: overlayTarget,
    disabled: !rootClose || !mountOverlay
  });
  if (!mountOverlay) {
    return null;
  }
  var positionProps = {
    container: container,
    containerPadding: containerPadding,
    triggerTarget: triggerTarget,
    placement: placement,
    preventOverflow: preventOverflow,
    followCursor: followCursor,
    cursorPosition: cursorPosition
  };
  var renderChildWithPosition = function renderChildWithPosition(transitionProps, transitionRef) {
    return /*#__PURE__*/_react.default.createElement(_Position.default, (0, _extends2.default)({}, positionProps, transitionProps, {
      ref: (0, _utils.mergeRefs)(ref, transitionRef)
    }), function (childProps, childRef) {
      // overlayTarget is the ref on the DOM of the Overlay.
      if (typeof children === 'function') {
        return children(Object.assign(childProps, childrenProps), (0, _utils.mergeRefs)(childRef, overlayTarget));
      }

      // Position will return coordinates and className
      var left = childProps.left,
        top = childProps.top,
        className = childProps.className;
      return /*#__PURE__*/_react.default.cloneElement(children, (0, _extends2.default)({}, childrenProps, children.props, {
        className: (0, _classnames.default)(className, children.props.className),
        style: (0, _extends2.default)({
          left: left,
          top: top
        }, children.props.style),
        ref: (0, _utils.mergeRefs)(childRef, overlayTarget)
      }));
    });
  };
  if (Transition) {
    return /*#__PURE__*/_react.default.createElement(Transition, {
      in: open,
      transitionAppear: true,
      onExit: onExit,
      onExiting: onExiting,
      onExited: handleExited,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered
    }, renderChildWithPosition);
  }
  return renderChildWithPosition();
});
Overlay.displayName = 'Overlay';
Overlay.propTypes = overlayPropTypes;
var _default = exports.default = Overlay;