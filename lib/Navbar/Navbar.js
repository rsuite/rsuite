"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.NavbarContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _NavbarBody = _interopRequireDefault(require("./NavbarBody"));

var _NavbarHeader = _interopRequireDefault(require("./NavbarHeader"));

var _utils = require("../utils");

var NavbarContext = (0, _utils.createContext)(null);
exports.NavbarContext = NavbarContext;

var Navbar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Navbar, _React$Component);

  function Navbar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Navbar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        Component = _this$props.componentClass,
        hasChildContext = _this$props.hasChildContext,
        classPrefix = _this$props.classPrefix,
        appearance = _this$props.appearance,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "componentClass", "hasChildContext", "classPrefix", "appearance"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, addPrefix(appearance), className);
    return React.createElement(NavbarContext.Provider, {
      value: hasChildContext
    }, React.createElement(Component, (0, _extends2.default)({}, rest, {
      className: classes,
      role: "navigation"
    })));
  };

  return Navbar;
}(React.Component);

Navbar.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  appearance: _propTypes.default.oneOf(['default', 'inverse', 'subtle']),
  componentClass: _propTypes.default.elementType,
  hasChildContext: _propTypes.default.bool
};
Navbar.defaultProps = {
  hasChildContext: true,
  appearance: 'default'
};
var EnhancedNavbar = (0, _utils.defaultProps)({
  componentClass: 'div',
  classPrefix: 'navbar'
})(Navbar);
(0, _setStatic.default)('Header', _NavbarHeader.default)(EnhancedNavbar);
(0, _setStatic.default)('Body', _NavbarBody.default)(EnhancedNavbar);
var _default = EnhancedNavbar;
exports.default = _default;