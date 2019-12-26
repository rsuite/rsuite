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

var _utils = require("../utils");

var StepItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(StepItem, _React$Component);

  function StepItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = StepItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        style = _this$props.style,
        itemWidth = _this$props.itemWidth,
        status = _this$props.status,
        icon = _this$props.icon,
        stepNumber = _this$props.stepNumber,
        description = _this$props.description,
        title = _this$props.title,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix", "style", "itemWidth", "status", "icon", "stepNumber", "description", "title"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(className, classPrefix, (_classNames = {}, _classNames[addPrefix("status-" + status)] = status, _classNames[addPrefix('custom')] = icon, _classNames));
    var styles = (0, _extends2.default)({
      width: itemWidth
    }, style);
    var contentNode = React.createElement("div", {
      className: addPrefix('content')
    }, title && React.createElement("div", {
      className: addPrefix('title')
    }, title), description && React.createElement("div", {
      className: addPrefix('description')
    }, description));
    var iconNode = React.createElement("span", {
      className: addPrefix(['icon', "icon-" + status])
    }, stepNumber);

    if (icon) {
      iconNode = React.createElement("span", {
        className: addPrefix('icon')
      }, icon);
    }

    return React.createElement("div", (0, _extends2.default)({}, rest, {
      className: classes,
      style: styles
    }), React.createElement("div", {
      className: addPrefix('tail')
    }), React.createElement("div", {
      className: addPrefix(['icon-wrapper', icon ? 'custom-icon' : ''])
    }, iconNode), contentNode);
  };

  return StepItem;
}(React.Component);

StepItem.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  style: _propTypes.default.object,
  itemWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  status: _propTypes.default.oneOf(['finish', 'wait', 'process', 'error']),
  icon: _propTypes.default.object,
  stepNumber: _propTypes.default.number,
  description: _propTypes.default.node,
  title: _propTypes.default.node
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'steps-item'
})(StepItem);

exports.default = _default;
module.exports = exports.default;