'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className"];
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { COLUMN_SIZE } from "../internals/constants/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Col` component is used for layout and grids.
 * @see https://rsuitejs.com/en/components/grid
 */
var Col = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Col', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'col' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
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
  COLUMN_SIZE.forEach(function (size) {
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
  var unhandledProps = omit(rest, Object.keys(omitKeys));
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "gridcell"
  }, unhandledProps, {
    ref: ref,
    className: classes
  }));
});
Col.displayName = 'Col';
Col.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xxl: PropTypes.number,
  xsOffset: PropTypes.number,
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  lgOffset: PropTypes.number,
  xlOffset: PropTypes.number,
  xxlOffset: PropTypes.number,
  xsPush: PropTypes.number,
  smPush: PropTypes.number,
  mdPush: PropTypes.number,
  lgPush: PropTypes.number,
  xsPull: PropTypes.number,
  smPull: PropTypes.number,
  mdPull: PropTypes.number,
  lgPull: PropTypes.number,
  xlPull: PropTypes.number,
  xxlPull: PropTypes.number,
  xsHidden: PropTypes.bool,
  smHidden: PropTypes.bool,
  mdHidden: PropTypes.bool,
  lgHidden: PropTypes.bool,
  xlHidden: PropTypes.bool,
  xxlHidden: PropTypes.bool,
  as: PropTypes.elementType
};
export default Col;