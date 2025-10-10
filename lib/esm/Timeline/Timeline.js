'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["children", "as", "classPrefix", "className", "align", "endless", "isItemActive"];
import React from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import TimelineItem from "./TimelineItem.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { ReactChildren } from "../internals/utils/index.js";
import { oneOf } from "../internals/propTypes/index.js";
/**
 * The `Timeline` component is used to display a list of items in chronological order.
 *
 * @see https://rsuitejs.com/components/timeline
 */
var Timeline = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Timeline', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var children = propsWithDefaults.children,
    _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'ul' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'timeline' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    _propsWithDefaults$al = propsWithDefaults.align,
    align = _propsWithDefaults$al === void 0 ? 'left' : _propsWithDefaults$al,
    endless = propsWithDefaults.endless,
    _propsWithDefaults$is = propsWithDefaults.isItemActive,
    isItemActive = _propsWithDefaults$is === void 0 ? Timeline.ACTIVE_LAST : _propsWithDefaults$is,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var count = ReactChildren.count(children);
  var withTime = some(React.Children.toArray(children), function (item) {
    var _item$props;
    return item === null || item === void 0 || (_item$props = item.props) === null || _item$props === void 0 ? void 0 : _item$props.time;
  });
  var classes = merge(className, withClassPrefix("align-" + align, {
    endless: endless,
    'with-time': withTime
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), ReactChildren.mapCloneElement(children, function (_child, index) {
    return {
      last: index + 1 === count,
      INTERNAL_active: isItemActive(index, count),
      align: align
    };
  }));
});
Timeline.ACTIVE_FIRST = function (index) {
  return index === 0;
};
Timeline.ACTIVE_LAST = function (index, totalItemsCount) {
  return index === totalItemsCount - 1;
};
Timeline.Item = TimelineItem;
Timeline.displayName = 'Timeline';
Timeline.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  align: oneOf(['left', 'right', 'alternate']),
  endless: PropTypes.bool
};
export default Timeline;