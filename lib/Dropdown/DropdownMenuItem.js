"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _recompose = require("recompose");

var _SafeAnchor = _interopRequireDefault(require("../SafeAnchor"));

var _utils = require("../utils");

var _Sidenav = require("../Sidenav/Sidenav");

var DropdownMenuItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DropdownMenuItem, _React$Component);

  function DropdownMenuItem(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.toggle = function (_event, isOpen) {
      var open = (0, _isUndefined2.default)(isOpen) ? !_this.getOpen() : isOpen;

      _this.setState({
        open: open
      });
    };

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          eventKey = _this$props.eventKey,
          disabled = _this$props.disabled,
          onClick = _this$props.onClick;

      if (disabled) {
        event.preventDefault();
        return;
      }

      onSelect === null || onSelect === void 0 ? void 0 : onSelect(eventKey, event);
      onClick === null || onClick === void 0 ? void 0 : onClick(event);
    };

    _this.handleMouseOver = function (event) {
      _this.toggle(event, true);
    };

    _this.handleMouseOut = function (event) {
      _this.toggle(event, false);
    };

    _this.state = {
      open: props.open
    };
    return _this;
  }

  var _proto = DropdownMenuItem.prototype;

  _proto.getOpen = function getOpen() {
    var open = this.props.open;

    if ((0, _isUndefined2.default)(open)) {
      return this.state.open;
    }

    return open;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        children = _this$props2.children,
        divider = _this$props2.divider,
        panel = _this$props2.panel,
        active = _this$props2.active,
        disabled = _this$props2.disabled,
        className = _this$props2.className,
        submenu = _this$props2.submenu,
        style = _this$props2.style,
        classPrefix = _this$props2.classPrefix,
        tabIndex = _this$props2.tabIndex,
        pullLeft = _this$props2.pullLeft,
        icon = _this$props2.icon,
        trigger = _this$props2.trigger,
        expanded = _this$props2.expanded,
        Component = _this$props2.componentClass,
        renderItem = _this$props2.renderItem,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["children", "divider", "panel", "active", "disabled", "className", "submenu", "style", "classPrefix", "tabIndex", "pullLeft", "icon", "trigger", "expanded", "componentClass", "renderItem"]);
    var unhandled = (0, _utils.getUnhandledProps)(DropdownMenuItem, rest);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix(expanded ? 'expand' : 'collapse')] = submenu && (0, _get2.default)(this.context, 'sidenav'), _classNames[addPrefix('submenu')] = submenu, _classNames[addPrefix('open')] = this.getOpen(), _classNames[addPrefix('active')] = active, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix("pull-" + (pullLeft ? 'left' : 'right'))] = pullLeft, _classNames[addPrefix('with-icon')] = icon, _classNames));
    var itemProps = {};
    var itemToggleProps = {
      onClick: this.handleClick
    };

    if ((0, _utils.isOneOf)('hover', trigger) && submenu && !(0, _get2.default)(this.context, 'expanded')) {
      itemProps.onMouseOver = this.handleMouseOver;
      itemProps.onMouseOut = this.handleMouseOut;
    }

    if ((0, _utils.isOneOf)('click', trigger) && submenu) {
      itemToggleProps.onClick = (0, _utils.createChainedFunction)(this.handleClick, this.toggle);
    }

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

    var item = React.createElement(Component, (0, _extends2.default)({}, unhandled, itemToggleProps, {
      className: addPrefix('content'),
      tabIndex: tabIndex
    }), icon && React.cloneElement(icon, {
      className: addPrefix('menu-icon')
    }), children);
    return React.createElement("li", (0, _extends2.default)({}, itemProps, {
      style: style,
      role: "presentation",
      className: classes
    }), renderItem ? renderItem(item) : item);
  };

  return DropdownMenuItem;
}(React.Component);

DropdownMenuItem.contextType = _Sidenav.SidenavContext;
DropdownMenuItem.propTypes = {
  divider: _propTypes.default.bool,
  panel: _propTypes.default.bool,
  trigger: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.oneOf(['click', 'hover'])]),
  open: _propTypes.default.bool,
  expanded: _propTypes.default.bool,
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  pullLeft: _propTypes.default.bool,
  submenu: _propTypes.default.bool,
  onSelect: _propTypes.default.func,
  onClick: _propTypes.default.func,
  icon: _propTypes.default.node,
  eventKey: _propTypes.default.any,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  componentClass: _propTypes.default.elementType,
  renderItem: _propTypes.default.func
};
DropdownMenuItem.defaultProps = {
  tabIndex: -1,
  trigger: 'hover'
};
var EnhancedDropdownMenuItem = (0, _utils.defaultProps)({
  classPrefix: 'dropdown-item',
  componentClass: _SafeAnchor.default
})(DropdownMenuItem);

var _default = (0, _recompose.setDisplayName)('DropdownMenuItem')(EnhancedDropdownMenuItem);

exports.default = _default;
module.exports = exports.default;