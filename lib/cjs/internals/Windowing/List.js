'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.defaultItemSize = exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _ScrollView = _interopRequireDefault(require("../ScrollView"));
var _reactWindow = require("react-window");
var _CustomProvider = require("../../CustomProvider");
var _excluded = ["rowHeight", "as", "itemSize", "scrollShadow"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var defaultItemSize = exports.defaultItemSize = function defaultItemSize() {
  return 36;
};
var OuterElementType = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(_ScrollView.default, (0, _extends2.default)({
    scrollShadow: true,
    ref: ref
  }, props));
});

/**
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 *
 * @private
 */
var List = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var rowHeight = props.rowHeight,
    _props$as = props.as,
    Component = _props$as === void 0 ? _reactWindow.VariableSizeList : _props$as,
    itemSizeProp = props.itemSize,
    scrollShadow = props.scrollShadow,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var listRef = (0, _react.useRef)(null);
  var _useCustom = (0, _CustomProvider.useCustom)(),
    rtl = _useCustom.rtl;
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      resetAfterIndex: function resetAfterIndex(index, shouldForceUpdate) {
        var _listRef$current, _listRef$current$rese;
        (_listRef$current = listRef.current) === null || _listRef$current === void 0 || (_listRef$current$rese = _listRef$current.resetAfterIndex) === null || _listRef$current$rese === void 0 || _listRef$current$rese.call(_listRef$current, index, shouldForceUpdate);
      },
      scrollTo: function scrollTo(scrollOffset) {
        var _listRef$current2, _listRef$current2$scr;
        (_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 || (_listRef$current2$scr = _listRef$current2.scrollTo) === null || _listRef$current2$scr === void 0 || _listRef$current2$scr.call(_listRef$current2, scrollOffset);
      },
      scrollToItem: function scrollToItem(index, align) {
        var _listRef$current3, _listRef$current3$scr;
        (_listRef$current3 = listRef.current) === null || _listRef$current3 === void 0 || (_listRef$current3$scr = _listRef$current3.scrollToItem) === null || _listRef$current3$scr === void 0 || _listRef$current3$scr.call(_listRef$current3, index, align);
      },
      scrollToRow: function scrollToRow(index) {
        var _listRef$current4, _listRef$current4$scr;
        (_listRef$current4 = listRef.current) === null || _listRef$current4 === void 0 || (_listRef$current4$scr = _listRef$current4.scrollToItem) === null || _listRef$current4$scr === void 0 || _listRef$current4$scr.call(_listRef$current4, index);
      }
    };
  });
  var setRowHeight = (0, _react.useCallback)(function (index) {
    return typeof rowHeight === 'function' ? rowHeight({
      index: index
    }) : rowHeight || 0;
  }, [rowHeight]);
  var itemSize = (0, _react.useMemo)(function () {
    if (typeof itemSizeProp === 'function') return itemSizeProp;
    return function () {
      return itemSizeProp;
    };
  }, [itemSizeProp]);
  var compatibleProps = (0, _extends2.default)({
    itemSize: itemSize
  }, rest);
  if (rowHeight) {
    compatibleProps.itemSize = Component === _reactWindow.VariableSizeList ? setRowHeight : rowHeight;
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: listRef,
    direction: rtl ? 'rtl' : 'ltr'
  }, compatibleProps, {
    outerElementType: scrollShadow ? OuterElementType : undefined
  }));
});
var _default = exports.default = List;