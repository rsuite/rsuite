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

var _utils = require("../utils");

var _constants = require("../constants");

var Avatar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Avatar, _React$Component);

  function Avatar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Avatar.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        children = _this$props.children,
        src = _this$props.src,
        circle = _this$props.circle,
        alt = _this$props.alt,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["classPrefix", "className", "children", "src", "circle", "alt"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('circle')] = circle, _classNames));
    return React.createElement("div", (0, _extends2.default)({}, rest, {
      className: classes
    }), src ? React.createElement("img", {
      className: addPrefix('image'),
      src: src,
      alt: alt
    }) : children);
  };

  return Avatar;
}(React.Component);

Avatar.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  size: _propTypes.default.oneOf(_constants.SIZE),
  src: _propTypes.default.string,
  circle: _propTypes.default.bool,
  alt: _propTypes.default.string
};

var _default = (0, _compose.default)((0, _utils.withStyleProps)({
  hasSize: true
}), (0, _utils.defaultProps)({
  classPrefix: 'avatar'
}))(Avatar);

exports.default = _default;
module.exports = exports.default;