'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "children", "bordered", "icon"];
import React from 'react';
import PropTypes from 'prop-types';
import StatLabel from "./StatLabel.js";
import StatValue from "./StatValue.js";
import StatValueUnit from "./StatValueUnit.js";
import StatHelpText from "./StatHelpText.js";
import StatTrend from "./StatTrend.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
var Stat = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Stat', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'stat' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    bordered = propsWithDefaults.bordered,
    icon = propsWithDefaults.icon,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    bordered: bordered
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({
    className: classes,
    ref: ref
  }, rest), icon && /*#__PURE__*/React.createElement("div", {
    className: prefix('icon')
  }, icon), /*#__PURE__*/React.createElement("dl", {
    className: prefix('body')
  }, children));
});
Stat.displayName = 'Stat';
Stat.propTypes = {
  bordered: PropTypes.bool,
  icon: PropTypes.node
};
Stat.Label = StatLabel;
Stat.Value = StatValue;
Stat.Trend = StatTrend;
Stat.ValueUnit = StatValueUnit;
Stat.HelpText = StatHelpText;
export default Stat;