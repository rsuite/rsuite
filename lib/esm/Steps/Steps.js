'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "children", "vertical", "small", "current", "currentStatus"];
import React from 'react';
import PropTypes from 'prop-types';
import StepItem from "./StepItem.js";
import { ReactChildren } from "../internals/utils/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { oneOf } from "../internals/propTypes/index.js";
/**
 * The `Steps` component is used to guide users to complete tasks in accordance with the process.
 *
 * @see https://rsuitejs.com/components/steps
 */
var Steps = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Steps', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'steps' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    vertical = propsWithDefaults.vertical,
    small = propsWithDefaults.small,
    _propsWithDefaults$cu = propsWithDefaults.current,
    current = _propsWithDefaults$cu === void 0 ? 0 : _propsWithDefaults$cu,
    _propsWithDefaults$cu2 = propsWithDefaults.currentStatus,
    currentStatus = _propsWithDefaults$cu2 === void 0 ? 'process' : _propsWithDefaults$cu2,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var horizontal = !vertical;
  var classes = merge(className, withClassPrefix({
    small: small,
    vertical: vertical,
    horizontal: !vertical
  }));
  var count = ReactChildren.count(children);
  var items = ReactChildren.mapCloneElement(children, function (item, index) {
    var itemStyles = {
      flexBasis: index < count - 1 ? 100 / (count - 1) + "%" : undefined,
      maxWidth: index === count - 1 ? 100 / count + "%" : undefined
    };
    var itemProps = _extends({
      stepNumber: index + 1,
      status: 'wait',
      style: horizontal ? itemStyles : undefined
    }, item.props);

    // fix tail color
    if (currentStatus === 'error' && index === current - 1) {
      itemProps.className = prefix('next-error');
    }
    if (!item.props.status) {
      if (index === current) {
        itemProps.status = currentStatus;
        itemProps.className = merge(itemProps.className, prefix('item-active'));
      } else if (index < current) {
        itemProps.status = 'finish';
      }
    }
    return itemProps;
  });
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), items);
});
Steps.Item = StepItem;
Steps.displayName = 'Steps';
Steps.propTypes = {
  classPrefix: PropTypes.string,
  vertical: PropTypes.bool,
  small: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  current: PropTypes.number,
  currentStatus: oneOf(['finish', 'wait', 'process', 'error'])
};
export default Steps;