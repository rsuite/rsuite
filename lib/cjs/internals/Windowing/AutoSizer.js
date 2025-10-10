'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _getStyle = _interopRequireDefault(require("dom-lib/getStyle"));
var _hooks = require("../hooks");
var _utils = require("../utils");
var _excluded = ["children", "className", "disableHeight", "disableWidth", "defaultHeight", "defaultWidth", "style", "onResize"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * High-order component that automatically adjusts the width and height of a single child.
 *
 * @private
 */
var AutoSizer = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    disableHeight = props.disableHeight,
    disableWidth = props.disableWidth,
    defaultHeight = props.defaultHeight,
    defaultWidth = props.defaultWidth,
    style = props.style,
    onResize = props.onResize,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useState = (0, _react.useState)(defaultHeight || 0),
    height = _useState[0],
    setHeight = _useState[1];
  var _useState2 = (0, _react.useState)(defaultWidth || 0),
    width = _useState2[0],
    setWidth = _useState2[1];
  var rootRef = (0, _react.useRef)(null);
  var getParentNode = (0, _react.useCallback)(function () {
    var _rootRef$current;
    if ((_rootRef$current = rootRef.current) !== null && _rootRef$current !== void 0 && _rootRef$current.parentNode && rootRef.current.parentNode.ownerDocument && rootRef.current.parentNode.ownerDocument.defaultView && rootRef.current.parentNode instanceof rootRef.current.parentNode.ownerDocument.defaultView.HTMLElement) {
      return rootRef.current.parentNode;
    }
    return null;
  }, []);
  var handleResize = (0, _react.useCallback)(function () {
    var parentNode = getParentNode();
    if (parentNode) {
      var offsetHeight = parentNode.offsetHeight || 0;
      var offsetWidth = parentNode.offsetWidth || 0;
      var _style = (0, _getStyle.default)(parentNode);
      var paddingLeft = parseInt(_style.paddingLeft, 10) || 0;
      var paddingRight = parseInt(_style.paddingRight, 10) || 0;
      var paddingTop = parseInt(_style.paddingTop, 10) || 0;
      var paddingBottom = parseInt(_style.paddingBottom, 10) || 0;
      var newHeight = offsetHeight - paddingTop - paddingBottom;
      var newWidth = offsetWidth - paddingLeft - paddingRight;
      if (!disableHeight && height !== newHeight || !disableWidth && width !== newWidth) {
        setHeight(offsetHeight - paddingTop - paddingBottom);
        setWidth(offsetWidth - paddingLeft - paddingRight);
        onResize === null || onResize === void 0 || onResize({
          height: offsetHeight,
          width: offsetWidth
        });
      }
    }
  }, [disableHeight, disableWidth, getParentNode, height, onResize, width]);
  (0, _hooks.useMount)(handleResize);
  (0, _hooks.useElementResize)(getParentNode(), handleResize);
  var outerStyle = {
    overflow: 'visible'
  };
  var childParams = {
    width: 0,
    height: 0
  };
  if (!disableHeight) {
    outerStyle.height = 0;
    childParams.height = height;
  }
  if (!disableWidth) {
    outerStyle.width = 0;
    childParams.width = width;
  }
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: className,
    ref: (0, _utils.mergeRefs)(rootRef, ref),
    style: (0, _extends2.default)({}, outerStyle, style)
  }, rest), children(childParams));
});
var _default = exports.default = AutoSizer;