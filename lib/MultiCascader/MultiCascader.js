"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _utils = require("rsuite-utils/lib/utils");

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _utils2 = _interopRequireDefault(require("./utils"));

var _treeUtils = require("../utils/treeUtils");

var _constants = require("../constants");

var _utils3 = require("../utils");

var _getSafeRegExpString = _interopRequireDefault(require("../utils/getSafeRegExpString"));

var _Picker = require("../Picker");

var MultiCascader =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MultiCascader, _React$Component);

  function MultiCascader(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.isControlled = null;
    _this.menuContainerRef = void 0;
    _this.positionRef = void 0;
    _this.triggerRef = void 0;

    _this.handleCheck = function (item, event, checked) {
      var _this$props = _this.props,
          valueKey = _this$props.valueKey,
          onChange = _this$props.onChange,
          cascade = _this$props.cascade,
          uncheckableItemValues = _this$props.uncheckableItemValues;
      var itemValue = item[valueKey];
      var value = [];

      if (cascade) {
        value = MultiCascader.utils.splitValue(item, checked, _this.getValue(), uncheckableItemValues).value;
      } else {
        value = _this.getValue();

        if (checked) {
          value.push(itemValue);
        } else {
          value = value.filter(function (n) {
            return n !== itemValue;
          });
        }
      }

      if (!_this.isControlled) {
        _this.setState({
          value: value
        });
      }

      onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
    };

    _this.handleChangeForSearchItem = function (value, checked, event) {
      _this.handleCheck(value, event, checked);
    };

    _this.handleSelect = function (node, cascadeItems, activePaths, event) {
      var _this$props2 = _this.props,
          onSelect = _this$props2.onSelect,
          valueKey = _this$props2.valueKey,
          childrenKey = _this$props2.childrenKey;

      _this.setState({
        selectNode: node,
        items: cascadeItems,
        activePaths: activePaths
      }, function () {
        if (_this.positionRef.current) {
          _this.positionRef.current.updatePosition();
        }
      });

      onSelect === null || onSelect === void 0 ? void 0 : onSelect(node, activePaths, (0, _Picker.createConcatChildrenFunction)(node, node[valueKey], {
        valueKey: valueKey,
        childrenKey: childrenKey
      }), event);
    };

    _this.handleSearch = function (searchKeyword, event) {
      var _this$props$onSearch, _this$props3;

      _this.setState({
        searchKeyword: searchKeyword
      });

      (_this$props$onSearch = (_this$props3 = _this.props).onSearch) === null || _this$props$onSearch === void 0 ? void 0 : _this$props$onSearch.call(_this$props3, searchKeyword, event);
    };

    _this.handleCloseDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.hide();
      }
    };

    _this.handleOpenDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.show();
      }
    };

    _this.handleClean = function (event) {
      var _this$props4 = _this.props,
          disabled = _this$props4.disabled,
          onChange = _this$props4.onChange,
          data = _this$props4.data;

      if (disabled) {
        return;
      }

      var nextState = {
        items: [data],
        selectNode: null,
        activePaths: []
      };

      if (!_this.isControlled) {
        nextState.value = [];
      }

      _this.setState(nextState);

      onChange === null || onChange === void 0 ? void 0 : onChange([], event);
    };

    _this.handleEntered = function () {
      var _this$props$onOpen, _this$props5;

      (_this$props$onOpen = (_this$props5 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props5);

      _this.setState({
        active: true
      });
    };

    _this.handleExit = function () {
      var _this$props$onClose, _this$props6;

      (_this$props$onClose = (_this$props6 = _this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props6);

      _this.setState({
        searchKeyword: '',
        active: false
      });
    };

    _this.addPrefix = function (name) {
      return (0, _utils3.prefix)(_this.props.classPrefix)(name);
    };

    _this.renderSearchRow = function (item, key) {
      var _extends2, _classNames;

      var _this$props7 = _this.props,
          labelKey = _this$props7.labelKey,
          valueKey = _this$props7.valueKey,
          cascade = _this$props7.cascade,
          _this$props7$disabled = _this$props7.disabledItemValues,
          disabledItemValues = _this$props7$disabled === void 0 ? [] : _this$props7$disabled;
      var searchKeyword = _this.state.searchKeyword;

      var values = _this.getValue();

      var nodes = (0, _treeUtils.getNodeParents)(item);
      var regx = new RegExp((0, _getSafeRegExpString.default)(searchKeyword), 'ig');
      var labelElements = [];
      var a = item[labelKey].split(regx);
      var b = item[labelKey].match(regx);

      for (var i = 0; i < a.length; i++) {
        labelElements.push(a[i]);

        if (b[i]) {
          labelElements.push(React.createElement("strong", {
            key: i
          }, b[i]));
        }
      }

      nodes.push((0, _extends3.default)({}, item, (_extends2 = {}, _extends2[labelKey] = labelElements, _extends2)));
      var active = values.some(function (value) {
        if (cascade) {
          return nodes.some(function (node) {
            return node[valueKey] === value;
          });
        }

        return item[valueKey] === value;
      });
      var disabled = disabledItemValues.some(function (value) {
        return nodes.some(function (node) {
          return node[valueKey] === value;
        });
      });
      var itemClasses = (0, _classnames.default)(_this.addPrefix('cascader-row'), (_classNames = {}, _classNames[_this.addPrefix('cascader-row-disabled')] = disabled, _classNames));
      return React.createElement("div", {
        key: key,
        className: itemClasses
      }, React.createElement(_Checkbox.default, {
        disabled: disabled,
        checked: active,
        value: item,
        indeterminate: cascade && !active && MultiCascader.utils.isSomeChildChecked(item, values),
        onChange: _this.handleChangeForSearchItem
      }, React.createElement("span", {
        className: _this.addPrefix('cascader-cols')
      }, nodes.map(function (node, index) {
        return React.createElement("span", {
          key: "col-" + index,
          className: _this.addPrefix('cascader-col')
        }, node[labelKey]);
      }))));
    };

    var _data = props.data,
        _value = props.value,
        defaultValue = props.defaultValue;
    var initState = {
      data: _data,
      searchKeyword: '',
      prevValue: _value,
      value: defaultValue || [],
      selectNode: null,

      /**
       * 选中值的路径
       */
      activePaths: []
    };
    MultiCascader.utils = (0, _utils2.default)(props);
    var flattenData = (0, _treeUtils.flattenTree)(_data, props.childrenKey);
    _this.isControlled = !(0, _isUndefined2.default)(_value);
    _this.state = (0, _extends3.default)({}, initState, {
      flattenData: flattenData,

      /**
       * 用于展示面板的数据列表，是一个二维的数组
       * 是通过 data 树结构转换成的二维的数组，其中只包含页面上展示的数据
       */
      items: [flattenData.filter(function (item) {
        return !item.parent;
      })]
    }, MultiCascader.getCascadeState(props, flattenData)); // for test

    _this.menuContainerRef = React.createRef();
    _this.positionRef = React.createRef();
    _this.triggerRef = React.createRef();
    return _this;
  }

  MultiCascader.getCascadeState = function getCascadeState(nextProps, flattenData, nextValue) {
    var data = nextProps.data,
        cascade = nextProps.cascade,
        value = nextProps.value,
        defaultValue = nextProps.defaultValue,
        uncheckableItemValues = nextProps.uncheckableItemValues;
    var cascadeValue = nextValue || value || defaultValue || [];

    if (cascade && data) {
      cascadeValue = MultiCascader.utils.transformValue(cascadeValue, flattenData, uncheckableItemValues);
    }

    return {
      value: cascadeValue
    };
  };

  MultiCascader.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var data = nextProps.data,
        valueKey = nextProps.valueKey,
        childrenKey = nextProps.childrenKey;
    var value = nextProps.value || prevState.value || [];
    var prevValue = prevState.prevValue,
        flattenData = prevState.flattenData,
        _prevState$selectNode = prevState.selectNode,
        selectNode = _prevState$selectNode === void 0 ? {} : _prevState$selectNode,
        items = prevState.items;
    var isChangedData = data !== prevState.data;
    var isChangedValue = !(0, _utils.shallowEqualArray)(prevValue, nextProps.value);

    if (isChangedData || isChangedValue) {
      if (isChangedData) {
        flattenData = (0, _treeUtils.flattenTree)(data, nextProps.childrenKey);
      }
      /**
       * 如果更新了 data,
       * 首先获取到被点击节点的值 `selectNode`， 然后再拿到新增后的 `newChildren`,
       */


      var nextSelectNode = flattenData.find(function (n) {
        return selectNode && n[valueKey] === selectNode[valueKey];
      });
      var newChildren = ((0, _get2.default)(nextSelectNode, childrenKey) || []).map(function (item) {
        item.parent = nextSelectNode;
        return item;
      });

      if (newChildren.length && items) {
        items[items.length - 1] = newChildren;
      }

      var nextState = (0, _extends3.default)({
        selectNode: nextSelectNode,
        flattenData: flattenData,
        data: data,
        items: MultiCascader.utils.getItems(nextSelectNode, flattenData)
      }, MultiCascader.getCascadeState(nextProps, flattenData, value));

      if (isChangedValue) {
        nextState.prevValue = nextProps.value;
      }

      return nextState;
    }

    return null;
  };

  var _proto = MultiCascader.prototype;

  _proto.getValue = function getValue() {
    return this.state.value || [];
  };

  _proto.getSearchResult = function getSearchResult() {
    var _this$props8 = this.props,
        labelKey = _this$props8.labelKey,
        valueKey = _this$props8.valueKey,
        _this$props8$unchecka = _this$props8.uncheckableItemValues,
        uncheckableItemValues = _this$props8$unchecka === void 0 ? [] : _this$props8$unchecka;
    var _this$state = this.state,
        searchKeyword = _this$state.searchKeyword,
        flattenData = _this$state.flattenData;
    var items = [];
    var result = flattenData.filter(function (item) {
      if (uncheckableItemValues.some(function (value) {
        return item[valueKey] === value;
      })) {
        return false;
      }

      if (item[labelKey].match(new RegExp((0, _getSafeRegExpString.default)(searchKeyword), 'i'))) {
        return true;
      }

      return false;
    });

    for (var i = 0; i < result.length; i++) {
      items.push(result[i]);

      if (i === 99) {
        return items;
      }
    }

    return items;
  };

  _proto.renderSearchResultPanel = function renderSearchResultPanel() {
    var locale = this.props.locale;
    var searchKeyword = this.state.searchKeyword;

    if (searchKeyword === '') {
      return null;
    }

    var items = this.getSearchResult();
    return React.createElement("div", {
      className: this.addPrefix('cascader-search-panel')
    }, items.length ? items.map(this.renderSearchRow) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText));
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _classNames2;

    var _this$state2 = this.state,
        items = _this$state2.items,
        activePaths = _this$state2.activePaths,
        searchKeyword = _this$state2.searchKeyword;
    var _this$props9 = this.props,
        renderMenu = _this$props9.renderMenu,
        renderExtraFooter = _this$props9.renderExtraFooter,
        menuClassName = _this$props9.menuClassName,
        menuStyle = _this$props9.menuStyle,
        classPrefix = _this$props9.classPrefix,
        searchable = _this$props9.searchable,
        locale = _this$props9.locale,
        inline = _this$props9.inline;
    var classes = (0, _classnames.default)(this.addPrefix('cascader-menu'), this.addPrefix('multi-cascader-menu'), menuClassName, (_classNames2 = {}, _classNames2[this.addPrefix('inline')] = inline, _classNames2));
    var menuProps = (0, _pick2.default)(this.props, Object.keys(_DropdownMenu.default.propTypes));
    return React.createElement(_Picker.MenuWrapper, {
      className: classes,
      style: menuStyle
    }, searchable && React.createElement(_Picker.SearchBar, {
      placeholder: locale.searchPlaceholder,
      onChange: this.handleSearch,
      value: searchKeyword
    }), this.renderSearchResultPanel(), searchKeyword === '' && React.createElement(_DropdownMenu.default, (0, _extends3.default)({}, menuProps, {
      classPrefix: classPrefix,
      ref: this.menuContainerRef,
      cascadeItems: items,
      cascadePathItems: activePaths,
      value: this.getValue(),
      onSelect: this.handleSelect,
      onCheck: this.handleCheck,
      renderMenu: renderMenu
    })), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  _proto.render = function render() {
    var _this$props10 = this.props,
        valueKey = _this$props10.valueKey,
        labelKey = _this$props10.labelKey,
        childrenKey = _this$props10.childrenKey,
        placeholder = _this$props10.placeholder,
        renderValue = _this$props10.renderValue,
        disabled = _this$props10.disabled,
        cleanable = _this$props10.cleanable,
        locale = _this$props10.locale,
        toggleComponentClass = _this$props10.toggleComponentClass,
        style = _this$props10.style,
        onEnter = _this$props10.onEnter,
        onExited = _this$props10.onExited,
        onClean = _this$props10.onClean,
        countable = _this$props10.countable,
        cascade = _this$props10.cascade,
        inline = _this$props10.inline,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props10, ["valueKey", "labelKey", "childrenKey", "placeholder", "renderValue", "disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onExited", "onClean", "countable", "cascade", "inline"]);

    if (inline) {
      return this.renderDropdownMenu();
    }

    var flattenData = this.state.flattenData;
    var unhandled = (0, _utils3.getUnhandledProps)(MultiCascader, rest);
    var value = this.getValue();
    var selectedItems = flattenData.filter(function (item) {
      return value.some(function (v) {
        return v === item[valueKey];
      });
    }) || [];
    var count = selectedItems.length;
    var hasValue = !!count;
    var selectedElement = placeholder;

    if (count > 0) {
      selectedElement = React.createElement(_Picker.SelectedElement, {
        selectedItems: selectedItems,
        countable: countable,
        valueKey: valueKey,
        labelKey: labelKey,
        childrenKey: childrenKey,
        prefix: this.addPrefix,
        cascade: cascade,
        locale: locale
      });

      if (renderValue) {
        selectedElement = renderValue(value, selectedItems, selectedElement);
      }
    }

    var classes = (0, _Picker.getToggleWrapperClassName)('cascader', this.addPrefix, this.props, hasValue);
    return React.createElement("div", {
      className: classes,
      style: style,
      tabIndex: -1,
      role: "menu"
    }, React.createElement(_Picker.PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: this.positionRef,
      onEnter: (0, _utils3.createChainedFunction)(this.handleEntered, onEnter),
      onExit: (0, _utils3.createChainedFunction)(this.handleExit, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement(_Picker.PickerToggle, (0, _extends3.default)({}, unhandled, {
      componentClass: toggleComponentClass,
      onClean: (0, _utils3.createChainedFunction)(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), selectedElement || locale.placeholder)));
  };

  return MultiCascader;
}(React.Component);

MultiCascader.propTypes = {
  appearance: _propTypes.default.oneOf(['default', 'subtle']),
  classPrefix: _propTypes.default.string,
  cascade: _propTypes.default.bool,
  data: _propTypes.default.array,
  disabledItemValues: _propTypes.default.array,
  className: _propTypes.default.string,
  container: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  containerPadding: _propTypes.default.number,
  block: _propTypes.default.bool,
  toggleComponentClass: _propTypes.default.elementType,
  menuClassName: _propTypes.default.string,
  menuStyle: _propTypes.default.object,
  childrenKey: _propTypes.default.string,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  value: _propTypes.default.array,
  defaultValue: _propTypes.default.array,
  placeholder: _propTypes.default.node,
  locale: _propTypes.default.object,
  cleanable: _propTypes.default.bool,
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  countable: _propTypes.default.bool,
  placement: _propTypes.default.oneOf(_constants.PLACEMENT),
  menuWidth: _propTypes.default.number,
  menuHeight: _propTypes.default.number,
  style: _propTypes.default.object,
  uncheckableItemValues: _propTypes.default.array,
  searchable: _propTypes.default.bool,
  preventOverflow: _propTypes.default.bool,
  renderMenuItem: _propTypes.default.func,
  renderMenu: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  renderExtraFooter: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onClean: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onHide: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  inline: _propTypes.default.bool
};
MultiCascader.defaultProps = {
  cascade: true,
  appearance: 'default',
  data: [],
  disabledItemValues: [],
  uncheckableItemValues: [],
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label',
  locale: {
    placeholder: 'Select',
    checkAll: 'All',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  },
  cleanable: true,
  searchable: true,
  countable: true,
  placement: 'bottomStart'
};
MultiCascader.utils = {};
(0, _reactLifecyclesCompat.polyfill)(MultiCascader);
var enhance = (0, _compose.default)((0, _utils3.defaultProps)({
  classPrefix: 'picker'
}), (0, _utils3.withPickerMethods)());

var _default = enhance(MultiCascader);

exports.default = _default;
module.exports = exports.default;