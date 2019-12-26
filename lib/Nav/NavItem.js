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

var _setDisplayName = _interopRequireDefault(require("recompose/setDisplayName"));

var _SafeAnchor = _interopRequireDefault(require("../SafeAnchor"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _Whisper = _interopRequireDefault(require("../Whisper"));

var _Ripple = _interopRequireDefault(require("../Ripple"));

var _utils = require("../utils");

var addTooltip = function addTooltip(children, tip) {
  return React.createElement(_Whisper.default, {
    speaker: React.createElement(_Tooltip.default, null, tip),
    placement: "right"
  }, children);
};

var NavItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(NavItem, _React$Component);

  function NavItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          disabled = _this$props.disabled,
          eventKey = _this$props.eventKey;

      if (onSelect && !disabled) {
        onSelect(eventKey, event);
      }
    };

    return _this;
  }

  var _proto = NavItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        active = _this$props2.active,
        disabled = _this$props2.disabled,
        onClick = _this$props2.onClick,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        style = _this$props2.style,
        children = _this$props2.children,
        icon = _this$props2.icon,
        tabIndex = _this$props2.tabIndex,
        hasTooltip = _this$props2.hasTooltip,
        divider = _this$props2.divider,
        panel = _this$props2.panel,
        Component = _this$props2.componentClass,
        renderItem = _this$props2.renderItem,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["active", "disabled", "onClick", "className", "classPrefix", "style", "children", "icon", "tabIndex", "hasTooltip", "divider", "panel", "componentClass", "renderItem"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(NavItem, rest);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames[addPrefix('disabled')] = disabled, _classNames));

    if (divider) {
      return React.createElement("li", {
        role: "separator",
        style: style,
        className: (0, _classnames.default)(addPrefix('divider'), className)
      });
    }

    if (panel) {
      return React.createElement("li", {
        style: style,
        className: (0, _classnames.default)(addPrefix('panel'), className)
      }, children);
    }

    if (Component === _SafeAnchor.default) {
      unhandled.disabled = disabled;
    }

    var item = React.createElement(Component, (0, _extends2.default)({}, unhandled, {
      role: "button",
      tabIndex: tabIndex,
      className: addPrefix('content'),
      onClick: (0, _utils.createChainedFunction)(onClick, this.handleClick)
    }), icon, children, React.createElement(_Ripple.default, null));

    if (renderItem) {
      item = renderItem(item);
    }

    return React.createElement("li", {
      role: "presentation",
      className: classes,
      style: style
    }, hasTooltip ? addTooltip(item, children) : item);
  };

  return NavItem;
}(React.Component);

NavItem.propTypes = {
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  divider: _propTypes.default.bool,
  panel: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  style: _propTypes.default.object,
  icon: _propTypes.default.node,
  onSelect: _propTypes.default.func,
  children: _propTypes.default.node,
  eventKey: _propTypes.default.any,
  tabIndex: _propTypes.default.number,
  hasTooltip: _propTypes.default.bool,
  componentClass: _propTypes.default.elementType,
  renderItem: _propTypes.default.func
};
NavItem.defaultProps = {
  tabIndex: 0
};
var EnhancedNavItem = (0, _utils.defaultProps)({
  classPrefix: 'nav-item',
  componentClass: _SafeAnchor.default
})(NavItem);

var _default = (0, _setDisplayName.default)('NavItem')(EnhancedNavItem);

exports.default = _default;
module.exports = exports.default;