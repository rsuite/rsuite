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

var _SafeAnchor = _interopRequireDefault(require("../SafeAnchor"));

var _Ripple = _interopRequireDefault(require("../Ripple"));

var _utils = require("../utils");

var Button =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Button, _React$Component);

  function Button() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        href = _this$props.href,
        active = _this$props.active,
        disabled = _this$props.disabled,
        loading = _this$props.loading,
        block = _this$props.block,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        appearance = _this$props.appearance,
        children = _this$props.children,
        Component = _this$props.componentClass,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["href", "active", "disabled", "loading", "block", "className", "classPrefix", "appearance", "children", "componentClass"]);
    var unhandled = (0, _utils.getUnhandledProps)(Button, props);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, addPrefix(appearance), className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('loading')] = loading, _classNames[addPrefix('block')] = block, _classNames));
    var ripple = appearance !== 'link' && appearance !== 'ghost' ? React.createElement(_Ripple.default, null) : null;
    var spin = React.createElement("span", {
      className: addPrefix('spin')
    });

    if (href) {
      return React.createElement(_SafeAnchor.default, (0, _extends2.default)({}, unhandled, {
        role: "button",
        "aria-disabled": disabled,
        href: href,
        className: classes
      }), loading && spin, children, ripple);
    }

    if (Component === 'button') {
      unhandled.type = unhandled.type || 'button';
    }

    return React.createElement(Component, (0, _extends2.default)({}, unhandled, {
      disabled: disabled,
      className: classes
    }), loading && spin, children, ripple);
  };

  return Button;
}(React.Component);

Button.propTypes = {
  appearance: _propTypes.default.oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
  active: _propTypes.default.bool,
  componentClass: _propTypes.default.elementType,
  children: _propTypes.default.node,
  block: _propTypes.default.bool,
  href: _propTypes.default.string,
  loading: _propTypes.default.bool,
  disabled: _propTypes.default.bool
};
Button.defaultProps = {
  appearance: 'default'
};

var _default = (0, _compose.default)((0, _utils.withStyleProps)({
  hasSize: true,
  hasColor: true
}), (0, _utils.defaultProps)({
  classPrefix: 'btn',
  componentClass: 'button'
}))(Button);

exports.default = _default;
module.exports = exports.default;