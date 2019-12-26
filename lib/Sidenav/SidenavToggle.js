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

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _utils = require("../utils");

var SidenavToggle =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(SidenavToggle, _React$Component);

  function SidenavToggle() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleToggle = function (event) {
      var _this$props = _this.props,
          onToggle = _this$props.onToggle,
          expanded = _this$props.expanded;
      onToggle === null || onToggle === void 0 ? void 0 : onToggle(!expanded, event);
    };

    return _this;
  }

  var _proto = SidenavToggle.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        expanded = _this$props2.expanded,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["expanded", "className", "classPrefix"]);
    var classes = (0, _classnames.default)(classPrefix, className, {
      collapsed: !expanded
    });
    return React.createElement("div", (0, _extends2.default)({}, props, {
      className: classes
    }), React.createElement(_IconButton.default, {
      appearance: "default",
      icon: React.createElement(_Icon.default, {
        icon: expanded ? 'angle-right' : 'angle-left'
      }),
      onClick: this.handleToggle
    }));
  };

  return SidenavToggle;
}(React.Component);

SidenavToggle.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  expanded: _propTypes.default.bool,
  onToggle: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'sidenav-toggle'
})(SidenavToggle);

exports.default = _default;
module.exports = exports.default;