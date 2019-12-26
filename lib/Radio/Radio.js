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

var _setDisplayName = _interopRequireDefault(require("recompose/setDisplayName"));

var _RadioGroup = require("../RadioGroup/RadioGroup");

var _utils = require("../utils");

var Radio =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Radio, _React$Component);

  function Radio(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.context = {};

    _this.handleChange = function (event) {
      var _this$context$onChang, _this$context;

      var _this$props = _this.props,
          value = _this$props.value,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange;
      var checked = true;

      if (disabled) {
        return;
      }

      _this.setState({
        checked: checked
      });

      (_this$context$onChang = (_this$context = _this.context).onChange) === null || _this$context$onChang === void 0 ? void 0 : _this$context$onChang.call(_this$context, value, checked, event);
      onChange === null || onChange === void 0 ? void 0 : onChange(value, checked, event);
    };

    _this.state = {
      checked: props.defaultChecked
    };
    return _this;
  }

  var _proto = Radio.prototype;

  _proto.getCheckedByValue = function getCheckedByValue() {
    var value = this.props.value;

    if (!(0, _isUndefined2.default)(this.context.value)) {
      return this.context.value === value;
    }

    return this.props.checked;
  };

  _proto.updateCheckedState = function updateCheckedState(checked, callback) {
    this.setState({
      checked: checked
    }, callback);
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        title = _this$props2.title,
        className = _this$props2.className,
        children = _this$props2.children,
        disabled = _this$props2.disabled,
        defaultChecked = _this$props2.defaultChecked,
        classPrefix = _this$props2.classPrefix,
        tabIndex = _this$props2.tabIndex,
        inputRef = _this$props2.inputRef,
        onClick = _this$props2.onClick,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["title", "className", "children", "disabled", "defaultChecked", "classPrefix", "tabIndex", "inputRef", "onClick"]);
    var _this$context2 = this.context,
        _this$context2$inline = _this$context2.inline,
        inline = _this$context2$inline === void 0 ? this.props.inline : _this$context2$inline,
        _this$context2$name = _this$context2.name,
        name = _this$context2$name === void 0 ? this.props.name : _this$context2$name;
    var checked = this.getCheckedByValue();
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('inline')] = inline, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('checked')] = (0, _isUndefined2.default)(checked) ? this.state.checked : checked, _classNames));
    var unhandled = (0, _utils.getUnhandledProps)(Radio, props);

    var _partitionHTMLProps = (0, _utils.partitionHTMLProps)(unhandled),
        htmlInputProps = _partitionHTMLProps[0],
        rest = _partitionHTMLProps[1];

    var input = React.createElement("span", {
      className: addPrefix('wrapper'),
      "aria-disabled": disabled
    }, React.createElement("input", (0, _extends2.default)({}, htmlInputProps, {
      type: "radio",
      checked: checked,
      defaultChecked: defaultChecked,
      ref: inputRef,
      name: name,
      tabIndex: tabIndex,
      disabled: disabled,
      onChange: this.handleChange,
      onClick: function onClick(event) {
        return event.stopPropagation();
      }
    })), React.createElement("span", {
      className: addPrefix('inner'),
      "aria-hidden": true,
      role: "presentation"
    }));
    return React.createElement("div", (0, _extends2.default)({}, rest, {
      onClick: onClick,
      className: classes
    }), React.createElement("div", {
      className: addPrefix('checker')
    }, React.createElement("label", {
      title: title
    }, input, children)));
  };

  return Radio;
}(React.Component);

Radio.contextType = _RadioGroup.RadioContext;
Radio.propTypes = {
  id: _propTypes.default.string,
  name: _propTypes.default.string,
  inline: _propTypes.default.bool,
  title: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  inputRef: _propTypes.default.func,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  value: _propTypes.default.any,
  onChange: _propTypes.default.func,
  onClick: _propTypes.default.func,
  tabIndex: _propTypes.default.number
};
Radio.defaultProps = {
  tabIndex: 0
};
var EnhancedRadio = (0, _utils.defaultProps)({
  classPrefix: 'radio'
})(Radio);

var _default = (0, _setDisplayName.default)('Radio')(EnhancedRadio);

exports.default = _default;
module.exports = exports.default;