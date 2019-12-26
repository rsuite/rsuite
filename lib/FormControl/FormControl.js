"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Input = _interopRequireDefault(require("../Input"));

var _ErrorMessage = _interopRequireDefault(require("../ErrorMessage"));

var _utils = require("../utils");

var _constants = require("../constants");

var _FormContext = _interopRequireWildcard(require("../Form/FormContext"));

var FormControl =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(FormControl, _React$Component);

  function FormControl(_props, context) {
    var _this;

    _this = _React$Component.call(this, _props, context) || this;

    _this.handleFieldChange = function (value, event) {
      var _this$props = _this.props,
          name = _this$props.name,
          onChange = _this$props.onChange;
      var onFieldChange = _this.context.onFieldChange;

      var checkTrigger = _this.getCheckTrigger();

      _this.setState({
        value: value
      });

      _this.handleFieldCheck(value, checkTrigger === 'change').then(function (checkResult) {
        _this.setState({
          checkResult: checkResult
        });
      });

      onFieldChange(name, value, event);
      onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
    };

    _this.handleFieldBlur = function (event) {
      var _this$props$onBlur, _this$props2;

      var checkTrigger = _this.getCheckTrigger();

      var value = _this.getValue() || _this.state.value;

      _this.handleFieldCheck(value, checkTrigger === 'blur');

      (_this$props$onBlur = (_this$props2 = _this.props).onBlur) === null || _this$props$onBlur === void 0 ? void 0 : _this$props$onBlur.call(_this$props2, event);
    };

    _this.handleFieldCheck = function (value, isCheckTrigger, callback) {
      var _this$props3 = _this.props,
          name = _this$props3.name,
          formValue = _this$props3.formValue,
          checkAsync = _this$props3.checkAsync;
      var _this$context = _this.context,
          onFieldError = _this$context.onFieldError,
          onFieldSuccess = _this$context.onFieldSuccess,
          model = _this$context.model;

      var callbackEvents = function callbackEvents(checkResult) {
        if (isCheckTrigger) {
          if (checkResult.hasError) {
            onFieldError(name, checkResult.errorMessage, callback);
          } else {
            onFieldSuccess(name, callback);
          }
        }

        return checkResult;
      };

      if (checkAsync) {
        return model.checkForFieldAsync(name, value, formValue).then(function (checkResult) {
          return callbackEvents(checkResult);
        });
      }

      return Promise.resolve(callbackEvents(model.checkForField(name, value, formValue)));
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.renderError = function (formError, errorMessage) {
      var _this$props4 = _this.props,
          errorPlacement = _this$props4.errorPlacement,
          name = _this$props4.name;

      if (formError) {
        errorMessage = formError[name];
      }

      return React.createElement(_ErrorMessage.default, {
        show: !!errorMessage,
        className: _this.addPrefix('message-wrapper'),
        placement: errorPlacement
      }, errorMessage);
    };

    _this.renderAccepter = function () {
      var _this$props5 = _this.props,
          name = _this$props5.name,
          Component = _this$props5.accepter,
          props = (0, _objectWithoutPropertiesLoose2.default)(_this$props5, ["name", "accepter"]);
      var _this$context$formDef = _this.context.formDefaultValue,
          formDefaultValue = _this$context$formDef === void 0 ? {} : _this$context$formDef;
      var unhandled = (0, _utils.getUnhandledProps)(FormControl, props);

      var value = _this.getValue();

      var readOnly = _this.getReadOnly();

      if ((0, _get2.default)(Component, 'defaultProps.componentClass') === 'input' && readOnly) {
        unhandled.readOnly = readOnly;
      }

      return React.createElement(Component, (0, _extends2.default)({}, unhandled, {
        name: name,
        onChange: _this.handleFieldChange,
        onBlur: _this.handleFieldBlur,
        defaultValue: formDefaultValue[name],
        value: value
      }));
    };

    if (!context || !context.onFieldChange) {
      throw new Error("\n        <FormControl> must be inside a component decorated with <Form>.\n        And need to update React to 16.6.0 +.\n      ");
    }

    var _context$formDefaultV = context.formDefaultValue,
        _formDefaultValue = _context$formDefaultV === void 0 ? {} : _context$formDefaultV;

    var _name = _props.name;
    _this.state = {
      checkResult: {},
      value: _this.getValue(_props) || _formDefaultValue[_name]
    };
    return _this;
  }

  var _proto = FormControl.prototype;

  _proto.getValue = function getValue(props) {
    var _ref = props || this.props,
        formValue = _ref.formValue,
        name = _ref.name,
        value = _ref.value;

    if (!(0, _isUndefined2.default)(value)) {
      return value;
    }

    if (!formValue) {
      return;
    }

    return formValue[name];
  };

  _proto.getCheckTrigger = function getCheckTrigger() {
    var checkTrigger = this.context.checkTrigger;
    return this.props.checkTrigger || checkTrigger;
  };

  _proto.getReadOnly = function getReadOnly() {
    var readOnly = this.context.readOnly;

    if (!(0, _isUndefined2.default)(readOnly)) {
      return readOnly;
    }

    return this.props.readOnly;
  };

  _proto.getPlaintext = function getPlaintext() {
    var plaintext = this.context.plaintext;

    if (!(0, _isUndefined2.default)(plaintext)) {
      return plaintext;
    }

    return this.props.plaintext;
  };

  _proto.checkErrorFromContext = function checkErrorFromContext() {
    var errorFromContext = this.context.errorFromContext;
    var errorMessage = this.props.errorMessage;

    if (typeof errorMessage !== 'undefined') {
      return this.renderError(undefined, errorMessage);
    }

    if (errorFromContext) {
      return React.createElement(_FormContext.FormErrorContext.Consumer, null, this.renderError);
    }

    return null;
  };

  _proto.render = function render() {
    var plaintextDefaultValue = this.props.plaintextDefaultValue;
    var readOnly = this.getReadOnly();
    var plaintext = this.getPlaintext();
    var value = this.getValue();
    var classes = (0, _classnames.default)(this.addPrefix('wrapper'), {
      'read-only': readOnly,
      plaintext: plaintext
    });

    if (plaintext && ((0, _isUndefined2.default)(value) || (0, _isNull2.default)(value))) {
      return React.createElement("div", {
        className: classes
      }, React.createElement("div", {
        className: this.addPrefix('default-value')
      }, plaintextDefaultValue));
    }

    return React.createElement("div", {
      className: classes
    }, React.createElement(_FormContext.FormPlaintextContext.Provider, {
      value: plaintext
    }, this.renderAccepter()), this.checkErrorFromContext());
  };

  return FormControl;
}(React.Component);

FormControl.contextType = _FormContext.default;
FormControl.propTypes = {
  name: _propTypes.default.string,
  checkTrigger: _propTypes.default.oneOf(['change', 'blur', 'none']),
  checkAsync: _propTypes.default.bool,
  accepter: _propTypes.default.elementType,
  onChange: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  classPrefix: _propTypes.default.string,
  errorMessage: _propTypes.default.node,
  errorPlacement: _propTypes.default.oneOf(_constants.PLACEMENT_8),
  formValue: _propTypes.default.object,
  readOnly: _propTypes.default.bool,
  plaintext: _propTypes.default.bool,
  plaintextDefaultValue: _propTypes.default.node,
  value: _propTypes.default.any
};
FormControl.defaultProps = {
  accepter: _Input.default,
  errorPlacement: 'bottomStart',
  plaintextDefaultValue: '--'
};

var FormControlWrapper =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inheritsLoose2.default)(FormControlWrapper, _React$Component2);

  function FormControlWrapper() {
    return _React$Component2.apply(this, arguments) || this;
  }

  var _proto2 = FormControlWrapper.prototype;

  _proto2.render = function render() {
    var _this2 = this;

    return React.createElement(_FormContext.FormValueContext.Consumer, null, function (formValue) {
      return React.createElement(FormControl, (0, _extends2.default)({}, _this2.props, {
        formValue: formValue
      }));
    });
  };

  return FormControlWrapper;
}(React.Component);

var EnhancedFormControl = (0, _utils.defaultProps)({
  classPrefix: 'form-control'
})(FormControlWrapper);
var _default = EnhancedFormControl;
exports.default = _default;
module.exports = exports.default;