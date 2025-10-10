'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _useSortHelper2 = _interopRequireDefault(require("./helper/useSortHelper"));
var _ListContext = _interopRequireDefault(require("./ListContext"));
var _ListItem = _interopRequireDefault(require("./ListItem"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "autoScroll", "bordered", "classPrefix", "className", "children", "divider", "hover", "size", "sortable", "pressDelay", "transitionDuration", "onSort", "onSortEnd", "onSortMove", "onSortStart"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `List` component is used to specify the layout of the list.
 * @see https://rsuitejs.com/components/list
 */
var List = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('List', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$au = propsWithDefaults.autoScroll,
    autoScroll = _propsWithDefaults$au === void 0 ? true : _propsWithDefaults$au,
    bordered = propsWithDefaults.bordered,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'list' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    _propsWithDefaults$di = propsWithDefaults.divider,
    divider = _propsWithDefaults$di === void 0 ? true : _propsWithDefaults$di,
    hover = propsWithDefaults.hover,
    _propsWithDefaults$si = propsWithDefaults.size,
    size = _propsWithDefaults$si === void 0 ? 'md' : _propsWithDefaults$si,
    sortable = propsWithDefaults.sortable,
    _propsWithDefaults$pr = propsWithDefaults.pressDelay,
    pressDelay = _propsWithDefaults$pr === void 0 ? 0 : _propsWithDefaults$pr,
    _propsWithDefaults$tr = propsWithDefaults.transitionDuration,
    transitionDuration = _propsWithDefaults$tr === void 0 ? 300 : _propsWithDefaults$tr,
    onSort = propsWithDefaults.onSort,
    onSortEnd = propsWithDefaults.onSortEnd,
    onSortMove = propsWithDefaults.onSortMove,
    onSortStart = propsWithDefaults.onSortStart,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var _useSortHelper = (0, _useSortHelper2.default)({
      autoScroll: autoScroll,
      onSort: onSort,
      onSortEnd: onSortEnd,
      onSortMove: onSortMove,
      onSortStart: onSortStart,
      pressDelay: pressDelay,
      transitionDuration: transitionDuration
    }),
    containerRef = _useSortHelper.containerRef,
    register = _useSortHelper.register,
    sorting = _useSortHelper.sorting,
    handleEnd = _useSortHelper.handleEnd,
    handleStart = _useSortHelper.handleStart,
    handleTouchStart = _useSortHelper.handleTouchStart,
    handleTouchEnd = _useSortHelper.handleTouchEnd;
  var classes = merge(className, withClassPrefix({
    bordered: bordered,
    sortable: sortable,
    sorting: sorting,
    hover: hover,
    divider: divider
  }));
  var contextValue = (0, _react.useMemo)(function () {
    return {
      bordered: bordered,
      size: size,
      register: register
    };
  }, [bordered, register, size]);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "list"
  }, rest, {
    ref: (0, _utils.mergeRefs)(containerRef, ref),
    className: classes,
    onMouseDown: sortable ? handleStart : undefined,
    onMouseUp: sortable ? handleEnd : undefined,
    onTouchStart: sortable ? handleTouchStart : undefined,
    onTouchEnd: sortable ? handleTouchEnd : undefined
  }), /*#__PURE__*/_react.default.createElement(_ListContext.default.Provider, {
    value: contextValue
  }, children));
});
List.Item = _ListItem.default;
List.displayName = 'List';
List.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  bordered: _propTypes.default.bool,
  divider: _propTypes.default.bool,
  hover: _propTypes.default.bool,
  sortable: _propTypes.default.bool,
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs']),
  autoScroll: _propTypes.default.bool,
  pressDelay: _propTypes.default.number,
  transitionDuration: _propTypes.default.number,
  onSortStart: _propTypes.default.func,
  onSortMove: _propTypes.default.func,
  onSortEnd: _propTypes.default.func,
  onSort: _propTypes.default.func
};
var _default = exports.default = List;