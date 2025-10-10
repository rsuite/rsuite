'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _propTypes2 = require("../internals/propTypes");
var _templateObject;
var _excluded = ["as", "className", "rows", "rowHeight", "rowMargin", "rowSpacing", "graph", "active", "classPrefix"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `Placeholder.Paragraph` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
var PlaceholderParagraph = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('PlaceholderParagraph', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$ro = propsWithDefaults.rows,
    rows = _propsWithDefaults$ro === void 0 ? 2 : _propsWithDefaults$ro,
    _propsWithDefaults$ro2 = propsWithDefaults.rowHeight,
    rowHeight = _propsWithDefaults$ro2 === void 0 ? 10 : _propsWithDefaults$ro2,
    _propsWithDefaults$ro3 = propsWithDefaults.rowMargin,
    rowMargin = _propsWithDefaults$ro3 === void 0 ? 20 : _propsWithDefaults$ro3,
    _propsWithDefaults$ro4 = propsWithDefaults.rowSpacing,
    rowSpacing = _propsWithDefaults$ro4 === void 0 ? rowMargin : _propsWithDefaults$ro4,
    graph = propsWithDefaults.graph,
    active = propsWithDefaults.active,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'placeholder' : _propsWithDefaults$cl,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var graphShape = graph === true ? 'square' : graph;
  var rowElements = (0, _react.useMemo)(function () {
    var rowArr = [];
    for (var i = 0; i < rows; i++) {
      var styles = {
        height: rowHeight,
        marginTop: i > 0 ? rowSpacing : Number(rowSpacing) / 2
      };
      rowArr.push(/*#__PURE__*/_react.default.createElement("div", {
        key: i,
        style: styles,
        className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["row"])))
      }));
    }
    return rowArr;
  }, [prefix, rowHeight, rowSpacing, rows]);
  var classes = merge(className, withClassPrefix('paragraph', {
    active: active
  }));
  var graphClasses = prefix('paragraph-graph', "paragraph-graph-" + graphShape);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), graphShape && /*#__PURE__*/_react.default.createElement("div", {
    className: graphClasses
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('paragraph-graph-inner')
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('paragraph-group')
  }, rowElements));
});
PlaceholderParagraph.displayName = 'PlaceholderParagraph';
PlaceholderParagraph.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  rows: _propTypes.default.number,
  rowHeight: _propTypes.default.number,
  rowSpacing: _propTypes.default.number,
  graph: _propTypes.default.oneOfType([_propTypes.default.bool, (0, _propTypes2.oneOf)(['circle', 'square', 'image'])]),
  active: _propTypes.default.bool
};
var _default = exports.default = PlaceholderParagraph;