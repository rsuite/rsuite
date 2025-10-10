'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _highlightText = require("./utils/highlightText");
var _utils = require("../internals/utils");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "classPrefix", "className", "children", "query", "renderMark"];
function defaultRenderMark(match, index) {
  return /*#__PURE__*/_react.default.createElement("mark", {
    key: index,
    className: "rs-highlight-mark"
  }, match);
}

/**
 *
 * Highlight the matching text in the content.
 *
 * @see https://rsuitejs.com/components/highlight
 */
var Highlight = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Highlight', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'highlight' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    query = propsWithDefaults.query,
    _propsWithDefaults$re = propsWithDefaults.renderMark,
    renderMark = _propsWithDefaults$re === void 0 ? defaultRenderMark : _propsWithDefaults$re,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  var text = (0, _utils.stringifyReactNode)(children);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    className: classes
  }, rest), (0, _highlightText.highlightText)(text, {
    query: query,
    renderMark: renderMark
  }));
});
Highlight.displayName = 'Highlight';
Highlight.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  as: _propTypes.default.elementType
};
var _default = exports.default = Highlight;