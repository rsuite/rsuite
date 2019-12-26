"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.InputGroupContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _InputGroupAddon = _interopRequireDefault(require("./InputGroupAddon"));

var _InputGroupButton = _interopRequireDefault(require("./InputGroupButton"));

var _utils = require("../utils");

var InputGroupContext = (0, _utils.createContext)(null);
exports.InputGroupContext = InputGroupContext;

var InputGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(InputGroup, _React$Component);

  function InputGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleFocus = function () {
      _this.setState({
        focus: true
      });
    };

    _this.handleBlur = function () {
      _this.setState({
        focus: false
      });
    };

    _this.state = {
      focus: false
    };
    return _this;
  }

  var _proto = InputGroup.prototype;

  _proto.disabledChildren = function disabledChildren() {
    var children = this.props.children;
    return React.Children.map(children, function (item) {
      if (React.isValidElement(item)) {
        return React.cloneElement(item, {
          disabled: true
        });
      }

      return item;
    });
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        disabled = _this$props.disabled,
        inside = _this$props.inside,
        children = _this$props.children,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix", "disabled", "inside", "children"]);
    var focus = this.state.focus;
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('inside')] = inside, _classNames[addPrefix('focus')] = focus, _classNames[addPrefix('disabled')] = disabled, _classNames));
    return React.createElement(InputGroupContext.Provider, {
      value: {
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }
    }, React.createElement("div", (0, _extends2.default)({}, props, {
      className: classes
    }), disabled ? this.disabledChildren() : children));
  };

  return InputGroup;
}(React.Component);

InputGroup.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  inside: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  children: _propTypes.default.node
};
var EnhancedInputGroup = (0, _compose.default)((0, _utils.withStyleProps)({
  hasSize: true
}), (0, _utils.defaultProps)({
  classPrefix: 'input-group'
}))(InputGroup);
(0, _setStatic.default)('Addon', _InputGroupAddon.default)(EnhancedInputGroup);
(0, _setStatic.default)('Button', _InputGroupButton.default)(EnhancedInputGroup);
var _default = EnhancedInputGroup;
exports.default = _default;