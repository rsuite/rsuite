"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends6 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _schemaTyped = require("schema-typed");

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("rsuite-utils/lib/utils");

var _utils2 = require("../utils");

var _prefix = require("../utils/prefix");

var _FormContext = _interopRequireWildcard(require("./FormContext"));

function preventDefaultEvent(event) {
  event.preventDefault();
}

var Form =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Form, _React$Component);

  function Form(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;
    _this.formContextValue = null;

    _this.getFormValue = function (state, props) {
      if (state === void 0) {
        state = _this.state;
      }

      if (props === void 0) {
        props = _this.props;
      }

      return (0, _isUndefined2.default)(props.formValue) ? state.formValue : props.formValue;
    };

    _this.getFormError = function (state, props) {
      if (state === void 0) {
        state = _this.state;
      }

      if (props === void 0) {
        props = _this.props;
      }

      return (0, _isUndefined2.default)(props.formError) ? state.formError : props.formError;
    };

    _this.check = function (callback) {
      var formValue = _this.getFormValue() || {};
      var _this$props = _this.props,
          model = _this$props.model,
          onCheck = _this$props.onCheck,
          onError = _this$props.onError;
      var formError = {};
      var errorCount = 0;
      Object.keys(model.schema).forEach(function (key) {
        var checkResult = model.checkForField(key, formValue[key], formValue);

        if (checkResult.hasError === true) {
          errorCount += 1;
          formError[key] = checkResult.errorMessage;
        }
      });

      _this.setState({
        formError: formError
      });

      onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);
      callback === null || callback === void 0 ? void 0 : callback(formError);

      if (errorCount > 0) {
        onError === null || onError === void 0 ? void 0 : onError(formError);
        return false;
      }

      return true;
    };

    _this.checkForField = function (fieldName, callback) {
      var formValue = _this.getFormValue() || {};
      var _this$props2 = _this.props,
          model = _this$props2.model,
          onCheck = _this$props2.onCheck,
          onError = _this$props2.onError;
      var checkResult = model.checkForField(fieldName, formValue[fieldName], formValue);

      _this.setState(function (prvState, props) {
        var _extends2;

        var formError = (0, _extends6.default)({}, _this.getFormError(prvState, props), (_extends2 = {}, _extends2[fieldName] = checkResult.errorMessage, _extends2));
        onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);

        if (checkResult.hasError) {
          onError === null || onError === void 0 ? void 0 : onError(formError);
        }

        return {
          formError: formError
        };
      });

      callback === null || callback === void 0 ? void 0 : callback(checkResult);
      return !checkResult.hasError;
    };

    _this.checkAsync = function () {
      var formValue = _this.getFormValue() || {};
      var _this$props3 = _this.props,
          model = _this$props3.model,
          onCheck = _this$props3.onCheck,
          onError = _this$props3.onError;
      var promises = [];
      var keys = [];
      Object.keys(model.schema).forEach(function (key) {
        keys.push(key);
        promises.push(model.checkForFieldAsync(key, formValue[key], formValue));
      });
      return Promise.all(promises).then(function (values) {
        var formError = {};
        var errorCount = 0;

        for (var i = 0; i < values.length; i++) {
          if (values[i].hasError) {
            errorCount += 1;
            formError[keys[i]] = values[i].errorMessage;
          }
        }

        onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);

        if (errorCount > 0) {
          onError === null || onError === void 0 ? void 0 : onError(formError);
        }

        _this.setState({
          formError: formError
        });

        return {
          hasError: errorCount > 0,
          formError: formError
        };
      });
    };

    _this.checkForFieldAsync = function (fieldName) {
      var formValue = _this.getFormValue() || {};
      var _this$props4 = _this.props,
          model = _this$props4.model,
          onCheck = _this$props4.onCheck,
          onError = _this$props4.onError;
      return model.checkForFieldAsync(fieldName, formValue[fieldName], formValue).then(function (checkResult) {
        _this.setState(function (prvState, props) {
          var _extends3;

          var formError = (0, _extends6.default)({}, _this.getFormError(prvState, props), (_extends3 = {}, _extends3[fieldName] = checkResult.errorMessage, _extends3));
          onCheck === null || onCheck === void 0 ? void 0 : onCheck(formError);

          if (checkResult.hasError) {
            onError === null || onError === void 0 ? void 0 : onError(formError);
          }

          return {
            formError: formError
          };
        });

        return checkResult;
      });
    };

    _this.handleFieldError = function (name, errorMessage) {
      _this.setState(function (prvState, props) {
        var _extends4, _this$props$onError, _this$props5, _this$props$onCheck, _this$props6;

        var formError = (0, _extends6.default)({}, _this.getFormError(prvState, props), (_extends4 = {}, _extends4[name] = errorMessage, _extends4));
        (_this$props$onError = (_this$props5 = _this.props).onError) === null || _this$props$onError === void 0 ? void 0 : _this$props$onError.call(_this$props5, formError);
        (_this$props$onCheck = (_this$props6 = _this.props).onCheck) === null || _this$props$onCheck === void 0 ? void 0 : _this$props$onCheck.call(_this$props6, formError);
        return {
          formError: formError
        };
      });
    };

    _this.handleFieldSuccess = function (name) {
      _this.setState(function (prvState, props) {
        var _this$props$onCheck2, _this$props7;

        var formError = (0, _omit2.default)(_this.getFormError(prvState, props), [name]);
        (_this$props$onCheck2 = (_this$props7 = _this.props).onCheck) === null || _this$props$onCheck2 === void 0 ? void 0 : _this$props$onCheck2.call(_this$props7, formError);
        return {
          formError: formError
        };
      });
    };

    _this.handleFieldChange = function (name, value, event) {
      var _extends5, _this$props$onChange, _this$props8;

      var formValue = _this.getFormValue();

      var nextFormValue = (0, _extends6.default)({}, formValue, (_extends5 = {}, _extends5[name] = value, _extends5));

      _this.setState({
        formValue: nextFormValue
      });

      (_this$props$onChange = (_this$props8 = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props8, nextFormValue, event);
    };

    var _this$props9 = _this.props,
        formDefaultValue = _this$props9.formDefaultValue,
        _formError = _this$props9.formError;
    _this.state = {
      formError: _formError || {},
      formValue: formDefaultValue
    };
    return _this;
  }

  var _proto = Form.prototype;

  /**
   * public APIs
   */
  _proto.cleanErrors = function cleanErrors(callback) {
    this.setState({
      formError: {}
    }, callback);
  }
  /**
   * public APIs
   */
  ;

  _proto.cleanErrorForFiled = function cleanErrorForFiled(fieldName, callback) {
    this.setState({
      formError: (0, _omit2.default)(this.state.formError, [fieldName])
    }, callback);
  }
  /**
   * public APIs
   */
  ;

  _proto.resetErrors = function resetErrors(formError, callback) {
    if (formError === void 0) {
      formError = {};
    }

    this.setState({
      formError: formError
    }, callback);
  };

  _proto.getFormContextValue = function getFormContextValue() {
    var _this$props10 = this.props,
        formDefaultValue = _this$props10.formDefaultValue,
        errorFromContext = _this$props10.errorFromContext,
        model = _this$props10.model,
        checkTrigger = _this$props10.checkTrigger,
        readOnly = _this$props10.readOnly,
        plaintext = _this$props10.plaintext;
    var nextFormContextValue = {
      model: model,
      checkTrigger: checkTrigger,
      formDefaultValue: formDefaultValue,
      errorFromContext: errorFromContext,
      readOnly: readOnly,
      plaintext: plaintext,
      onFieldChange: this.handleFieldChange,
      onFieldError: this.handleFieldError,
      onFieldSuccess: this.handleFieldSuccess
    };

    if (!(0, _utils.shallowEqual)(nextFormContextValue, this.formContextValue)) {
      this.formContextValue = nextFormContextValue;
    }

    return this.formContextValue;
  };

  _proto.checkErrorFromContext = function checkErrorFromContext(children) {
    var errorFromContext = this.props.errorFromContext;

    if (errorFromContext) {
      var formError = this.getFormError();
      return React.createElement(_FormContext.FormErrorContext.Provider, {
        value: formError
      }, children);
    }

    return children;
  };

  _proto.render = function render() {
    var _this$props11 = this.props,
        _this$props11$formVal = _this$props11.formValue,
        formValue = _this$props11$formVal === void 0 ? {} : _this$props11$formVal,
        layout = _this$props11.layout,
        classPrefix = _this$props11.classPrefix,
        fluid = _this$props11.fluid,
        className = _this$props11.className,
        children = _this$props11.children,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props11, ["formValue", "layout", "classPrefix", "fluid", "className", "children"]);
    var addPrefix = (0, _utils2.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, addPrefix(layout), addPrefix(fluid && layout === 'vertical' ? 'fluid' : 'fixed-width'));
    var unhandled = (0, _utils2.getUnhandledProps)(Form, props);
    var contextDefalutValue = this.getFormContextValue();
    return React.createElement("form", (0, _extends6.default)({
      onSubmit: preventDefaultEvent
    }, unhandled, {
      className: classes
    }), React.createElement(_FormContext.default.Provider, {
      value: contextDefalutValue
    }, React.createElement(_FormContext.FormValueContext.Provider, {
      value: formValue
    }, this.checkErrorFromContext(children))));
  };

  return Form;
}(React.Component);

Form.propTypes = {
  className: _propTypes.default.string,
  layout: _propTypes.default.oneOf(['horizontal', 'vertical', 'inline']),
  fluid: _propTypes.default.bool,
  formValue: _propTypes.default.object,
  formDefaultValue: _propTypes.default.object,
  formError: _propTypes.default.object,
  checkDelay: _propTypes.default.number,
  checkTrigger: _propTypes.default.oneOf(['change', 'blur', 'none']),
  onChange: _propTypes.default.func,
  onError: _propTypes.default.func,
  onCheck: _propTypes.default.func,
  model: _propTypes.default.object,
  classPrefix: _propTypes.default.string,
  errorFromContext: _propTypes.default.bool,
  children: _propTypes.default.node,
  readOnly: _propTypes.default.bool,
  plaintext: _propTypes.default.bool
};
Form.defaultProps = {
  classPrefix: (0, _prefix.defaultClassPrefix)('form'),
  model: (0, _schemaTyped.SchemaModel)({}),
  layout: 'vertical',
  formDefaultValue: {},
  checkDelay: 500,
  checkTrigger: 'change',
  errorFromContext: true
};
var _default = Form;
exports.default = _default;
module.exports = exports.default;