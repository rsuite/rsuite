"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var SafeAnchor = React.forwardRef(function (props, ref) {
  var _props$componentClass = props.componentClass,
      Component = _props$componentClass === void 0 ? 'a' : _props$componentClass,
      disabled = props.disabled,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["componentClass", "disabled"]);

  var handleClick = function handleClick(event) {
    var _rest$onClick;

    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    (_rest$onClick = rest.onClick) === null || _rest$onClick === void 0 ? void 0 : _rest$onClick.call(rest, event);
  };

  if (disabled) {
    rest.tabIndex = -1;
    rest['aria-disabled'] = true;
  }

  return React.createElement(Component, (0, _extends2.default)({
    ref: ref
  }, rest, {
    onClick: handleClick
  }));
});
SafeAnchor.displayName = 'SafeAnchor';
SafeAnchor.propTypes = {
  disabled: _propTypes.default.bool,

  /** @default 'a' */
  componentClass: _propTypes.default.elementType
};
var _default = SafeAnchor;
exports.default = _default;
module.exports = exports.default;