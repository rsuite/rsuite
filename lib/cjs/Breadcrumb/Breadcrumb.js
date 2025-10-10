'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _BreadcrumbItem = _interopRequireDefault(require("./BreadcrumbItem"));
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "className", "classPrefix", "children", "ellipsis", "maxItems", "separator", "locale", "onExpand"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var Separator = (0, _utils.createComponent)({
  name: 'BreadcrumbSeparator',
  componentAs: 'span',
  'aria-hidden': true
});

/**
 * The Breadcrumb component is used to indicate the current page location and navigate.
 * @see https://rsuitejs.com/components/breadcrumb
 */
var Breadcrumb = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Breadcrumb', props),
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useState = (0, _react.useState)(true),
    showEllipsis = _useState[0],
    setShowEllipsis = _useState[1];
  var handleClickEllipsis = (0, _hooks.useEventCallback)(function (event) {
    setShowEllipsis(false);
    onExpand === null || onExpand === void 0 || onExpand(event);
  });
  var content = (0, _react.useMemo)(function () {
    var count = _utils.ReactChildren.count(children);
    var items = _utils.ReactChildren.mapCloneElement(children, function (item, index) {
      var isLast = index === count - 1;
      return (0, _extends2.default)({}, item.props, {
        separator: isLast ? null : /*#__PURE__*/_react.default.createElement(Separator, null, separator)
      });
    });
    if (count > maxItems && count > 2 && showEllipsis) {
      return [].concat(items.slice(0, 1), [[/*#__PURE__*/_react.default.createElement(_BreadcrumbItem.default, {
        role: "button",
        key: "ellipsis",
        title: locale === null || locale === void 0 ? void 0 : locale.expandText,
        "aria-label": locale === null || locale === void 0 ? void 0 : locale.expandText,
        separator: /*#__PURE__*/_react.default.createElement(Separator, null, separator),
        onClick: handleClickEllipsis
      }, /*#__PURE__*/_react.default.createElement("span", {
        "aria-hidden": true
      }, ellipsis))]], items.slice(items.length - 1, items.length));
    }
    return items;
  }, [children, ellipsis, handleClickEllipsis, locale === null || locale === void 0 ? void 0 : locale.expandText, maxItems, separator, showEllipsis]);
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement("ol", null, content));
});
Breadcrumb.Item = _BreadcrumbItem.default;
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = {
  as: _propTypes.default.elementType,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  ellipsis: _propTypes.default.node,
  separator: _propTypes.default.node,
  maxItems: _propTypes.default.number,
  onExpand: _propTypes.default.func
};
var _default = exports.default = Breadcrumb;