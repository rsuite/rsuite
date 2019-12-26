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

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _BreadcrumbItem = _interopRequireDefault(require("./BreadcrumbItem"));

var _utils = require("../utils");

var Breadcrumb =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Breadcrumb, _React$Component);

  function Breadcrumb() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Breadcrumb.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        Component = _this$props.componentClass,
        className = _this$props.className,
        children = _this$props.children,
        separator = _this$props.separator,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["classPrefix", "componentClass", "className", "children", "separator"]);
    var items = [];
    var count = React.Children.count(children);
    var addPrefix = (0, _utils.prefix)(classPrefix);

    if (children) {
      React.Children.forEach(children, function (item, index) {
        items.push(item);

        if (index < count - 1) {
          items.push(React.createElement("li", {
            key: index,
            className: addPrefix('separator')
          }, separator));
        }
      });
    }

    return React.createElement(Component, (0, _extends2.default)({}, rest, {
      role: "navigation",
      "aria-label": "breadcrumbs",
      className: (0, _classnames.default)(classPrefix, className)
    }), items);
  };

  return Breadcrumb;
}(React.Component);

Breadcrumb.propTypes = {
  separator: _propTypes.default.node,
  componentClass: _propTypes.default.elementType,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string
};
Breadcrumb.defaultProps = {
  separator: '/'
};
var EnhancedBreadcrumb = (0, _utils.defaultProps)({
  classPrefix: 'breadcrumb',
  componentClass: 'ol'
})(Breadcrumb);
(0, _setStatic.default)('Item', _BreadcrumbItem.default)(EnhancedBreadcrumb);
var _default = EnhancedBreadcrumb;
exports.default = _default;
module.exports = exports.default;