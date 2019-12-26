"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var Grid =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Grid, _React$Component);

  function Grid() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Grid.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        fluid = _this$props.fluid,
        Component = _this$props.componentClass,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["fluid", "componentClass", "className", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(fluid ? addPrefix('fluid') : classPrefix, className);
    return React.createElement(Component, (0, _extends2.default)({}, props, {
      className: classes
    }));
  };

  return Grid;
}(React.Component);

Grid.propTypes = {
  className: _propTypes.default.string,
  fluid: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  componentClass: _propTypes.default.elementType
};

var _default = (0, _utils.defaultProps)({
  componentClass: 'div',
  classPrefix: 'grid-container'
})(Grid);

exports.default = _default;
module.exports = exports.default;