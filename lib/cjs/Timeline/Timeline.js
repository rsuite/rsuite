'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _some = _interopRequireDefault(require("lodash/some"));
var _TimelineItem = _interopRequireDefault(require("./TimelineItem"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _excluded = ["children", "as", "classPrefix", "className", "align", "endless", "isItemActive"];
/**
 * The `Timeline` component is used to display a list of items in chronological order.
 *
 * @see https://rsuitejs.com/components/timeline
 */
var Timeline = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Timeline', props),
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var count = _utils.ReactChildren.count(children);
  var withTime = (0, _some.default)(_react.default.Children.toArray(children), function (item) {
    var _item$props;
    return item === null || item === void 0 || (_item$props = item.props) === null || _item$props === void 0 ? void 0 : _item$props.time;
  });
  var classes = merge(className, withClassPrefix("align-" + align, {
    endless: endless,
    'with-time': withTime
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), _utils.ReactChildren.mapCloneElement(children, function (_child, index) {
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
Timeline.Item = _TimelineItem.default;
Timeline.displayName = 'Timeline';
Timeline.propTypes = {
  as: _propTypes.default.elementType,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  align: (0, _propTypes2.oneOf)(['left', 'right', 'alternate']),
  endless: _propTypes.default.bool
};
var _default = exports.default = Timeline;