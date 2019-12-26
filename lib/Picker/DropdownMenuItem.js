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

var DropdownMenuItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DropdownMenuItem, _React$Component);

  function DropdownMenuItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          value = _this$props.value,
          disabled = _this$props.disabled,
          onSelect = _this$props.onSelect;
      event.preventDefault();

      if (!disabled && onSelect) {
        onSelect(value, event);
      }
    };

    return _this;
  }

  var _proto = DropdownMenuItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        active = _this$props2.active,
        onKeyDown = _this$props2.onKeyDown,
        disabled = _this$props2.disabled,
        focus = _this$props2.focus,
        children = _this$props2.children,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["active", "onKeyDown", "disabled", "focus", "children", "className", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames[addPrefix('focus')] = focus, _classNames[addPrefix('disabled')] = disabled, _classNames));
    var unhandled = (0, _utils.getUnhandledProps)(DropdownMenuItem, rest);
    return React.createElement("li", (0, _extends2.default)({}, unhandled, {
      className: className,
      role: "menuitem"
    }), React.createElement("a", {
      className: classes,
      tabIndex: -1,
      role: "presentation",
      onKeyDown: disabled ? null : onKeyDown,
      onClick: this.handleClick
    }, children));
  };

  return DropdownMenuItem;
}(React.Component);

DropdownMenuItem.propTypes = {
  classPrefix: _propTypes.default.string.isRequired,
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  value: _propTypes.default.any,
  onSelect: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  focus: _propTypes.default.bool,
  title: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  getItemData: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'dropdown-menu-item'
})(DropdownMenuItem);

exports.default = _default;
module.exports = exports.default;