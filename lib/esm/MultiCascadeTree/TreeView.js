'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "cascade", "cascadeData", "cascadePaths", "childrenKey", "disabledItemValues", "columnWidth", "columnHeight", "uncheckableItemValues", "value", "valueKey", "labelKey", "style", "renderTreeNode", "renderColumn", "onCheck", "onSelect"];
import React from 'react';
import SpinnerIcon from '@rsuite/icons/Spinner';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import { useClassNames, useEventCallback } from "../internals/hooks/index.js";
import { shallowEqual } from "../internals/utils/index.js";
import { ListCheckItem, useCombobox } from "../internals/Picker/index.js";
import { isSomeParentChecked, isSomeChildChecked } from "./utils.js";
import { useCustom } from "../CustomProvider/index.js";
var emptyArray = [];
var TreeView = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'tree' : _props$classPrefix,
    className = props.className,
    cascade = props.cascade,
    _props$cascadeData = props.cascadeData,
    cascadeData = _props$cascadeData === void 0 ? emptyArray : _props$cascadeData,
    _props$cascadePaths = props.cascadePaths,
    cascadePaths = _props$cascadePaths === void 0 ? emptyArray : _props$cascadePaths,
    _props$childrenKey = props.childrenKey,
    childrenKey = _props$childrenKey === void 0 ? 'children' : _props$childrenKey,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? emptyArray : _props$disabledItemVa,
    _props$columnWidth = props.columnWidth,
    columnWidth = _props$columnWidth === void 0 ? 156 : _props$columnWidth,
    _props$columnHeight = props.columnHeight,
    columnHeight = _props$columnHeight === void 0 ? 200 : _props$columnHeight,
    _props$uncheckableIte = props.uncheckableItemValues,
    uncheckableItemValues = _props$uncheckableIte === void 0 ? emptyArray : _props$uncheckableIte,
    value = props.value,
    _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$labelKey = props.labelKey,
    labelKey = _props$labelKey === void 0 ? 'label' : _props$labelKey,
    style = props.style,
    renderTreeNode = props.renderTreeNode,
    renderColumn = props.renderColumn,
    _onCheck = props.onCheck,
    onSelect = props.onSelect,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, prefix('items'));
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  var _useCombobox = useCombobox(),
    id = _useCombobox.id,
    labelId = _useCombobox.labelId,
    popupType = _useCombobox.popupType,
    multiple = _useCombobox.multiple;
  var getCascadePaths = function getCascadePaths(layer, node) {
    var paths = [];
    for (var i = 0; i < cascadeData.length && i < layer; i += 1) {
      if (i < layer - 1 && cascadePaths) {
        paths.push(cascadePaths[i]);
      }
    }
    paths.push(node);
    return paths;
  };
  var handleSelect = useEventCallback(function (layer, node, event) {
    var cascadePaths = getCascadePaths(layer + 1, node);
    onSelect === null || onSelect === void 0 || onSelect(node, cascadePaths, event);
  });
  var renderCascadeNode = function renderCascadeNode(nodeProps) {
    var node = nodeProps.node,
      index = nodeProps.index,
      layer = nodeProps.layer,
      focus = nodeProps.focus,
      uncheckable = nodeProps.uncheckable,
      size = nodeProps.size;
    var children = node[childrenKey];
    var nodeValue = node[valueKey];
    var label = node[labelKey];
    var disabled = disabledItemValues.some(function (disabledValue) {
      return shallowEqual(disabledValue, nodeValue);
    });

    // Use `value` in keys when If `value` is string or number
    var onlyKey = typeof value === 'number' || typeof value === 'string' ? value : index;
    var Icon = node.loading ? SpinnerIcon : rtl ? ArrowLeftLineIcon : ArrowRightLineIcon;
    var active = value.some(function (v) {
      return v === nodeValue;
    });
    if (cascade) {
      active = active || isSomeParentChecked(node, value, {
        valueKey: valueKey
      });
    }
    return /*#__PURE__*/React.createElement(ListCheckItem, {
      as: "li",
      role: "treeitem",
      "aria-level": layer + 1,
      "aria-setsize": size,
      "aria-posinset": index + 1,
      "aria-label": typeof label === 'string' ? label : undefined,
      key: layer + "-" + onlyKey,
      disabled: disabled,
      active: active,
      focus: focus
      // Pass the node as a value to Item, and use it in event callbacks.
      ,
      value: nodeValue,
      className: children ? prefix('has-children') : undefined,
      indeterminate: cascade && !active && isSomeChildChecked(node, value, {
        valueKey: valueKey,
        childrenKey: childrenKey
      }),
      onSelectItem: function onSelectItem(_value, event) {
        return handleSelect(layer, node, event);
      },
      onCheck: function onCheck(_value, event, checked) {
        return _onCheck === null || _onCheck === void 0 ? void 0 : _onCheck(node, event, checked);
      },
      checkable: !uncheckable,
      labelClickable: false
    }, renderTreeNode ? renderTreeNode(label, node) : label, children ? /*#__PURE__*/React.createElement(Icon, {
      className: prefix('caret'),
      spin: node.loading
    }) : null);
  };
  var columnStyles = {
    height: columnHeight,
    width: columnWidth
  };
  var cascadeNodes = cascadeData.map(function (children, layer) {
    var uncheckableCount = 0;
    var onlyKey = layer + "_" + children.length;
    var childNodes = /*#__PURE__*/React.createElement(React.Fragment, null, children.map(function (item, index) {
      var uncheckable = uncheckableItemValues.some(function (uncheckableValue) {
        return shallowEqual(uncheckableValue, item[valueKey]);
      });
      if (uncheckable) {
        uncheckableCount++;
      }
      var focus = cascadePaths[layer] && shallowEqual(cascadePaths[layer][valueKey], item[valueKey]);
      return renderCascadeNode({
        node: item,
        index: index,
        layer: layer,
        focus: focus,
        uncheckable: uncheckable,
        size: children.length
      });
    }));
    var parentItem = cascadePaths[layer - 1];
    var columnClasses = prefix('column', {
      'column-uncheckable': uncheckableCount === children.length
    });
    return /*#__PURE__*/React.createElement("ul", {
      role: "group",
      key: onlyKey,
      className: columnClasses,
      "data-layer": layer,
      style: columnStyles
    }, renderColumn ? renderColumn(childNodes, {
      items: children,
      parentItem: parentItem,
      layer: layer
    }) : childNodes);
  });
  var styles = _extends({}, style, {
    width: cascadeData.length * columnWidth
  });
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "tree",
    id: id ? id + "-" + popupType : undefined,
    "aria-labelledby": labelId,
    "aria-multiselectable": multiple
  }, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), cascadeNodes);
});
TreeView.displayName = 'TreeView';
export default TreeView;