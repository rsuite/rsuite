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

var Icon =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Icon, _React$Component);

  function Icon() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Icon.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        icon = _this$props.icon,
        size = _this$props.size,
        fixedWidth = _this$props.fixedWidth,
        spin = _this$props.spin,
        pulse = _this$props.pulse,
        rotate = _this$props.rotate,
        flip = _this$props.flip,
        stack = _this$props.stack,
        inverse = _this$props.inverse,
        svgStyle = _this$props.svgStyle,
        Component = _this$props.componentClass,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix", "icon", "size", "fixedWidth", "spin", "pulse", "rotate", "flip", "stack", "inverse", "svgStyle", "componentClass"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var isSvgIcon = typeof icon === 'object' && icon.id && icon.viewBox;
    var classes = (0, _classnames.default)(className, classPrefix, (_classNames = {}, _classNames[addPrefix(typeof icon === 'string' ? icon : '')] = !isSvgIcon, _classNames[addPrefix('fw')] = fixedWidth, _classNames[addPrefix('spin')] = spin, _classNames[addPrefix('pulse')] = pulse, _classNames[addPrefix("size-" + (size || ''))] = size, _classNames[addPrefix("flip-" + (flip || ''))] = flip, _classNames[addPrefix("rotate-" + (rotate || ''))] = rotate, _classNames[addPrefix("stack-" + (stack || ''))] = stack, _classNames[addPrefix('inverse')] = inverse, _classNames));

    if (isSvgIcon) {
      var svgIcon = icon;
      return React.createElement(Component, (0, _extends2.default)({}, props, {
        className: classes
      }), React.createElement("svg", {
        style: svgStyle,
        viewBox: svgIcon.viewBox
      }, React.createElement("use", {
        xlinkHref: "#" + svgIcon.id
      })));
    }

    return React.createElement(Component, (0, _extends2.default)({}, props, {
      className: classes
    }));
  };

  return Icon;
}(React.Component);

Icon.propTypes = {
  icon: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  componentClass: _propTypes.default.elementType,
  size: _propTypes.default.oneOf(['lg', '2x', '3x', '4x', '5x']),
  flip: _propTypes.default.oneOf(['horizontal', 'vertical']),
  stack: _propTypes.default.oneOf(['1x', '2x']),
  rotate: _propTypes.default.number,
  fixedWidth: _propTypes.default.bool,
  svgStyle: _propTypes.default.object,
  spin: _propTypes.default.bool,
  pulse: _propTypes.default.bool,
  inverse: _propTypes.default.bool
};

var _default = (0, _utils.defaultProps)({
  componentClass: 'i',
  classPrefix: 'icon'
})(Icon);

exports.default = _default;
module.exports = exports.default;