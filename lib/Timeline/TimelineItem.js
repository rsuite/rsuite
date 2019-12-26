"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _utils = require("../utils");

var TimelineItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TimelineItem, _React$Component);

  function TimelineItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TimelineItem.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props = this.props,
        children = _this$props.children,
        Component = _this$props.componentClass,
        classPrefix = _this$props.classPrefix,
        last = _this$props.last,
        className = _this$props.className,
        dot = _this$props.dot,
        time = _this$props.time,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "componentClass", "classPrefix", "last", "className", "dot", "time"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('last')] = last, _classNames));
    return React.createElement(Component, (0, _extends2.default)({
      className: classes
    }, rest), React.createElement("span", {
      className: addPrefix('tail')
    }), React.createElement("span", {
      className: (0, _classnames.default)(addPrefix('dot'), (_classNames2 = {}, _classNames2[addPrefix('custom-dot')] = !!dot, _classNames2))
    }, dot), time && React.createElement("div", {
      className: addPrefix('time')
    }, time), React.createElement("div", {
      className: addPrefix('content')
    }, children));
  };

  return TimelineItem;
}(React.Component);

TimelineItem.propTypes = {
  last: _propTypes.default.bool,
  dot: _propTypes.default.node,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  componentClass: _propTypes.default.elementType
};

var _default = (0, _compose.default)((0, _utils.withStyleProps)({
  hasColor: true
}), (0, _utils.defaultProps)({
  componentClass: 'li',
  classPrefix: 'timeline-item'
}))(TimelineItem);

exports.default = _default;
module.exports = exports.default;