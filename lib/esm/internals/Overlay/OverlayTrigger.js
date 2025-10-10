'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["children", "container", "controlId", "defaultOpen", "trigger", "disabled", "followCursor", "readOnly", "plaintext", "open", "delay", "delayOpen", "delayClose", "enterable", "placement", "speaker", "rootClose", "onClick", "onMouseOver", "onMouseMove", "onMouseOut", "onContextMenu", "onFocus", "onBlur", "onOpen", "onClose", "onExited"];
import React, { useRef, useEffect, useImperativeHandle, useCallback, useContext, useState, useMemo, isValidElement, cloneElement } from 'react';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import contains from 'dom-lib/contains';
import OverlayContext from "./OverlayContext.js";
import Overlay from "./Overlay.js";
import { usePortal, useControlled } from "../hooks/index.js";
import { createChainedFunction, isOneOf } from "../utils/index.js";
import { isFragment } from "../utils/ReactChildren.js";
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
      nextEvents[eventName] = createChainedFunction(events[eventName], (_props = props) === null || _props === void 0 ? void 0 : _props[eventName]);
    }
  });
  return nextEvents;
}
/**
 * The reason that triggers closing of an overlay
 * - Clicking outside of the overlay
 * - Direct invocation of triggerRef.current.close()
 */
export var OverlayCloseCause = /*#__PURE__*/function (OverlayCloseCause) {
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
  var related = event.relatedTarget || get(event, ['nativeEvent', 'toElement']);
  if ((!related || related !== target) && !contains(target, related)) {
    handler(event, delay);
  }
}
var defaultTrigger = ['hover', 'focus'];

/**
 * OverlayTrigger is used to display floating elements on another component.
 * @private
 */
var OverlayTrigger = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useContext = useContext(OverlayContext),
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
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _usePortal = usePortal({
      container: container
    }),
    Portal = _usePortal.Portal,
    containerElement = _usePortal.target;
  var triggerRef = useRef(null);
  var overlayRef = useRef();
  var _useControlled = useControlled(openProp, defaultOpen),
    open = _useControlled[0],
    setOpen = _useControlled[1];
  var _useState = useState(null),
    cursorPosition = _useState[0],
    setCursorPosition = _useState[1];

  // Delay the timer to close/open the overlay
  // When the cursor moves from the trigger to the overlay, the overlay will be closed.
  // In order to keep the overlay open, a timer is used to delay the closing.
  var delayOpenTimer = useRef(null);
  var delayCloseTimer = useRef(null);
  var delayOpen = isNil(delayOpenProp) ? delay : delayOpenProp;
  var delayClose = isNil(delayCloseProp) ? delay : delayCloseProp;

  // Whether the cursor is on the overlay
  var isOnOverlay = useRef(false);

  // Whether the cursor is on the trigger
  var isOnTrigger = useRef(false);
  useEffect(function () {
    return function () {
      if (!isNil(delayOpenTimer.current)) {
        clearTimeout(delayOpenTimer.current);
      }
      if (!isNil(delayCloseTimer.current)) {
        clearTimeout(delayCloseTimer.current);
      }
    };
  }, []);

  // Whether the cursor is on the overlay
  var mouseEnter = useRef(false);
  var handleOpenChange = useCallback(function (nextOpen, closeCause) {
    // if the overlay open state is not changed, do not fire the event
    if (nextOpen === open) return;
    if (nextOpen) {
      onOpen === null || onOpen === void 0 || onOpen();
    } else {
      onClose === null || onClose === void 0 || onClose(closeCause);
    }
    setOpen(nextOpen);
  }, [open, onOpen, onClose, setOpen]);
  var handleOpen = useCallback(function (delay) {
    var ms = isUndefined(delay) ? delayOpen : delay;
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
  var handleClose = useCallback(function (delay, closeCause) {
    var ms = isUndefined(delay) ? delayClose : delay;
    if (ms && typeof ms === 'number') {
      return delayCloseTimer.current = setTimeout(function () {
        delayCloseTimer.current = null;
        handleOpenChange(false, closeCause);
      }, ms);
    }
    handleOpenChange(false, closeCause);
  }, [delayClose, handleOpenChange]);
  var handleExited = useCallback(function () {
    setCursorPosition(null);
  }, []);
  useImperativeHandle(ref, function () {
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
  var handleCloseWhenLeave = useCallback(function () {
    // When the cursor is not on the overlay and not on the trigger, it is closed.
    if (!isOnOverlay.current && !isOnTrigger.current) {
      handleClose(undefined, OverlayCloseCause.ClickOutside);
    }
  }, [handleClose]);
  var handleDelayedOpen = useCallback(function () {
    mouseEnter.current = true;
    if (!enterable) {
      return handleOpen();
    }
    isOnTrigger.current = true;
    if (!isNil(delayCloseTimer.current)) {
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
  var handleOpenState = useCallback(function () {
    if (open) {
      handleCloseWhenLeave();
    } else {
      handleDelayedOpen();
    }
  }, [open, handleCloseWhenLeave, handleDelayedOpen]);
  var handleDelayedClose = useCallback(function () {
    mouseEnter.current = false;
    if (!enterable) {
      return handleClose();
    }
    isOnTrigger.current = false;
    if (!isNil(delayOpenTimer.current)) {
      clearTimeout(delayOpenTimer.current);
      delayOpenTimer.current = null;
      return;
    }
    if (!open || !isNil(delayCloseTimer.current)) {
      return;
    }
    delayCloseTimer.current = setTimeout(function () {
      if (!isNil(delayCloseTimer.current)) {
        clearTimeout(delayCloseTimer.current);
        delayCloseTimer.current = null;
      }
      handleCloseWhenLeave();
    }, 200);
  }, [enterable, open, handleClose, handleCloseWhenLeave]);
  var handleSpeakerMouseEnter = useCallback(function () {
    isOnOverlay.current = true;
  }, []);
  var handleSpeakerMouseLeave = useCallback(function () {
    isOnOverlay.current = false;
    if (!isOneOf('click', trigger) && !isOneOf('contextMenu', trigger) && !isOneOf('active', trigger)) {
      handleCloseWhenLeave();
    }
  }, [handleCloseWhenLeave, trigger]);
  var handledMoveOverlay = useCallback(function (event) {
    setCursorPosition(function () {
      return {
        top: event.pageY,
        left: event.pageX,
        clientTop: event.clientX,
        clientLeft: event.clientY
      };
    });
  }, []);
  var preventDefault = useCallback(function (event) {
    event.preventDefault();
  }, []);
  var triggerEvents = useMemo(function () {
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
      events.onMouseMove = createChainedFunction(handledMoveOverlay, onMouseMove);
    }

    // The `click` event is usually used in `toggle` scenarios.
    // The first click will open and the second click will close.
    if (isOneOf('click', trigger)) {
      events.onClick = createChainedFunction(handleOpenState, events.onClick);
      return events;
    }

    // The difference between it and the click event is that it does not trigger the close.
    if (isOneOf('active', trigger)) {
      events.onClick = createChainedFunction(handleDelayedOpen, events.onClick);
      return events;
    }
    if (isOneOf('hover', trigger)) {
      var onMouseOverListener = function onMouseOverListener(e) {
        return onMouseEventHandler(handleDelayedOpen, e);
      };
      var onMouseOutListener = function onMouseOutListener(e) {
        return onMouseEventHandler(handleDelayedClose, e);
      };
      events.onMouseOver = createChainedFunction(onMouseOverListener, events.onMouseOver);
      events.onMouseOut = createChainedFunction(onMouseOutListener, events.onMouseOut);
    }
    if (isOneOf('focus', trigger)) {
      events.onFocus = createChainedFunction(handleDelayedOpen, events.onFocus);
      events.onBlur = createChainedFunction(handleDelayedClose, events.onBlur);
    }
    if (isOneOf('contextMenu', trigger)) {
      events.onContextMenu = createChainedFunction(preventDefault, handleOpenState, events.onContextMenu);
    }
    return events;
  }, [disabled, followCursor, handleDelayedClose, handleDelayedOpen, handleOpenState, handledMoveOverlay, onBlur, onClick, onContextMenu, onFocus, onMouseMove, onMouseOut, onMouseOver, plaintext, preventDefault, readOnly, trigger]);
  var renderOverlay = function renderOverlay() {
    var overlayProps = _extends({}, rest, {
      rootClose: rootClose,
      triggerTarget: triggerRef,
      onClose: trigger !== 'none' ? function () {
        return handleClose(undefined, OverlayCloseCause.ClickOutside);
      } : undefined,
      onExited: createChainedFunction(followCursor ? handleExited : undefined, onExited),
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
    return /*#__PURE__*/React.createElement(Overlay, _extends({}, overlayProps, {
      ref: overlayRef,
      childrenProps: speakerProps,
      followCursor: followCursor,
      cursorPosition: cursorPosition
    }), typeof speaker === 'function' ? function (props, ref) {
      return speaker(_extends({}, props, {
        onClose: handleClose
      }), ref);
    } : speaker);
  };
  var triggerElement = useMemo(function () {
    if (typeof children === 'function') {
      return children(triggerEvents, triggerRef);
    } else if (isFragment(children) || ! /*#__PURE__*/isValidElement(children)) {
      return /*#__PURE__*/React.createElement("span", _extends({
        ref: triggerRef,
        "aria-describedby": controlId
      }, triggerEvents), children);
    }
    return /*#__PURE__*/cloneElement(children, _extends({
      ref: triggerRef,
      'aria-describedby': controlId
    }, mergeEvents(triggerEvents, children.props)));
  }, [children, controlId, triggerEvents]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, triggerElement, /*#__PURE__*/React.createElement(Portal, null, renderOverlay()));
});
OverlayTrigger.displayName = 'OverlayTrigger';
export default OverlayTrigger;