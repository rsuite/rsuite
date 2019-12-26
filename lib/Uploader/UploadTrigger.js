"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Ripple = _interopRequireDefault(require("../Ripple"));

var _FormattedMessage = _interopRequireDefault(require("../IntlProvider/FormattedMessage"));

var _utils = require("../utils");

var Button = function Button(props) {
  return React.createElement("button", (0, _extends2.default)({}, props, {
    type: "button"
  }));
};

var UploadTrigger =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(UploadTrigger, _React$Component);

  function UploadTrigger(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.inputRef = void 0;

    _this.handleClick = function () {
      !_this.props.disabled && _this.inputRef.current.click();
    };

    _this.inputRef = React.createRef();
    return _this;
  }

  var _proto = UploadTrigger.prototype;

  _proto.getInputInstance = function getInputInstance() {
    return this.inputRef.current;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        name = _this$props.name,
        accept = _this$props.accept,
        multiple = _this$props.multiple,
        disabled = _this$props.disabled,
        onChange = _this$props.onChange,
        children = _this$props.children,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        Component = _this$props.componentClass,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["name", "accept", "multiple", "disabled", "onChange", "children", "classPrefix", "className", "componentClass"]);
    var unhandled = (0, _utils.getUnhandledProps)(UploadTrigger, rest);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('disabled')] = disabled, _classNames));
    var buttonProps = (0, _extends2.default)({}, unhandled, {
      className: addPrefix('btn'),
      onClick: this.handleClick
    });
    var trigger = children ? React.cloneElement(React.Children.only(children), buttonProps) : React.createElement(Component, buttonProps, React.createElement(_FormattedMessage.default, {
      id: "upload"
    }), React.createElement(_Ripple.default, null));
    return React.createElement("div", {
      className: classes
    }, React.createElement("input", {
      type: "file",
      name: name,
      multiple: multiple,
      disabled: disabled,
      accept: accept,
      ref: this.inputRef,
      onChange: onChange
    }), trigger);
  };

  return UploadTrigger;
}(React.Component);

UploadTrigger.propTypes = {
  name: _propTypes.default.string,
  multiple: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  accept: _propTypes.default.string,
  onChange: _propTypes.default.func,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  componentClass: _propTypes.default.elementType
};

var _default = (0, _utils.defaultProps)({
  componentClass: Button,
  classPrefix: 'uploader-trigger'
})(UploadTrigger);

exports.default = _default;
module.exports = exports.default;