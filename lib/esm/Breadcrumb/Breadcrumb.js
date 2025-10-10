'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "children", "ellipsis", "maxItems", "separator", "locale", "onExpand"];
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useEventCallback } from "../internals/hooks/index.js";
import { ReactChildren, createComponent } from "../internals/utils/index.js";
import BreadcrumbItem from "./BreadcrumbItem.js";
import { useCustom } from "../CustomProvider/index.js";
var Separator = createComponent({
  name: 'BreadcrumbSeparator',
  componentAs: 'span',
  'aria-hidden': true
});

/**
 * The Breadcrumb component is used to indicate the current page location and navigate.
 * @see https://rsuitejs.com/components/breadcrumb
 */
var Breadcrumb = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Breadcrumb', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'nav' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'breadcrumb' : _propsWithDefaults$cl,
    children = propsWithDefaults.children,
    _propsWithDefaults$el = propsWithDefaults.ellipsis,
    ellipsis = _propsWithDefaults$el === void 0 ? '...' : _propsWithDefaults$el,
    _propsWithDefaults$ma = propsWithDefaults.maxItems,
    maxItems = _propsWithDefaults$ma === void 0 ? 5 : _propsWithDefaults$ma,
    _propsWithDefaults$se = propsWithDefaults.separator,
    separator = _propsWithDefaults$se === void 0 ? '/' : _propsWithDefaults$se,
    locale = propsWithDefaults.locale,
    onExpand = propsWithDefaults.onExpand,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useState = useState(true),
    showEllipsis = _useState[0],
    setShowEllipsis = _useState[1];
  var handleClickEllipsis = useEventCallback(function (event) {
    setShowEllipsis(false);
    onExpand === null || onExpand === void 0 || onExpand(event);
  });
  var content = useMemo(function () {
    var count = ReactChildren.count(children);
    var items = ReactChildren.mapCloneElement(children, function (item, index) {
      var isLast = index === count - 1;
      return _extends({}, item.props, {
        separator: isLast ? null : /*#__PURE__*/React.createElement(Separator, null, separator)
      });
    });
    if (count > maxItems && count > 2 && showEllipsis) {
      return [].concat(items.slice(0, 1), [[/*#__PURE__*/React.createElement(BreadcrumbItem, {
        role: "button",
        key: "ellipsis",
        title: locale === null || locale === void 0 ? void 0 : locale.expandText,
        "aria-label": locale === null || locale === void 0 ? void 0 : locale.expandText,
        separator: /*#__PURE__*/React.createElement(Separator, null, separator),
        onClick: handleClickEllipsis
      }, /*#__PURE__*/React.createElement("span", {
        "aria-hidden": true
      }, ellipsis))]], items.slice(items.length - 1, items.length));
    }
    return items;
  }, [children, ellipsis, handleClickEllipsis, locale === null || locale === void 0 ? void 0 : locale.expandText, maxItems, separator, showEllipsis]);
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement("ol", null, content));
});
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  ellipsis: PropTypes.node,
  separator: PropTypes.node,
  maxItems: PropTypes.number,
  onExpand: PropTypes.func
};
export default Breadcrumb;