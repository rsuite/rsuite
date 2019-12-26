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

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _Whisper = _interopRequireDefault(require("../Whisper"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _utils = require("../utils");

var HelpBlock =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(HelpBlock, _React$Component);

  function HelpBlock() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = HelpBlock.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        tooltip = _this$props.tooltip,
        children = _this$props.children,
        classPrefix = _this$props.classPrefix,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "tooltip", "children", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('tooltip')] = tooltip, _classNames));

    if (tooltip) {
      return React.createElement(_Whisper.default, {
        placement: "topEnd",
        speaker: React.createElement(_Tooltip.default, null, children)
      }, React.createElement("span", (0, _extends2.default)({
        className: classes
      }, props), React.createElement(_Icon.default, {
        icon: "question-circle2"
      })));
    }

    return React.createElement("span", (0, _extends2.default)({}, props, {
      className: classes
    }), children);
  };

  return HelpBlock;
}(React.Component);

HelpBlock.propTypes = {
  className: _propTypes.default.string,
  tooltip: _propTypes.default.bool,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'help-block'
})(HelpBlock);

exports.default = _default;
module.exports = exports.default;