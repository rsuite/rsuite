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

var _Ripple = _interopRequireDefault(require("../Ripple"));

var _Button = _interopRequireDefault(require("../Button"));

var _utils = require("../utils");

var DorpdownToggle =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DorpdownToggle, _React$Component);

  function DorpdownToggle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DorpdownToggle.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        renderTitle = _this$props.renderTitle,
        children = _this$props.children,
        icon = _this$props.icon,
        noCaret = _this$props.noCaret,
        Component = _this$props.componentClass,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix", "renderTitle", "children", "icon", "noCaret", "componentClass"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);

    if (renderTitle) {
      return React.createElement("span", (0, _extends2.default)({}, props, {
        className: (0, _classnames.default)(classPrefix, addPrefix('custom-title'), className)
      }), renderTitle(children), React.createElement(_Ripple.default, null));
    }

    var buttonProps = {};

    if (Component === _Button.default) {
      buttonProps = {
        componentClass: 'a',
        appearance: 'subtle'
      };
    }

    return React.createElement(Component, (0, _extends2.default)({}, buttonProps, props, {
      className: (0, _classnames.default)(classPrefix, className)
    }), icon, children, noCaret ? null : React.createElement("span", {
      className: addPrefix('caret')
    }));
  };

  return DorpdownToggle;
}(React.Component);

DorpdownToggle.propTypes = {
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  icon: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  noCaret: _propTypes.default.bool,
  componentClass: _propTypes.default.elementType,
  renderTitle: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  componentClass: _Button.default,
  classPrefix: 'dropdown-toggle'
})(DorpdownToggle);

exports.default = _default;
module.exports = exports.default;