"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../utils");

var Divider =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Divider, _React$Component);

  function Divider() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Divider.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        vertical = _this$props.vertical,
        Component = _this$props.componentClass,
        className = _this$props.className,
        children = _this$props.children,
        classPrefix = _this$props.classPrefix,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["vertical", "componentClass", "className", "children", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('vertical')] = vertical, _classNames[addPrefix('horizontal')] = !vertical, _classNames[addPrefix('with-text')] = !!children, _classNames));
    return React.createElement(Component, (0, _extends2.default)({}, props, {
      className: classes
    }), children ? React.createElement("span", {
      className: addPrefix('inner-text')
    }, children) : null);
  };

  return Divider;
}(React.Component);

Divider.propTypes = {
  className: _propTypes.default.string,
  vertical: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  componentClass: _propTypes.default.elementType
};

var _default = (0, _utils.defaultProps)({
  componentClass: 'div',
  classPrefix: 'divider'
})(Divider);

exports.default = _default;
module.exports = exports.default;