"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Collapse = _interopRequireDefault(require("rsuite-utils/lib/Animation/Collapse"));

var _shallowEqual = _interopRequireDefault(require("rsuite-utils/lib/utils/shallowEqual"));

var _setDisplayName = _interopRequireDefault(require("recompose/setDisplayName"));

var _DropdownMenuItem = _interopRequireDefault(require("./DropdownMenuItem"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Ripple = _interopRequireDefault(require("../Ripple"));

var _utils = require("../utils");

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DropdownMenu, _React$Component);

  function DropdownMenu() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleToggleChange = function (eventKey, event) {
      var _this$props$onToggle, _this$props;

      (_this$props$onToggle = (_this$props = _this.props).onToggle) === null || _this$props$onToggle === void 0 ? void 0 : _this$props$onToggle.call(_this$props, eventKey, event);
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = DropdownMenu.prototype;

  _proto.getMenuItemsAndStatus = function getMenuItemsAndStatus(children) {
    var _this2 = this;

    var hasActiveItem;
    var _this$props2 = this.props,
        activeKey = _this$props2.activeKey,
        onSelect = _this$props2.onSelect,
        classPrefix = _this$props2.classPrefix,
        _this$props2$openKeys = _this$props2.openKeys,
        openKeys = _this$props2$openKeys === void 0 ? [] : _this$props2$openKeys;
    var items = React.Children.map(children, function (item, index) {
      var displayName = (0, _get2.default)(item, ['type', 'displayName']);
      var active;

      if (displayName === 'DropdownMenuItem' || displayName === 'DropdownMenu') {
        active = _this2.isActive(item.props, activeKey);

        if (active) {
          hasActiveItem = true;
        }
      }

      if (displayName === 'DropdownMenuItem') {
        var onItemSelect = item.props.onSelect;
        return React.cloneElement(item, {
          key: index,
          active: active,
          onSelect: (0, _utils.createChainedFunction)(onSelect, onItemSelect)
        });
      } else if (displayName === 'DropdownMenu') {
        var _classNames;

        var itemsAndStatus = _this2.getMenuItemsAndStatus(item.props.children);

        var _item$props = item.props,
            icon = _item$props.icon,
            open = _item$props.open,
            trigger = _item$props.trigger,
            pullLeft = _item$props.pullLeft,
            eventKey = _item$props.eventKey,
            title = _item$props.title;
        var expanded = openKeys.some(function (key) {
          return (0, _shallowEqual.default)(key, eventKey);
        });
        var itemClassName = (0, _classnames.default)(_this2.addPrefix("pull-" + (pullLeft ? 'left' : 'right')), (_classNames = {}, _classNames[_this2.addPrefix('item-focus')] = _this2.isActive(item.props, activeKey), _classNames));
        return React.createElement(_DropdownMenuItem.default, {
          icon: icon,
          open: open,
          trigger: trigger,
          expanded: expanded,
          className: itemClassName,
          pullLeft: pullLeft,
          componentClass: "div",
          submenu: true
        }, React.createElement("div", {
          className: _this2.addPrefix('toggle'),
          onClick: _this2.handleToggleChange.bind(_this2, eventKey),
          role: "menu",
          tabIndex: -1
        }, React.createElement("span", null, title), React.createElement(_Icon.default, {
          className: _this2.addPrefix('toggle-icon'),
          icon: pullLeft ? 'angle-left' : 'angle-right'
        }), React.createElement(_Ripple.default, null)), _this2.renderCollapse(React.createElement("ul", {
          role: "menu",
          className: classPrefix
        }, itemsAndStatus.items), expanded));
      }

      return item;
    });
    return {
      items: items,
      active: hasActiveItem
    };
  };

  _proto.isActive = function isActive(props, activeKey) {
    var _this3 = this;

    if (props.active || !(0, _isUndefined2.default)(activeKey) && (0, _shallowEqual.default)(props.eventKey, activeKey)) {
      return true;
    }

    if (_utils.ReactChildren.some(props.children, function (child) {
      return _this3.isActive(child.props, activeKey);
    })) {
      return true;
    }

    return props.active;
  };

  _proto.renderCollapse = function renderCollapse(children, expanded) {
    return this.props.collapsible ? React.createElement(_Collapse.default, {
      in: expanded,
      exitedClassName: this.addPrefix('collapse-out'),
      exitingClassName: this.addPrefix('collapsing'),
      enteredClassName: this.addPrefix('collapse-in'),
      enteringClassName: this.addPrefix('collapsing')
    }, children) : children;
  };

  _proto.render = function render() {
    var _classNames2;

    var _this$props3 = this.props,
        children = _this$props3.children,
        className = _this$props3.className,
        classPrefix = _this$props3.classPrefix,
        expanded = _this$props3.expanded,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["children", "className", "classPrefix", "expanded"]);

    var _this$getMenuItemsAnd = this.getMenuItemsAndStatus(children),
        items = _this$getMenuItemsAnd.items,
        active = _this$getMenuItemsAnd.active;

    var unhandled = (0, _utils.getUnhandledProps)(DropdownMenu, props);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames2 = {}, _classNames2[this.addPrefix('active')] = active, _classNames2));
    return this.renderCollapse(React.createElement("ul", (0, _extends2.default)({}, unhandled, {
      className: classes,
      role: "menu"
    }), items), expanded);
  };

  return DropdownMenu;
}(React.Component);

DropdownMenu.propTypes = {
  activeKey: _propTypes.default.any,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  icon: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  pullLeft: _propTypes.default.bool,
  onSelect: _propTypes.default.func,
  title: _propTypes.default.node,
  open: _propTypes.default.bool,
  trigger: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.oneOf(['click', 'hover'])]),
  eventKey: _propTypes.default.any,
  openKeys: _propTypes.default.array,
  expanded: _propTypes.default.bool,
  collapsible: _propTypes.default.bool,
  onToggle: _propTypes.default.func
};
var EnhancedDropdownMenu = (0, _utils.defaultProps)({
  classPrefix: 'dropdown-menu'
})(DropdownMenu);

var _default = (0, _setDisplayName.default)('DropdownMenu')(EnhancedDropdownMenu);

exports.default = _default;
module.exports = exports.default;