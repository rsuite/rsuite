'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _templateObject;
var _excluded = ["as", "className", "classPrefix", "rows", "columns", "rowHeight", "rowMargin", "rowSpacing", "active"];
/**
 * The `Placeholder.Grid` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
var PlaceholderGrid = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('PlaceholderGrid', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'placeholder' : _propsWithDefaults$cl,
    _propsWithDefaults$ro = propsWithDefaults.rows,
    rows = _propsWithDefaults$ro === void 0 ? 5 : _propsWithDefaults$ro,
    _propsWithDefaults$co = propsWithDefaults.columns,
    columns = _propsWithDefaults$co === void 0 ? 5 : _propsWithDefaults$co,
    _propsWithDefaults$ro2 = propsWithDefaults.rowHeight,
    rowHeight = _propsWithDefaults$ro2 === void 0 ? 10 : _propsWithDefaults$ro2,
    _propsWithDefaults$ro3 = propsWithDefaults.rowMargin,
    rowMargin = _propsWithDefaults$ro3 === void 0 ? 20 : _propsWithDefaults$ro3,
    _propsWithDefaults$ro4 = propsWithDefaults.rowSpacing,
    rowSpacing = _propsWithDefaults$ro4 === void 0 ? rowMargin : _propsWithDefaults$ro4,
    active = propsWithDefaults.active,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix('grid', {
    active: active
  }));
  var colItems = [];
  for (var i = 0; i < columns; i++) {
    var rowItems = [];
    for (var j = 0; j < rows; j++) {
      rowItems.push(/*#__PURE__*/_react.default.createElement("div", {
        key: j,
        style: {
          height: rowHeight,
          marginTop: j > 0 ? rowSpacing : undefined
        },
        className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["row"])))
      }));
    }
    colItems.push(/*#__PURE__*/_react.default.createElement("div", {
      key: i,
      className: (0, _classnames.default)(prefix('grid-col'))
    }, rowItems));
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), colItems);
});
PlaceholderGrid.displayName = 'PlaceholderGrid';
PlaceholderGrid.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  rows: _propTypes.default.number,
  columns: _propTypes.default.number,
  rowHeight: _propTypes.default.number,
  rowSpacing: _propTypes.default.number,
  active: _propTypes.default.bool
};
var _default = exports.default = PlaceholderGrid;