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

var _classnames2 = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _utils = require("../utils");

var Tag =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Tag, _React$Component);

  function Tag() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tag.prototype;

  _proto.render = function render() {
    var _classnames;

    var _this$props = this.props,
        children = _this$props.children,
        Component = _this$props.componentClass,
        onClose = _this$props.onClose,
        classPrefix = _this$props.classPrefix,
        closable = _this$props.closable,
        className = _this$props.className,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "componentClass", "onClose", "classPrefix", "closable", "className"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames2.default)(classPrefix, className, (_classnames = {}, _classnames[addPrefix('closeable')] = closable, _classnames));
    return React.createElement(Component, (0, _extends2.default)({
      className: classes
    }, rest), React.createElement("span", {
      className: addPrefix('text')
    }, children), closable && React.createElement("i", {
      role: "button",
      tabIndex: -1,
      className: addPrefix('icon-close'),
      onClick: onClose
    }));
  };

  return Tag;
}(React.Component);

Tag.propTypes = {
  closable: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  onClose: _propTypes.default.func,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  componentClass: _propTypes.default.elementType
};

var _default = (0, _compose.default)((0, _utils.withStyleProps)({
  hasColor: true,
  defaultColor: 'default'
}), (0, _utils.defaultProps)({
  componentClass: 'div',
  classPrefix: 'tag'
}))(Tag);

exports.default = _default;
module.exports = exports.default;