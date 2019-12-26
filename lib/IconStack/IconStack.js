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

var IconStack =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(IconStack, _React$Component);

  function IconStack() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = IconStack.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        size = _this$props.size,
        classPrefix = _this$props.classPrefix,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "size", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix("size-" + (size || ''))] = size, _classNames));
    return React.createElement("span", (0, _extends2.default)({}, props, {
      className: classes
    }));
  };

  return IconStack;
}(React.Component);

IconStack.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  size: _propTypes.default.oneOf(['lg', '2x', '3x', '4x', '5x'])
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'icon-stack'
})(IconStack);

exports.default = _default;
module.exports = exports.default;