"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _curry2 = _interopRequireDefault(require("lodash/curry"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _prefix = require("../utils/prefix");

var Sizes = ['xs', 'sm', 'md', 'lg'];
var omitKeys = [];
var getValue = (0, _curry2.default)(function (obj, key) {
  omitKeys.push(key);
  return obj[key];
});

var Col =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Col, _React$Component);

  function Col() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Col.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        Component = _this$props.componentClass,
        classPrefix = _this$props.classPrefix,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "componentClass", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = {};
    var getPropValue = getValue(this.props);
    Sizes.forEach(function (size) {
      var col = getPropValue(size);
      var hidden = getPropValue(size + "Hidden");
      var offset = getPropValue(size + "Offset");
      var push = getPropValue(size + "Push");
      var pull = getPropValue(size + "Pull");
      classes[(0, _prefix.defaultClassPrefix)("hidden-" + size)] = hidden;
      classes[addPrefix(size + "-" + col)] = col >= 0;
      classes[addPrefix(size + "-offset-" + offset)] = offset >= 0;
      classes[addPrefix(size + "-push-" + push)] = push >= 0;
      classes[addPrefix(size + "-pull-" + pull)] = pull >= 0;
    });
    var elementProps = (0, _omit2.default)(props, omitKeys);
    return React.createElement(Component, (0, _extends2.default)({}, elementProps, {
      className: (0, _classnames.default)(className, classPrefix, classes)
    }));
  };

  return Col;
}(React.Component);

Col.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  xs: _propTypes.default.number,
  sm: _propTypes.default.number,
  md: _propTypes.default.number,
  lg: _propTypes.default.number,
  xsOffset: _propTypes.default.number,
  smOffset: _propTypes.default.number,
  mdOffset: _propTypes.default.number,
  lgOffset: _propTypes.default.number,
  xsPush: _propTypes.default.number,
  smPush: _propTypes.default.number,
  mdPush: _propTypes.default.number,
  lgPush: _propTypes.default.number,
  xsPull: _propTypes.default.number,
  smPull: _propTypes.default.number,
  mdPull: _propTypes.default.number,
  lgPull: _propTypes.default.number,
  xsHidden: _propTypes.default.bool,
  smHidden: _propTypes.default.bool,
  mdHidden: _propTypes.default.bool,
  lgHidden: _propTypes.default.bool,
  componentClass: _propTypes.default.elementType
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'col',
  componentClass: 'div'
})(Col);

exports.default = _default;
module.exports = exports.default;