'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "activeItemValue", "classPrefix", "className", "childrenKey", "disabledItemValues", "columnWidth", "columnHeight", "valueKey", "data", "cascadePaths", "loadingItemsSet", "labelKey", "style", "renderColumn", "renderTreeNode", "onSelect"];
import React, { useEffect, useRef } from 'react';
import isUndefined from 'lodash/isUndefined';
import isNil from 'lodash/isNil';
import getPosition from 'dom-lib/getPosition';
import scrollTop from 'dom-lib/scrollTop';
import SpinnerIcon from '@rsuite/icons/Spinner';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { shallowEqual, mergeRefs } from "../internals/utils/index.js";
import { useClassNames, useEventCallback } from "../internals/hooks/index.js";
import { ListItem, useCombobox } from "../internals/Picker/index.js";
import { useCustom } from "../CustomProvider/index.js";
var emptyArray = [];
var TreeView = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    activeItemValue = props.activeItemValue,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'tree' : _props$classPrefix,
    className = props.className,
    _props$childrenKey = props.childrenKey,
    childrenKey = _props$childrenKey === void 0 ? 'children' : _props$childrenKey,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? emptyArray : _props$disabledItemVa,
    _props$columnWidth = props.columnWidth,
    columnWidth = _props$columnWidth === void 0 ? 140 : _props$columnWidth,
    _props$columnHeight = props.columnHeight,
    columnHeight = _props$columnHeight === void 0 ? 200 : _props$columnHeight,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$data = props.data,
    data = _props$data === void 0 ? emptyArray : _props$data,
    _props$cascadePaths = props.cascadePaths,
    cascadePaths = _props$cascadePaths === void 0 ? emptyArray : _props$cascadePaths,
    loadingItemsSet = props.loadingItemsSet,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    style = props.style,
    renderColumn = props.renderColumn,
    renderTreeNode = props.renderTreeNode,
    onSelect = props.onSelect,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, prefix('items'));
  var rootRef = useRef();
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  var _useCombobox = useCombobox(),
    id = _useCombobox.id,
    labelId = _useCombobox.labelId,
    popupType = _useCombobox.popupType;
  useEffect(function () {
    var _rootRef$current;
    var columns = ((_rootRef$current = rootRef.current) === null || _rootRef$current === void 0 ? void 0 : _rootRef$current.querySelectorAll('[data-type="column"]')) || [];
    columns.forEach(function (column) {
      if (!column) {
        return;
      }
      var activeItem = column.querySelector("." + prefix('item-focus'));
      if (!activeItem) {
        activeItem = column.querySelector("." + prefix('item-active'));
      }
      if (activeItem) {
        var position = getPosition(activeItem, column);
        // Let the active option scroll into view.
        if (position !== null && position !== void 0 && position.top) {
          scrollTop(column, position === null || position === void 0 ? void 0 : position.top);
        }
      }
    });
  }, [prefix]);
  var getCascadePaths = function getCascadePaths(layer, node) {
    var paths = [];
    for (var i = 0; i < data.length && i < layer; i += 1) {
      if (i < layer - 1 && cascadePaths) {
        paths.push(cascadePaths[i]);
      }
    }
    paths.push(node);
    return paths;
  };
  var handleSelect = useEventCallback(function (layer, itemData, event) {
    var isLeafNode = isNil(itemData[childrenKey]);
    var cascadePaths = getCascadePaths(layer + 1, itemData);
    onSelect === null || onSelect === void 0 || onSelect({
      itemData: itemData,
      cascadePaths: cascadePaths,
      isLeafNode: isLeafNode
    }, event);
  });
  var renderCascadeNode = function renderCascadeNode(nodeProps) {
    var _loadingItemsSet$has;
    var itemData = nodeProps.itemData,
      index = nodeProps.index,
      layer = nodeProps.layer,
      focus = nodeProps.focus,
      size = nodeProps.size;
    var children = itemData[childrenKey];
    var value = itemData[valueKey];
    var label = itemData[labelKey];
    var disabled = disabledItemValues.some(function (disabledValue) {
      return shallowEqual(disabledValue, value);
    });
    var loading = (_loadingItemsSet$has = loadingItemsSet === null || loadingItemsSet === void 0 ? void 0 : loadingItemsSet.has(itemData)) !== null && _loadingItemsSet$has !== void 0 ? _loadingItemsSet$has : false;

    // Use `value` in keys when If `value` is string or number
    var onlyKey = typeof value === 'number' || typeof value === 'string' ? value : index;
    var Icon = loading ? SpinnerIcon : rtl ? ArrowLeftLineIcon : ArrowRightLineIcon;
    return /*#__PURE__*/React.createElement(ListItem, {
      as: 'li',
      role: "treeitem",
      "aria-level": layer + 1,
      "aria-setsize": size,
      "aria-posinset": index + 1,
      "aria-label": typeof label === 'string' ? label : undefined,
      classPrefix: "cascade-tree-item",
      key: layer + "-" + onlyKey,
      disabled: disabled,
      active: !isUndefined(activeItemValue) && shallowEqual(activeItemValue, value),
      focus: focus,
      value: value,
      className: children ? prefix('has-children') : undefined,
      onSelect: function onSelect(_value, event) {
        return handleSelect(layer, itemData, event);
      }
    }, renderTreeNode ? renderTreeNode(label, itemData) : label, children ? /*#__PURE__*/React.createElement(Icon, {
      className: prefix('caret'),
      spin: loading,
      "data-testid": "spinner"
    }) : null);
  };
  var cascadeNodes = data.map(function (children, layer) {
    var onlyKey = layer + "_" + children.length;
    var parentItem = cascadePaths[layer - 1];
    var childNodes = /*#__PURE__*/React.createElement(React.Fragment, null, children.map(function (itemData, index) {
      var focus = cascadePaths[layer] && shallowEqual(cascadePaths[layer][valueKey], itemData[valueKey]);
      return renderCascadeNode({
        itemData: itemData,
        index: index,
        layer: layer,
        focus: focus,
        size: children.length
      });
    }));
    return /*#__PURE__*/React.createElement("ul", {
      role: "group",
      "data-layer": layer,
      "data-type": 'column',
      key: onlyKey,
      className: prefix('column'),
      style: {
        height: columnHeight,
        width: columnWidth
      }
    }, renderColumn ? renderColumn(childNodes, {
      items: children,
      parentItem: parentItem,
      layer: layer
    }) : childNodes);
  });
  var styles = _extends({}, style, {
    width: data.length * columnWidth
  });
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "tree",
    id: id ? id + "-" + popupType : undefined,
    "aria-labelledby": labelId
  }, rest, {
    ref: mergeRefs(rootRef, ref),
    className: classes,
    style: styles
  }), cascadeNodes);
});
TreeView.displayName = 'TreeView';
export default TreeView;