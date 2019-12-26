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

var _utils = require("../utils");

var AutoCompleteItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(AutoCompleteItem, _React$Component);

  function AutoCompleteItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          itemData = _this$props.itemData,
          onSelect = _this$props.onSelect;
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(itemData, event);
    };

    return _this;
  }

  var _proto = AutoCompleteItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        onKeyDown = _this$props2.onKeyDown,
        focus = _this$props2.focus,
        children = _this$props2.children,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        renderItem = _this$props2.renderItem,
        itemData = _this$props2.itemData,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["onKeyDown", "focus", "children", "className", "classPrefix", "renderItem", "itemData"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, (_classNames = {}, _classNames[addPrefix('focus')] = focus, _classNames));
    var unhandled = (0, _utils.getUnhandledProps)(AutoCompleteItem, rest);
    return React.createElement("li", (0, _extends2.default)({}, unhandled, {
      className: className,
      role: "menuitem"
    }), React.createElement("a", {
      className: classes,
      tabIndex: -1,
      role: "button",
      onKeyDown: onKeyDown,
      onClick: this.handleClick
    }, renderItem ? renderItem(itemData) : children));
  };

  return AutoCompleteItem;
}(React.Component);

AutoCompleteItem.propTypes = {
  classPrefix: _propTypes.default.string,
  itemData: _propTypes.default.object,
  onSelect: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  focus: _propTypes.default.bool,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  renderItem: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'auto-complete-item'
})(AutoCompleteItem);

exports.default = _default;
module.exports = exports.default;