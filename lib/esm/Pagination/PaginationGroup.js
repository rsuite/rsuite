'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "activePage", "classPrefix", "className", "disabled", "size", "style", "total", "prev", "next", "first", "last", "limitOptions", "limit", "locale", "layout", "maxButtons", "onChangePage", "onChangeLimit"];
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Pagination from "./Pagination.js";
import Divider from "../Divider/index.js";
import Input from "../Input/index.js";
import LimitPicker from "./LimitPicker.js";
import { useClassNames, useControlled, useEventCallback } from "../internals/hooks/index.js";
import { tplTransform } from "../internals/utils/index.js";
import { useCustom } from "../CustomProvider/index.js";

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
var PaginationGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useControlled = useControlled(limitProp, 30),
    limit = _useControlled[0],
    setLimit = _useControlled[1];
  var _useControlled2 = useControlled(activePageProp, 1),
    activePage = _useControlled2[0],
    setActivePage = _useControlled2[1];
  var pages = Math.floor(total / limit) + (total % limit ? 1 : 0);
  var classes = merge(className, withClassPrefix(size));
  var _useCustom = useCustom(),
    getLocale = _useCustom.getLocale;
  var locale = getLocale('Pagination', localeProp);
  var handleInputBlur = useEventCallback(function (event) {
    var value = parseInt(event.target.value);
    if (value > 0 && value <= pages) {
      onChangePage === null || onChangePage === void 0 || onChangePage(value);
      setActivePage(value);
    }
    event.target.value = '';
  });
  var handleInputPressEnter = useEventCallback(function (event) {
    var _event$target;
    (_event$target = event.target) === null || _event$target === void 0 || _event$target.blur();
  });
  var handleChangeLimit = useEventCallback(function (value) {
    setLimit(value);
    onChangeLimit === null || onChangeLimit === void 0 || onChangeLimit(value);
  });
  return /*#__PURE__*/React.createElement(Component, {
    ref: ref,
    className: classes,
    style: style
  }, layout.map(function (key, index) {
    var onlyKey = "" + key + index;
    switch (key) {
      case '-':
        return /*#__PURE__*/React.createElement("div", {
          className: prefix('grow'),
          key: onlyKey
        });
      case '|':
        return /*#__PURE__*/React.createElement(Divider, {
          vertical: true,
          key: onlyKey
        });
      case 'pager':
        return /*#__PURE__*/React.createElement(Pagination, _extends({
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
        return /*#__PURE__*/React.createElement("div", {
          key: onlyKey,
          className: prefix('total')
        }, locale.total && tplTransform(locale.total, total));
      case 'skip':
        return /*#__PURE__*/React.createElement("div", {
          key: onlyKey,
          className: classNames(prefix('skip'))
        }, locale.skip && tplTransform(locale.skip, /*#__PURE__*/React.createElement(Input, {
          size: size,
          onBlur: handleInputBlur,
          onPressEnter: handleInputPressEnter
        })));
      case 'limit':
        return /*#__PURE__*/React.createElement(LimitPicker, {
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
PaginationGroup.propTypes = _extends({}, Pagination.propTypes, {
  locale: PropTypes.any,
  layout: PropTypes.array,
  limitOptions: PropTypes.array,
  limit: PropTypes.number,
  total: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeLimit: PropTypes.func
});
export default PaginationGroup;