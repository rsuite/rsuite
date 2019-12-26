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

var _domLib = require("dom-lib");

var _utils = require("../utils");

var DropdownMenuGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DropdownMenuGroup, _React$Component);

  function DropdownMenuGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.groupRef = void 0;

    _this.handleClickGroup = function (event) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          classPrefix = _this$props.classPrefix;
      (0, _domLib.toggleClass)(_this.groupRef.current, classPrefix + "-closed");
      onClick === null || onClick === void 0 ? void 0 : onClick(event);
    };

    _this.groupRef = React.createRef();
    return _this;
  }

  var _proto = DropdownMenuGroup.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        title = _this$props2.title,
        children = _this$props2.children,
        classPrefix = _this$props2.classPrefix,
        className = _this$props2.className,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["title", "children", "classPrefix", "className"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className);
    var unhandled = (0, _utils.getUnhandledProps)(DropdownMenuGroup, rest);
    return React.createElement("li", (0, _extends2.default)({}, unhandled, {
      className: classes,
      ref: this.groupRef
    }), React.createElement("div", {
      className: addPrefix('title'),
      role: "menuitem",
      tabIndex: -1,
      onClick: this.handleClickGroup
    }, React.createElement("span", null, title), React.createElement("span", {
      className: addPrefix('caret')
    })), React.createElement("ul", {
      className: addPrefix('children')
    }, children));
  };

  return DropdownMenuGroup;
}(React.Component);

DropdownMenuGroup.propTypes = {
  title: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  onClick: _propTypes.default.func
};
DropdownMenuGroup.defaultProps = {
  classPrefix: 'dropdown-menu-group'
};
var _default = DropdownMenuGroup;
exports.default = _default;
module.exports = exports.default;