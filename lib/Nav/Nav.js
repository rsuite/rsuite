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

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _shallowEqual = _interopRequireDefault(require("rsuite-utils/lib/utils/shallowEqual"));

var _NavItem = _interopRequireDefault(require("./NavItem"));

var _utils = require("../utils");

var _prefix = require("../utils/prefix");

var _Navbar = require("../Navbar/Navbar");

var _Sidenav = require("../Sidenav/Sidenav");

var Nav =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Nav, _React$Component);

  function Nav() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Nav.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        appearance = _this$props.appearance,
        vertical = _this$props.vertical,
        justified = _this$props.justified,
        reversed = _this$props.reversed,
        pullRight = _this$props.pullRight,
        className = _this$props.className,
        children = _this$props.children,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["classPrefix", "appearance", "vertical", "justified", "reversed", "pullRight", "className", "children"]);

    var _ref = this.context || {},
        _ref$sidenav = _ref.sidenav,
        sidenav = _ref$sidenav === void 0 ? false : _ref$sidenav,
        _ref$expanded = _ref.expanded,
        expanded = _ref$expanded === void 0 ? false : _ref$expanded,
        _ref$activeKey = _ref.activeKey,
        activeKey = _ref$activeKey === void 0 ? props.activeKey : _ref$activeKey,
        _ref$onSelect = _ref.onSelect,
        onSelect = _ref$onSelect === void 0 ? props.onSelect : _ref$onSelect;

    var addPrefix = (0, _utils.prefix)(classPrefix);
    var globalClassNamePrefix = (0, _prefix.getClassNamePrefix)();
    var hasWaterline = appearance !== 'default';

    var items = _utils.ReactChildren.mapCloneElement(children, function (item) {
      var _item$props = item.props,
          eventKey = _item$props.eventKey,
          active = _item$props.active,
          rest = (0, _objectWithoutPropertiesLoose2.default)(_item$props, ["eventKey", "active"]);
      var displayName = (0, _get2.default)(item, ['type', 'displayName']);

      if (displayName === 'NavItem') {
        return (0, _extends2.default)({}, rest, {
          onSelect: onSelect,
          hasTooltip: sidenav && !expanded,
          active: (0, _isUndefined2.default)(activeKey) ? active : (0, _shallowEqual.default)(activeKey, eventKey)
        });
      } else if (displayName === 'Dropdown') {
        return (0, _extends2.default)({}, rest, {
          onSelect: onSelect,
          activeKey: activeKey,
          componentClass: 'li'
        });
      }

      return null;
    });

    var unhandled = (0, _utils.getUnhandledProps)(Nav, props);
    return React.createElement(_Navbar.NavbarContext.Consumer, null, function (navbar) {
      var _classNames;

      var classes = (0, _classnames.default)(classPrefix, addPrefix(appearance), className, (_classNames = {}, _classNames[globalClassNamePrefix + "navbar-nav"] = navbar, _classNames[globalClassNamePrefix + "navbar-right"] = pullRight, _classNames[globalClassNamePrefix + "sidenav-nav"] = sidenav, _classNames[addPrefix('horizontal')] = navbar || !vertical && !sidenav, _classNames[addPrefix('vertical')] = vertical || sidenav, _classNames[addPrefix('justified')] = justified, _classNames[addPrefix('reversed')] = reversed, _classNames));
      return React.createElement("div", (0, _extends2.default)({}, unhandled, {
        className: classes
      }), React.createElement("ul", null, items), hasWaterline && React.createElement("div", {
        className: addPrefix('waterline')
      }));
    });
  };

  return Nav;
}(React.Component);

Nav.contextType = _Sidenav.SidenavContext;
Nav.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  appearance: _propTypes.default.oneOf(['default', 'subtle', 'tabs']),
  // Reverse Direction of tabs/subtle
  reversed: _propTypes.default.bool,
  justified: _propTypes.default.bool,
  vertical: _propTypes.default.bool,
  pullRight: _propTypes.default.bool,
  activeKey: _propTypes.default.any,
  onSelect: _propTypes.default.func
};
Nav.defaultProps = {
  appearance: 'default'
};
var EnhancedNav = (0, _utils.defaultProps)({
  classPrefix: 'nav'
})(Nav);
(0, _setStatic.default)('Item', _NavItem.default)(EnhancedNav);
var _default = EnhancedNav;
exports.default = _default;
module.exports = exports.default;