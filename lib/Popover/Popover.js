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

var Popover =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Popover, _React$Component);

  function Popover() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Popover.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        title = _this$props.title,
        children = _this$props.children,
        style = _this$props.style,
        visible = _this$props.visible,
        className = _this$props.className,
        full = _this$props.full,
        onMouseLeave = _this$props.onMouseLeave,
        onMouseEnter = _this$props.onMouseEnter;
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('full')] = full, _classNames));
    var styles = (0, _extends2.default)({
      display: 'block',
      opacity: visible ? 1 : undefined
    }, style);
    return React.createElement("div", {
      onMouseLeave: onMouseLeave,
      onMouseEnter: onMouseEnter,
      className: classes,
      style: styles
    }, React.createElement("div", {
      className: "arrow"
    }), title ? React.createElement("h3", {
      className: addPrefix('title')
    }, title) : null, React.createElement("div", {
      className: addPrefix('content')
    }, children));
  };

  return Popover;
}(React.Component);

Popover.propTypes = {
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  title: _propTypes.default.node,
  style: _propTypes.default.object,
  visible: _propTypes.default.bool,
  className: _propTypes.default.string,
  full: _propTypes.default.bool,
  onMouseLeave: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'popover'
})(Popover);

exports.default = _default;
module.exports = exports.default;