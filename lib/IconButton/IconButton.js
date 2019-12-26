"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../Button"));

var _utils = require("../utils");

var IconButton =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(IconButton, _React$Component);

  function IconButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = IconButton.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        icon = _this$props.icon,
        placement = _this$props.placement,
        children = _this$props.children,
        circle = _this$props.circle,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["icon", "placement", "children", "circle", "classPrefix", "className"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, addPrefix("placement-" + placement), (_classNames = {}, _classNames[addPrefix('circle')] = circle, _classNames[addPrefix('with-text')] = !(0, _isUndefined2.default)(children), _classNames));
    return React.createElement(_Button.default, (0, _extends2.default)({}, props, {
      className: classes
    }), icon, children);
  };

  return IconButton;
}(React.Component);

IconButton.propTypes = {
  className: _propTypes.default.string,
  icon: _propTypes.default.object,
  classPrefix: _propTypes.default.string,
  circle: _propTypes.default.bool,
  children: _propTypes.default.node,
  placement: _propTypes.default.oneOf(['left', 'right'])
};
IconButton.defaultProps = {
  placement: 'left'
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'btn-icon'
})(IconButton);

exports.default = _default;
module.exports = exports.default;