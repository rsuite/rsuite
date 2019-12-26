"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var InputSearch =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(InputSearch, _React$Component);

  function InputSearch() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChange = function (event) {
      var _this$props$onChange, _this$props;

      (_this$props$onChange = (_this$props = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props, (0, _get2.default)(event, 'target.value'), event);
    };

    return _this;
  }

  var _proto = InputSearch.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        value = _this$props2.value,
        Component = _this$props2.componentClass,
        children = _this$props2.children,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        inputRef = _this$props2.inputRef,
        style = _this$props2.style,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["value", "componentClass", "children", "className", "classPrefix", "inputRef", "style"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(InputSearch, rest);
    return React.createElement("div", {
      className: (0, _classnames.default)(classPrefix, className),
      style: style
    }, React.createElement(Component, (0, _extends2.default)({}, unhandled, {
      ref: inputRef,
      className: addPrefix('input'),
      value: value,
      onChange: this.handleChange
    })), children);
  };

  return InputSearch;
}(React.Component);

InputSearch.propTypes = {
  classPrefix: _propTypes.default.string,
  value: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  inputRef: _propTypes.default.object,
  componentClass: _propTypes.default.elementType,
  onChange: _propTypes.default.func
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'picker-search',
  componentClass: 'input'
});

var _default = enhance(InputSearch);

exports.default = _default;
module.exports = exports.default;