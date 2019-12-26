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

var _utils = require("../utils");

var _classnames = _interopRequireDefault(require("classnames"));

var PlaceholderGraph =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PlaceholderGraph, _React$Component);

  function PlaceholderGraph() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PlaceholderGraph.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        width = _this$props.width,
        height = _this$props.height,
        style = _this$props.style,
        active = _this$props.active,
        classPrefix = _this$props.classPrefix,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "width", "height", "style", "active", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(PlaceholderGraph, rest);
    var classes = (0, _classnames.default)(classPrefix, addPrefix('graph'), className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames));
    return React.createElement("div", (0, _extends2.default)({
      className: classes,
      style: (0, _extends2.default)({
        width: width || '100%',
        height: height
      }, style)
    }, unhandled));
  };

  return PlaceholderGraph;
}(React.Component);

PlaceholderGraph.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  classPrefix: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  active: _propTypes.default.bool
};
PlaceholderGraph.defaultProps = {
  height: 200
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'placeholder'
})(PlaceholderGraph);

exports.default = _default;
module.exports = exports.default;