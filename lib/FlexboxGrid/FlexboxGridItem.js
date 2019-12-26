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

var FlexboxGridItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(FlexboxGridItem, _React$Component);

  function FlexboxGridItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FlexboxGridItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        colspan = _this$props.colspan,
        order = _this$props.order,
        Component = _this$props.componentClass,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix", "colspan", "order", "componentClass"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(className, classPrefix, (_classNames = {}, _classNames[addPrefix("" + colspan)] = colspan >= 0, _classNames[addPrefix("order-" + order)] = order, _classNames));
    return React.createElement(Component, (0, _extends2.default)({}, props, {
      className: classes
    }));
  };

  return FlexboxGridItem;
}(React.Component);

FlexboxGridItem.propTypes = {
  className: _propTypes.default.string,
  colspan: _propTypes.default.number,
  order: _propTypes.default.number,
  classPrefix: _propTypes.default.string,
  componentClass: _propTypes.default.elementType
};
FlexboxGridItem.defaultProps = {
  componentClass: 'div',
  colspan: 0,
  order: 0
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'flex-box-grid-item'
})(FlexboxGridItem);

exports.default = _default;
module.exports = exports.default;