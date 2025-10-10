'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _utils = require("../internals/Tree/utils");
var _hooks = require("../internals/hooks");
var _utils2 = require("../CascadeTree/utils");
var _utils3 = require("../internals/utils");
var _Picker = require("../internals/Picker");
var _propTypes2 = require("../internals/propTypes");
var _hooks2 = require("../MultiCascadeTree/hooks");
var _TreeView = _interopRequireDefault(require("../MultiCascadeTree/TreeView"));
var _SearchView = _interopRequireDefault(require("../MultiCascadeTree/SearchView"));
var _useActive2 = _interopRequireDefault(require("../Cascader/useActive"));
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "appearance", "classPrefix", "defaultValue", "columnHeight", "columnWidth", "childrenKey", "cleanable", "data", "disabled", "disabledItemValues", "value", "valueKey", "labelKey", "locale", "toggleAs", "style", "countable", "cascade", "placeholder", "placement", "popupClassName", "popupStyle", "searchable", "uncheckableItemValues", "id", "getChildren", "renderValue", "renderExtraFooter", "renderColumn", "renderTreeNode", "onEntered", "onExited", "onClean", "onSearch", "onSelect", "onChange", "onCheck", "menuClassName", "menuStyle", "menuWidth", "menuHeight", "renderMenu", "renderMenuItem"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var emptyArray = [];

/**
 * The `MultiCascader` component is used to select multiple values from cascading options.
 * @see https://rsuitejs.com/components/multi-cascader/
 */
var MultiCascader = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _selectedPaths;
  var _useCustom = (0, _CustomProvider.useCustom)('MultiCascader', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    rtl = _useCustom.rtl;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'picker' : _propsWithDefaults$cl,
    defaultValue = propsWithDefaults.defaultValue,
    columnHeight = propsWithDefaults.columnHeight,
    columnWidth = propsWithDefaults.columnWidth,
    _propsWithDefaults$ch = propsWithDefaults.childrenKey,
    childrenKey = _propsWithDefaults$ch === void 0 ? 'children' : _propsWithDefaults$ch,
    _propsWithDefaults$cl2 = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? emptyArray : _propsWithDefaults$da,
    disabled = propsWithDefaults.disabled,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? emptyArray : _propsWithDefaults$di,
    valueProp = propsWithDefaults.value,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    locale = propsWithDefaults.locale,
    toggleAs = propsWithDefaults.toggleAs,
    style = propsWithDefaults.style,
    _propsWithDefaults$co = propsWithDefaults.countable,
    countable = _propsWithDefaults$co === void 0 ? true : _propsWithDefaults$co,
    _propsWithDefaults$ca = propsWithDefaults.cascade,
    cascade = _propsWithDefaults$ca === void 0 ? true : _propsWithDefaults$ca,
    placeholder = propsWithDefaults.placeholder,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    popupClassName = propsWithDefaults.popupClassName,
    popupStyle = propsWithDefaults.popupStyle,
    _propsWithDefaults$se = propsWithDefaults.searchable,
    searchable = _propsWithDefaults$se === void 0 ? true : _propsWithDefaults$se,
    _propsWithDefaults$un = propsWithDefaults.uncheckableItemValues,
    uncheckableItemValues = _propsWithDefaults$un === void 0 ? emptyArray : _propsWithDefaults$un,
    id = propsWithDefaults.id,
    getChildren = propsWithDefaults.getChildren,
    renderValue = propsWithDefaults.renderValue,
    renderExtraFooter = propsWithDefaults.renderExtraFooter,
    renderColumn = propsWithDefaults.renderColumn,
    renderTreeNode = propsWithDefaults.renderTreeNode,
    onEntered = propsWithDefaults.onEntered,
    onExited = propsWithDefaults.onExited,
    onClean = propsWithDefaults.onClean,
    onSearch = propsWithDefaults.onSearch,
    onSelect = propsWithDefaults.onSelect,
    onChange = propsWithDefaults.onChange,
    onCheck = propsWithDefaults.onCheck,
    DEPRECATED_menuClassName = propsWithDefaults.menuClassName,
    DEPRECATED_menuStyle = propsWithDefaults.menuStyle,
    DEPRECATED_menuWidth = propsWithDefaults.menuWidth,
    DEPRECATED_menuHeight = propsWithDefaults.menuHeight,
    DEPRECATED_renderMenu = propsWithDefaults.renderMenu,
    DEPRECATED_renderMenuItem = propsWithDefaults.renderMenuItem,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    searchInput = _usePickerRef.searchInput;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var onSelectCallback = (0, _react.useCallback)(function (node, cascadePaths, event) {
    var _trigger$current, _trigger$current$upda;
    onSelect === null || onSelect === void 0 || onSelect(node, cascadePaths, event);
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 || (_trigger$current$upda = _trigger$current.updatePosition) === null || _trigger$current$upda === void 0 || _trigger$current$upda.call(_trigger$current);
  }, [onSelect, trigger]);
  var _useSelect = (0, _hooks2.useSelect)({
      data: data,
      childrenKey: childrenKey,
      labelKey: labelKey,
      valueKey: valueKey,
      onSelect: onSelectCallback,
      getChildren: getChildren
    }),
    selectedPaths = _useSelect.selectedPaths,
    flattenData = _useSelect.flattenData,
    columnData = _useSelect.columnData,
    setColumnData = _useSelect.setColumnData,
    setSelectedPaths = _useSelect.setSelectedPaths,
    handleSelect = _useSelect.handleSelect;
  var _useControlled = (0, _hooks.useControlled)(valueProp, defaultValue),
    controlledValue = _useControlled[0];
  var itemKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var cascadeValueProps = (0, _extends2.default)({}, itemKeys, {
    uncheckableItemValues: uncheckableItemValues,
    cascade: cascade,
    value: controlledValue,
    onCheck: onCheck,
    onChange: onChange
  });
  var _useCascadeValue = (0, _hooks2.useCascadeValue)(cascadeValueProps, flattenData),
    value = _useCascadeValue.value,
    setValue = _useCascadeValue.setValue,
    handleCheck = _useCascadeValue.handleCheck;
  var selectedItems = flattenData.filter(function (item) {
    return value.some(function (v) {
      return v === item[valueKey];
    });
  }) || [];
  var onFocusItemCallback = (0, _react.useCallback)(function (value) {
    var _getColumnsAndPaths = (0, _utils2.getColumnsAndPaths)(data, flattenData.find(function (item) {
        return item[valueKey] === value;
      }), {
        getParent: function getParent() {
          return undefined;
        },
        getChildren: function getChildren(item) {
          return item[childrenKey];
        }
      }),
      columns = _getColumnsAndPaths.columns,
      path = _getColumnsAndPaths.path;
    setColumnData(columns);
    setSelectedPaths(path);
  }, [childrenKey, data, flattenData, setColumnData, setSelectedPaths, valueKey]);

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = (0, _Picker.useFocusItemValue)(selectedPaths === null || selectedPaths === void 0 || (_selectedPaths = selectedPaths[selectedPaths.length - 1]) === null || _selectedPaths === void 0 ? void 0 : _selectedPaths[valueKey], {
      rtl: rtl,
      data: flattenData,
      valueKey: valueKey,
      defaultLayer: selectedPaths !== null && selectedPaths !== void 0 && selectedPaths.length ? selectedPaths.length - 1 : 0,
      target: function target() {
        return overlay.current;
      },
      callback: onFocusItemCallback
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setLayer = _useFocusItemValue.setLayer,
    setKeys = _useFocusItemValue.setKeys,
    onFocusItem = _useFocusItemValue.onKeyDown;
  var onSearchCallback = function onSearchCallback(value, event) {
    if (value) {
      setLayer(0);
    } else if (selectedPaths !== null && selectedPaths !== void 0 && selectedPaths.length) {
      setLayer(selectedPaths.length - 1);
    }
    setKeys([]);
    onSearch === null || onSearch === void 0 || onSearch(value, event);
  };
  var _useSearch = (0, _hooks2.useSearch)({
      labelKey: labelKey,
      valueKey: valueKey,
      childrenKey: childrenKey,
      flattenedData: flattenData,
      uncheckableItemValues: uncheckableItemValues,
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
  var handleClean = (0, _hooks.useEventCallback)(function (event) {
    if (disabled || !target.current) {
      return;
    }
    setSelectedPaths([]);
    setValue([]);
    setColumnData([data]);
    onChange === null || onChange === void 0 || onChange([], event);
  });
  var handleMenuPressEnter = (0, _hooks.useEventCallback)(function (event) {
    var _overlay$current;
    var focusItem = (0, _utils.findNodeOfTree)(data, function (item) {
      return item[valueKey] === focusItemValue;
    });
    var checkbox = (_overlay$current = overlay.current) === null || _overlay$current === void 0 ? void 0 : _overlay$current.querySelector("[data-key=\"" + focusItemValue + "\"] [type=\"checkbox\"]");
    if (checkbox) {
      handleCheck(focusItem, event, (checkbox === null || checkbox === void 0 ? void 0 : checkbox.getAttribute('aria-checked')) !== 'true');
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
    var _ref = positionProps || {},
      left = _ref.left,
      top = _ref.top,
      className = _ref.className;
    var styles = (0, _extends2.default)({}, DEPRECATED_menuStyle, popupStyle, {
      left: left,
      top: top
    });
    var classes = merge(className, DEPRECATED_menuClassName, popupClassName, prefix('popup-multi-cascader'));
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      ref: (0, _utils3.mergeRefs)(overlay, speakerRef),
      className: classes,
      style: styles,
      target: trigger,
      onKeyDown: onPickerKeyDown
    }, searchable && /*#__PURE__*/_react.default.createElement(_SearchView.default, {
      locale: locale,
      cascade: cascade,
      data: items,
      value: value,
      searchKeyword: searchKeyword,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      disabledItemValues: disabledItemValues,
      inputRef: searchInput,
      onCheck: handleCheck,
      onSearch: handleSearch
    }), !searchKeyword && /*#__PURE__*/_react.default.createElement(_TreeView.default, {
      cascade: cascade,
      columnWidth: columnWidth !== null && columnWidth !== void 0 ? columnWidth : DEPRECATED_menuWidth,
      columnHeight: columnHeight !== null && columnHeight !== void 0 ? columnHeight : DEPRECATED_menuHeight,
      classPrefix: "cascade-tree",
      uncheckableItemValues: uncheckableItemValues,
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      cascadeData: columnData,
      cascadePaths: selectedPaths,
      value: value,
      onSelect: handleSelect,
      onCheck: handleCheck,
      renderColumn: renderCascadeColumn,
      renderTreeNode: renderCascadeTreeNode
    }), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var selectedElement = placeholder;
  if (selectedItems.length > 0) {
    selectedElement = /*#__PURE__*/_react.default.createElement(_Picker.SelectedElement, {
      selectedItems: selectedItems,
      countable: countable,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      prefix: prefix,
      cascade: cascade,
      locale: locale
    });
  }

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValue = selectedItems.length > 0 || Number(valueProp === null || valueProp === void 0 ? void 0 : valueProp.length) > 0 && (0, _isFunction.default)(renderValue);
  if (hasValue && (0, _isFunction.default)(renderValue)) {
    selectedElement = renderValue(value.length ? value : valueProp !== null && valueProp !== void 0 ? valueProp : [], selectedItems, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if ((0, _isNil.default)(selectedElement)) {
      hasValue = false;
    }
  }
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends2.default)({}, props, {
      classPrefix: classPrefix,
      hasValue: hasValue,
      countable: countable,
      name: 'cascader',
      appearance: appearance,
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    id: id,
    popupType: "tree",
    multiple: true,
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEnter: handleEntered,
    onExited: handleExited,
    speaker: renderTreeView
  }, /*#__PURE__*/_react.default.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/_react.default.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, (0, _omit.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys)), {
    as: toggleAs,
    appearance: appearance,
    disabled: disabled,
    ref: target,
    onClean: (0, _utils3.createChainedFunction)(handleClean, onClean),
    onKeyDown: onPickerKeyDown,
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    active: active,
    placement: placement,
    inputValue: value
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
MultiCascader.displayName = 'MultiCascader';
MultiCascader.propTypes = (0, _extends2.default)({}, _Picker.listPickerPropTypes, {
  value: _propTypes.default.array,
  disabledItemValues: _propTypes.default.array,
  locale: _propTypes.default.any,
  appearance: (0, _propTypes2.oneOf)(['default', 'subtle']),
  cascade: _propTypes.default.bool,
  countable: _propTypes.default.bool,
  uncheckableItemValues: _propTypes.default.array,
  searchable: _propTypes.default.bool,
  onSearch: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onCheck: _propTypes.default.func,
  inline: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.bool, 'Use `<MultiCascadeTree>` instead.'),
  renderMenu: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.func, 'Use "renderColumn" property instead.'),
  renderMenuItem: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.func, 'Use "renderTreeNode" property instead.'),
  menuWidth: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.number, 'Use "columnWidth" property instead.'),
  menuHeight: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.number, 'Use "columnHeight" property instead.')
});
var _default = exports.default = MultiCascader;