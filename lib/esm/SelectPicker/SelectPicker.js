'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["as", "appearance", "data", "valueKey", "labelKey", "value", "classPrefix", "placeholder", "defaultValue", "disabled", "cleanable", "placement", "menuClassName", "menuAutoWidth", "menuMaxHeight", "menuStyle", "groupBy", "locale", "toggleAs", "style", "searchable", "disabledItemValues", "virtualized", "listProps", "id", "onGroupTitleClick", "searchBy", "onEntered", "onExited", "onClean", "onChange", "onSelect", "onSearch", "sort", "renderValue", "renderMenu", "renderMenuGroup", "renderMenuItem", "renderExtraFooter"];
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import SearchBox from "../internals/SearchBox/index.js";
import { useClassNames, useControlled, useEventCallback } from "../internals/hooks/index.js";
import { createChainedFunction, mergeRefs, shallowEqual, getDataGroupBy } from "../internals/utils/index.js";
import { Listbox, ListItem, PickerToggle, PickerToggleTrigger, PickerPopup, useFocusItemValue, usePickerClassName, useSearch, useToggleKeyDownEvent, usePickerRef, pickTriggerPropKeys, omitTriggerPropKeys, listPickerPropTypes } from "../internals/Picker/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
var emptyArray = [];
/**
 * The `SelectPicker` component is used to select an item from a list of data.
 * @see https://rsuitejs.com/components/select-picker/
 */
var SelectPicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('SelectPicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? emptyArray : _propsWithDefaults$da,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    valueProp = propsWithDefaults.value,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'picker' : _propsWithDefaults$cl,
    placeholder = propsWithDefaults.placeholder,
    defaultValue = propsWithDefaults.defaultValue,
    disabled = propsWithDefaults.disabled,
    _propsWithDefaults$cl2 = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    menuClassName = propsWithDefaults.menuClassName,
    _propsWithDefaults$me = propsWithDefaults.menuAutoWidth,
    menuAutoWidth = _propsWithDefaults$me === void 0 ? true : _propsWithDefaults$me,
    _propsWithDefaults$me2 = propsWithDefaults.menuMaxHeight,
    menuMaxHeight = _propsWithDefaults$me2 === void 0 ? 320 : _propsWithDefaults$me2,
    menuStyle = propsWithDefaults.menuStyle,
    groupBy = propsWithDefaults.groupBy,
    locale = propsWithDefaults.locale,
    toggleAs = propsWithDefaults.toggleAs,
    style = propsWithDefaults.style,
    _propsWithDefaults$se = propsWithDefaults.searchable,
    searchable = _propsWithDefaults$se === void 0 ? true : _propsWithDefaults$se,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? emptyArray : _propsWithDefaults$di,
    virtualized = propsWithDefaults.virtualized,
    listProps = propsWithDefaults.listProps,
    id = propsWithDefaults.id,
    onGroupTitleClick = propsWithDefaults.onGroupTitleClick,
    searchBy = propsWithDefaults.searchBy,
    onEntered = propsWithDefaults.onEntered,
    onExited = propsWithDefaults.onExited,
    onClean = propsWithDefaults.onClean,
    onChange = propsWithDefaults.onChange,
    onSelect = propsWithDefaults.onSelect,
    onSearch = propsWithDefaults.onSearch,
    sort = propsWithDefaults.sort,
    renderValue = propsWithDefaults.renderValue,
    renderMenu = propsWithDefaults.renderMenu,
    renderMenuGroup = propsWithDefaults.renderMenuGroup,
    renderMenuItem = propsWithDefaults.renderMenuItem,
    renderExtraFooter = propsWithDefaults.renderExtraFooter,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _usePickerRef = usePickerRef(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list,
    searchInput = _usePickerRef.searchInput;
  var _ref = useControlled(valueProp, defaultValue),
    value = _ref[0],
    setValue = _ref[1];

  // Used to hover the focus item  when trigger `onKeydown`
  var _useFocusItemValue = useFocusItemValue(value, {
      data: data,
      valueKey: valueKey,
      target: function target() {
        return overlay.current;
      }
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    onFocusItem = _useFocusItemValue.onKeyDown;

  // Use search keywords to filter options.
  var _useSearch = useSearch(data, {
      labelKey: labelKey,
      searchBy: searchBy,
      callback: function callback(searchKeyword, filteredData, event) {
        var _filteredData$;
        // The first option after filtering is the focus.
        setFocusItemValue(filteredData === null || filteredData === void 0 || (_filteredData$ = filteredData[0]) === null || _filteredData$ === void 0 ? void 0 : _filteredData$[valueKey]);
        onSearch === null || onSearch === void 0 || onSearch(searchKeyword, event);
      }
    }),
    searchKeyword = _useSearch.searchKeyword,
    filteredData = _useSearch.filteredData,
    resetSearch = _useSearch.resetSearch,
    handleSearch = _useSearch.handleSearch;

  // Use component active state to support keyboard events.
  var _useState = useState(false),
    active = _useState[0],
    setActive = _useState[1];
  var handleClose = useEventCallback(function () {
    var _trigger$current, _trigger$current$clos;
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 || (_trigger$current$clos = _trigger$current.close) === null || _trigger$current$clos === void 0 || _trigger$current$clos.call(_trigger$current);
  });
  var handleSelect = useEventCallback(function (value, item, event) {
    var _target$current;
    onSelect === null || onSelect === void 0 || onSelect(value, item, event);
    (_target$current = target.current) === null || _target$current === void 0 || _target$current.focus();
  });
  var handleChangeValue = useEventCallback(function (value, event) {
    onChange === null || onChange === void 0 || onChange(value, event);
  });
  var handleMenuPressEnter = useEventCallback(function (event) {
    if (!focusItemValue) {
      return;
    }

    // Find active `MenuItem` by `value`
    var focusItem = data.find(function (item) {
      return shallowEqual(item[valueKey], focusItemValue);
    });
    setValue(focusItemValue);
    handleSelect(focusItemValue, focusItem, event);
    handleChangeValue(focusItemValue, event);
    handleClose();
  });
  var handleItemSelect = useEventCallback(function (value, item, event) {
    setValue(value);
    setFocusItemValue(value);
    handleSelect(value, item, event);
    handleChangeValue(value, event);
    handleClose();
  });
  var handleClean = useEventCallback(function (event) {
    if (disabled || !cleanable) {
      return;
    }
    setValue(null);
    setFocusItemValue(value);
    handleChangeValue(null, event);
  });
  var onPickerKeyDown = useToggleKeyDownEvent(_extends({
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
  var handleExited = useEventCallback(function () {
    resetSearch();
    setActive(false);
    onSearch === null || onSearch === void 0 || onSearch('');
    setFocusItemValue(null);
  });
  var handleEntered = useEventCallback(function () {
    setActive(true);
    setFocusItemValue(value);
  });

  // Find active `MenuItem` by `value`
  var activeItem = data.find(function (item) {
    return shallowEqual(item[valueKey], value);
  });

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValue = !!activeItem || !isNil(value) && isFunction(renderValue);
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var selectedElement = placeholder;
  if (activeItem !== null && activeItem !== void 0 && activeItem[labelKey]) {
    selectedElement = activeItem[labelKey];
  }
  if (!isNil(value) && isFunction(renderValue)) {
    selectedElement = renderValue(value, activeItem, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if (isNil(selectedElement)) {
      hasValue = false;
    }
  }
  var renderPopup = function renderPopup(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(className, menuClassName, prefix('select-menu'));
    var styles = _extends({}, menuStyle, {
      left: left,
      top: top
    });
    var items = filteredData;

    // Create a tree structure data when set `groupBy`
    if (groupBy) {
      items = getDataGroupBy(items, groupBy, sort);
    } else if (typeof sort === 'function') {
      items = items.sort(sort(false));
    }
    var menu = items.length ? /*#__PURE__*/React.createElement(Listbox, {
      listProps: listProps,
      listRef: list,
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      labelKey: labelKey,
      renderMenuGroup: renderMenuGroup,
      renderMenuItem: renderMenuItem,
      maxHeight: menuMaxHeight,
      classPrefix: 'picker-select-menu',
      listItemClassPrefix: 'picker-select-menu-item',
      listItemAs: ListItem,
      activeItemValues: [value],
      focusItemValue: focusItemValue,
      data: items,
      query: searchKeyword,
      groupBy: groupBy,
      onSelect: handleItemSelect,
      onGroupTitleClick: onGroupTitleClick,
      virtualized: virtualized
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
      classPrefix: classPrefix,
      appearance: appearance,
      hasValue: hasValue,
      name: 'select',
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, {
    id: id,
    pickerProps: pick(props, pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
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
    onClean: createChainedFunction(handleClean, onClean),
    onKeyDown: onPickerKeyDown,
    as: toggleAs,
    disabled: disabled,
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    inputValue: value !== null && value !== void 0 ? value : '',
    focusItemValue: focusItemValue,
    active: active,
    placement: placement
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
SelectPicker.displayName = 'SelectPicker';
SelectPicker.propTypes = _extends({}, listPickerPropTypes, {
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
  /**
   * group by key in `data`
   */
  groupBy: PropTypes.any,
  sort: PropTypes.func,
  searchable: PropTypes.bool,
  virtualized: PropTypes.bool,
  searchBy: PropTypes.func
});
export default SelectPicker;