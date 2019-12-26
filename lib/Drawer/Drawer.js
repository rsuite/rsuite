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

var _Slide = _interopRequireDefault(require("rsuite-utils/lib/Animation/Slide"));

var _Modal = _interopRequireDefault(require("../Modal/Modal"));

var _utils = require("../utils");

var Drawer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Drawer, _React$Component);

  function Drawer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Drawer.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        show = _this$props.show,
        full = _this$props.full,
        className = _this$props.className,
        placement = _this$props.placement,
        classPrefix = _this$props.classPrefix,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["show", "full", "className", "placement", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(addPrefix(placement), className, (_classNames = {}, _classNames[addPrefix('full')] = full, _classNames));
    var animationProps = {
      placement: placement
    };
    return React.createElement(_Modal.default, (0, _extends2.default)({}, props, {
      drawer: true,
      classPrefix: classPrefix,
      className: classes,
      show: show,
      animation: _Slide.default,
      animationProps: animationProps
    }));
  };

  return Drawer;
}(React.Component);

Drawer.propTypes = {
  classPrefix: _propTypes.default.string,
  placement: _propTypes.default.oneOf(['top', 'right', 'bottom', 'left']),
  show: _propTypes.default.bool,
  full: _propTypes.default.bool,
  children: _propTypes.default.node,
  className: _propTypes.default.string
};
Drawer.defaultProps = {
  placement: 'right'
};
var EnhancedDrawer = (0, _utils.defaultProps)({
  classPrefix: 'drawer'
})(Drawer);
var _default = EnhancedDrawer;
exports.default = _default;
module.exports = exports.default;