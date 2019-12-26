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

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("rsuite-utils/lib/utils");

var _utils2 = require("../utils");

var _Picker = require("../Picker");

var _utils3 = _interopRequireDefault(require("./utils"));

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DropdownMenu, _React$Component);

  function DropdownMenu(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.utils = {};
    _this.menus = [];

    _this.handleSelect = function (layer, node, event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          childrenKey = _this$props.childrenKey;
      var children = node[childrenKey];
      var isLeafNode = (0, _isUndefined2.default)(children) || (0, _isNull2.default)(children);
      var items = (children || []).map(function (item) {
        return (0, _extends2.default)({}, item, {
          parent: node
        });
      });

      var _this$getCascadeItems = _this.getCascadeItems(items, layer + 1, node, isLeafNode),
          cascadeItems = _this$getCascadeItems.cascadeItems,
          cascadePathItems = _this$getCascadeItems.cascadePathItems;

      onSelect === null || onSelect === void 0 ? void 0 : onSelect(node, cascadeItems, cascadePathItems, event);
    };

    _this.addPrefix = function (name) {
      return (0, _utils2.prefix)(_this.props.classPrefix)(name);
    };

    _this.utils = (0, _utils3.default)(props);
    return _this;
  }

  var _proto = DropdownMenu.prototype;

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

  _proto.renderCascadeNode = function renderCascadeNode(node, index, layer, focus, uncheckable) {
    var _classNames;

    var _this$props3 = this.props,
        _this$props3$value = _this$props3.value,
        value = _this$props3$value === void 0 ? [] : _this$props3$value,
        valueKey = _this$props3.valueKey,
        labelKey = _this$props3.labelKey,
        childrenKey = _this$props3.childrenKey,
        disabledItemValues = _this$props3.disabledItemValues,
        renderMenuItem = _this$props3.renderMenuItem,
        onCheck = _this$props3.onCheck,
        cascade = _this$props3.cascade;
    var children = node[childrenKey];
    var itemValue = node[valueKey];
    var label = node[labelKey];
    var disabled = disabledItemValues.some(function (disabledValue) {
      return (0, _utils.shallowEqual)(disabledValue, itemValue);
    }); // Use `value` in keys when If `value` is string or number

    var onlyKey = (0, _isString2.default)(itemValue) || (0, _isNumber2.default)(itemValue) ? itemValue : index;
    var active = value.some(function (v) {
      return v === itemValue;
    });

    if (cascade) {
      active = active || this.utils.isSomeParentChecked(node, value);
    }

    value.some(function (item) {
      return (0, _utils.shallowEqual)(item, itemValue);
    });
    var classes = (0, _classnames.default)((_classNames = {}, _classNames[this.addPrefix('cascader-menu-has-children')] = children, _classNames));
    return React.createElement(_Picker.DropdownMenuCheckItem, {
      key: layer + "-" + onlyKey,
      disabled: disabled,
      active: active,
      focus: focus,
      value: node,
      className: classes,
      indeterminate: cascade && !active && this.utils.isSomeChildChecked(node, value),
      onSelectItem: this.handleSelect.bind(this, layer, node),
      onCheck: onCheck,
      checkable: !uncheckable
    }, renderMenuItem ? renderMenuItem(label, node) : label, children ? React.createElement("span", {
      className: this.addPrefix('cascader-menu-caret')
    }) : null);
  };

  _proto.renderCascade = function renderCascade() {
    var _this2 = this;

    var _this$props4 = this.props,
        menuWidth = _this$props4.menuWidth,
        menuHeight = _this$props4.menuHeight,
        valueKey = _this$props4.valueKey,
        renderMenu = _this$props4.renderMenu,
        _this$props4$cascadeI = _this$props4.cascadeItems,
        cascadeItems = _this$props4$cascadeI === void 0 ? [] : _this$props4$cascadeI,
        cascadePathItems = _this$props4.cascadePathItems,
        uncheckableItemValues = _this$props4.uncheckableItemValues;
    var styles = {
      width: cascadeItems.length * menuWidth
    };
    var columnStyles = {
      height: menuHeight,
      width: menuWidth
    };
    var cascadeNodes = cascadeItems.map(function (children, layer) {
      var _classNames2;

      var uncheckableCount = 0;
      var onlyKey = layer + "_" + children.length;
      var menu = React.createElement("ul", null, children.map(function (item, index) {
        var uncheckable = uncheckableItemValues.some(function (uncheckableValue) {
          return (0, _utils.shallowEqual)(uncheckableValue, item[valueKey]);
        });

        if (uncheckable) {
          uncheckableCount++;
        }

        return _this2.renderCascadeNode(item, index, layer, cascadePathItems[layer] && (0, _utils.shallowEqual)(cascadePathItems[layer][valueKey], item[valueKey]), uncheckable);
      }));
      var parentNode = cascadePathItems[layer - 1];
      var columnClasses = (0, _classnames.default)(_this2.addPrefix('cascader-menu-column'), (_classNames2 = {}, _classNames2[_this2.addPrefix('cascader-menu-column-uncheckable')] = uncheckableCount === children.length, _classNames2));
      var node = React.createElement("div", {
        key: onlyKey,
        className: columnClasses,
        ref: function ref(_ref) {
          return _this2.menus[layer] = _ref;
        },
        style: columnStyles
      }, renderMenu ? renderMenu(children, menu, parentNode) : menu);
      return node;
    });
    return React.createElement("div", {
      style: styles
    }, cascadeNodes);
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        className = _this$props5.className,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props5, ["className"]);
    var classes = (0, _classnames.default)(this.addPrefix('cascader-menu-items'), className);
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
  value: _propTypes.default.array,
  childrenKey: _propTypes.default.string,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  menuWidth: _propTypes.default.number,
  menuHeight: _propTypes.default.number,
  className: _propTypes.default.string,
  cascade: _propTypes.default.bool,
  cascadeItems: _propTypes.default.array,
  cascadePathItems: _propTypes.default.array,
  uncheckableItemValues: _propTypes.default.array,
  renderMenuItem: _propTypes.default.func,
  renderMenu: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onCheck: _propTypes.default.func
};
DropdownMenu.defaultProps = {
  data: [],
  disabledItemValues: [],
  uncheckableItemValues: [],
  cascadeItems: [],
  cascadePathItems: [],
  menuWidth: 156,
  menuHeight: 200,
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label'
};
var _default = DropdownMenu;
exports.default = _default;
module.exports = exports.default;