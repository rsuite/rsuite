"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _domLib = require("dom-lib");

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("rsuite-utils/lib/utils");

var _utils2 = require("../utils");

var _DropdownMenuGroup = _interopRequireDefault(require("./DropdownMenuGroup"));

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DropdownMenu, _React$Component);

  function DropdownMenu(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuBodyContainerRef = void 0;
    _this.menuItems = {};

    _this.addPrefix = function (name) {
      return (0, _utils2.prefix)(_this.props.classPrefix)(name);
    };

    _this.handleSelect = function (item, value, event, checked) {
      var _this$props$onSelect, _this$props;

      (_this$props$onSelect = (_this$props = _this.props).onSelect) === null || _this$props$onSelect === void 0 ? void 0 : _this$props$onSelect.call(_this$props, value, item, event, checked);
    };

    _this.bindMenuItems = function (disabled, key, ref) {
      if (ref && !disabled) {
        _this.menuItems[key] = ref;
      }
    };

    _this.getItemData = function (itemData) {
      return itemData;
    };

    _this.createMenuItems = function (items, groupId) {
      if (items === void 0) {
        items = [];
      }

      if (groupId === void 0) {
        groupId = 0;
      }

      var _this$props2 = _this.props,
          activeItemValues = _this$props2.activeItemValues,
          focusItemValue = _this$props2.focusItemValue,
          valueKey = _this$props2.valueKey,
          labelKey = _this$props2.labelKey,
          renderMenuItem = _this$props2.renderMenuItem,
          renderMenuGroup = _this$props2.renderMenuGroup,
          onGroupTitleClick = _this$props2.onGroupTitleClick,
          disabledItemValues = _this$props2.disabledItemValues,
          group = _this$props2.group,
          dropdownMenuItemClassPrefix = _this$props2.dropdownMenuItemClassPrefix,
          DropdownMenuItem = _this$props2.dropdownMenuItemComponentClass;
      var nextItems = items.map(function (item, index) {
        var value = item[valueKey];
        var label = item[labelKey];

        if ((0, _isUndefined2.default)(label) && (0, _isUndefined2.default)(item.groupTitle)) {
          throw Error("labelKey \"" + labelKey + "\" is not defined in \"data\" : " + index);
        } // Use `value` in keys when If `value` is string or number


        var onlyKey = (0, _isString2.default)(value) || (0, _isNumber2.default)(value) ? value : index;
        /**
         * Render <DropdownMenuGroup>
         * when if `group` is enabled and `itme.children` is array
         */

        if (group && (0, _isArray2.default)(item.children)) {
          return React.createElement(_DropdownMenuGroup.default, {
            classPrefix: _this.addPrefix('group'),
            key: onlyKey,
            title: renderMenuGroup ? renderMenuGroup(item.groupTitle, item) : item.groupTitle,
            onClick: onGroupTitleClick
          }, _this.createMenuItems(item.children, onlyKey));
        } else if ((0, _isUndefined2.default)(value) && !(0, _isArray2.default)(item.children)) {
          throw Error("valueKey \"" + valueKey + "\" is not defined in \"data\" : " + index + " ");
        }

        var disabled = disabledItemValues.some(function (disabledValue) {
          return (0, _utils.shallowEqual)(disabledValue, value);
        });
        return React.createElement(DropdownMenuItem, {
          classPrefix: dropdownMenuItemClassPrefix,
          getItemData: _this.getItemData.bind((0, _assertThisInitialized2.default)(_this), item),
          key: groupId + "-" + onlyKey,
          disabled: disabled,
          active: !(0, _isUndefined2.default)(activeItemValues) && activeItemValues.some(function (v) {
            return (0, _utils.shallowEqual)(v, value);
          }),
          focus: !(0, _isUndefined2.default)(focusItemValue) && (0, _utils.shallowEqual)(focusItemValue, value),
          value: value,
          ref: _this.bindMenuItems.bind((0, _assertThisInitialized2.default)(_this), disabled, groupId + "-" + onlyKey),
          onSelect: _this.handleSelect.bind((0, _assertThisInitialized2.default)(_this), item)
        }, renderMenuItem ? renderMenuItem(label, item) : label);
      });
      return nextItems;
    };

    _this.menuBodyContainerRef = React.createRef();
    return _this;
  }

  var _proto = DropdownMenu.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateScrollPoistion();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!(0, _utils.shallowEqual)(prevProps.focusItemValue, this.props.focusItemValue)) {
      this.updateScrollPoistion();
    }
  };

  _proto.updateScrollPoistion = function updateScrollPoistion() {
    var container = this.menuBodyContainerRef.current;
    var activeItem = container.querySelector("." + this.addPrefix('item-focus'));

    if (!activeItem) {
      activeItem = container.querySelector("." + this.addPrefix('item-active'));
    }

    if (!activeItem) {
      return;
    }

    var position = (0, _domLib.getPosition)(activeItem, container);
    var sTop = (0, _domLib.scrollTop)(container);
    var sHeight = (0, _domLib.getHeight)(container);

    if (sTop > position.top) {
      (0, _domLib.scrollTop)(container, Math.max(0, position.top - 20));
    } else if (position.top > sTop + sHeight) {
      (0, _domLib.scrollTop)(container, Math.max(0, position.top - sHeight + 32));
    }
  };

  _proto.renderItems = function renderItems() {
    var data = this.props.data;
    this.menuItems = {};
    return this.createMenuItems(data);
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        maxHeight = _this$props3.maxHeight,
        className = _this$props3.className,
        style = _this$props3.style,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["maxHeight", "className", "style"]);
    var classes = (0, _classnames.default)(this.addPrefix('items'), className);
    var unhandled = (0, _utils2.getUnhandledProps)(DropdownMenu, rest);
    var styles = (0, _extends2.default)({}, style, {
      maxHeight: maxHeight
    });
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes,
      ref: this.menuBodyContainerRef,
      style: styles
    }), React.createElement("ul", null, this.renderItems()));
  };

  return DropdownMenu;
}(React.Component);

DropdownMenu.propTypes = {
  classPrefix: _propTypes.default.string,
  data: _propTypes.default.array,
  group: _propTypes.default.bool,
  disabledItemValues: _propTypes.default.array,
  activeItemValues: _propTypes.default.array,
  focusItemValue: _propTypes.default.any,
  maxHeight: _propTypes.default.number,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  renderMenuItem: _propTypes.default.func,
  renderMenuGroup: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onGroupTitleClick: _propTypes.default.func,
  dropdownMenuItemComponentClass: _propTypes.default.elementType,
  dropdownMenuItemClassPrefix: _propTypes.default.string
};
DropdownMenu.defaultProps = {
  data: [],
  activeItemValues: [],
  disabledItemValues: [],
  maxHeight: 320,
  valueKey: 'value',
  labelKey: 'label'
};

var _default = (0, _utils2.defaultProps)({
  classPrefix: 'dropdown-menu'
})(DropdownMenu);

exports.default = _default;
module.exports = exports.default;