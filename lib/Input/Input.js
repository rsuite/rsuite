"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _utils = require("../utils");

var _FormContext = require("../Form/FormContext");

var _FormGroup = require("../FormGroup/FormGroup");

var _InputGroup = require("../InputGroup/InputGroup");

var Input =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Input, _React$Component);

  function Input() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChange = function (event) {
      var _this$props$onChange, _this$props;

      var nextValue = (0, _get2.default)(event, 'target.value');
      (_this$props$onChange = (_this$props = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props, nextValue, event);
    };

    _this.handleKeyDown = function (event) {
      var _this$props$onKeyDown, _this$props3;

      if (event.keyCode === 13) {
        var _this$props$onPressEn, _this$props2;

        (_this$props$onPressEn = (_this$props2 = _this.props).onPressEnter) === null || _this$props$onPressEn === void 0 ? void 0 : _this$props$onPressEn.call(_this$props2, event);
      }

      (_this$props$onKeyDown = (_this$props3 = _this.props).onKeyDown) === null || _this$props$onKeyDown === void 0 ? void 0 : _this$props$onKeyDown.call(_this$props3, event);
    };

    return _this;
  }

  var _proto = Input.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        type = _this$props4.type,
        className = _this$props4.className,
        classPrefix = _this$props4.classPrefix,
        Component = _this$props4.componentClass,
        onFocus = _this$props4.onFocus,
        onBlur = _this$props4.onBlur,
        disabled = _this$props4.disabled,
        value = _this$props4.value,
        defaultValue = _this$props4.defaultValue,
        inputRef = _this$props4.inputRef,
        id = _this$props4.id,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props4, ["type", "className", "classPrefix", "componentClass", "onFocus", "onBlur", "disabled", "value", "defaultValue", "inputRef", "id"]);
    var classes = (0, _classnames.default)(classPrefix, className);
    var unhandled = (0, _utils.getUnhandledProps)(Input, rest);
    var plaintextInput = React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes
    }), (0, _isUndefined2.default)(value) ? defaultValue : value);
    var input = React.createElement(_FormGroup.FormGroupContext.Consumer, null, function (controlId) {
      return React.createElement(Component, (0, _extends2.default)({}, unhandled, {
        ref: inputRef,
        type: type,
        id: id || controlId,
        value: value,
        defaultValue: defaultValue,
        disabled: disabled,
        onKeyDown: _this2.handleKeyDown,
        onFocus: (0, _utils.createChainedFunction)(onFocus, (0, _get2.default)(_this2.context, 'onFocus')),
        onBlur: (0, _utils.createChainedFunction)(onBlur, (0, _get2.default)(_this2.context, 'onBlur')),
        className: classes,
        onChange: _this2.handleChange
      }));
    });
    return React.createElement(_FormContext.FormPlaintextContext.Consumer, null, function (plaintext) {
      return plaintext ? plaintextInput : input;
    });
  };

  return Input;
}(React.Component);

Input.contextType = _InputGroup.InputGroupContext;
Input.propTypes = {
  type: _propTypes.default.string,
  componentClass: _propTypes.default.elementType,
  id: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  inputRef: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onPressEnter: _propTypes.default.func
};
Input.defaultProps = {
  type: 'text'
};

var _default = (0, _compose.default)((0, _utils.withStyleProps)({
  hasSize: true
}), (0, _utils.defaultProps)({
  classPrefix: 'input',
  componentClass: 'input'
}))(Input);

exports.default = _default;
module.exports = exports.default;