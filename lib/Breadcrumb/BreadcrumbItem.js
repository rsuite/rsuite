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

var _SafeAnchor = _interopRequireDefault(require("../SafeAnchor"));

var _utils = require("../utils");

var BreadcrumbItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(BreadcrumbItem, _React$Component);

  function BreadcrumbItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = BreadcrumbItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        href = _this$props.href,
        classPrefix = _this$props.classPrefix,
        title = _this$props.title,
        target = _this$props.target,
        Component = _this$props.componentClass,
        className = _this$props.className,
        style = _this$props.style,
        active = _this$props.active,
        renderItem = _this$props.renderItem,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["href", "classPrefix", "title", "target", "componentClass", "className", "style", "active", "renderItem"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var linkProps = {
      href: href,
      title: title,
      target: target
    };
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames));
    var item = React.createElement(Component, (0, _extends2.default)({}, rest, linkProps));

    if (renderItem) {
      item = renderItem(item);
    }

    return React.createElement("li", {
      style: style,
      className: classes
    }, active ? React.createElement("span", rest) : item);
  };

  return BreadcrumbItem;
}(React.Component);

BreadcrumbItem.propTypes = {
  active: _propTypes.default.bool,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  href: _propTypes.default.string,
  title: _propTypes.default.string,
  target: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  componentClass: _propTypes.default.elementType,
  renderItem: _propTypes.default.func
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'breadcrumb-item',
  componentClass: _SafeAnchor.default
});

var _default = enhance(BreadcrumbItem);

exports.default = _default;
module.exports = exports.default;