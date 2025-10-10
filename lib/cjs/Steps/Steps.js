'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _StepItem = _interopRequireDefault(require("./StepItem"));
var _utils = require("../internals/utils");
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _propTypes2 = require("../internals/propTypes");
var _excluded = ["as", "classPrefix", "className", "children", "vertical", "small", "current", "currentStatus"];
/**
 * The `Steps` component is used to guide users to complete tasks in accordance with the process.
 *
 * @see https://rsuitejs.com/components/steps
 */
var Steps = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Steps', props),
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var horizontal = !vertical;
  var classes = merge(className, withClassPrefix({
    small: small,
    vertical: vertical,
    horizontal: !vertical
  }));
  var count = _utils.ReactChildren.count(children);
  var items = _utils.ReactChildren.mapCloneElement(children, function (item, index) {
    var itemStyles = {
      flexBasis: index < count - 1 ? 100 / (count - 1) + "%" : undefined,
      maxWidth: index === count - 1 ? 100 / count + "%" : undefined
    };
    var itemProps = (0, _extends2.default)({
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
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), items);
});
Steps.Item = _StepItem.default;
Steps.displayName = 'Steps';
Steps.propTypes = {
  classPrefix: _propTypes.default.string,
  vertical: _propTypes.default.bool,
  small: _propTypes.default.bool,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  current: _propTypes.default.number,
  currentStatus: (0, _propTypes2.oneOf)(['finish', 'wait', 'process', 'error'])
};
var _default = exports.default = Steps;