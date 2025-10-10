'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["as", "appearance", "classPrefix", "countable", "data", "disabledItemValues", "valueKey", "labelKey", "searchable", "virtualized", "cleanable", "placement", "menuAutoWidth", "menuMaxHeight", "menuClassName", "menuStyle", "locale", "placeholder", "disabled", "toggleAs", "style", "sticky", "value", "defaultValue", "groupBy", "listProps", "id", "sort", "searchBy", "renderMenuItem", "renderMenuGroup", "renderValue", "renderExtraFooter", "renderMenu", "onGroupTitleClick", "onSearch", "onEnter", "onEntered", "onExited", "onClean", "onChange", "onSelect"];
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash/clone';
import isFunction from 'lodash/isFunction';
import remove from 'lodash/remove';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import { filterNodesOfTree } from "../internals/Tree/utils/index.js";
import { useClassNames, useControlled, useEventCallback } from "../internals/hooks/index.js";
import { createChainedFunction, shallowEqual, mergeRefs, getDataGroupBy } from "../internals/utils/index.js";
import { Listbox, ListCheckItem, PickerToggle, PickerPopup, SelectedElement, PickerToggleTrigger, useFocusItemValue, usePickerClassName, useSearch, useToggleKeyDownEvent, usePickerRef, pickTriggerPropKeys, omitTriggerPropKeys, listPickerPropTypes } from "../internals/Picker/index.js";
import SearchBox from "../internals/SearchBox/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
var emptyArray = [];
/**
 * A component for selecting checkable items in a dropdown list.
 * @see https://rsuitejs.com/components/check-picker
 */
var CheckPicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('CheckPicker', props),
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
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _usePickerRef = usePickerRef(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list,
    searchInput = _usePickerRef.searchInput;
  var _useControlled = useControlled(valueProp, defaultValue || []),
    value = _useControlled[0],
    setValue = _useControlled[1];

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = useFocusItemValue(value === null || value === void 0 ? void 0 : value[0], {
      data: data,
      valueKey: valueKey,
      target: function target() {
        return overlay.current;
      }
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    onFocusItem = _useFocusItemValue.onKeyDown;
  var handleSearchCallback = useEventCallback(function (searchKeyword, filteredData, event) {
    var _filteredData$;
    // The first option after filtering is the focus.
    setFocusItemValue(filteredData === null || filteredData === void 0 || (_filteredData$ = filteredData[0]) === null || _filteredData$ === void 0 ? void 0 : _filteredData$[valueKey]);
    onSearch === null || onSearch === void 0 || onSearch(searchKeyword, event);
  });

  // Use search keywords to filter options.
  var _useSearch = useSearch(data, {
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
  var _useState = useState(false),
    active = _useState[0],
    setActive = _useState[1];

  // A list of shortcut options.
  // when opened again, the selected options are displayed at the top.
  var _useState2 = useState([]),
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
  var handleChangeValue = useEventCallback(function (value, event) {
    onChange === null || onChange === void 0 || onChange(value, event);
  });
  var handleClean = useEventCallback(function (event) {
    if (disabled || !cleanable) {
      return;
    }
    setValue([]);
    onClean === null || onClean === void 0 || onClean(event);
    handleChangeValue([], event);
  });
  var handleMenuPressEnter = function handleMenuPressEnter(event) {
    var nextValue = clone(value);
    if (!focusItemValue) {
      return;
    }
    if (!nextValue.some(function (v) {
      return shallowEqual(v, focusItemValue);
    })) {
      nextValue.push(focusItemValue);
    } else {
      remove(nextValue, function (itemVal) {
        return shallowEqual(itemVal, focusItemValue);
      });
    }
    var focusItem = data.find(function (item) {
      return shallowEqual(item === null || item === void 0 ? void 0 : item[valueKey], focusItemValue);
    });
    setValue(nextValue);
    handleSelect(nextValue, focusItem, event);
    handleChangeValue(nextValue, event);
  };
  var onPickerKeyDown = useToggleKeyDownEvent(_extends({
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
  var handleSelect = useEventCallback(function (nextItemValue, item, event) {
    onSelect === null || onSelect === void 0 || onSelect(nextItemValue, item, event);
  });
  var handleItemSelect = useEventCallback(function (nextItemValue, item, event, checked) {
    var nextValue = clone(value);
    if (checked) {
      nextValue.push(nextItemValue);
    } else {
      remove(nextValue, function (itemVal) {
        return shallowEqual(itemVal, nextItemValue);
      });
    }
    setValue(nextValue);
    setFocusItemValue(nextItemValue);
    handleSelect(nextValue, item, event);
    handleChangeValue(nextValue, event);
  });
  var handleEntered = useEventCallback(function () {
    setActive(true);
  });
  var handleExited = useEventCallback(function () {
    resetSearch();
    setFocusItemValue(null);
    setActive(false);
  });
  var selectedItems = data.filter(function (item) {
    return value === null || value === void 0 ? void 0 : value.some(function (val) {
      return shallowEqual(item[valueKey], val);
    });
  }) || [];

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValue = selectedItems.length > 0 || (value === null || value === void 0 ? void 0 : value.length) > 0 && isFunction(renderValue);
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var selectedElement = placeholder;
  if (selectedItems.length > 0) {
    selectedElement = /*#__PURE__*/React.createElement(SelectedElement, {
      selectedItems: selectedItems,
      countable: countable,
      valueKey: valueKey,
      labelKey: labelKey,
      prefix: prefix
    });
  }
  if ((value === null || value === void 0 ? void 0 : value.length) > 0 && isFunction(renderValue)) {
    selectedElement = renderValue(value, selectedItems, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if (isNil(selectedElement)) {
      hasValue = false;
    }
  }
  var renderPopup = function renderPopup(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(className, menuClassName, prefix('check-menu'));
    var styles = _extends({}, menuStyle, {
      left: left,
      top: top
    });
    var items = filteredData;
    var filteredStickyItems = [];
    if (stickyItems) {
      filteredStickyItems = filterNodesOfTree(stickyItems, function (item) {
        return checkShouldDisplay(item);
      });
      items = filterNodesOfTree(data, function (item) {
        return checkShouldDisplay(item) && !stickyItems.some(function (v) {
          return v[valueKey] === item[valueKey];
        });
      });
    }

    // Create a tree structure data when set `groupBy`
    if (groupBy) {
      items = getDataGroupBy(items, groupBy, sort);
    } else if (typeof sort === 'function') {
      items = items.sort(sort(false));
    }
    var menu = items.length || filteredStickyItems.length ? /*#__PURE__*/React.createElement(Listbox, {
      listProps: listProps,
      listRef: list,
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      labelKey: labelKey,
      renderMenuGroup: renderMenuGroup,
      renderMenuItem: renderMenuItem,
      maxHeight: menuMaxHeight,
      classPrefix: 'picker-check-menu',
      listItemAs: ListCheckItem,
      activeItemValues: value,
      focusItemValue: focusItemValue,
      data: [].concat(filteredStickyItems, items),
      groupBy: groupBy,
      onSelect: handleItemSelect,
      onGroupTitleClick: onGroupTitleClick,
      virtualized: virtualized,
      query: searchKeyword
    }) : /*#__PURE__*/React.createElement("div", {
      className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["none"])))
    }, locale === null || locale === void 0 ? void 0 : locale.noResultsText);
    return /*#__PURE__*/React.createElement(PickerPopup, {
      ref: mergeRefs(overlay, speakerRef),
      autoWidth: menuAutoWidth,
      className: classes,
      style: styles,
      onKeyDown: onPickerKeyDown,
      target: trigger
    }, searchable && /*#__PURE__*/React.createElement(SearchBox, {
      placeholder: locale === null || locale === void 0 ? void 0 : locale.searchPlaceholder,
      onChange: handleSearch,
      value: searchKeyword,
      inputRef: searchInput
    }), renderMenu ? renderMenu(menu) : menu, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var _usePickerClassName = usePickerClassName(_extends({}, props, {
      appearance: appearance,
      classPrefix: classPrefix,
      cleanable: cleanable,
      countable: countable,
      hasValue: hasValue,
      name: 'check'
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, {
    id: id,
    multiple: true,
    pickerProps: pick(props, pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEnter: createChainedFunction(initStickyItems, onEnter),
    onEntered: createChainedFunction(handleEntered, onEntered),
    onExited: createChainedFunction(handleExited, onExited),
    speaker: renderPopup
  }, /*#__PURE__*/React.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/React.createElement(PickerToggle, _extends({}, omit(rest, [].concat(omitTriggerPropKeys, usedClassNamePropKeys)), {
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
CheckPicker.propTypes = _extends({}, listPickerPropTypes, {
  locale: PropTypes.any,
  appearance: oneOf(['default', 'subtle']),
  menuAutoWidth: PropTypes.bool,
  menuMaxHeight: PropTypes.number,
  renderMenu: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderMenuGroup: PropTypes.func,
  onSelect: PropTypes.func,
  onGroupTitleClick: PropTypes.func,
  onSearch: PropTypes.func,
  groupBy: PropTypes.any,
  sort: PropTypes.func,
  searchable: PropTypes.bool,
  countable: PropTypes.bool,
  sticky: PropTypes.bool,
  virtualized: PropTypes.bool,
  searchBy: PropTypes.func
});
export default CheckPicker;