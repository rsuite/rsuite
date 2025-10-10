'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.OverlayCloseCause = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _get = _interopRequireDefault(require("lodash/get"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));
var _contains = _interopRequireDefault(require("dom-lib/contains"));
var _OverlayContext = _interopRequireDefault(require("./OverlayContext"));
var _Overlay = _interopRequireDefault(require("./Overlay"));
var _hooks = require("../hooks");
var _utils = require("../utils");
var _ReactChildren = require("../utils/ReactChildren");
var _excluded = ["children", "container", "controlId", "defaultOpen", "trigger", "disabled", "followCursor", "readOnly", "plaintext", "open", "delay", "delayOpen", "delayClose", "enterable", "placement", "speaker", "rootClose", "onClick", "onMouseOver", "onMouseMove", "onMouseOut", "onContextMenu", "onFocus", "onBlur", "onOpen", "onClose", "onExited"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function mergeEvents(events, props) {
  if (events === void 0) {
    events = {};
  }
  if (props === void 0) {
    props = {};
  }
  var nextEvents = {};
  Object.keys(events).forEach(function (eventName) {
    if (events[eventName]) {
      var _props;
      nextEvents[eventName] = (0, _utils.createChainedFunction)(events[eventName], (_props = props) === null || _props === void 0 ? void 0 : _props[eventName]);
    }
  });
  return nextEvents;
}
/**
 * The reason that triggers closing of an overlay
 * - Clicking outside of the overlay
 * - Direct invocation of triggerRef.current.close()
 */
var OverlayCloseCause = exports.OverlayCloseCause = /*#__PURE__*/function (OverlayCloseCause) {
  OverlayCloseCause[OverlayCloseCause["ClickOutside"] = 0] = "ClickOutside";
  OverlayCloseCause[OverlayCloseCause["ImperativeHandle"] = 1] = "ImperativeHandle";
  return OverlayCloseCause;
}({});
/**
 * Useful for mouseover and mouseout.
 * In order to resolve the node entering the mouseover element, a mouseout event and a mouseover event will be triggered.
 * https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave
 * @param handler
 * @param event
 */
function onMouseEventHandler(handler, event, delay) {
  var target = event.currentTarget;
  var related = event.relatedTarget || (0, _get.default)(event, ['nativeEvent', 'toElement']);
  if ((!related || related !== target) && !(0, _contains.default)(target, related)) {
    handler(event, delay);
  }
}
var defaultTrigger = ['hover', 'focus'];

/**
 * OverlayTrigger is used to display floating elements on another component.
 * @private
 */
var OverlayTrigger = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useContext = (0, _react.useContext)(_OverlayContext.default),
    overlayContainer = _useContext.overlayContainer;
  var children = props.children,
    _props$container = props.container,
    container = _props$container === void 0 ? overlayContainer : _props$container,
    controlId = props.controlId,
    defaultOpen = props.defaultOpen,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? defaultTrigger : _props$trigger,
    disabled = props.disabled,
    followCursor = props.followCursor,
    readOnly = props.readOnly,
    plaintext = props.plaintext,
    openProp = props.open,
    delay = props.delay,
    delayOpenProp = props.delayOpen,
    delayCloseProp = props.delayClose,
    enterable = props.enterable,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    speaker = props.speaker,
    _props$rootClose = props.rootClose,
    rootClose = _props$rootClose === void 0 ? true : _props$rootClose,
    onClick = props.onClick,
    onMouseOver = props.onMouseOver,
    onMouseMove = props.onMouseMove,
    onMouseOut = props.onMouseOut,
    onContextMenu = props.onContextMenu,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    onOpen = props.onOpen,
    onClose = props.onClose,
    onExited = props.onExited,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _usePortal = (0, _hooks.usePortal)({
      container: container
    }),
    Portal = _usePortal.Portal,
    containerElement = _usePortal.target;
  var triggerRef = (0, _react.useRef)(null);
  var overlayRef = (0, _react.useRef)();
  var _useControlled = (0, _hooks.useControlled)(openProp, defaultOpen),
    open = _useControlled[0],
    setOpen = _useControlled[1];
  var _useState = (0, _react.useState)(null),
    cursorPosition = _useState[0],
    setCursorPosition = _useState[1];

  // Delay the timer to close/open the overlay
  // When the cursor moves from the trigger to the overlay, the overlay will be closed.
  // In order to keep the overlay open, a timer is used to delay the closing.
  var delayOpenTimer = (0, _react.useRef)(null);
  var delayCloseTimer = (0, _react.useRef)(null);
  var delayOpen = (0, _isNil.default)(delayOpenProp) ? delay : delayOpenProp;
  var delayClose = (0, _isNil.default)(delayCloseProp) ? delay : delayCloseProp;

  // Whether the cursor is on the overlay
  var isOnOverlay = (0, _react.useRef)(false);

  // Whether the cursor is on the trigger
  var isOnTrigger = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    return function () {
      if (!(0, _isNil.default)(delayOpenTimer.current)) {
        clearTimeout(delayOpenTimer.current);
      }
      if (!(0, _isNil.default)(delayCloseTimer.current)) {
        clearTimeout(delayCloseTimer.current);
      }
    };
  }, []);

  // Whether the cursor is on the overlay
  var mouseEnter = (0, _react.useRef)(false);
  var handleOpenChange = (0, _react.useCallback)(function (nextOpen, closeCause) {
    // if the overlay open state is not changed, do not fire the event
    if (nextOpen === open) return;
    if (nextOpen) {
      onOpen === null || onOpen === void 0 || onOpen();
    } else {
      onClose === null || onClose === void 0 || onClose(closeCause);
    }
    setOpen(nextOpen);
  }, [open, onOpen, onClose, setOpen]);
  var handleOpen = (0, _react.useCallback)(function (delay) {
    var ms = (0, _isUndefined.default)(delay) ? delayOpen : delay;
    if (ms && typeof ms === 'number') {
      return delayOpenTimer.current = setTimeout(function () {
        delayOpenTimer.current = null;
        if (mouseEnter.current) {
          handleOpenChange(true);
        }
      }, ms);
    }
    handleOpenChange(true);
  }, [delayOpen, handleOpenChange]);
  var handleClose = (0, _react.useCallback)(function (delay, closeCause) {
    var ms = (0, _isUndefined.default)(delay) ? delayClose : delay;
    if (ms && typeof ms === 'number') {
      return delayCloseTimer.current = setTimeout(function () {
        delayCloseTimer.current = null;
        handleOpenChange(false, closeCause);
      }, ms);
    }
    handleOpenChange(false, closeCause);
  }, [delayClose, handleOpenChange]);
  var handleExited = (0, _react.useCallback)(function () {
    setCursorPosition(null);
  }, []);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      get root() {
        return triggerRef.current;
      },
      get overlay() {
        var _overlayRef$current;
        return (_overlayRef$current = overlayRef.current) === null || _overlayRef$current === void 0 ? void 0 : _overlayRef$current.child;
      },
      getState: function getState() {
        return {
          open: open
        };
      },
      open: handleOpen,
      close: function close(delay) {
        return handleClose(delay, OverlayCloseCause.ImperativeHandle);
      },
      updatePosition: function updatePosition() {
        var _overlayRef$current2, _overlayRef$current2$;
        (_overlayRef$current2 = overlayRef.current) === null || _overlayRef$current2 === void 0 || (_overlayRef$current2$ = _overlayRef$current2.updatePosition) === null || _overlayRef$current2$ === void 0 || _overlayRef$current2$.call(_overlayRef$current2);
      }
    };
  });

  /**
   * Close after the cursor leaves.
   */
  var handleCloseWhenLeave = (0, _react.useCallback)(function () {
    // When the cursor is not on the overlay and not on the trigger, it is closed.
    if (!isOnOverlay.current && !isOnTrigger.current) {
      handleClose(undefined, OverlayCloseCause.ClickOutside);
    }
  }, [handleClose]);
  var handleDelayedOpen = (0, _react.useCallback)(function () {
    mouseEnter.current = true;
    if (!enterable) {
      return handleOpen();
    }
    isOnTrigger.current = true;
    if (!(0, _isNil.default)(delayCloseTimer.current)) {
      clearTimeout(delayCloseTimer.current);
      delayCloseTimer.current = null;
      return handleOpen();
    }
    if (open) {
      return;
    }
    handleOpen();
  }, [enterable, open, handleOpen]);

  /**
   * Toggle open and closed state.
   */
  var handleOpenState = (0, _react.useCallback)(function () {
    if (open) {
      handleCloseWhenLeave();
    } else {
      handleDelayedOpen();
    }
  }, [open, handleCloseWhenLeave, handleDelayedOpen]);
  var handleDelayedClose = (0, _react.useCallback)(function () {
    mouseEnter.current = false;
    if (!enterable) {
      return handleClose();
    }
    isOnTrigger.current = false;
    if (!(0, _isNil.default)(delayOpenTimer.current)) {
      clearTimeout(delayOpenTimer.current);
      delayOpenTimer.current = null;
      return;
    }
    if (!open || !(0, _isNil.default)(delayCloseTimer.current)) {
      return;
    }
    delayCloseTimer.current = setTimeout(function () {
      if (!(0, _isNil.default)(delayCloseTimer.current)) {
        clearTimeout(delayCloseTimer.current);
        delayCloseTimer.current = null;
      }
      handleCloseWhenLeave();
    }, 200);
  }, [enterable, open, handleClose, handleCloseWhenLeave]);
  var handleSpeakerMouseEnter = (0, _react.useCallback)(function () {
    isOnOverlay.current = true;
  }, []);
  var handleSpeakerMouseLeave = (0, _react.useCallback)(function () {
    isOnOverlay.current = false;
    if (!(0, _utils.isOneOf)('click', trigger) && !(0, _utils.isOneOf)('contextMenu', trigger) && !(0, _utils.isOneOf)('active', trigger)) {
      handleCloseWhenLeave();
    }
  }, [handleCloseWhenLeave, trigger]);
  var handledMoveOverlay = (0, _react.useCallback)(function (event) {
    setCursorPosition(function () {
      return {
        top: event.pageY,
        left: event.pageX,
        clientTop: event.clientX,
        clientLeft: event.clientY
      };
    });
  }, []);
  var preventDefault = (0, _react.useCallback)(function (event) {
    event.preventDefault();
  }, []);
  var triggerEvents = (0, _react.useMemo)(function () {
    // Pass events by props
    var events = {
      onClick: onClick,
      onContextMenu: onContextMenu,
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut,
      onFocus: onFocus,
      onBlur: onBlur,
      onMouseMove: onMouseMove
    };

    // When trigger is disabled, no predefined event listeners are added.
    if (disabled || readOnly || plaintext || trigger === 'none') {
      return events;
    }

    // Get the cursor position through onMouseMove.
    // https://rsuitejs.com/components/tooltip/#follow-cursor
    if (followCursor) {
      events.onMouseMove = (0, _utils.createChainedFunction)(handledMoveOverlay, onMouseMove);
    }

    // The `click` event is usually used in `toggle` scenarios.
    // The first click will open and the second click will close.
    if ((0, _utils.isOneOf)('click', trigger)) {
      events.onClick = (0, _utils.createChainedFunction)(handleOpenState, events.onClick);
      return events;
    }

    // The difference between it and the click event is that it does not trigger the close.
    if ((0, _utils.isOneOf)('active', trigger)) {
      events.onClick = (0, _utils.createChainedFunction)(handleDelayedOpen, events.onClick);
      return events;
    }
    if ((0, _utils.isOneOf)('hover', trigger)) {
      var onMouseOverListener = function onMouseOverListener(e) {
        return onMouseEventHandler(handleDelayedOpen, e);
      };
      var onMouseOutListener = function onMouseOutListener(e) {
        return onMouseEventHandler(handleDelayedClose, e);
      };
      events.onMouseOver = (0, _utils.createChainedFunction)(onMouseOverListener, events.onMouseOver);
      events.onMouseOut = (0, _utils.createChainedFunction)(onMouseOutListener, events.onMouseOut);
    }
    if ((0, _utils.isOneOf)('focus', trigger)) {
      events.onFocus = (0, _utils.createChainedFunction)(handleDelayedOpen, events.onFocus);
      events.onBlur = (0, _utils.createChainedFunction)(handleDelayedClose, events.onBlur);
    }
    if ((0, _utils.isOneOf)('contextMenu', trigger)) {
      events.onContextMenu = (0, _utils.createChainedFunction)(preventDefault, handleOpenState, events.onContextMenu);
    }
    return events;
  }, [disabled, followCursor, handleDelayedClose, handleDelayedOpen, handleOpenState, handledMoveOverlay, onBlur, onClick, onContextMenu, onFocus, onMouseMove, onMouseOut, onMouseOver, plaintext, preventDefault, readOnly, trigger]);
  var renderOverlay = function renderOverlay() {
    var overlayProps = (0, _extends2.default)({}, rest, {
      rootClose: rootClose,
      triggerTarget: triggerRef,
      onClose: trigger !== 'none' ? function () {
        return handleClose(undefined, OverlayCloseCause.ClickOutside);
      } : undefined,
      onExited: (0, _utils.createChainedFunction)(followCursor ? handleExited : undefined, onExited),
      placement: placement,
      container: containerElement,
      open: open
    });
    var speakerProps = {
      id: controlId
    };

    // The purpose of adding mouse entry and exit events to the Overlay is to record whether the current cursor is on the Overlay.
    // When `trigger` is equal to `hover`, if the cursor leaves the `triggerTarget` and stays on the Overlay,
    // the Overlay will continue to remain open.
    if (trigger !== 'none' && enterable) {
      speakerProps.onMouseEnter = handleSpeakerMouseEnter;
      speakerProps.onMouseLeave = handleSpeakerMouseLeave;
    }
    return /*#__PURE__*/_react.default.createElement(_Overlay.default, (0, _extends2.default)({}, overlayProps, {
      ref: overlayRef,
      childrenProps: speakerProps,
      followCursor: followCursor,
      cursorPosition: cursorPosition
    }), typeof speaker === 'function' ? function (props, ref) {
      return speaker((0, _extends2.default)({}, props, {
        onClose: handleClose
      }), ref);
    } : speaker);
  };
  var triggerElement = (0, _react.useMemo)(function () {
    if (typeof children === 'function') {
      return children(triggerEvents, triggerRef);
    } else if ((0, _ReactChildren.isFragment)(children) || ! /*#__PURE__*/(0, _react.isValidElement)(children)) {
      return /*#__PURE__*/_react.default.createElement("span", (0, _extends2.default)({
        ref: triggerRef,
        "aria-describedby": controlId
      }, triggerEvents), children);
    }
    return /*#__PURE__*/(0, _react.cloneElement)(children, (0, _extends2.default)({
      ref: triggerRef,
      'aria-describedby': controlId
    }, mergeEvents(triggerEvents, children.props)));
  }, [children, controlId, triggerEvents]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, triggerElement, /*#__PURE__*/_react.default.createElement(Portal, null, renderOverlay()));
});
OverlayTrigger.displayName = 'OverlayTrigger';
var _default = exports.default = OverlayTrigger;