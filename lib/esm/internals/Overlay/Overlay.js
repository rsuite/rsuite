'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useState, useRef, useCallback, useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Position from "./Position.js";
import { useRootClose } from "../hooks/index.js";
import { mergeRefs } from "../utils/index.js";
import Fade from "../../Animation/Fade.js";
import OverlayContext from "./OverlayContext.js";
export var overlayPropTypes = {
  container: PropTypes.any,
  children: PropTypes.any,
  childrenProps: PropTypes.object,
  className: PropTypes.string,
  containerPadding: PropTypes.number,
  placement: PropTypes.any,
  preventOverflow: PropTypes.bool,
  open: PropTypes.bool,
  rootClose: PropTypes.bool,
  transition: PropTypes.any,
  triggerTarget: PropTypes.any,
  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
};

/**
 * Overlay is a powerful component that helps you create floating components.
 * @private
 */
var Overlay = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useContext = useContext(OverlayContext),
    overlayContainer = _useContext.overlayContainer;
  var _props$container = props.container,
    container = _props$container === void 0 ? overlayContainer : _props$container,
    containerPadding = props.containerPadding,
    placement = props.placement,
    rootClose = props.rootClose,
    children = props.children,
    childrenProps = props.childrenProps,
    _props$transition = props.transition,
    Transition = _props$transition === void 0 ? Fade : _props$transition,
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
  var _useState = useState(!open),
    exited = _useState[0],
    setExited = _useState[1];
  var overlayTarget = useRef(null);
  if (open) {
    if (exited) setExited(false);
  } else if (!Transition && !exited) {
    setExited(true);
  }
  var mountOverlay = open || Transition && !exited;
  var handleExited = useCallback(function (args) {
    setExited(true);
    onExited === null || onExited === void 0 || onExited(args);
  }, [onExited]);
  useRootClose(onClose, {
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
    return /*#__PURE__*/React.createElement(Position, _extends({}, positionProps, transitionProps, {
      ref: mergeRefs(ref, transitionRef)
    }), function (childProps, childRef) {
      // overlayTarget is the ref on the DOM of the Overlay.
      if (typeof children === 'function') {
        return children(Object.assign(childProps, childrenProps), mergeRefs(childRef, overlayTarget));
      }

      // Position will return coordinates and className
      var left = childProps.left,
        top = childProps.top,
        className = childProps.className;
      return /*#__PURE__*/React.cloneElement(children, _extends({}, childrenProps, children.props, {
        className: classNames(className, children.props.className),
        style: _extends({
          left: left,
          top: top
        }, children.props.style),
        ref: mergeRefs(childRef, overlayTarget)
      }));
    });
  };
  if (Transition) {
    return /*#__PURE__*/React.createElement(Transition, {
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
export default Overlay;