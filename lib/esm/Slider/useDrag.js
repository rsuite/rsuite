'use client';
import { useRef, useEffect, useCallback, useState } from 'react';
import PointerMoveTracker from 'dom-lib/PointerMoveTracker';
import addStyle from 'dom-lib/addStyle';
import getWidth from 'dom-lib/getWidth';
import { useEventCallback } from "../internals/hooks/index.js";
var useDrag = function useDrag(props) {
  var rootRef = useRef(null);
  var tooltipRef = useRef(null);
  var tooltip = props.tooltip,
    disabled = props.disabled,
    onDragMove = props.onDragMove,
    onDragEnd = props.onDragEnd,
    onDragStart = props.onDragStart,
    keepTooltipOpen = props.keepTooltipOpen;
  var _useState = useState(false),
    active = _useState[0],
    setActive = _useState[1];
  var moveTracker = useRef();

  // Release the move event
  var releaseMoves = useCallback(function () {
    var _moveTracker$current;
    (_moveTracker$current = moveTracker.current) === null || _moveTracker$current === void 0 || _moveTracker$current.releaseMoves();
    moveTracker.current = null;
  }, []);
  var setTooltipPosition = useCallback(function () {
    var tooltipElement = tooltipRef.current;
    if (tooltip && tooltipElement) {
      var width = getWidth(tooltipElement);
      // Set the position of the tooltip
      addStyle(tooltipElement, 'left', "-" + width / 2 + "px");
    }
  }, [tooltip]);
  var handleDragMove = useEventCallback(function (_deltaX, _deltaY, event) {
    var _moveTracker$current2;
    if ((_moveTracker$current2 = moveTracker.current) !== null && _moveTracker$current2 !== void 0 && _moveTracker$current2.isDragging()) {
      var _rootRef$current;
      onDragMove === null || onDragMove === void 0 || onDragMove(event, (_rootRef$current = rootRef.current) === null || _rootRef$current === void 0 ? void 0 : _rootRef$current.dataset);
      setTooltipPosition();
    }
  });
  var handleDragEnd = useEventCallback(function (event) {
    var _rootRef$current2;
    setActive(false);
    releaseMoves();
    onDragEnd === null || onDragEnd === void 0 || onDragEnd(event, (_rootRef$current2 = rootRef.current) === null || _rootRef$current2 === void 0 ? void 0 : _rootRef$current2.dataset);
  });
  var getMouseMoveTracker = useCallback(function () {
    return moveTracker.current || new PointerMoveTracker(document.body, {
      onMove: handleDragMove,
      onMoveEnd: handleDragEnd,
      useTouchEvent: true
    });
  }, [handleDragEnd, handleDragMove]);
  var onMoveStart = useEventCallback(function (event) {
    var _moveTracker$current3, _rootRef$current3;
    if (disabled) {
      return;
    }
    moveTracker.current = getMouseMoveTracker();
    (_moveTracker$current3 = moveTracker.current) === null || _moveTracker$current3 === void 0 || _moveTracker$current3.captureMoves(event);
    (_rootRef$current3 = rootRef.current) === null || _rootRef$current3 === void 0 || _rootRef$current3.focus();
    setActive(true);
    onDragStart === null || onDragStart === void 0 || onDragStart(event);
  });
  var onMouseEnter = useEventCallback(function () {
    setTooltipPosition();
  });
  useEffect(function () {
    if (keepTooltipOpen) {
      onMouseEnter();
    }
    return function () {
      releaseMoves();
    };
  }, [releaseMoves, keepTooltipOpen]);
  return {
    active: active,
    rootRef: rootRef,
    tooltipRef: tooltipRef,
    onMoveStart: onMoveStart,
    onMouseEnter: onMouseEnter
  };
};
export default useDrag;