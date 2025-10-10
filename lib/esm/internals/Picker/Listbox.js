'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["data", "groupBy", "maxHeight", "activeItemValues", "disabledItemValues", "classPrefix", "valueKey", "labelKey", "virtualized", "listProps", "listRef", "className", "style", "focusItemValue", "listItemClassPrefix", "listItemAs", "listItemProps", "rowHeight", "rowGroupHeight", "query", "renderMenuGroup", "renderMenuItem", "onGroupTitleClick", "onSelect"];
var _this = this;
import React, { useRef, useState, useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import findIndex from 'lodash/findIndex';
import pickBy from 'lodash/pickBy';
import getPosition from 'dom-lib/getPosition';
import scrollTop from 'dom-lib/scrollTop';
import getHeight from 'dom-lib/getHeight';
import get from 'lodash/get';
import classNames from 'classnames';
import { List, AutoSizer, VariableSizeList } from "../Windowing/index.js";
import { RSUITE_PICKER_GROUP_KEY } from "../symbols.js";
import { useClassNames, useMount, useEventCallback } from "../hooks/index.js";
import { shallowEqual, mergeRefs } from "../utils/index.js";
import { KEY_GROUP_TITLE } from "../utils/getDataGroupBy.js";
import ListItemGroup from "./ListItemGroup.js";
import useCombobox from "./hooks/useCombobox.js";
import Highlight from "../../Highlight/index.js";

/**
 * Props for the Listbox component.
 */
/**
 * Props for the Listbox component.
 * @template Multiple - Whether multiple selection is enabled.
 */

var Listbox = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$data = props.data,
    data = _props$data === void 0 ? [] : _props$data,
    groupBy = props.groupBy,
    _props$maxHeight = props.maxHeight,
    maxHeight = _props$maxHeight === void 0 ? 320 : _props$maxHeight,
    _props$activeItemValu = props.activeItemValues,
    activeItemValues = _props$activeItemValu === void 0 ? [] : _props$activeItemValu,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? [] : _props$disabledItemVa,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'listbox' : _props$classPrefix,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    virtualized = props.virtualized,
    listProps = props.listProps,
    virtualizedListRef = props.listRef,
    className = props.className,
    style = props.style,
    focusItemValue = props.focusItemValue,
    listItemClassPrefix = props.listItemClassPrefix,
    ListItem = props.listItemAs,
    listItemProps = props.listItemProps,
    _props$rowHeight = props.rowHeight,
    rowHeight = _props$rowHeight === void 0 ? 36 : _props$rowHeight,
    _props$rowGroupHeight = props.rowGroupHeight,
    rowGroupHeight = _props$rowGroupHeight === void 0 ? 48 : _props$rowGroupHeight,
    query = props.query,
    renderMenuGroup = props.renderMenuGroup,
    renderMenuItem = props.renderMenuItem,
    onGroupTitleClick = props.onGroupTitleClick,
    onSelect = props.onSelect,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    rootPrefix = _useClassNames.rootPrefix;
  var groupable = typeof groupBy !== 'undefined';
  var classes = merge(className, withClassPrefix('items', {
    grouped: groupable
  }));
  var _useCombobox = useCombobox(),
    id = _useCombobox.id,
    labelId = _useCombobox.labelId,
    popupType = _useCombobox.popupType,
    multiple = _useCombobox.multiple;
  var menuBodyContainerRef = useRef(null);
  var listRef = useRef(null);
  var _useState = useState([]),
    foldedGroupKeys = _useState[0],
    setFoldedGroupKeys = _useState[1];
  var handleGroupTitleClick = useEventCallback(function (key, event) {
    var nextGroupKeys = foldedGroupKeys.filter(function (item) {
      return item !== key;
    });
    if (nextGroupKeys.length === foldedGroupKeys.length) {
      nextGroupKeys.push(key);
    }
    setFoldedGroupKeys(nextGroupKeys);
    onGroupTitleClick === null || onGroupTitleClick === void 0 || onGroupTitleClick(event);
  });
  var handleSelect = useEventCallback(function (item, value, event, checked) {
    onSelect === null || onSelect === void 0 || onSelect(value, item, event, checked);
  });
  var getRowHeight = function getRowHeight(list, index) {
    var item = list[index];
    if (groupable && item[RSUITE_PICKER_GROUP_KEY] && index !== 0) {
      return rowGroupHeight;
    }
    return rowHeight;
  };
  useEffect(function () {
    var container = menuBodyContainerRef.current;
    if (!container) {
      return;
    }
    var activeItem = container.querySelector("." + prefix('item-focus'));
    if (!activeItem) {
      activeItem = container.querySelector("." + prefix('item-active'));
    }
    if (!activeItem) {
      return;
    }
    var position = getPosition(activeItem, container);
    var sTop = scrollTop(container);
    var sHeight = getHeight(container);
    if (sTop > position.top) {
      scrollTop(container, Math.max(0, position.top - 20));
    } else if (position.top > sTop + sHeight) {
      scrollTop(container, Math.max(0, position.top - sHeight + 32));
    }
  }, [focusItemValue, menuBodyContainerRef, prefix]);
  var filteredItems = groupable ? data.filter(function (item) {
    var _item$parent;
    // Display group title items
    if (item[RSUITE_PICKER_GROUP_KEY]) return true;

    // Display items under the unfolded group
    var groupValue = get(item, groupBy, '') || (// FIXME-Doma
    // Usage of `item.parent` is strongly discouraged
    // It's only here for legacy support
    // Remove once `item.parent` is completely removed across related components
    (_item$parent = item.parent) === null || _item$parent === void 0 ? void 0 : _item$parent[KEY_GROUP_TITLE]);
    return !foldedGroupKeys.includes(groupValue);
  }) : data;
  var rowCount = filteredItems.length;
  var renderItem = function renderItem(_ref) {
    var _ref$index = _ref.index,
      index = _ref$index === void 0 ? 0 : _ref$index,
      style = _ref.style,
      data = _ref.data,
      itemData = _ref.item;
    var item = itemData || data[index];
    var value = item[valueKey];
    var itemLabel = item[labelKey];
    var label = query ? /*#__PURE__*/React.createElement(Highlight, {
      query: query,
      as: "span"
    }, itemLabel) : itemLabel;
    if (isUndefined(label) && !item[RSUITE_PICKER_GROUP_KEY]) {
      throw Error("labelKey \"" + labelKey + "\" is not defined in \"data\" : " + index);
    }

    // Use `value` in keys when If `value` is string or number
    var itemKey = isString(value) || isNumber(value) ? value : index;

    //  Render <ListboxGroup> component when `groupBy` is defined
    if (groupable && item[RSUITE_PICKER_GROUP_KEY]) {
      var groupValue = item[KEY_GROUP_TITLE];
      return /*#__PURE__*/React.createElement(ListItemGroup, {
        style: style,
        classPrefix: 'picker-menu-group',
        className: classNames({
          folded: foldedGroupKeys.some(function (key) {
            return key === groupValue;
          })
        }),
        key: "group-" + groupValue,
        onClick: handleGroupTitleClick.bind(null, groupValue)
      }, renderMenuGroup ? renderMenuGroup(groupValue, item) : groupValue);
    } else if (isUndefined(value) && !isUndefined(item[RSUITE_PICKER_GROUP_KEY])) {
      throw Error("valueKey \"" + valueKey + "\" is not defined in \"data\" : " + index + " ");
    }
    var disabled = disabledItemValues === null || disabledItemValues === void 0 ? void 0 : disabledItemValues.some(function (disabledValue) {
      return shallowEqual(disabledValue, value);
    });
    var active = activeItemValues === null || activeItemValues === void 0 ? void 0 : activeItemValues.some(function (v) {
      return shallowEqual(v, value);
    });
    var focus = !isUndefined(focusItemValue) && shallowEqual(focusItemValue, value);
    return /*#__PURE__*/React.createElement(ListItem, _extends({
      "aria-posinset": index + 1,
      "aria-setsize": rowCount,
      style: style,
      key: itemKey,
      disabled: disabled,
      active: active,
      focus: focus,
      value: value,
      classPrefix: listItemClassPrefix,
      onSelect: handleSelect.bind(null, item)
    }, pickBy(listItemProps, function (v) {
      return v !== undefined;
    })), renderMenuItem ? renderMenuItem(label, item) : label);
  };
  useMount(function () {
    var _listRef$current, _listRef$current$scro;
    var itemIndex = findIndex(filteredItems, function (item) {
      return item[valueKey] === (activeItemValues === null || activeItemValues === void 0 ? void 0 : activeItemValues[0]);
    });
    (_listRef$current = listRef.current) === null || _listRef$current === void 0 || (_listRef$current$scro = _listRef$current.scrollToItem) === null || _listRef$current$scro === void 0 || _listRef$current$scro.call(_listRef$current, itemIndex);
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "listbox",
    id: id + "-" + popupType,
    "aria-labelledby": labelId,
    "aria-multiselectable": multiple
  }, rest, {
    className: classes,
    ref: mergeRefs(menuBodyContainerRef, ref),
    style: _extends({}, style, {
      maxHeight: maxHeight
    })
  }), virtualized ? /*#__PURE__*/React.createElement(AutoSizer, {
    defaultHeight: maxHeight,
    style: {
      width: 'auto',
      height: 'auto'
    }
  }, function (_ref2) {
    var height = _ref2.height;
    return /*#__PURE__*/React.createElement(List, _extends({
      as: VariableSizeList,
      ref: mergeRefs(listRef, virtualizedListRef),
      height: height || maxHeight,
      itemCount: rowCount,
      itemData: filteredItems,
      itemSize: getRowHeight.bind(_this, filteredItems),
      className: rootPrefix('virt-list')
    }, listProps), renderItem);
  }) : filteredItems.map(function (item, index) {
    return renderItem({
      index: index,
      item: item
    });
  }));
});
Listbox.displayName = 'Listbox';
export default Listbox;