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

var _Transition = _interopRequireDefault(require("rsuite-utils/lib/Animation/Transition"));

var _domLib = require("dom-lib");

var _utils = require("../utils");

var Ripple =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Ripple, _React$Component);

  function Ripple(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.triggerRef = void 0;
    _this.mousedownListener = null;

    _this.getPosition = function (event) {
      var offset = (0, _domLib.getOffset)(_this.triggerRef.current);
      var offsetX = (event.pageX || 0) - offset.left;
      var offsetY = (event.pageY || 0) - offset.top;
      var radiusX = Math.max(offset.width - offsetX, offsetX);
      var radiusY = Math.max(offset.height - offsetY, offsetY);
      var radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2));
      return {
        width: radius * 2,
        height: radius * 2,
        left: offsetX - radius,
        top: offsetY - radius
      };
    };

    _this.handleMouseDown = function (event) {
      var position = _this.getPosition(event);

      var onMouseDown = _this.props.onMouseDown;

      _this.setState({
        rippling: true,
        position: position
      });

      onMouseDown === null || onMouseDown === void 0 ? void 0 : onMouseDown(position, event);
    };

    _this.handleRippled = function () {
      _this.setState({
        rippling: false
      });
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.state = {
      rippling: false,
      position: {}
    };
    _this.triggerRef = React.createRef();
    return _this;
  }

  var _proto = Ripple.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.triggerRef.current) {
      this.mousedownListener = (0, _domLib.on)(this.triggerRef.current.parentNode, 'mousedown', this.handleMouseDown);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.mousedownListener) {
      this.mousedownListener.off();
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix"]);
    var classes = (0, _classnames.default)(this.addPrefix('pond'), className);
    var _this$state = this.state,
        position = _this$state.position,
        rippling = _this$state.rippling;
    var unhandled = (0, _utils.getUnhandledProps)(Ripple, rest);
    return React.createElement("span", (0, _extends2.default)({}, unhandled, {
      className: classes,
      ref: this.triggerRef
    }), React.createElement(_Transition.default, {
      in: rippling,
      enteringClassName: this.addPrefix('rippling'),
      onEntered: this.handleRippled
    }, React.createElement("span", {
      className: classPrefix,
      style: position
    })));
  };

  return Ripple;
}(React.Component);

Ripple.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  onMouseDown: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'ripple'
})(Ripple);

exports.default = _default;
module.exports = exports.default;