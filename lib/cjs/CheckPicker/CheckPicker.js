'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clone = _interopRequireDefault(require("lodash/clone"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _remove = _interopRequireDefault(require("lodash/remove"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _utils = require("../internals/Tree/utils");
var _hooks = require("../internals/hooks");
var _utils2 = require("../internals/utils");
var _Picker = require("../internals/Picker");
var _SearchBox = _interopRequireDefault(require("../internals/SearchBox"));
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _templateObject;
var _excluded = ["as", "appearance", "classPrefix", "countable", "data", "disabledItemValues", "valueKey", "labelKey", "searchable", "virtualized", "cleanable", "placement", "menuAutoWidth", "menuMaxHeight", "menuClassName", "menuStyle", "locale", "placeholder", "disabled", "toggleAs", "style", "sticky", "value", "defaultValue", "groupBy", "listProps", "id", "sort", "searchBy", "renderMenuItem", "renderMenuGroup", "renderValue", "renderExtraFooter", "renderMenu", "onGroupTitleClick", "onSearch", "onEnter", "onEntered", "onExited", "onClean", "onChange", "onSelect"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var emptyArray = [];
/**
 * A component for selecting checkable items in a dropdown list.
 * @see https://rsuitejs.com/components/check-picker
 */
var CheckPicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('CheckPicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'picker' : _propsWithDefaults$cl,
    _propsWithDefaults$co = propsWithDefaults.countable,
    countable = _propsWithDefaults$co === void 0 ? true : _propsWithDefaults$co,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? emptyArray : _propsWithDefaults$da,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? emptyArray : _propsWithDefaults$di,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    _propsWithDefaults$se = propsWithDefaults.searchable,
    searchable = _propsWithDefaults$se === void 0 ? true : _propsWithDefaults$se,
    virtualized = propsWithDefaults.virtualized,
    _propsWithDefaults$cl2 = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    _propsWithDefaults$me = propsWithDefaults.menuAutoWidth,
    menuAutoWidth = _propsWithDefaults$me === void 0 ? true : _propsWithDefaults$me,
    _propsWithDefaults$me2 = propsWithDefaults.menuMaxHeight,
    menuMaxHeight = _propsWithDefaults$me2 === void 0 ? 320 : _propsWithDefaults$me2,
    menuClassName = propsWithDefaults.menuClassName,
    menuStyle = propsWithDefaults.menuStyle,
    locale = propsWithDefaults.locale,
    placeholder = propsWithDefaults.placeholder,
    disabled = propsWithDefaults.disabled,
    toggleAs = propsWithDefaults.toggleAs,
    style = propsWithDefaults.style,
    sticky = propsWithDefaults.sticky,
    valueProp = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    groupBy = propsWithDefaults.groupBy,
    listProps = propsWithDefaults.listProps,
    id = propsWithDefaults.id,
    sort = propsWithDefaults.sort,
    searchBy = propsWithDefaults.searchBy,
    renderMenuItem = propsWithDefaults.renderMenuItem,
    renderMenuGroup = propsWithDefaults.renderMenuGroup,
    renderValue = propsWithDefaults.renderValue,
    renderExtraFooter = propsWithDefaults.renderExtraFooter,
    renderMenu = propsWithDefaults.renderMenu,
    onGroupTitleClick = propsWithDefaults.onGroupTitleClick,
    onSearch = propsWithDefaults.onSearch,
    onEnter = propsWithDefaults.onEnter,
    onEntered = propsWithDefaults.onEntered,
    onExited = propsWithDefaults.onExited,
    onClean = propsWithDefaults.onClean,
    onChange = propsWithDefaults.onChange,
    onSelect = propsWithDefaults.onSelect,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list,
    searchInput = _usePickerRef.searchInput;
  var _useControlled = (0, _hooks.useControlled)(valueProp, defaultValue || []),
    value = _useControlled[0],
    setValue = _useControlled[1];

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = (0, _Picker.useFocusItemValue)(value === null || value === void 0 ? void 0 : value[0], {
      data: data,
      valueKey: valueKey,
      target: function target() {
        return overlay.current;
      }
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    onFocusItem = _useFocusItemValue.onKeyDown;
  var handleSearchCallback = (0, _hooks.useEventCallback)(function (searchKeyword, filteredData, event) {
    var _filteredData$;
    // The first option after filtering is the focus.
    setFocusItemValue(filteredData === null || filteredData === void 0 || (_filteredData$ = filteredData[0]) === null || _filteredData$ === void 0 ? void 0 : _filteredData$[valueKey]);
    onSearch === null || onSearch === void 0 || onSearch(searchKeyword, event);
  });

  // Use search keywords to filter options.
  var _useSearch = (0, _Picker.useSearch)(data, {
      labelKey: labelKey,
      searchBy: searchBy,
      callback: handleSearchCallback
    }),
    searchKeyword = _useSearch.searchKeyword,
    filteredData = _useSearch.filteredData,
    handleSearch = _useSearch.handleSearch,
    resetSearch = _useSearch.resetSearch,
    checkShouldDisplay = _useSearch.checkShouldDisplay;

  // Use component active state to support keyboard events.
  var _useState = (0, _react.useState)(false),
    active = _useState[0],
    setActive = _useState[1];

  // A list of shortcut options.
  // when opened again, the selected options are displayed at the top.
  var _useState2 = (0, _react.useState)([]),
    stickyItems = _useState2[0],
    setStickyItems = _useState2[1];
  var initStickyItems = function initStickyItems() {
    if (!sticky) {
      return;
    }
    var nextStickyItems = [];
    if (data && value.length) {
      nextStickyItems = data.filter(function (item) {
        return value.some(function (v) {
          return v === item[valueKey];
        });
      });
    }
    setStickyItems(nextStickyItems);
  };
  var handleChangeValue = (0, _hooks.useEventCallback)(function (value, event) {
    onChange === null || onChange === void 0 || onChange(value, event);
  });
  var handleClean = (0, _hooks.useEventCallback)(function (event) {
    if (disabled || !cleanable) {
      return;
    }
    setValue([]);
    onClean === null || onClean === void 0 || onClean(event);
    handleChangeValue([], event);
  });
  var handleMenuPressEnter = function handleMenuPressEnter(event) {
    var nextValue = (0, _clone.default)(value);
    if (!focusItemValue) {
      return;
    }
    if (!nextValue.some(function (v) {
      return (0, _utils2.shallowEqual)(v, focusItemValue);
    })) {
      nextValue.push(focusItemValue);
    } else {
      (0, _remove.default)(nextValue, function (itemVal) {
        return (0, _utils2.shallowEqual)(itemVal, focusItemValue);
      });
    }
    var focusItem = data.find(function (item) {
      return (0, _utils2.shallowEqual)(item === null || item === void 0 ? void 0 : item[valueKey], focusItemValue);
    });
    setValue(nextValue);
    handleSelect(nextValue, focusItem, event);
    handleChangeValue(nextValue, event);
  };
  var onPickerKeyDown = (0, _Picker.useToggleKeyDownEvent)((0, _extends2.default)({
    toggle: !focusItemValue || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onMenuKeyDown: onFocusItem,
    onMenuPressEnter: handleMenuPressEnter,
    onMenuPressBackspace: handleClean
  }, rest));
  var handleSelect = (0, _hooks.useEventCallback)(function (nextItemValue, item, event) {
    onSelect === null || onSelect === void 0 || onSelect(nextItemValue, item, event);
  });
  var handleItemSelect = (0, _hooks.useEventCallback)(function (nextItemValue, item, event, checked) {
    var nextValue = (0, _clone.default)(value);
    if (checked) {
      nextValue.push(nextItemValue);
    } else {
      (0, _remove.default)(nextValue, function (itemVal) {
        return (0, _utils2.shallowEqual)(itemVal, nextItemValue);
      });
    }
    setValue(nextValue);
    setFocusItemValue(nextItemValue);
    handleSelect(nextValue, item, event);
    handleChangeValue(nextValue, event);
  });
  var handleEntered = (0, _hooks.useEventCallback)(function () {
    setActive(true);
  });
  var handleExited = (0, _hooks.useEventCallback)(function () {
    resetSearch();
    setFocusItemValue(null);
    setActive(false);
  });
  var selectedItems = data.filter(function (item) {
    return value === null || value === void 0 ? void 0 : value.some(function (val) {
      return (0, _utils2.shallowEqual)(item[valueKey], val);
    });
  }) || [];

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValue = selectedItems.length > 0 || (value === null || value === void 0 ? void 0 : value.length) > 0 && (0, _isFunction.default)(renderValue);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var selectedElement = placeholder;
  if (selectedItems.length > 0) {
    selectedElement = /*#__PURE__*/_react.default.createElement(_Picker.SelectedElement, {
      selectedItems: selectedItems,
      countable: countable,
      valueKey: valueKey,
      labelKey: labelKey,
      prefix: prefix
    });
  }
  if ((value === null || value === void 0 ? void 0 : value.length) > 0 && (0, _isFunction.default)(renderValue)) {
    selectedElement = renderValue(value, selectedItems, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if ((0, _isNil.default)(selectedElement)) {
      hasValue = false;
    }
  }
  var renderPopup = function renderPopup(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(className, menuClassName, prefix('check-menu'));
    var styles = (0, _extends2.default)({}, menuStyle, {
      left: left,
      top: top
    });
    var items = filteredData;
    var filteredStickyItems = [];
    if (stickyItems) {
      filteredStickyItems = (0, _utils.filterNodesOfTree)(stickyItems, function (item) {
        return checkShouldDisplay(item);
      });
      items = (0, _utils.filterNodesOfTree)(data, function (item) {
        return checkShouldDisplay(item) && !stickyItems.some(function (v) {
          return v[valueKey] === item[valueKey];
        });
      });
    }

    // Create a tree structure data when set `groupBy`
    if (groupBy) {
      items = (0, _utils2.getDataGroupBy)(items, groupBy, sort);
    } else if (typeof sort === 'function') {
      items = items.sort(sort(false));
    }
    var menu = items.length || filteredStickyItems.length ? /*#__PURE__*/_react.default.createElement(_Picker.Listbox, {
      listProps: listProps,
      listRef: list,
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      labelKey: labelKey,
      renderMenuGroup: renderMenuGroup,
      renderMenuItem: renderMenuItem,
      maxHeight: menuMaxHeight,
      classPrefix: 'picker-check-menu',
      listItemAs: _Picker.ListCheckItem,
      activeItemValues: value,
      focusItemValue: focusItemValue,
      data: [].concat(filteredStickyItems, items),
      groupBy: groupBy,
      onSelect: handleItemSelect,
      onGroupTitleClick: onGroupTitleClick,
      virtualized: virtualized,
      query: searchKeyword
    }) : /*#__PURE__*/_react.default.createElement("div", {
      className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["none"])))
    }, locale === null || locale === void 0 ? void 0 : locale.noResultsText);
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      ref: (0, _utils2.mergeRefs)(overlay, speakerRef),
      autoWidth: menuAutoWidth,
      className: classes,
      style: styles,
      onKeyDown: onPickerKeyDown,
      target: trigger
    }, searchable && /*#__PURE__*/_react.default.createElement(_SearchBox.default, {
      placeholder: locale === null || locale === void 0 ? void 0 : locale.searchPlaceholder,
      onChange: handleSearch,
      value: searchKeyword,
      inputRef: searchInput
    }), renderMenu ? renderMenu(menu) : menu, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends2.default)({}, props, {
      appearance: appearance,
      classPrefix: classPrefix,
      cleanable: cleanable,
      countable: countable,
      hasValue: hasValue,
      name: 'check'
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    id: id,
    multiple: true,
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEnter: (0, _utils2.createChainedFunction)(initStickyItems, onEnter),
    onEntered: (0, _utils2.createChainedFunction)(handleEntered, onEntered),
    onExited: (0, _utils2.createChainedFunction)(handleExited, onExited),
    speaker: renderPopup
  }, /*#__PURE__*/_react.default.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/_react.default.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, (0, _omit.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys)), {
    ref: target,
    appearance: appearance,
    disabled: disabled,
    onClean: handleClean,
    onKeyDown: onPickerKeyDown,
    as: toggleAs,
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    active: active,
    placement: placement,
    inputValue: value,
    focusItemValue: focusItemValue
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
CheckPicker.displayName = 'CheckPicker';
CheckPicker.propTypes = (0, _extends2.default)({}, _Picker.listPickerPropTypes, {
  locale: _propTypes.default.any,
  appearance: (0, _propTypes2.oneOf)(['default', 'subtle']),
  menuAutoWidth: _propTypes.default.bool,
  menuMaxHeight: _propTypes.default.number,
  renderMenu: _propTypes.default.func,
  renderMenuItem: _propTypes.default.func,
  renderMenuGroup: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onGroupTitleClick: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  groupBy: _propTypes.default.any,
  sort: _propTypes.default.func,
  searchable: _propTypes.default.bool,
  countable: _propTypes.default.bool,
  sticky: _propTypes.default.bool,
  virtualized: _propTypes.default.bool,
  searchBy: _propTypes.default.func
});
var _default = exports.default = CheckPicker;