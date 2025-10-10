'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _getContainer = _interopRequireDefault(require("dom-lib/getContainer"));
var _ownerDocument = _interopRequireDefault(require("dom-lib/ownerDocument"));
var _removeClass = _interopRequireDefault(require("dom-lib/removeClass"));
var _on = _interopRequireDefault(require("dom-lib/on"));
var _addClass = _interopRequireDefault(require("dom-lib/addClass"));
var _addStyle = _interopRequireDefault(require("dom-lib/addStyle"));
var _resizeObserver = require("@juggle/resize-observer");
var _isElement = _interopRequireDefault(require("../../DOMHelper/isElement"));
var _positionUtils = _interopRequireDefault(require("./positionUtils"));
var _utils = require("../utils");
var _hooks = require("../hooks");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  var containerRef = (0, _react.useRef)(null);
  var lastTargetRef = (0, _react.useRef)(null);
  var overlayResizeObserver = (0, _react.useRef)();
  var defaultPosition = {
    positionLeft: 0,
    positionTop: 0,
    arrowOffsetLeft: undefined,
    arrowOffsetTop: undefined
  };
  var _useState = (0, _react.useState)(defaultPosition),
    position = _useState[0],
    setPosition = _useState[1];
  var utils = (0, _react.useMemo)(function () {
    return (0, _positionUtils.default)({
      placement: placement,
      preventOverflow: preventOverflow,
      padding: containerPadding
    });
  }, [placement, preventOverflow, containerPadding]);
  var updatePosition = (0, _react.useCallback)(
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
    var targetElement = (0, _utils.getDOMNode)(triggerTarget);
    if (!(0, _isElement.default)(targetElement)) {
      throw new Error('`target` should return an HTMLElement');
    }

    //  If the target and placement do not change, the position is not updated.
    if (targetElement === lastTargetRef.current && !placementChanged) {
      return;
    }
    var overlay = (0, _utils.getDOMNode)(ref.current);
    var containerElement = (0, _getContainer.default)(typeof container === 'function' ? container() : container !== null && container !== void 0 ? container : null, (0, _ownerDocument.default)(ref.current).body);
    var posi = utils.calcOverlayPosition(overlay, targetElement, containerElement, followCursor ? cursorPosition : undefined);
    if (forceUpdateDOM && overlay) {
      var _overlay$className;
      var preClassName = overlay === null || overlay === void 0 || (_overlay$className = overlay.className) === null || _overlay$className === void 0 || (_overlay$className = _overlay$className.match(/(placement-\S+)/)) === null || _overlay$className === void 0 ? void 0 : _overlay$className[0];
      (0, _removeClass.default)(overlay, preClassName);
      if (posi.positionClassName) {
        (0, _addClass.default)(overlay, posi.positionClassName);
      }
      (0, _addStyle.default)(overlay, {
        left: posi.positionLeft + "px",
        top: posi.positionTop + "px"
      });
    } else {
      setPosition(posi);
    }
    containerRef.current = containerElement;
    lastTargetRef.current = targetElement;
  }, [container, ref, triggerTarget, utils, followCursor, cursorPosition]);
  (0, _react.useEffect)(function () {
    updatePosition(false);
    var overlay = (0, _utils.getDOMNode)(ref.current);
    var containerScrollListener;
    if (containerRef.current && preventOverflow) {
      var _containerRef$current;
      // Update the overlay position when the container scroll bar is scrolling
      containerScrollListener = (0, _on.default)(((_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.tagName) === 'BODY' ? window : containerRef.current, 'scroll', function () {
        return updatePosition(true, true);
      });
    }

    // Update the position when the window size changes
    var resizeListener = (0, _on.default)(window, 'resize', function () {
      return updatePosition(true, true);
    });
    if (overlay) {
      // Update the position when the size of the overlay changes
      overlayResizeObserver.current = new _resizeObserver.ResizeObserver(function () {
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
  (0, _hooks.useUpdateEffect)(function () {
    return updatePosition();
  }, [updatePosition, placement]);
  return [position, updatePosition];
};
/**
 * The `Position` component calculates the position of the child element.
 * @private
 */
var Position = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    followCursor = props.followCursor,
    cursorPosition = props.cursorPosition;
  var childRef = _react.default.useRef(null);
  var _usePosition = usePosition(props, childRef),
    position = _usePosition[0],
    updatePosition = _usePosition[1];
  var positionClassName = position.positionClassName,
    arrowOffsetLeft = position.arrowOffsetLeft,
    arrowOffsetTop = position.arrowOffsetTop,
    positionLeft = position.positionLeft,
    positionTop = position.positionTop;
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      get child() {
        return childRef.current;
      },
      updatePosition: updatePosition
    };
  });
  (0, _react.useEffect)(function () {
    if (!followCursor || !cursorPosition) return;
    updatePosition();
  }, [followCursor, cursorPosition, updatePosition]);
  if (typeof children === 'function') {
    var childProps = {
      className: (0, _classnames.default)(className, positionClassName),
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
  className: _propTypes.default.string,
  children: _propTypes.default.func.isRequired,
  container: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.any]),
  containerPadding: _propTypes.default.number,
  placement: _propTypes.default.any,
  preventOverflow: _propTypes.default.bool,
  triggerTarget: _propTypes.default.any
};
var _default = exports.default = Position;