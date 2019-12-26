"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var PanelGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PanelGroup, _React$Component);

  function PanelGroup(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;

    _this.handleSelect = function (activeKey, event) {
      var _this$props$onSelect, _this$props;

      _this.setState({
        activeKey: activeKey
      });

      (_this$props$onSelect = (_this$props = _this.props).onSelect) === null || _this$props$onSelect === void 0 ? void 0 : _this$props$onSelect.call(_this$props, activeKey, event);
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.renderPanel = function (child, index) {
      if (!React.isValidElement(child)) {
        return child;
      }

      var accordion = _this.props.accordion;

      var activeKey = _this.getActiveKey();

      var props = {
        key: child.key ? child.key : index,
        ref: (0, _get2.default)(child, 'ref')
      };

      if (accordion) {
        return (0, _extends2.default)({}, props, {
          headerRole: 'tab',
          panelRole: 'tabpanel',
          collapsible: true,
          expanded: (0, _isUndefined2.default)(activeKey) ? child.props.expanded : child.props.eventKey === activeKey,
          onSelect: _this.handleSelect
        });
      }

      return props;
    };

    _this.state = {
      activeKey: _props.defaultActiveKey
    };
    return _this;
  }

  var _proto = PanelGroup.prototype;

  _proto.getActiveKey = function getActiveKey() {
    var activeKey = this.props.activeKey;
    return (0, _isUndefined2.default)(activeKey) ? this.state.activeKey : activeKey;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        className = _this$props2.className,
        accordion = _this$props2.accordion,
        bordered = _this$props2.bordered,
        classPrefix = _this$props2.classPrefix,
        children = _this$props2.children,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["className", "accordion", "bordered", "classPrefix", "children"]);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[this.addPrefix('accordion')] = accordion, _classNames[this.addPrefix('bordered')] = bordered, _classNames));
    var unhandled = (0, _utils.getUnhandledProps)(PanelGroup, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      role: accordion ? 'tablist' : undefined,
      className: classes
    }), _utils.ReactChildren.mapCloneElement(children, this.renderPanel));
  };

  return PanelGroup;
}(React.Component);

PanelGroup.propTypes = {
  accordion: _propTypes.default.bool,
  activeKey: _propTypes.default.any,
  bordered: _propTypes.default.bool,
  defaultActiveKey: _propTypes.default.any,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  onSelect: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'panel-group'
})(PanelGroup);

exports.default = _default;
module.exports = exports.default;