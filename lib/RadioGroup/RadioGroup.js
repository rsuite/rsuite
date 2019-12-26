"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.RadioContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var RadioContext = (0, _utils.createContext)({});
exports.RadioContext = RadioContext;

var RadioGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(RadioGroup, _React$Component);

  function RadioGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleChange = function (nextValue, _itemChecked, event) {
      var _this$props$onChange, _this$props;

      _this.setState({
        value: nextValue
      });

      (_this$props$onChange = (_this$props = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props, nextValue, event);
    };

    _this.getContextProps = function () {
      var _this$props2 = _this.props,
          inline = _this$props2.inline,
          name = _this$props2.name;

      var value = _this.getValue();

      return {
        inline: inline,
        name: name,
        value: (0, _isUndefined2.default)(value) ? null : value,
        onChange: _this.handleChange
      };
    };

    _this.state = {
      value: props.defaultValue
    };
    return _this;
  }

  var _proto = RadioGroup.prototype;

  _proto.getValue = function getValue() {
    var value = this.props.value;
    return (0, _isUndefined2.default)(value) ? this.state.value : value;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props3 = this.props,
        className = _this$props3.className,
        inline = _this$props3.inline,
        children = _this$props3.children,
        classPrefix = _this$props3.classPrefix,
        appearance = _this$props3.appearance,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["className", "inline", "children", "classPrefix", "appearance"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, addPrefix(appearance), className, (_classNames = {}, _classNames[addPrefix('inline')] = inline, _classNames));
    var unhandled = (0, _utils.getUnhandledProps)(RadioGroup, rest);
    return React.createElement(RadioContext.Provider, {
      value: this.getContextProps()
    }, React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes,
      role: "button"
    }), children));
  };

  return RadioGroup;
}(React.Component);

RadioGroup.propTypes = {
  appearance: _propTypes.default.oneOf(['default', 'picker']),
  name: _propTypes.default.string,
  inline: _propTypes.default.bool,
  value: _propTypes.default.any,
  defaultValue: _propTypes.default.any,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  onChange: _propTypes.default.func
};
RadioGroup.defaultProps = {
  appearance: 'default'
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'radio-group'
})(RadioGroup);

exports.default = _default;