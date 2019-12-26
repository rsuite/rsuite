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

var Toggle =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Toggle, _React$Component);

  function Toggle(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled;
      var checked = !_this.getCheckedStatus();

      if (disabled) {
        return;
      }

      _this.setState({
        checked: checked
      });

      onChange === null || onChange === void 0 ? void 0 : onChange(checked, event);
    };

    _this.state = {
      checked: props.defaultChecked
    };
    return _this;
  }

  var _proto = Toggle.prototype;

  _proto.getCheckedStatus = function getCheckedStatus() {
    var checked = this.props.checked;
    return typeof checked === 'undefined' ? this.state.checked : checked;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        className = _this$props2.className,
        checkedChildren = _this$props2.checkedChildren,
        unCheckedChildren = _this$props2.unCheckedChildren,
        classPrefix = _this$props2.classPrefix,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["disabled", "className", "checkedChildren", "unCheckedChildren", "classPrefix"]);
    var checked = this.getCheckedStatus();
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('checked')] = checked, _classNames[addPrefix('disabled')] = disabled, _classNames));
    var inner = checked ? checkedChildren : unCheckedChildren;
    var unhandled = (0, _utils.getUnhandledProps)(Toggle, rest);
    return React.createElement("span", (0, _extends2.default)({}, unhandled, {
      className: classes,
      "aria-pressed": checked,
      "aria-disabled": disabled,
      "aria-label": typeof inner === 'string' ? inner : null,
      role: "button",
      tabIndex: -1,
      onClick: this.handleChange
    }), React.createElement("span", {
      className: addPrefix('inner')
    }, inner));
  };

  return Toggle;
}(React.Component);

Toggle.propTypes = {
  disabled: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  checkedChildren: _propTypes.default.node,
  unCheckedChildren: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  onChange: _propTypes.default.func
};

var _default = (0, _compose.default)((0, _utils.withStyleProps)({
  hasSize: true
}), (0, _utils.defaultProps)({
  classPrefix: 'btn-toggle'
}))(Toggle);

exports.default = _default;
module.exports = exports.default;