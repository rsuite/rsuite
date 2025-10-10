'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _react = require("react");
var _constants = require("../../internals/constants");
var _hooks = require("../../internals/hooks");
var _Picker = require("../../internals/Picker");
var _TreeProvider = require("../../internals/Tree/TreeProvider");
var _utils = require("../utils");
var _CustomProvider = require("../../CustomProvider");
var _useTreeNodeRefs2 = _interopRequireDefault(require("./useTreeNodeRefs"));
/**
 * Custom hook that manages the focus behavior of a tree component.
 */
function useFocusTree(props) {
  var filteredData = props.filteredData,
    searchKeyword = props.searchKeyword,
    flattenedNodes = props.flattenedNodes,
    expandItemValues = props.expandItemValues,
    disabledItemValues = props.disabledItemValues,
    onExpand = props.onExpand,
    onFocused = props.onFocused;
  var _useCustom = (0, _CustomProvider.useCustom)(),
    rtl = _useCustom.rtl;
  var _useItemDataKeys = (0, _TreeProvider.useItemDataKeys)(),
    valueKey = _useItemDataKeys.valueKey,
    childrenKey = _useItemDataKeys.childrenKey;
  var _useTreeNodeRefs = (0, _useTreeNodeRefs2.default)(),
    treeNodesRefs = _useTreeNodeRefs.treeNodesRefs,
    saveTreeNodeRef = _useTreeNodeRefs.saveTreeNodeRef;
  var treeViewRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(null),
    focusItemValue = _useState[0],
    setFocusItemValue = _useState[1];
  var register = (0, _TreeProvider.useRegisterTreeMethods)();
  var flattenedNodesRef = (0, _react.useRef)(flattenedNodes);
  var getFocusProps = function getFocusProps(value) {
    var options = {
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      childrenKey: childrenKey,
      expandItemValues: expandItemValues
    };
    var focusableItems = (0, _utils.getFocusableItems)(filteredData, options, (0, _utils.isSearching)(searchKeyword));
    return {
      focusItemValue: value || focusItemValue,
      valueKey: valueKey,
      focusableItems: focusableItems,
      treeNodesRefs: treeNodesRefs
    };
  };
  var handleFocusItem = (0, _hooks.useEventCallback)(function (key) {
    var focusProps = getFocusProps();
    var focusedValue = null;
    if (key === _constants.KEY_VALUES.DOWN) {
      focusedValue = (0, _utils.focusNextItem)(focusProps);
    } else if (key === _constants.KEY_VALUES.UP) {
      focusedValue = (0, _utils.focusPreviousItem)(focusProps);
    }
    if (focusedValue) {
      setFocusItemValue(focusedValue);
      onFocused === null || onFocused === void 0 || onFocused(focusedValue);
    }
  });
  var handleLeftArrowEvent = (0, _hooks.useEventCallback)(function () {
    if ((0, _isNil.default)(focusItemValue)) {
      return;
    }
    var focusItem = (0, _utils.getActiveItem)(focusItemValue, flattenedNodes, valueKey);
    var expand = expandItemValues.includes(focusItem === null || focusItem === void 0 ? void 0 : focusItem[valueKey]);
    var onFocusItem = function onFocusItem() {
      var _focusItem$parent, _focusItem$parent2;
      var focusedValue = focusItem === null || focusItem === void 0 || (_focusItem$parent = focusItem.parent) === null || _focusItem$parent === void 0 ? void 0 : _focusItem$parent[valueKey];
      setFocusItemValue(focusedValue);
      onFocused === null || onFocused === void 0 || onFocused(focusedValue);
      (0, _utils.focusTreeNode)(focusItem === null || focusItem === void 0 || (_focusItem$parent2 = focusItem.parent) === null || _focusItem$parent2 === void 0 ? void 0 : _focusItem$parent2.refKey, treeNodesRefs);
    };
    (0, _utils.handleLeftArrow)({
      focusItem: focusItem,
      expand: expand,
      onExpand: onExpand,
      childrenKey: childrenKey,
      onFocusItem: onFocusItem
    });
  });
  var handleRightArrowEvent = (0, _hooks.useEventCallback)(function () {
    if ((0, _isNil.default)(focusItemValue)) {
      return;
    }
    var focusItem = (0, _utils.getActiveItem)(focusItemValue, flattenedNodes, valueKey);
    var expand = expandItemValues.includes(focusItem === null || focusItem === void 0 ? void 0 : focusItem[valueKey]);
    var onFocusItem = function onFocusItem() {
      return handleFocusItem(_constants.KEY_VALUES.DOWN);
    };
    (0, _utils.handleRightArrow)({
      focusItem: focusItem,
      expand: expand,
      childrenKey: childrenKey,
      onExpand: onExpand,
      onFocusItem: onFocusItem
    });
  });
  var onTreeKeydown = (0, _hooks.useEventCallback)(function (event) {
    (0, _Picker.onMenuKeyDown)(event, {
      down: function down() {
        return handleFocusItem(_constants.KEY_VALUES.DOWN);
      },
      up: function up() {
        return handleFocusItem(_constants.KEY_VALUES.UP);
      },
      left: rtl ? handleRightArrowEvent : handleLeftArrowEvent,
      right: rtl ? handleLeftArrowEvent : handleRightArrowEvent
    });
  });
  var focusTreeFirstNode = (0, _hooks.useEventCallback)(function () {
    handleFocusItem(_constants.KEY_VALUES.DOWN);
  });
  var focusTreeActiveNode = (0, _react.useCallback)(function () {
    var refKey = (0, _utils.focusCurrentItem)({
      container: treeViewRef.current
    });
    if (refKey) {
      var _flattenedNodesRef$cu;
      var node = (_flattenedNodesRef$cu = flattenedNodesRef.current) === null || _flattenedNodesRef$cu === void 0 ? void 0 : _flattenedNodesRef$cu[refKey];
      if (node) {
        setFocusItemValue(node[valueKey]);
        onFocused === null || onFocused === void 0 || onFocused(node[valueKey]);
      }
    }
  }, [onFocused, valueKey]);
  (0, _react.useEffect)(function () {
    var unregister = register === null || register === void 0 ? void 0 : register({
      focusTreeFirstNode: focusTreeFirstNode,
      focusTreeActiveNode: focusTreeActiveNode
    });
    return function () {
      unregister === null || unregister === void 0 || unregister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(function () {
    flattenedNodesRef.current = flattenedNodes;
  }, [flattenedNodes]);
  return {
    treeViewRef: treeViewRef,
    focusTreeFirstNode: focusTreeFirstNode,
    focusItemValue: focusItemValue,
    treeNodesRefs: treeNodesRefs,
    saveTreeNodeRef: saveTreeNodeRef,
    setFocusItemValue: setFocusItemValue,
    onTreeKeydown: onTreeKeydown
  };
}
var _default = exports.default = useFocusTree;