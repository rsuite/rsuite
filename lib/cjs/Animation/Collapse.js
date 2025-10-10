'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.DIMENSION = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _getStyle = _interopRequireDefault(require("dom-lib/getStyle"));
var _addStyle = _interopRequireDefault(require("dom-lib/addStyle"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _capitalize = _interopRequireDefault(require("lodash/capitalize"));
var _Transition = _interopRequireWildcard(require("./Transition"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["className", "timeout", "dimension", "exitedClassName", "exitingClassName", "enteredClassName", "enteringClassName", "getDimensionValue", "onEnter", "onEntering", "onEntered", "onExit", "onExiting"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var DIMENSION = exports.DIMENSION = /*#__PURE__*/function (DIMENSION) {
  DIMENSION["HEIGHT"] = "height";
  DIMENSION["WIDTH"] = "width";
  return DIMENSION;
}({});
var triggerBrowserReflow = function triggerBrowserReflow(node) {
  return (0, _get2.default)(node, 'offsetHeight');
};
var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};
function defaultGetDimensionValue(dimension, elem) {
  var _get;
  var value = (_get = (0, _get2.default)(elem, "offset" + (0, _capitalize.default)(dimension))) !== null && _get !== void 0 ? _get : 0;
  var margins = MARGINS[dimension];
  return value + parseInt((0, _getStyle.default)(elem, margins[0]), 10) + parseInt((0, _getStyle.default)(elem, margins[1]), 10);
}
function getScrollDimensionValue(elem, dimension) {
  var value = (0, _get2.default)(elem, "scroll" + (0, _capitalize.default)(dimension));
  return value + "px";
}

/**
 * A Collapse animation component.
 * @see https://rsuitejs.com/components/animation/#collapse
 */
var Collapse = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Collapse', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var className = propsWithDefaults.className,
    _propsWithDefaults$ti = propsWithDefaults.timeout,
    timeout = _propsWithDefaults$ti === void 0 ? 300 : _propsWithDefaults$ti,
    _propsWithDefaults$di = propsWithDefaults.dimension,
    dimensionProp = _propsWithDefaults$di === void 0 ? DIMENSION.HEIGHT : _propsWithDefaults$di,
    exitedClassName = propsWithDefaults.exitedClassName,
    exitingClassName = propsWithDefaults.exitingClassName,
    enteredClassName = propsWithDefaults.enteredClassName,
    enteringClassName = propsWithDefaults.enteringClassName,
    _propsWithDefaults$ge = propsWithDefaults.getDimensionValue,
    getDimensionValue = _propsWithDefaults$ge === void 0 ? defaultGetDimensionValue : _propsWithDefaults$ge,
    onEnter = propsWithDefaults.onEnter,
    onEntering = propsWithDefaults.onEntering,
    onEntered = propsWithDefaults.onEntered,
    onExit = propsWithDefaults.onExit,
    onExiting = propsWithDefaults.onExiting,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)('anim'),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var dimension = typeof dimensionProp === 'function' ? dimensionProp() : dimensionProp;
  var handleEnter = (0, _react.useCallback)(function (elem) {
    (0, _addStyle.default)(elem, dimension, 0);
  }, [dimension]);
  var handleEntering = (0, _react.useCallback)(function (elem) {
    (0, _addStyle.default)(elem, dimension, getScrollDimensionValue(elem, dimension));
  }, [dimension]);
  var handleEntered = (0, _react.useCallback)(function (elem) {
    (0, _addStyle.default)(elem, dimension, 'auto');
  }, [dimension]);
  var handleExit = (0, _react.useCallback)(function (elem) {
    var value = getDimensionValue ? getDimensionValue(dimension, elem) : 0;
    (0, _addStyle.default)(elem, dimension, value + "px");
  }, [dimension, getDimensionValue]);
  var handleExiting = (0, _react.useCallback)(function (elem) {
    triggerBrowserReflow(elem);
    (0, _addStyle.default)(elem, dimension, 0);
  }, [dimension]);
  return /*#__PURE__*/_react.default.createElement(_Transition.default, (0, _extends2.default)({}, rest, {
    ref: ref,
    timeout: timeout,
    className: merge(className, prefix({
      'collapse-horizontal': dimension === 'width'
    })),
    exitedClassName: exitedClassName || prefix('collapse'),
    exitingClassName: exitingClassName || prefix('collapsing'),
    enteredClassName: enteredClassName || prefix('collapse', 'in'),
    enteringClassName: enteringClassName || prefix('collapsing'),
    onEnter: (0, _utils.createChainedFunction)(handleEnter, onEnter),
    onEntering: (0, _utils.createChainedFunction)(handleEntering, onEntering),
    onEntered: (0, _utils.createChainedFunction)(handleEntered, onEntered),
    onExit: (0, _utils.createChainedFunction)(handleExit, onExit),
    onExiting: (0, _utils.createChainedFunction)(handleExiting, onExiting)
  }));
});
Collapse.displayName = 'Collapse';
Collapse.propTypes = (0, _extends2.default)({}, _Transition.transitionPropTypes, {
  dimension: _propTypes.default.any,
  getDimensionValue: _propTypes.default.func
});
var _default = exports.default = Collapse;