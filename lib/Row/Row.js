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

var Row =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Row, _React$Component);

  function Row() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Row.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        gutter = _this$props.gutter,
        children = _this$props.children,
        Component = _this$props.componentClass,
        classPrefix = _this$props.classPrefix,
        style = _this$props.style,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "gutter", "children", "componentClass", "classPrefix", "style"]);
    var classes = (0, _classnames.default)(classPrefix, className);

    if (typeof gutter !== 'undefined') {
      var padding = gutter / 2;

      var cols = _utils.ReactChildren.mapCloneElement(children, function (child) {
        return (0, _extends2.default)({}, child.props, {
          style: (0, _extends2.default)({}, child.props.style, {
            paddingLeft: padding,
            paddingRight: padding
          })
        });
      });

      var styles = (0, _extends2.default)({}, style, {
        marginLeft: -padding,
        marginRight: -padding
      });
      return React.createElement(Component, (0, _extends2.default)({}, props, {
        className: classes,
        style: styles
      }), cols);
    }

    return React.createElement(Component, (0, _extends2.default)({}, props, {
      className: classes,
      style: style
    }), children);
  };

  return Row;
}(React.Component);

Row.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  gutter: _propTypes.default.number,
  style: _propTypes.default.object,
  componentClass: _propTypes.default.elementType,
  children: _propTypes.default.node
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'row',
  componentClass: 'div'
})(Row);

exports.default = _default;
module.exports = exports.default;