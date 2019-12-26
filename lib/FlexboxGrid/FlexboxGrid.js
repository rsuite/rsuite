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

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _utils = require("../utils");

var _FlexboxGridItem = _interopRequireDefault(require("./FlexboxGridItem"));

var FlexboxGrid =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(FlexboxGrid, _React$Component);

  function FlexboxGrid() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FlexboxGrid.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        align = _this$props.align,
        justify = _this$props.justify,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix", "align", "justify"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, addPrefix(align), addPrefix(justify));
    return React.createElement("div", (0, _extends2.default)({}, props, {
      className: classes
    }));
  };

  return FlexboxGrid;
}(React.Component);

FlexboxGrid.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  align: _propTypes.default.oneOf(['top', 'middle', 'bottom']),
  justify: _propTypes.default.oneOf(['start', 'end', 'center', 'space-around', 'space-between'])
};
FlexboxGrid.defaultProps = {
  align: 'top',
  justify: 'start'
};
var EnhancedFlexboxGrid = (0, _utils.defaultProps)({
  classPrefix: 'flex-box-grid'
})(FlexboxGrid);
(0, _setStatic.default)('Item', _FlexboxGridItem.default)(EnhancedFlexboxGrid);
var _default = EnhancedFlexboxGrid;
exports.default = _default;
module.exports = exports.default;