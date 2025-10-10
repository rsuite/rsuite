'use client';
import React, { useState, useEffect, useRef, useMemo, useCallback, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getContainer from 'dom-lib/getContainer';
import ownerDocument from 'dom-lib/ownerDocument';
import removeClass from 'dom-lib/removeClass';
import on from 'dom-lib/on';
import addClass from 'dom-lib/addClass';
import addStyle from 'dom-lib/addStyle';
import { ResizeObserver } from '@juggle/resize-observer';
import isElement from "../../DOMHelper/isElement.js";
import positionUtils from "./positionUtils.js";
import { getDOMNode } from "../utils/index.js";
import { useUpdateEffect } from "../hooks/index.js";
var usePosition = function usePosition(props, ref) {
  var _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'right' : _props$placement,
    _props$preventOverflo = props.preventOverflow,
    preventOverflow = _props$preventOverflo === void 0 ? false : _props$preventOverflo,
    _props$containerPaddi = props.containerPadding,
    containerPadding = _props$containerPaddi === void 0 ? 0 : _props$containerPaddi,
    container = props.container,
    triggerTarget = props.triggerTarget,
    followCursor = props.followCursor,
    cursorPosition = props.cursorPosition;
  var containerRef = useRef(null);
  var lastTargetRef = useRef(null);
  var overlayResizeObserver = useRef();
  var defaultPosition = {
    positionLeft: 0,
    positionTop: 0,
    arrowOffsetLeft: undefined,
    arrowOffsetTop: undefined
  };
  var _useState = useState(defaultPosition),
    position = _useState[0],
    setPosition = _useState[1];
  var utils = useMemo(function () {
    return positionUtils({
      placement: placement,
      preventOverflow: preventOverflow,
      padding: containerPadding
    });
  }, [placement, preventOverflow, containerPadding]);
  var updatePosition = useCallback(
  /**
   * @param placementChanged  Whether the placement has changed
   * @param forceUpdateDOM Whether to update the DOM directly
   * @returns void
   */
  function (placementChanged, forceUpdateDOM) {
    if (placementChanged === void 0) {
      placementChanged = true;
    }
    if (!(triggerTarget !== null && triggerTarget !== void 0 && triggerTarget.current)) {
      return;
    }
    var targetElement = getDOMNode(triggerTarget);
    if (!isElement(targetElement)) {
      throw new Error('`target` should return an HTMLElement');
    }

    //  If the target and placement do not change, the position is not updated.
    if (targetElement === lastTargetRef.current && !placementChanged) {
      return;
    }
    var overlay = getDOMNode(ref.current);
    var containerElement = getContainer(typeof container === 'function' ? container() : container !== null && container !== void 0 ? container : null, ownerDocument(ref.current).body);
    var posi = utils.calcOverlayPosition(overlay, targetElement, containerElement, followCursor ? cursorPosition : undefined);
    if (forceUpdateDOM && overlay) {
      var _overlay$className;
      var preClassName = overlay === null || overlay === void 0 || (_overlay$className = overlay.className) === null || _overlay$className === void 0 || (_overlay$className = _overlay$className.match(/(placement-\S+)/)) === null || _overlay$className === void 0 ? void 0 : _overlay$className[0];
      removeClass(overlay, preClassName);
      if (posi.positionClassName) {
        addClass(overlay, posi.positionClassName);
      }
      addStyle(overlay, {
        left: posi.positionLeft + "px",
        top: posi.positionTop + "px"
      });
    } else {
      setPosition(posi);
    }
    containerRef.current = containerElement;
    lastTargetRef.current = targetElement;
  }, [container, ref, triggerTarget, utils, followCursor, cursorPosition]);
  useEffect(function () {
    updatePosition(false);
    var overlay = getDOMNode(ref.current);
    var containerScrollListener;
    if (containerRef.current && preventOverflow) {
      var _containerRef$current;
      // Update the overlay position when the container scroll bar is scrolling
      containerScrollListener = on(((_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.tagName) === 'BODY' ? window : containerRef.current, 'scroll', function () {
        return updatePosition(true, true);
      });
    }

    // Update the position when the window size changes
    var resizeListener = on(window, 'resize', function () {
      return updatePosition(true, true);
    });
    if (overlay) {
      // Update the position when the size of the overlay changes
      overlayResizeObserver.current = new ResizeObserver(function () {
        return updatePosition(true, true);
      });
      overlayResizeObserver.current.observe(overlay);
    }
    return function () {
      var _containerScrollListe, _overlayResizeObserve;
      lastTargetRef.current = null;
      (_containerScrollListe = containerScrollListener) === null || _containerScrollListe === void 0 || _containerScrollListe.off();
      resizeListener === null || resizeListener === void 0 || resizeListener.off();
      (_overlayResizeObserve = overlayResizeObserver.current) === null || _overlayResizeObserve === void 0 || _overlayResizeObserve.disconnect();
    };
  }, [preventOverflow, ref, updatePosition]);
  useUpdateEffect(function () {
    return updatePosition();
  }, [updatePosition, placement]);
  return [position, updatePosition];
};
/**
 * The `Position` component calculates the position of the child element.
 * @private
 */
var Position = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    followCursor = props.followCursor,
    cursorPosition = props.cursorPosition;
  var childRef = React.useRef(null);
  var _usePosition = usePosition(props, childRef),
    position = _usePosition[0],
    updatePosition = _usePosition[1];
  var positionClassName = position.positionClassName,
    arrowOffsetLeft = position.arrowOffsetLeft,
    arrowOffsetTop = position.arrowOffsetTop,
    positionLeft = position.positionLeft,
    positionTop = position.positionTop;
  useImperativeHandle(ref, function () {
    return {
      get child() {
        return childRef.current;
      },
      updatePosition: updatePosition
    };
  });
  useEffect(function () {
    if (!followCursor || !cursorPosition) return;
    updatePosition();
  }, [followCursor, cursorPosition, updatePosition]);
  if (typeof children === 'function') {
    var childProps = {
      className: classNames(className, positionClassName),
      arrowOffsetLeft: arrowOffsetLeft,
      arrowOffsetTop: arrowOffsetTop,
      left: positionLeft,
      top: positionTop
    };
    return children(childProps, childRef);
  }
  return children;
});
Position.displayName = 'Position';
Position.propTypes = {
  className: PropTypes.string,
  children: PropTypes.func.isRequired,
  container: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  containerPadding: PropTypes.number,
  placement: PropTypes.any,
  preventOverflow: PropTypes.bool,
  triggerTarget: PropTypes.any
};
export default Position;