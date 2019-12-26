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

var _utils = require("../utils");

var _CheckboxGroup = require("../CheckboxGroup/CheckboxGroup");

var Checkbox =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Checkbox, _React$Component);

  function Checkbox(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.context = {};

    _this.handleChange = function (event) {
      var _this$context$onChang, _this$context;

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled,
          value = _this$props.value;
      var checked = !_this.isChecked();

      if (disabled) {
        return;
      }

      _this.setState({
        checked: checked
      });

      onChange === null || onChange === void 0 ? void 0 : onChange(value, checked, event);
      (_this$context$onChang = (_this$context = _this.context).onChange) === null || _this$context$onChang === void 0 ? void 0 : _this$context$onChang.call(_this$context, value, checked, event);
    };

    _this.state = {
      checked: props.defaultChecked
    };
    return _this;
  }

  var _proto = Checkbox.prototype;

  _proto.getCheckedByValue = function getCheckedByValue() {
    var _this2 = this;

    var value = this.context.value;

    if (!(0, _isUndefined2.default)(value) && !(0, _isUndefined2.default)(this.props.value)) {
      return value.some(function (i) {
        return i === _this2.props.value;
      });
    }

    return this.props.checked;
  };

  _proto.isChecked = function isChecked() {
    var checked = this.getCheckedByValue();
    return (0, _isUndefined2.default)(checked) ? this.state.checked : checked;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        className = _this$props2.className,
        children = _this$props2.children,
        title = _this$props2.title,
        inputRef = _this$props2.inputRef,
        indeterminate = _this$props2.indeterminate,
        tabIndex = _this$props2.tabIndex,
        classPrefix = _this$props2.classPrefix,
        onClick = _this$props2.onClick,
        onCheckboxClick = _this$props2.onCheckboxClick,
        checkable = _this$props2.checkable,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["disabled", "className", "children", "title", "inputRef", "indeterminate", "tabIndex", "classPrefix", "onClick", "onCheckboxClick", "checkable"]);
    var checked = this.isChecked();
    var _this$context2 = this.context,
        _this$context2$inline = _this$context2.inline,
        inline = _this$context2$inline === void 0 ? this.props.inline : _this$context2$inline,
        _this$context2$name = _this$context2.name,
        name = _this$context2$name === void 0 ? this.props.name : _this$context2$name,
        controlled = _this$context2.controlled;
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('inline')] = inline, _classNames[addPrefix('indeterminate')] = indeterminate, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('checked')] = checked, _classNames));
    var unhandled = (0, _utils.getUnhandledProps)(Checkbox, props);

    var _partitionHTMLProps = (0, _utils.partitionHTMLProps)(unhandled),
        htmlInputProps = _partitionHTMLProps[0],
        rest = _partitionHTMLProps[1];

    if (!(0, _isUndefined2.default)(controlled)) {
      htmlInputProps[controlled ? 'checked' : 'defaultChecked'] = checked;
    }

    var input = React.createElement("span", {
      className: addPrefix('wrapper'),
      onClick: onCheckboxClick,
      "aria-disabled": disabled
    }, React.createElement("input", (0, _extends2.default)({}, htmlInputProps, {
      name: name,
      type: "checkbox",
      ref: inputRef,
      tabIndex: tabIndex,
      onClick: function onClick(event) {
        return event.stopPropagation();
      },
      disabled: disabled,
      onChange: this.handleChange
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
    }, checkable ? input : null, children)));
  };

  return Checkbox;
}(React.Component);

Checkbox.contextType = _CheckboxGroup.CheckboxContext;
Checkbox.propTypes = {
  title: _propTypes.default.string,
  className: _propTypes.default.string,
  inline: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  indeterminate: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  onClick: _propTypes.default.func,
  inputRef: _propTypes.default.func,
  value: _propTypes.default.any,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  checkable: _propTypes.default.bool,
  onCheckboxClick: _propTypes.default.func
};
Checkbox.defaultProps = {
  checkable: true,
  tabIndex: 0
};
var EnhancedCheckBox = (0, _utils.defaultProps)({
  classPrefix: 'checkbox'
})(Checkbox);

var _default = (0, _setDisplayName.default)('Checkbox')(EnhancedCheckBox);

exports.default = _default;
module.exports = exports.default;