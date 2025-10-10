'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _TreeView = _interopRequireDefault(require("../CascadeTree/TreeView"));
var _SearchView = _interopRequireDefault(require("../CascadeTree/SearchView"));
var _hooks = require("../CascadeTree/hooks");
var _utils = require("../Tree/utils");
var _utils2 = require("../internals/Tree/utils");
var _propTypes2 = require("../internals/propTypes");
var _hooks2 = require("../internals/hooks");
var _utils3 = require("../internals/utils");
var _Picker = require("../internals/Picker");
var _CustomProvider = require("../CustomProvider");
var _useActive2 = _interopRequireDefault(require("./useActive"));
var _excluded = ["as", "data", "classPrefix", "childrenKey", "valueKey", "labelKey", "defaultValue", "placeholder", "disabled", "disabledItemValues", "appearance", "cleanable", "locale", "toggleAs", "style", "value", "popupClassName", "popupStyle", "columnHeight", "columnWidth", "searchable", "parentSelectable", "placement", "id", "renderColumn", "renderTreeNode", "renderSearchItem", "renderValue", "renderExtraFooter", "onEntered", "onExited", "onClean", "onChange", "onSelect", "onSearch", "getChildren", "menuClassName", "menuStyle", "menuWidth", "menuHeight", "renderMenuItem", "renderMenu"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var emptyArray = [];

/**
 * The `Cascader` component displays a hierarchical list of options.
 * @see https://rsuitejs.com/components/cascader
 */
var Cascader = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Cascader', props),
    rtl = _useCustom.rtl,
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? emptyArray : _propsWithDefaults$da,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'picker' : _propsWithDefaults$cl,
    _propsWithDefaults$ch = propsWithDefaults.childrenKey,
    childrenKey = _propsWithDefaults$ch === void 0 ? 'children' : _propsWithDefaults$ch,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    defaultValue = propsWithDefaults.defaultValue,
    placeholder = propsWithDefaults.placeholder,
    disabled = propsWithDefaults.disabled,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? emptyArray : _propsWithDefaults$di,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$cl2 = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    locale = propsWithDefaults.locale,
    toggleAs = propsWithDefaults.toggleAs,
    style = propsWithDefaults.style,
    valueProp = propsWithDefaults.value,
    popupClassName = propsWithDefaults.popupClassName,
    popupStyle = propsWithDefaults.popupStyle,
    columnHeight = propsWithDefaults.columnHeight,
    columnWidth = propsWithDefaults.columnWidth,
    _propsWithDefaults$se = propsWithDefaults.searchable,
    searchable = _propsWithDefaults$se === void 0 ? true : _propsWithDefaults$se,
    parentSelectable = propsWithDefaults.parentSelectable,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    id = propsWithDefaults.id,
    renderColumn = propsWithDefaults.renderColumn,
    renderTreeNode = propsWithDefaults.renderTreeNode,
    renderSearchItem = propsWithDefaults.renderSearchItem,
    renderValue = propsWithDefaults.renderValue,
    renderExtraFooter = propsWithDefaults.renderExtraFooter,
    onEntered = propsWithDefaults.onEntered,
    onExited = propsWithDefaults.onExited,
    onClean = propsWithDefaults.onClean,
    onChange = propsWithDefaults.onChange,
    onSelect = propsWithDefaults.onSelect,
    onSearch = propsWithDefaults.onSearch,
    getChildren = propsWithDefaults.getChildren,
    DEPRECATED_menuClassName = propsWithDefaults.menuClassName,
    DEPRECATED_menuStyle = propsWithDefaults.menuStyle,
    DEPRECATED_menuWidth = propsWithDefaults.menuWidth,
    DEPRECATED_menuHeight = propsWithDefaults.menuHeight,
    DEPRECATED_renderMenuItem = propsWithDefaults.renderMenuItem,
    DEPRECATED_renderMenu = propsWithDefaults.renderMenu,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    searchInput = _usePickerRef.searchInput;
  var _ref = (0, _hooks2.useControlled)(valueProp, defaultValue),
    value = _ref[0],
    setValue = _ref[1];

  // Store the children of each node
  var childrenMap = (0, _hooks2.useMap)();

  // Store the parent of each node
  var parentMap = (0, _react.useMemo)(function () {
    return (0, _utils2.getParentMap)(data, function (item) {
      var _childrenMap$get;
      return (_childrenMap$get = childrenMap.get(item)) !== null && _childrenMap$get !== void 0 ? _childrenMap$get : item[childrenKey];
    });
  }, [childrenMap, childrenKey, data]);

  // Flatten the tree data
  var flattenedData = (0, _react.useMemo)(function () {
    return (0, _utils.flattenTree)(data, function (item) {
      var _childrenMap$get2;
      return (_childrenMap$get2 = childrenMap.get(item)) !== null && _childrenMap$get2 !== void 0 ? _childrenMap$get2 : item[childrenKey];
    });
  }, [childrenMap, childrenKey, data]);

  // The selected item
  var selectedItem = flattenedData.find(function (item) {
    return item[valueKey] === value;
  });

  // Callback function after selecting the node
  var onSelectCallback = function onSelectCallback(node, event) {
    var _trigger$current;
    var isLeafNode = node.isLeafNode,
      cascadePaths = node.cascadePaths,
      itemData = node.itemData;
    onSelect === null || onSelect === void 0 || onSelect(itemData, cascadePaths, event);
    var nextValue = itemData[valueKey];
    if (isLeafNode) {
      // Determines whether the option is a leaf node, and if so, closes the picker.
      handleClose();
      setValue(nextValue);
      return;
    }

    //  When the parent is optional, the value and the displayed path are updated.
    if (parentSelectable && !(0, _utils3.shallowEqual)(value, nextValue)) {
      setValue(nextValue);
      onChange === null || onChange === void 0 || onChange(nextValue, event);
    }

    // Update menu position
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 || _trigger$current.updatePosition();
  };
  var _useSelect = (0, _hooks.useSelect)({
      value: value,
      valueKey: valueKey,
      childrenKey: childrenKey,
      childrenMap: childrenMap,
      selectedItem: selectedItem,
      getChildren: getChildren,
      onChange: onChange,
      onSelect: onSelectCallback
    }),
    activeItem = _useSelect.activeItem,
    setActiveItem = _useSelect.setActiveItem,
    loadingItemsSet = _useSelect.loadingItemsSet,
    handleSelect = _useSelect.handleSelect;
  var _usePaths = (0, _hooks.usePaths)({
      data: data,
      activeItem: activeItem,
      selectedItem: selectedItem,
      getParent: function getParent(item) {
        return parentMap.get(item);
      },
      getChildren: function getChildren(item) {
        var _childrenMap$get3;
        return (_childrenMap$get3 = childrenMap.get(item)) !== null && _childrenMap$get3 !== void 0 ? _childrenMap$get3 : item[childrenKey];
      }
    }),
    columns = _usePaths.columns,
    pathTowardsActiveItem = _usePaths.pathTowardsActiveItem,
    pathTowardsSelectedItem = _usePaths.pathTowardsSelectedItem;

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValue = pathTowardsSelectedItem.length > 0 || !(0, _isNil.default)(value) && (0, _isFunction.default)(renderValue);
  var _useClassNames = (0, _hooks2.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var onFocusItemCallback = (0, _react.useCallback)(function (value) {
    setActiveItem(flattenedData.find(function (item) {
      return item[valueKey] === value;
    }));
  }, [flattenedData, setActiveItem, valueKey]);

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = (0, _Picker.useFocusItemValue)(value, {
      rtl: rtl,
      data: flattenedData,
      valueKey: valueKey,
      defaultLayer: pathTowardsSelectedItem !== null && pathTowardsSelectedItem !== void 0 && pathTowardsSelectedItem.length ? pathTowardsSelectedItem.length - 1 : 0,
      target: function target() {
        return overlay.current;
      },
      getParent: function getParent(item) {
        return parentMap.get(item);
      },
      callback: onFocusItemCallback
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    setLayer = _useFocusItemValue.setLayer,
    setKeys = _useFocusItemValue.setKeys,
    onFocusItem = _useFocusItemValue.onKeyDown;
  var onSearchCallback = function onSearchCallback(value, items, event) {
    onSearch === null || onSearch === void 0 || onSearch(value, event);
    if (!value || items.length === 0) {
      setFocusItemValue(undefined);
      return;
    }
    if (items.length > 0) {
      setFocusItemValue(items[0][valueKey]);
      setLayer(0);
      setKeys([]);
    }
  };
  var _useSearch = (0, _hooks.useSearch)({
      labelKey: labelKey,
      childrenKey: childrenKey,
      parentMap: parentMap,
      flattenedData: flattenedData,
      parentSelectable: parentSelectable,
      onSearch: onSearchCallback
    }),
    items = _useSearch.items,
    searchKeyword = _useSearch.searchKeyword,
    setSearchKeyword = _useSearch.setSearchKeyword,
    handleSearch = _useSearch.handleSearch;
  var _useActive = (0, _useActive2.default)({
      onEntered: onEntered,
      onExited: onExited,
      target: target,
      setSearchKeyword: setSearchKeyword
    }),
    active = _useActive.active,
    handleEntered = _useActive.handleEntered,
    handleExited = _useActive.handleExited;
  var handleClose = (0, _hooks2.useEventCallback)(function () {
    var _trigger$current2, _target$current, _target$current$focus;
    (_trigger$current2 = trigger.current) === null || _trigger$current2 === void 0 || _trigger$current2.close();

    // The focus is on the trigger button after closing
    (_target$current = target.current) === null || _target$current === void 0 || (_target$current$focus = _target$current.focus) === null || _target$current$focus === void 0 || _target$current$focus.call(_target$current);
  });
  var handleClean = (0, _hooks2.useEventCallback)(function (event) {
    if (disabled || !target.current) {
      return;
    }
    setValue(null);
    onChange === null || onChange === void 0 || onChange(null, event);
  });
  var handleMenuPressEnter = (0, _hooks2.useEventCallback)(function (event) {
    var focusItem = (0, _utils2.findNodeOfTree)(data, function (item) {
      return item[valueKey] === focusItemValue;
    });
    var isLeafNode = focusItem && !focusItem[childrenKey];
    if (isLeafNode) {
      setValue(focusItemValue);
      if (pathTowardsActiveItem.length) {
        setLayer(pathTowardsActiveItem.length - 1);
      }
      if (!(0, _utils3.shallowEqual)(value, focusItemValue)) {
        onSelect === null || onSelect === void 0 || onSelect(focusItem, pathTowardsActiveItem, event);
        onChange === null || onChange === void 0 || onChange(focusItemValue !== null && focusItemValue !== void 0 ? focusItemValue : null, event);
      }
      handleClose();
    }
  });
  var onPickerKeyDown = (0, _Picker.useToggleKeyDownEvent)((0, _extends2.default)({
    toggle: !focusItemValue || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onMenuKeyDown: onFocusItem,
    onMenuPressEnter: handleMenuPressEnter
  }, rest));

  /**
   * The search structure option is processed after being selected.
   */
  var handleSearchRowSelect = (0, _hooks2.useEventCallback)(function (itemData, nodes, event) {
    var nextValue = itemData[valueKey];
    handleClose();
    setSearchKeyword('');
    setValue(nextValue);
    onSelect === null || onSelect === void 0 || onSelect(itemData, nodes, event);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  });
  var renderCascadeColumn = function renderCascadeColumn(childNodes, column) {
    var items = column.items,
      parentItem = column.parentItem,
      layer = column.layer;
    if (typeof renderColumn === 'function') {
      return renderColumn(childNodes, column);
    } else if (typeof DEPRECATED_renderMenu === 'function') {
      return DEPRECATED_renderMenu(items, childNodes, parentItem, layer);
    }
    return childNodes;
  };
  var renderCascadeTreeNode = function renderCascadeTreeNode(node, itemData) {
    var render = typeof renderTreeNode === 'function' ? renderTreeNode : DEPRECATED_renderMenuItem;
    if (typeof render === 'function') {
      return render(node, itemData);
    }
    return node;
  };
  var renderTreeView = function renderTreeView(positionProps, speakerRef) {
    var _ref2 = positionProps || {},
      left = _ref2.left,
      top = _ref2.top,
      className = _ref2.className;
    var styles = (0, _extends2.default)({}, DEPRECATED_menuStyle, popupStyle, {
      left: left,
      top: top
    });
    var classes = merge(className, DEPRECATED_menuClassName, popupClassName, prefix('popup-cascader'));
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      ref: (0, _utils3.mergeRefs)(overlay, speakerRef),
      className: classes,
      style: styles,
      target: trigger,
      onKeyDown: onPickerKeyDown
    }, searchable && /*#__PURE__*/_react.default.createElement(_SearchView.default, {
      data: items,
      searchKeyword: searchKeyword,
      valueKey: valueKey,
      labelKey: labelKey,
      locale: locale,
      parentMap: parentMap,
      disabledItemValues: disabledItemValues,
      focusItemValue: focusItemValue,
      inputRef: searchInput,
      renderSearchItem: renderSearchItem,
      onSelect: handleSearchRowSelect,
      onSearch: handleSearch
    }), searchKeyword === '' && /*#__PURE__*/_react.default.createElement(_TreeView.default, {
      columnWidth: columnWidth !== null && columnWidth !== void 0 ? columnWidth : DEPRECATED_menuWidth,
      columnHeight: columnHeight !== null && columnHeight !== void 0 ? columnHeight : DEPRECATED_menuHeight,
      disabledItemValues: disabledItemValues,
      loadingItemsSet: loadingItemsSet,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      classPrefix: 'cascade-tree',
      data: columns,
      cascadePaths: pathTowardsActiveItem,
      activeItemValue: value,
      onSelect: handleSelect,
      renderColumn: renderCascadeColumn,
      renderTreeNode: renderCascadeTreeNode
    }), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var selectedElement = placeholder;
  if (pathTowardsSelectedItem.length > 0) {
    selectedElement = [];
    pathTowardsSelectedItem.forEach(function (item, index) {
      var key = item[valueKey] || item[labelKey];
      selectedElement.push(/*#__PURE__*/_react.default.createElement("span", {
        key: key
      }, item[labelKey]));
      if (index < pathTowardsSelectedItem.length - 1) {
        selectedElement.push(/*#__PURE__*/_react.default.createElement("span", {
          className: "separator",
          key: key + "-separator"
        }, ' / '));
      }
    });
  }
  if (!(0, _isNil.default)(value) && (0, _isFunction.default)(renderValue)) {
    selectedElement = renderValue(value, pathTowardsSelectedItem, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if ((0, _isNil.default)(selectedElement)) {
      hasValue = false;
    }
  }
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends2.default)({}, props, {
      classPrefix: classPrefix,
      hasValue: hasValue,
      name: 'cascader',
      appearance: appearance,
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    id: id,
    popupType: "tree",
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEntered: handleEntered,
    onExited: handleExited,
    speaker: renderTreeView
  }, /*#__PURE__*/_react.default.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/_react.default.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, (0, _omit.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys)), {
    ref: target,
    as: toggleAs,
    appearance: appearance,
    disabled: disabled,
    onClean: (0, _utils3.createChainedFunction)(handleClean, onClean),
    onKeyDown: onPickerKeyDown,
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    active: active,
    placement: placement,
    inputValue: value !== null && value !== void 0 ? value : '',
    focusItemValue: focusItemValue
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
Cascader.displayName = 'Cascader';
Cascader.propTypes = (0, _extends2.default)({}, _Picker.listPickerPropTypes, {
  disabledItemValues: _propTypes.default.array,
  locale: _propTypes.default.any,
  appearance: (0, _propTypes2.oneOf)(['default', 'subtle']),
  onSelect: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  cleanable: _propTypes.default.bool,
  renderColumn: _propTypes.default.func,
  renderTreeNode: _propTypes.default.func,
  renderSearchItem: _propTypes.default.func,
  columnWidth: _propTypes.default.number,
  columnHeight: _propTypes.default.number,
  searchable: _propTypes.default.bool,
  parentSelectable: _propTypes.default.bool,
  inline: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.bool, 'Use `<CascadeTree>` instead.'),
  renderMenu: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.func, 'Use "renderColumn" property instead.'),
  renderMenuItem: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.func, 'Use "renderTreeNode" property instead.'),
  menuWidth: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.number, 'Use "columnWidth" property instead.'),
  menuHeight: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.number, 'Use "columnHeight" property instead.')
});
var _default = exports.default = Cascader;