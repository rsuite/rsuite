"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _StepItem = _interopRequireDefault(require("./StepItem"));

var _utils = require("../utils");

var Steps =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Steps, _React$Component);

  function Steps() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Steps.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        children = _this$props.children,
        vertical = _this$props.vertical,
        small = _this$props.small,
        current = _this$props.current,
        currentStatus = _this$props.currentStatus,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["classPrefix", "className", "children", "vertical", "small", "current", "currentStatus"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var horizontal = !vertical;
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('small')] = small, _classNames[addPrefix('vertical')] = vertical, _classNames[addPrefix('horizontal')] = horizontal, _classNames));
    var count = (0, _get2.default)(children, 'length');

    var items = _utils.ReactChildren.mapCloneElement(children, function (item, index) {
      var _itemStyles;

      var itemStyles = (_itemStyles = {}, _itemStyles[(0, _utils.isIE10)() ? 'msFlexPreferredSize' : 'flexBasis'] = index < count - 1 ? 100 / (count - 1) + "%" : undefined, _itemStyles.maxWidth = index === count - 1 ? 100 / count + "%" : undefined, _itemStyles);
      var itemProps = (0, _extends2.default)({
        stepNumber: index + 1,
        status: 'wait',
        style: horizontal ? itemStyles : undefined
      }, item.props); // fix tail color

      if (currentStatus === 'error' && index === current - 1) {
        itemProps.className = addPrefix('next-error');
      }

      if (!item.props.status) {
        if (index === current) {
          itemProps.status = currentStatus;
        } else if (index < current) {
          itemProps.status = 'finish';
        }
      }

      return itemProps;
    });

    return React.createElement("div", (0, _extends2.default)({}, rest, {
      className: classes
    }), items);
  };

  return Steps;
}(React.Component);

Steps.propTypes = {
  classPrefix: _propTypes.default.string,
  vertical: _propTypes.default.bool,
  small: _propTypes.default.bool,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  current: _propTypes.default.number,
  currentStatus: _propTypes.default.oneOf(['finish', 'wait', 'process', 'error'])
};
Steps.defaultProps = {
  currentStatus: 'process',
  current: 0
};
var EnhancedSteps = (0, _utils.defaultProps)({
  classPrefix: 'steps'
})(Steps);
(0, _setStatic.default)('Item', _StepItem.default)(EnhancedSteps);
var _default = EnhancedSteps;
exports.default = _default;
module.exports = exports.default;