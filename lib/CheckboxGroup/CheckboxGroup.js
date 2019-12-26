"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.CheckboxContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _remove2 = _interopRequireDefault(require("lodash/remove"));

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowEqual = _interopRequireDefault(require("rsuite-utils/lib/utils/shallowEqual"));

var _utils = require("../utils");

var CheckboxContext = (0, _utils.createContext)({});
exports.CheckboxContext = CheckboxContext;

var CheckboxGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(CheckboxGroup, _React$Component);

  function CheckboxGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.getContextProps = function () {
      var _this$props = _this.props,
          inline = _this$props.inline,
          name = _this$props.name,
          value = _this$props.value;
      return {
        inline: inline,
        name: name,
        value: _this.getValue(),
        controlled: !(0, _isUndefined2.default)(value),
        onChange: _this.handleChange
      };
    };

    _this.handleChange = function (itemValue, itemChecked, event) {
      var _this$props$onChange, _this$props2;

      var nextValue = (0, _cloneDeep2.default)(_this.getValue()) || [];

      if (itemChecked) {
        nextValue.push(itemValue);
      } else {
        (0, _remove2.default)(nextValue, function (i) {
          return (0, _shallowEqual.default)(i, itemValue);
        });
      }

      _this.setState({
        value: nextValue
      });

      (_this$props$onChange = (_this$props2 = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props2, nextValue, event);
    };

    _this.state = {
      value: props.defaultValue || []
    };
    return _this;
  }

  var _proto = CheckboxGroup.prototype;

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
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["className", "inline", "children", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('inline')] = inline, _classNames));
    var unhandled = (0, _utils.getUnhandledProps)(CheckboxGroup, props);
    return React.createElement(CheckboxContext.Provider, {
      value: this.getContextProps()
    }, React.createElement("div", (0, _extends2.default)({}, unhandled, {
      role: "group",
      className: classes
    }), children));
  };

  return CheckboxGroup;
}(React.Component);

CheckboxGroup.propTypes = {
  name: _propTypes.default.string,
  className: _propTypes.default.string,
  inline: _propTypes.default.bool,
  value: _propTypes.default.array,
  defaultValue: _propTypes.default.array,
  onChange: _propTypes.default.func,
  children: _propTypes.default.array,
  classPrefix: _propTypes.default.string
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'checkbox-group'
})(CheckboxGroup);

exports.default = _default;