'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _constants = require("../internals/constants");
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "classPrefix", "className"];
/**
 * The `Col` component is used for layout and grids.
 * @see https://rsuitejs.com/en/components/grid
 */
var Col = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Col', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'col' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    rootPrefix = _useClassNames.rootPrefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var colClasses = {};
  var omitKeys = {};
  var getPropValue = function getPropValue(key) {
    omitKeys[key] = null;
    return rest[key];
  };
  _constants.COLUMN_SIZE.forEach(function (size) {
    var col = getPropValue(size);
    var hidden = getPropValue(size + "Hidden");
    var offset = getPropValue(size + "Offset");
    var push = getPropValue(size + "Push");
    var pull = getPropValue(size + "Pull");
    colClasses[rootPrefix("hidden-" + size)] = hidden;
    colClasses[prefix(size + "-" + col)] = col >= 0;
    colClasses[prefix(size + "-offset-" + offset)] = offset >= 0;
    colClasses[prefix(size + "-push-" + push)] = push >= 0;
    colClasses[prefix(size + "-pull-" + pull)] = pull >= 0;
  });
  var classes = merge(className, withClassPrefix(), colClasses);
  var unhandledProps = (0, _omit.default)(rest, Object.keys(omitKeys));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "gridcell"
  }, unhandledProps, {
    ref: ref,
    className: classes
  }));
});
Col.displayName = 'Col';
Col.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  xs: _propTypes.default.number,
  sm: _propTypes.default.number,
  md: _propTypes.default.number,
  lg: _propTypes.default.number,
  xl: _propTypes.default.number,
  xxl: _propTypes.default.number,
  xsOffset: _propTypes.default.number,
  smOffset: _propTypes.default.number,
  mdOffset: _propTypes.default.number,
  lgOffset: _propTypes.default.number,
  xlOffset: _propTypes.default.number,
  xxlOffset: _propTypes.default.number,
  xsPush: _propTypes.default.number,
  smPush: _propTypes.default.number,
  mdPush: _propTypes.default.number,
  lgPush: _propTypes.default.number,
  xsPull: _propTypes.default.number,
  smPull: _propTypes.default.number,
  mdPull: _propTypes.default.number,
  lgPull: _propTypes.default.number,
  xlPull: _propTypes.default.number,
  xxlPull: _propTypes.default.number,
  xsHidden: _propTypes.default.bool,
  smHidden: _propTypes.default.bool,
  mdHidden: _propTypes.default.bool,
  lgHidden: _propTypes.default.bool,
  xlHidden: _propTypes.default.bool,
  xxlHidden: _propTypes.default.bool,
  as: _propTypes.default.elementType
};
var _default = exports.default = Col;