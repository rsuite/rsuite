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

var _compose = _interopRequireDefault(require("recompose/compose"));

var _utils = require("../utils");

var ButtonGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ButtonGroup, _React$Component);

  function ButtonGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ButtonGroup.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        vertical = _this$props.vertical,
        children = _this$props.children,
        block = _this$props.block,
        justified = _this$props.justified,
        classPrefix = _this$props.classPrefix,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "vertical", "children", "block", "justified", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('block')] = block, _classNames[addPrefix('vertical')] = vertical, _classNames[addPrefix('justified')] = justified, _classNames));
    /**
     * After you set up justified, you use the table layout.
     * display:table-cell not working on button element.
     * So change 'a'
     */

    var items = children;

    if (justified) {
      items = React.Children.map(children, function (child) {
        return React.cloneElement(child, {
          componentClass: 'a',
          role: 'button'
        });
      });
    }

    return React.createElement("div", (0, _extends2.default)({
      role: "group"
    }, props, {
      className: classes
    }), items);
  };

  return ButtonGroup;
}(React.Component);

ButtonGroup.propTypes = {
  className: _propTypes.default.string,
  vertical: _propTypes.default.bool,
  justified: _propTypes.default.bool,
  block: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node
};

var _default = (0, _compose.default)((0, _utils.withStyleProps)({
  hasSize: true
}), (0, _utils.defaultProps)({
  classPrefix: 'btn-group'
}))(ButtonGroup);

exports.default = _default;
module.exports = exports.default;