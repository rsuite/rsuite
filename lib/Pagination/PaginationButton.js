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

var _SafeAnchor = _interopRequireDefault(require("../SafeAnchor"));

var _Ripple = _interopRequireDefault(require("../Ripple"));

var _utils = require("../utils");

var PaginationButton =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PaginationButton, _React$Component);

  function PaginationButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onSelect = _this$props.onSelect,
          eventKey = _this$props.eventKey;

      if (disabled) {
        return;
      }

      onSelect === null || onSelect === void 0 ? void 0 : onSelect(eventKey, event);
    };

    return _this;
  }

  var _proto = PaginationButton.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        active = _this$props2.active,
        disabled = _this$props2.disabled,
        onClick = _this$props2.onClick,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        style = _this$props2.style,
        Component = _this$props2.componentClass,
        children = _this$props2.children,
        renderItem = _this$props2.renderItem,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["active", "disabled", "onClick", "className", "classPrefix", "style", "componentClass", "children", "renderItem"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(PaginationButton, rest);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames[addPrefix('disabled')] = disabled, _classNames));
    var item = React.createElement(Component, (0, _extends2.default)({}, unhandled, {
      disabled: disabled,
      onClick: (0, _utils.createChainedFunction)(onClick, this.handleClick)
    }), children, React.createElement(_Ripple.default, null));
    return React.createElement("li", {
      className: classes,
      style: style
    }, renderItem ? renderItem(item) : item);
  };

  return PaginationButton;
}(React.Component);

PaginationButton.propTypes = {
  classPrefix: _propTypes.default.string,
  eventKey: _propTypes.default.any,
  onSelect: _propTypes.default.func,
  onClick: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  active: _propTypes.default.bool,
  className: _propTypes.default.string,
  componentClass: _propTypes.default.elementType,
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  renderItem: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'pagination-btn',
  componentClass: _SafeAnchor.default
})(PaginationButton);

exports.default = _default;
module.exports = exports.default;