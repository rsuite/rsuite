"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.SidenavContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _remove2 = _interopRequireDefault(require("lodash/remove"));

var _clone2 = _interopRequireDefault(require("lodash/clone"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _Transition = _interopRequireDefault(require("rsuite-utils/lib/Animation/Transition"));

var _shallowEqual = _interopRequireDefault(require("rsuite-utils/lib/utils/shallowEqual"));

var _SidenavBody = _interopRequireDefault(require("./SidenavBody"));

var _SidenavHeader = _interopRequireDefault(require("./SidenavHeader"));

var _SidenavToggle = _interopRequireDefault(require("./SidenavToggle"));

var _utils = require("../utils");

var SidenavContext = (0, _utils.createContext)(null);
exports.SidenavContext = SidenavContext;

var Sidenav =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Sidenav, _React$Component);

  function Sidenav(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.getOpenKeys = function () {
      var openKeys = _this.props.openKeys;

      if ((0, _isUndefined2.default)(openKeys)) {
        return _this.state.openKeys;
      }

      return openKeys;
    };

    _this.handleSelect = function (eventKey, event) {
      var _this$props$onSelect, _this$props;

      (_this$props$onSelect = (_this$props = _this.props).onSelect) === null || _this$props$onSelect === void 0 ? void 0 : _this$props$onSelect.call(_this$props, eventKey, event);
    };

    _this.handleOpenChange = function (eventKey, event) {
      var _this$props$onOpenCha, _this$props2;

      var find = function find(key) {
        return (0, _shallowEqual.default)(key, eventKey);
      };

      var openKeys = (0, _clone2.default)(_this.getOpenKeys()) || [];

      if (openKeys.some(find)) {
        (0, _remove2.default)(openKeys, find);
      } else {
        openKeys.push(eventKey);
      }

      _this.setState({
        openKeys: openKeys
      });

      (_this$props$onOpenCha = (_this$props2 = _this.props).onOpenChange) === null || _this$props$onOpenCha === void 0 ? void 0 : _this$props$onOpenCha.call(_this$props2, openKeys, event);
    };

    _this.state = {
      openKeys: props.defaultOpenKeys || []
    };
    return _this;
  }

  var _proto = Sidenav.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        className = _this$props3.className,
        classPrefix = _this$props3.classPrefix,
        appearance = _this$props3.appearance,
        expanded = _this$props3.expanded,
        activeKey = _this$props3.activeKey,
        Component = _this$props3.componentClass,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["className", "classPrefix", "appearance", "expanded", "activeKey", "componentClass"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, addPrefix(appearance), className);
    var unhandled = (0, _utils.getUnhandledProps)(Sidenav, props);
    return React.createElement(SidenavContext.Provider, {
      value: {
        expanded: expanded,
        activeKey: activeKey,
        sidenav: true,
        openKeys: this.getOpenKeys(),
        onOpenChange: this.handleOpenChange,
        onSelect: this.handleSelect
      }
    }, React.createElement(_Transition.default, {
      in: expanded,
      timeout: 300,
      exitedClassName: addPrefix('collapse-out'),
      exitingClassName: addPrefix(['collapse-out', 'collapsing']),
      enteredClassName: addPrefix('collapse-in'),
      enteringClassName: addPrefix(['collapse-in', 'collapsing'])
    }, React.createElement(Component, (0, _extends2.default)({}, unhandled, {
      className: classes,
      role: "navigation"
    }))));
  };

  return Sidenav;
}(React.Component);

Sidenav.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  expanded: _propTypes.default.bool,
  appearance: _propTypes.default.oneOf(['default', 'inverse', 'subtle']),
  defaultOpenKeys: _propTypes.default.array,
  openKeys: _propTypes.default.array,
  onOpenChange: _propTypes.default.func,
  activeKey: _propTypes.default.any,
  onSelect: _propTypes.default.func,
  componentClass: _propTypes.default.elementType
};
Sidenav.defaultProps = {
  appearance: 'default',
  expanded: true
};
var EnhancedSidenav = (0, _utils.defaultProps)({
  classPrefix: 'sidenav',
  componentClass: 'div'
})(Sidenav);
(0, _setStatic.default)('Header', _SidenavHeader.default)(EnhancedSidenav);
(0, _setStatic.default)('Body', _SidenavBody.default)(EnhancedSidenav);
(0, _setStatic.default)('Toggle', _SidenavToggle.default)(EnhancedSidenav);
var _default = EnhancedSidenav;
exports.default = _default;