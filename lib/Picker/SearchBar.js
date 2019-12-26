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

var SearchBar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(SearchBar, _React$Component);

  function SearchBar() {
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

  var _proto = SearchBar.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        value = _this$props2.value,
        children = _this$props2.children,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        placeholder = _this$props2.placeholder,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["value", "children", "className", "classPrefix", "placeholder"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(SearchBar, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: (0, _classnames.default)(classPrefix, className)
    }), React.createElement("input", {
      className: addPrefix('input'),
      value: value,
      onChange: this.handleChange,
      placeholder: placeholder
    }), children);
  };

  return SearchBar;
}(React.Component);

SearchBar.propTypes = {
  classPrefix: _propTypes.default.string,
  value: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  onChange: _propTypes.default.func
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'picker-search-bar'
});

var _default = enhance(SearchBar);

exports.default = _default;
module.exports = exports.default;