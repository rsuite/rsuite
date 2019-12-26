"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _domLib = require("dom-lib");

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("rsuite-utils/lib/utils");

var _utils2 = require("../utils");

var _stringToObject2 = _interopRequireDefault(require("../utils/stringToObject"));

var _Picker = require("../Picker");

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
    _this.menus = [];

    _this.handleSelect = function (layer, node, event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          childrenKey = _this$props.childrenKey;
      var children = node[childrenKey];
      var isLeafNode = (0, _isUndefined2.default)(children) || (0, _isNull2.default)(children);
      var items = (children || []).map(function (item) {
        return (0, _extends2.default)({}, _this.stringToObject(item), {
          parent: node
        });
      });

      var _this$getCascadeItems = _this.getCascadeItems(items, layer + 1, node, isLeafNode),
          cascadeItems = _this$getCascadeItems.cascadeItems,
          cascadePathItems = _this$getCascadeItems.cascadePathItems;

      onSelect === null || onSelect === void 0 ? void 0 : onSelect(node, cascadeItems, cascadePathItems, isLeafNode, event);
    };

    _this.addPrefix = function (name) {
      return (0, _utils2.prefix)(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = DropdownMenu.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.scrollToActiveItemTop();
  };

  _proto.getCascadeItems = function getCascadeItems(items, layer, node, isLeafNode) {
    var _this$props2 = this.props,
        _this$props2$cascadeI = _this$props2.cascadeItems,
        cascadeItems = _this$props2$cascadeI === void 0 ? [] : _this$props2$cascadeI,
        cascadePathItems = _this$props2.cascadePathItems;
    var nextItems = [];
    var nextPathItems = [];

    for (var i = 0; i < cascadeItems.length && i < layer; i += 1) {
      nextItems.push(cascadeItems[i]);

      if (i < layer - 1 && cascadePathItems) {
        nextPathItems.push(cascadePathItems[i]);
      }
    }

    nextPathItems.push(node);

    if (!isLeafNode) {
      nextItems.push(items);
    }

    return {
      cascadeItems: nextItems,
      cascadePathItems: nextPathItems
    };
  };

  _proto.stringToObject = function stringToObject(value) {
    var _this$props3 = this.props,
        labelKey = _this$props3.labelKey,
        valueKey = _this$props3.valueKey;
    return (0, _stringToObject2.default)(value, labelKey, valueKey);
  };

  _proto.scrollToActiveItemTop = function scrollToActiveItemTop() {
    var _this2 = this;

    if (!this.menus) {
      return;
    }

    this.menus.forEach(function (menu) {
      if (!menu) {
        return;
      }

      var activeItem = menu.querySelector("." + _this2.addPrefix('item-focus'));

      if (!activeItem) {
        activeItem = menu.querySelector("." + _this2.addPrefix('item-active'));
      }

      if (activeItem) {
        var position = (0, _domLib.getPosition)(activeItem, menu);
        (0, _domLib.scrollTop)(menu, position.top);
      }
    });
  };

  _proto.renderCascadeNode = function renderCascadeNode(node, index, layer, focus) {
    var _this$props4 = this.props,
        activeItemValue = _this$props4.activeItemValue,
        valueKey = _this$props4.valueKey,
        labelKey = _this$props4.labelKey,
        childrenKey = _this$props4.childrenKey,
        disabledItemValues = _this$props4.disabledItemValues,
        renderMenuItem = _this$props4.renderMenuItem;
    var children = node[childrenKey];
    var value = node[valueKey];
    var label = node[labelKey];
    var disabled = disabledItemValues.some(function (disabledValue) {
      return (0, _utils.shallowEqual)(disabledValue, value);
    }); // Use `value` in keys when If `value` is string or number

    var onlyKey = (0, _isString2.default)(value) || (0, _isNumber2.default)(value) ? value : index;
    return React.createElement(_Picker.DropdownMenuItem, {
      classPrefix: this.addPrefix('item'),
      key: layer + "-" + onlyKey,
      disabled: disabled,
      active: !(0, _isUndefined2.default)(activeItemValue) && (0, _utils.shallowEqual)(activeItemValue, value),
      focus: focus,
      value: node,
      className: children ? this.addPrefix('has-children') : undefined,
      onSelect: this.handleSelect.bind(this, layer)
    }, renderMenuItem ? renderMenuItem(label, node) : label, children ? React.createElement("span", {
      className: this.addPrefix('caret')
    }) : null);
  };

  _proto.renderCascade = function renderCascade() {
    var _this3 = this;

    var _this$props5 = this.props,
        menuWidth = _this$props5.menuWidth,
        menuHeight = _this$props5.menuHeight,
        valueKey = _this$props5.valueKey,
        renderMenu = _this$props5.renderMenu,
        _this$props5$cascadeI = _this$props5.cascadeItems,
        cascadeItems = _this$props5$cascadeI === void 0 ? [] : _this$props5$cascadeI,
        cascadePathItems = _this$props5.cascadePathItems;
    var styles = {
      width: cascadeItems.length * menuWidth
    };
    var cascadeNodes = cascadeItems.map(function (children, layer) {
      var onlyKey = layer + "_" + children.length;
      var menu = React.createElement("ul", null, children.map(function (item, index) {
        return _this3.renderCascadeNode(item, index, layer, cascadePathItems[layer] && (0, _utils.shallowEqual)(cascadePathItems[layer][valueKey], item[valueKey]));
      }));
      var parentNode = cascadePathItems[layer - 1];
      var node = React.createElement("div", {
        key: onlyKey,
        className: _this3.addPrefix('column'),
        ref: function ref(_ref) {
          _this3.menus[layer] = _ref;
        },
        style: {
          height: menuHeight,
          width: menuWidth
        }
      }, renderMenu ? renderMenu(children, menu, parentNode) : menu);
      return node;
    });
    return React.createElement("div", {
      style: styles
    }, cascadeNodes);
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        className = _this$props6.className,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props6, ["className"]);
    var classes = (0, _classnames.default)(this.addPrefix('items'), className);
    var unhandled = (0, _utils2.getUnhandledProps)(DropdownMenu, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes
    }), this.renderCascade());
  };

  return DropdownMenu;
}(React.Component);

DropdownMenu.propTypes = {
  classPrefix: _propTypes.default.string,
  data: _propTypes.default.array,
  disabledItemValues: _propTypes.default.array,
  activeItemValue: _propTypes.default.any,
  childrenKey: _propTypes.default.string,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  menuWidth: _propTypes.default.number,
  menuHeight: _propTypes.default.number,
  className: _propTypes.default.string,
  renderMenuItem: _propTypes.default.func,
  renderMenu: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  cascadeItems: _propTypes.default.array,
  cascadePathItems: _propTypes.default.array
};
DropdownMenu.defaultProps = {
  data: [],
  disabledItemValues: [],
  cascadeItems: [],
  cascadePathItems: [],
  menuWidth: 120,
  menuHeight: 200,
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label'
};
DropdownMenu.handledProps = [];
var _default = DropdownMenu;
exports.default = _default;
module.exports = exports.default;