'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Pagination = _interopRequireDefault(require("./Pagination"));
var _Divider = _interopRequireDefault(require("../Divider"));
var _Input = _interopRequireDefault(require("../Input"));
var _LimitPicker = _interopRequireDefault(require("./LimitPicker"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "activePage", "classPrefix", "className", "disabled", "size", "style", "total", "prev", "next", "first", "last", "limitOptions", "limit", "locale", "layout", "maxButtons", "onChangePage", "onChangeLimit"];
/**
 * The layout of the paging component.
 */

var defaultLayout = ['pager'];
var defaultLimitOptions = [30, 50, 100];

/**
 * Pagination component for displaying page numbers.
 *
 * @see https://rsuitejs.com/components/pagination
 */
var PaginationGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    activePageProp = props.activePage,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'pagination-group' : _props$classPrefix,
    className = props.className,
    disabled = props.disabled,
    size = props.size,
    style = props.style,
    total = props.total,
    prev = props.prev,
    next = props.next,
    first = props.first,
    last = props.last,
    _props$limitOptions = props.limitOptions,
    limitOptions = _props$limitOptions === void 0 ? defaultLimitOptions : _props$limitOptions,
    limitProp = props.limit,
    localeProp = props.locale,
    _props$layout = props.layout,
    layout = _props$layout === void 0 ? defaultLayout : _props$layout,
    maxButtons = props.maxButtons,
    onChangePage = props.onChangePage,
    onChangeLimit = props.onChangeLimit,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useControlled = (0, _hooks.useControlled)(limitProp, 30),
    limit = _useControlled[0],
    setLimit = _useControlled[1];
  var _useControlled2 = (0, _hooks.useControlled)(activePageProp, 1),
    activePage = _useControlled2[0],
    setActivePage = _useControlled2[1];
  var pages = Math.floor(total / limit) + (total % limit ? 1 : 0);
  var classes = merge(className, withClassPrefix(size));
  var _useCustom = (0, _CustomProvider.useCustom)(),
    getLocale = _useCustom.getLocale;
  var locale = getLocale('Pagination', localeProp);
  var handleInputBlur = (0, _hooks.useEventCallback)(function (event) {
    var value = parseInt(event.target.value);
    if (value > 0 && value <= pages) {
      onChangePage === null || onChangePage === void 0 || onChangePage(value);
      setActivePage(value);
    }
    event.target.value = '';
  });
  var handleInputPressEnter = (0, _hooks.useEventCallback)(function (event) {
    var _event$target;
    (_event$target = event.target) === null || _event$target === void 0 || _event$target.blur();
  });
  var handleChangeLimit = (0, _hooks.useEventCallback)(function (value) {
    setLimit(value);
    onChangeLimit === null || onChangeLimit === void 0 || onChangeLimit(value);
  });
  return /*#__PURE__*/_react.default.createElement(Component, {
    ref: ref,
    className: classes,
    style: style
  }, layout.map(function (key, index) {
    var onlyKey = "" + key + index;
    switch (key) {
      case '-':
        return /*#__PURE__*/_react.default.createElement("div", {
          className: prefix('grow'),
          key: onlyKey
        });
      case '|':
        return /*#__PURE__*/_react.default.createElement(_Divider.default, {
          vertical: true,
          key: onlyKey
        });
      case 'pager':
        return /*#__PURE__*/_react.default.createElement(_Pagination.default, (0, _extends2.default)({
          key: onlyKey,
          size: size,
          prev: prev,
          next: next,
          first: first,
          last: last,
          maxButtons: maxButtons,
          pages: pages,
          disabled: disabled,
          onSelect: onChangePage // fixme don't use any
          ,
          activePage: activePage
        }, rest));
      case 'total':
        return /*#__PURE__*/_react.default.createElement("div", {
          key: onlyKey,
          className: prefix('total')
        }, locale.total && (0, _utils.tplTransform)(locale.total, total));
      case 'skip':
        return /*#__PURE__*/_react.default.createElement("div", {
          key: onlyKey,
          className: (0, _classnames.default)(prefix('skip'))
        }, locale.skip && (0, _utils.tplTransform)(locale.skip, /*#__PURE__*/_react.default.createElement(_Input.default, {
          size: size,
          onBlur: handleInputBlur,
          onPressEnter: handleInputPressEnter
        })));
      case 'limit':
        return /*#__PURE__*/_react.default.createElement(_LimitPicker.default, {
          key: onlyKey,
          size: size,
          locale: locale,
          limit: limit,
          onChangeLimit: handleChangeLimit,
          limitOptions: limitOptions,
          disabled: disabled,
          prefix: prefix
        });
      default:
        return key;
    }
  }));
});
PaginationGroup.displayName = 'PaginationGroup';
PaginationGroup.propTypes = (0, _extends2.default)({}, _Pagination.default.propTypes, {
  locale: _propTypes.default.any,
  layout: _propTypes.default.array,
  limitOptions: _propTypes.default.array,
  limit: _propTypes.default.number,
  total: _propTypes.default.number,
  onChangePage: _propTypes.default.func,
  onChangeLimit: _propTypes.default.func
});
var _default = exports.default = PaginationGroup;