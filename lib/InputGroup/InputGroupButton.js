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

var _utils = require("../utils");

var _Button = _interopRequireDefault(require("../Button"));

var InputGroupButton =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(InputGroupButton, _React$Component);

  function InputGroupButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = InputGroupButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix"]);
    return React.createElement(_Button.default, (0, _extends2.default)({
      componentClass: "a"
    }, props, {
      className: (0, _classnames.default)(classPrefix, className)
    }));
  };

  return InputGroupButton;
}(React.Component);

var _default = (0, _utils.defaultProps)({
  classPrefix: 'input-group-btn'
})(InputGroupButton);

exports.default = _default;
module.exports = exports.default;