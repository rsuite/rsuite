'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = useTreeDrag;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = require("react");
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _constants = require("../../internals/constants");
var _hooks = require("../../internals/hooks");
var _utils = require("../../internals/utils");
var _TreeProvider = require("../../internals/Tree/TreeProvider");
/**
 * The gap between tree nodes.
 */
var TREE_NODE_GAP = 4;

/**
 * Calculates the drop position of a tree node based on the clientY coordinate of a drag event
 * and the bounding rectangle of the tree node element.
 *
 * @param event - The drag event.
 * @param treeNodeElement - The element representing the tree node.
 * @returns The drop position of the tree node.
 */
function calDropNodePosition(event, treeNodeElement) {
  var clientY = event.clientY;
  var _treeNodeElement$getB = treeNodeElement.getBoundingClientRect(),
    top = _treeNodeElement$getB.top,
    bottom = _treeNodeElement$getB.bottom;
  var gap = TREE_NODE_GAP;

  // bottom of node
  if (clientY >= bottom - gap && clientY <= bottom) {
    return _constants.TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM;
  }

  // top of node
  if (clientY <= top + gap && clientY >= top) {
    return _constants.TREE_NODE_DROP_POSITION.DRAG_OVER_TOP;
  }
  if (clientY >= top + gap && clientY <= bottom - gap) {
    return _constants.TREE_NODE_DROP_POSITION.DRAG_OVER;
  }
  return -1;
}

/**
 * Creates a drag preview element for tree nodes.
 */
function createDragPreview(name, className) {
  var dragPreview = document.createElement('div');
  dragPreview.id = 'rs-tree-drag-preview';
  dragPreview.dataset.testid = 'drag-preview';
  dragPreview.innerHTML = name;
  dragPreview.classList.add(className);
  document.body.appendChild(dragPreview);
  return dragPreview;
}

/**
 * Removes the drag preview element from the DOM.
 */
function removeDragPreview() {
  var _dragPreview$parentNo, _dragPreview$parentNo2;
  var dragPreview = document.getElementById('rs-tree-drag-preview');
  dragPreview === null || dragPreview === void 0 || (_dragPreview$parentNo = dragPreview.parentNode) === null || _dragPreview$parentNo === void 0 || (_dragPreview$parentNo2 = _dragPreview$parentNo.removeChild) === null || _dragPreview$parentNo2 === void 0 || _dragPreview$parentNo2.call(_dragPreview$parentNo, dragPreview);
}
/**
 * Custom hook for handling tree node dragging.
 */
function useTreeDrag(props) {
  var _useItemDataKeys = (0, _TreeProvider.useItemDataKeys)(),
    childrenKey = _useItemDataKeys.childrenKey,
    valueKey = _useItemDataKeys.valueKey,
    labelKey = _useItemDataKeys.labelKey;
  var draggable = props.draggable,
    flattenedNodes = props.flattenedNodes,
    treeNodesRefs = props.treeNodesRefs,
    onDragStart = props.onDragStart,
    onDragEnter = props.onDragEnter,
    onDragOver = props.onDragOver,
    onDragLeave = props.onDragLeave,
    onDragEnd = props.onDragEnd,
    onDrop = props.onDrop,
    prefix = props.prefix;
  // current dragging node
  var dragNode = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(null),
    dragOverNodeKey = _useState[0],
    setDragOverNodeKey = _useState[1];
  // drag node and it's children nodes key
  var _useState2 = (0, _react.useState)([]),
    dragNodeKeys = _useState2[0],
    setDragNodeKeys = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    dropNodePosition = _useState3[0],
    setDropNodePosition = _useState3[1];
  var setDragNode = (0, _react.useCallback)(function (node) {
    dragNode.current = node;
  }, []);

  /**
   * Retrieves an array of keys for the nodes in a tree starting from the specified drag node.
   */
  var getDragNodeKeys = (0, _react.useCallback)(function (dragNode) {
    var dragNodeKeys = [dragNode[valueKey]];
    var _traverse = function traverse(data) {
      if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
        data.forEach(function (node) {
          dragNodeKeys = dragNodeKeys.concat([node[valueKey]]);
          if (node[childrenKey]) {
            _traverse(node[childrenKey]);
          }
        });
      }
    };
    _traverse(dragNode[childrenKey]);
    return dragNodeKeys;
  }, [childrenKey, valueKey]);

  /**
   * Removes the drag node from the data array.
   *
   */
  var removeDragNode = (0, _react.useCallback)(function (data, params) {
    var dragNode = params.dragNode;
    var _traverse2 = function traverse(items, parent) {
      for (var index = 0; index < items.length; index += 1) {
        var item = items[index];
        if ((0, _utils.shallowEqual)(item[valueKey], dragNode[valueKey])) {
          items.splice(index, 1);
          // when children is empty, delete children prop for hidden anchor
          if (items.length === 0 && parent) {
            delete parent.children;
          }
          break;
        }
        if (Array.isArray(item[childrenKey])) {
          _traverse2(item[childrenKey], item);
        }
      }
    };
    _traverse2(data);
  }, [childrenKey, valueKey]);

  /**
   * Creates a function that modifies a tree data structure based on drag and drop parameters.
   */
  var createDragTreeDataFunction = (0, _react.useCallback)(function (params) {
    return function (tree) {
      var data = [].concat(tree);
      var dragNode = params.dragNode,
        dropNode = params.dropNode,
        dropNodePosition = params.dropNodePosition;
      var cloneDragNode = (0, _extends2.default)({}, dragNode);
      removeDragNode(data, params);
      var _updateTree = function updateTree(items) {
        for (var index = 0; index < items.length; index += 1) {
          var item = items[index];
          if ((0, _utils.shallowEqual)(item[valueKey], dropNode[valueKey])) {
            // drag to node inside
            if (dropNodePosition === _constants.TREE_NODE_DROP_POSITION.DRAG_OVER) {
              item[childrenKey] = (0, _isNil.default)(item[childrenKey]) ? [] : item[childrenKey];
              item[childrenKey].push(cloneDragNode);
              break;
            } else if (dropNodePosition === _constants.TREE_NODE_DROP_POSITION.DRAG_OVER_TOP) {
              // drag to top of node
              items.splice(index, 0, cloneDragNode);
              break;
            } else if (dropNodePosition === _constants.TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM) {
              // drag to bottom of node
              items.splice(index + 1, 0, cloneDragNode);
              break;
            }
          }
          if (Array.isArray(item[childrenKey]) && item[childrenKey].length > 0) {
            _updateTree(item[childrenKey]);
          }
        }
      };
      _updateTree(data);
      return [].concat(data);
    };
  }, [childrenKey, removeDragNode, valueKey]);
  var getDropData = (0, _react.useCallback)(function (nodeData) {
    var dragParams = {
      dragNode: dragNode.current,
      dropNode: nodeData,
      dropNodePosition: dropNodePosition
    };
    return (0, _extends2.default)({}, dragParams, {
      createUpdateDataFunction: createDragTreeDataFunction(dragParams)
    });
  }, [createDragTreeDataFunction, dropNodePosition]);
  var handleDragStart = (0, _hooks.useEventCallback)(function (nodeData, event) {
    if (draggable) {
      var _event$dataTransfer;
      var dragMoverNode = createDragPreview((0, _utils.stringifyReactNode)(nodeData[labelKey]), prefix('drag-preview'));
      (_event$dataTransfer = event.dataTransfer) === null || _event$dataTransfer === void 0 || _event$dataTransfer.setDragImage(dragMoverNode, 0, 0);
      setDragNodeKeys(getDragNodeKeys(nodeData));
      setDragNode(flattenedNodes[nodeData.refKey]);
      onDragStart === null || onDragStart === void 0 || onDragStart(nodeData, event);
    }
  });
  var handleDragEnter = (0, _hooks.useEventCallback)(function (nodeData, event) {
    if (dragNodeKeys.some(function (d) {
      return (0, _utils.shallowEqual)(d, nodeData[valueKey]);
    })) {
      return;
    }
    if (dragNode.current) {
      setDragOverNodeKey(nodeData[valueKey]);
      setDropNodePosition(calDropNodePosition(event, treeNodesRefs[nodeData.refKey]));
    }
    onDragEnter === null || onDragEnter === void 0 || onDragEnter(nodeData, event);
  });
  var handleDragOver = (0, _hooks.useEventCallback)(function (nodeData, event) {
    if (dragNodeKeys.some(function (d) {
      return (0, _utils.shallowEqual)(d, nodeData[valueKey]);
    })) {
      event.dataTransfer.dropEffect = 'none';
      return;
    }
    if (dragNode.current && (0, _utils.shallowEqual)(nodeData[valueKey], dragOverNodeKey)) {
      var lastDropNodePosition = calDropNodePosition(event, treeNodesRefs[nodeData.refKey]);
      if (lastDropNodePosition === dropNodePosition) return;
      setDropNodePosition(lastDropNodePosition);
    }
    onDragOver === null || onDragOver === void 0 || onDragOver(nodeData, event);
  });
  var handleDragLeave = (0, _hooks.useEventCallback)(function (nodeData, event) {
    onDragLeave === null || onDragLeave === void 0 || onDragLeave(nodeData, event);
  });
  var handleDragEnd = (0, _hooks.useEventCallback)(function (nodeData, event) {
    removeDragPreview();
    setDragNode(null);
    setDragNodeKeys([]);
    setDragOverNodeKey(null);
    onDragEnd === null || onDragEnd === void 0 || onDragEnd(nodeData, event);
  });
  var handleDrop = (0, _hooks.useEventCallback)(function (nodeData, event) {
    if (dragNodeKeys.some(function (d) {
      return (0, _utils.shallowEqual)(d, nodeData[valueKey]);
    })) {
      console.error('Cannot drag a node to itself and its children');
    } else {
      var dropData = getDropData(nodeData);
      onDrop === null || onDrop === void 0 || onDrop(dropData, event);
    }
    removeDragPreview();
    setDragNode(null);
    setDragNodeKeys([]);
    setDragOverNodeKey(null);
  });
  var dragEvents = {
    onDragStart: handleDragStart,
    onDragEnter: handleDragEnter,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDragEnd: handleDragEnd,
    onDrop: handleDrop
  };
  return {
    dragNode: dragNode === null || dragNode === void 0 ? void 0 : dragNode.current,
    dragOverNodeKey: dragOverNodeKey,
    dropNodePosition: dropNodePosition,
    dragEvents: dragEvents
  };
}