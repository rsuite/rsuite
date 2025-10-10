'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["className", "timeout", "dimension", "exitedClassName", "exitingClassName", "enteredClassName", "enteringClassName", "getDimensionValue", "onEnter", "onEntering", "onEntered", "onExit", "onExiting"];
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import getStyle from 'dom-lib/getStyle';
import addStyle from 'dom-lib/addStyle';
import get from 'lodash/get';
import capitalize from 'lodash/capitalize';
import Transition, { transitionPropTypes } from "./Transition.js";
import { useClassNames } from "../internals/hooks/index.js";
import { createChainedFunction } from "../internals/utils/index.js";
import { useCustom } from "../CustomProvider/index.js";
export var DIMENSION = /*#__PURE__*/function (DIMENSION) {
  DIMENSION["HEIGHT"] = "height";
  DIMENSION["WIDTH"] = "width";
  return DIMENSION;
}({});
var triggerBrowserReflow = function triggerBrowserReflow(node) {
  return get(node, 'offsetHeight');
};
var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};
function defaultGetDimensionValue(dimension, elem) {
  var _get;
  var value = (_get = get(elem, "offset" + capitalize(dimension))) !== null && _get !== void 0 ? _get : 0;
  var margins = MARGINS[dimension];
  return value + parseInt(getStyle(elem, margins[0]), 10) + parseInt(getStyle(elem, margins[1]), 10);
}
function getScrollDimensionValue(elem, dimension) {
  var value = get(elem, "scroll" + capitalize(dimension));
  return value + "px";
}

/**
 * A Collapse animation component.
 * @see https://rsuitejs.com/components/animation/#collapse
 */
var Collapse = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Collapse', props),
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
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames('anim'),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var dimension = typeof dimensionProp === 'function' ? dimensionProp() : dimensionProp;
  var handleEnter = useCallback(function (elem) {
    addStyle(elem, dimension, 0);
  }, [dimension]);
  var handleEntering = useCallback(function (elem) {
    addStyle(elem, dimension, getScrollDimensionValue(elem, dimension));
  }, [dimension]);
  var handleEntered = useCallback(function (elem) {
    addStyle(elem, dimension, 'auto');
  }, [dimension]);
  var handleExit = useCallback(function (elem) {
    var value = getDimensionValue ? getDimensionValue(dimension, elem) : 0;
    addStyle(elem, dimension, value + "px");
  }, [dimension, getDimensionValue]);
  var handleExiting = useCallback(function (elem) {
    triggerBrowserReflow(elem);
    addStyle(elem, dimension, 0);
  }, [dimension]);
  return /*#__PURE__*/React.createElement(Transition, _extends({}, rest, {
    ref: ref,
    timeout: timeout,
    className: merge(className, prefix({
      'collapse-horizontal': dimension === 'width'
    })),
    exitedClassName: exitedClassName || prefix('collapse'),
    exitingClassName: exitingClassName || prefix('collapsing'),
    enteredClassName: enteredClassName || prefix('collapse', 'in'),
    enteringClassName: enteringClassName || prefix('collapsing'),
    onEnter: createChainedFunction(handleEnter, onEnter),
    onEntering: createChainedFunction(handleEntering, onEntering),
    onEntered: createChainedFunction(handleEntered, onEntered),
    onExit: createChainedFunction(handleExit, onExit),
    onExiting: createChainedFunction(handleExiting, onExiting)
  }));
});
Collapse.displayName = 'Collapse';
Collapse.propTypes = _extends({}, transitionPropTypes, {
  dimension: PropTypes.any,
  getDimensionValue: PropTypes.func
});
export default Collapse;