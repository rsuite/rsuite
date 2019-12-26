"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var Tooltip =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Tooltip, _React$Component);

  function Tooltip() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tooltip.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        positionLeft = _this$props.positionLeft,
        positionTop = _this$props.positionTop,
        classPrefix = _this$props.classPrefix,
        children = _this$props.children,
        style = _this$props.style,
        visible = _this$props.visible,
        onMouseLeave = _this$props.onMouseLeave,
        onMouseEnter = _this$props.onMouseEnter;
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className);
    var styles = (0, _extends2.default)({
      left: positionLeft,
      top: positionTop,
      opacity: visible ? 1 : undefined
    }, style);
    return React.createElement("div", {
      role: "tooltip",
      className: classes,
      style: styles,
      onMouseLeave: onMouseLeave,
      onMouseEnter: onMouseEnter
    }, React.createElement("div", {
      className: addPrefix('arrow')
    }), React.createElement("div", {
      className: addPrefix('inner')
    }, children));
  };

  return Tooltip;
}(React.Component);

Tooltip.propTypes = {
  positionLeft: _propTypes.default.number,
  positionTop: _propTypes.default.number,
  visible: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  children: _propTypes.default.node,
  onMouseLeave: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'tooltip'
})(Tooltip);

exports.default = _default;
module.exports = exports.default;