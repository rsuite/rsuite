'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _PointerMoveTracker = _interopRequireDefault(require("dom-lib/PointerMoveTracker"));
var _addStyle = _interopRequireDefault(require("dom-lib/addStyle"));
var _getWidth = _interopRequireDefault(require("dom-lib/getWidth"));
var _hooks = require("../internals/hooks");
var useDrag = function useDrag(props) {
  var rootRef = (0, _react.useRef)(null);
  var tooltipRef = (0, _react.useRef)(null);
  var tooltip = props.tooltip,
    disabled = props.disabled,
    onDragMove = props.onDragMove,
    onDragEnd = props.onDragEnd,
    onDragStart = props.onDragStart,
    keepTooltipOpen = props.keepTooltipOpen;
  var _useState = (0, _react.useState)(false),
    active = _useState[0],
    setActive = _useState[1];
  var moveTracker = (0, _react.useRef)();

  // Release the move event
  var releaseMoves = (0, _react.useCallback)(function () {
    var _moveTracker$current;
    (_moveTracker$current = moveTracker.current) === null || _moveTracker$current === void 0 || _moveTracker$current.releaseMoves();
    moveTracker.current = null;
  }, []);
  var setTooltipPosition = (0, _react.useCallback)(function () {
    var tooltipElement = tooltipRef.current;
    if (tooltip && tooltipElement) {
      var width = (0, _getWidth.default)(tooltipElement);
      // Set the position of the tooltip
      (0, _addStyle.default)(tooltipElement, 'left', "-" + width / 2 + "px");
    }
  }, [tooltip]);
  var handleDragMove = (0, _hooks.useEventCallback)(function (_deltaX, _deltaY, event) {
    var _moveTracker$current2;
    if ((_moveTracker$current2 = moveTracker.current) !== null && _moveTracker$current2 !== void 0 && _moveTracker$current2.isDragging()) {
      var _rootRef$current;
      onDragMove === null || onDragMove === void 0 || onDragMove(event, (_rootRef$current = rootRef.current) === null || _rootRef$current === void 0 ? void 0 : _rootRef$current.dataset);
      setTooltipPosition();
    }
  });
  var handleDragEnd = (0, _hooks.useEventCallback)(function (event) {
    var _rootRef$current2;
    setActive(false);
    releaseMoves();
    onDragEnd === null || onDragEnd === void 0 || onDragEnd(event, (_rootRef$current2 = rootRef.current) === null || _rootRef$current2 === void 0 ? void 0 : _rootRef$current2.dataset);
  });
  var getMouseMoveTracker = (0, _react.useCallback)(function () {
    return moveTracker.current || new _PointerMoveTracker.default(document.body, {
      onMove: handleDragMove,
      onMoveEnd: handleDragEnd,
      useTouchEvent: true
    });
  }, [handleDragEnd, handleDragMove]);
  var onMoveStart = (0, _hooks.useEventCallback)(function (event) {
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
  var onMouseEnter = (0, _hooks.useEventCallback)(function () {
    setTooltipPosition();
  });
  (0, _react.useEffect)(function () {
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
var _default = exports.default = useDrag;