"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.FormGroupContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _utils = require("../utils");

var FormGroupContext = (0, _utils.createContext)(null);
exports.FormGroupContext = FormGroupContext;

var FormGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(FormGroup, _React$Component);

  function FormGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FormGroup.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        controlId = _this$props.controlId,
        validationState = _this$props.validationState,
        className = _this$props.className,
        isValid = _this$props.isValid,
        classPrefix = _this$props.classPrefix,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["controlId", "validationState", "className", "isValid", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('has-success')] = !validationState && isValid, _classNames[addPrefix('has-error')] = !validationState && isValid === false, _classNames[addPrefix("has-" + (validationState || ''))] = !(0, _isUndefined2.default)(validationState), _classNames));
    return React.createElement(FormGroupContext.Provider, {
      value: controlId
    }, React.createElement("div", (0, _extends2.default)({}, rest, {
      className: classes,
      role: "group"
    })));
  };

  return FormGroup;
}(React.Component);

FormGroup.propTypes = {
  controlId: _propTypes.default.string,
  isValid: _propTypes.default.bool,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  validationState: _propTypes.default.oneOf(['success', 'warning', 'error'])
};

var _default = (0, _compose.default)((0, _utils.withStyleProps)({
  hasSize: true
}), (0, _utils.defaultProps)({
  classPrefix: 'form-group'
}))(FormGroup);

exports.default = _default;