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

var NavbarBody =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(NavbarBody, _React$Component);

  function NavbarBody() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavbarBody.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "classPrefix", "className"]);
    var classes = (0, _classnames.default)(classPrefix, className);
    return React.createElement("div", (0, _extends2.default)({}, props, {
      className: classes
    }), children);
  };

  return NavbarBody;
}(React.Component);

NavbarBody.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'navbar-body'
})(NavbarBody);

exports.default = _default;
module.exports = exports.default;