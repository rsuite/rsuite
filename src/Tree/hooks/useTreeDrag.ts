import { useState, useRef, useCallback } from 'react';
import isNil from 'lodash/isNil';
import { TREE_NODE_DROP_POSITION } from '@/internals/constants';
import { useEventCallback } from '@/internals/hooks';
import { shallowEqual as equal, stringifyReactNode } from '@/internals/utils';
import { useItemDataKeys } from '@/internals/Tree/TreeProvider';
import type { DropData } from '../types';

/**
 * The gap between tree nodes.
 */
const TREE_NODE_GAP = 4;

/**
 * Calculates the drop position of a tree node based on the clientY coordinate of a drag event
 * and the bounding rectangle of the tree node element.
 *
 * @param event - The drag event.
 * @param treeNodeElement - The element representing the tree node.
 * @returns The drop position of the tree node.
 */
function calDropNodePosition(event: React.DragEvent, treeNodeElement: Element) {
  const { clientY } = event;
  const { top, bottom } = treeNodeElement.getBoundingClientRect();
  const gap = TREE_NODE_GAP;

  // bottom of node
  if (clientY >= bottom - gap && clientY <= bottom) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM;
  }

  // top of node
  if (clientY <= top + gap && clientY >= top) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER_TOP;
  }

  if (clientY >= top + gap && clientY <= bottom - gap) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER;
  }
  return -1;
}

/**
 * Creates a drag preview element for tree nodes.
 */
function createDragPreview(name: string, className: string) {
  const dragPreview = document.createElement('div');
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
  const dragPreview = document.getElementById('rs-tree-drag-preview');
  dragPreview?.parentNode?.removeChild?.(dragPreview);
}

interface TreeDragProps {
  draggable?: boolean;
  flattenedNodes: Record<string, any>;
  treeNodesRefs: Record<string, any>;
  prefix: (className: string) => string;
  onDragStart?: (nodeData: any, event: React.DragEvent) => void;
  onDragEnter?: (nodeData: any, event: React.DragEvent) => void;
  onDragOver?: (nodeData: any, event: React.DragEvent) => void;
  onDragLeave?: (nodeData: any, event: React.DragEvent) => void;
  onDragEnd?: (nodeData: any, event: React.DragEvent) => void;
  onDrop?: (dropData: DropData<Record<string, any>>, event: React.DragEvent) => void;
}

/**
 * Custom hook for handling tree node dragging.
 */
export default function useTreeDrag<T>(props: TreeDragProps) {
  const { childrenKey, valueKey, labelKey } = useItemDataKeys();
  const {
    draggable,
    flattenedNodes,
    treeNodesRefs,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDragEnd,
    onDrop,
    prefix
  } = props;
  // current dragging node
  const dragNode = useRef<T | null>(null);
  const [dragOverNodeKey, setDragOverNodeKey] = useState(null);
  // drag node and it's children nodes key
  const [dragNodeKeys, setDragNodeKeys] = useState<(number | string)[]>([]);
  const [dropNodePosition, setDropNodePosition] = useState<TREE_NODE_DROP_POSITION | null | -1>(
    null
  );

  const setDragNode = useCallback((node: T | null) => {
    dragNode.current = node;
  }, []);

  /**
   * Retrieves an array of keys for the nodes in a tree starting from the specified drag node.
   */
  const getDragNodeKeys = useCallback(
    (dragNode: any) => {
      let dragNodeKeys: any[] = [dragNode[valueKey]];
      const traverse = (data: any) => {
        if (data?.length > 0) {
          data.forEach((node: any) => {
            dragNodeKeys = dragNodeKeys.concat([node[valueKey]]);
            if (node[childrenKey]) {
              traverse(node[childrenKey]);
            }
          });
        }
      };

      traverse(dragNode[childrenKey]);

      return dragNodeKeys;
    },
    [childrenKey, valueKey]
  );

  /**
   * Removes the drag node from the data array.
   *
   */
  const removeDragNode = useCallback(
    (data: any[], params: any) => {
      const { dragNode } = params;
      const traverse = (items: any[], parent?: any) => {
        for (let index = 0; index < items.length; index += 1) {
          const item = items[index];
          if (equal(item[valueKey], dragNode[valueKey])) {
            items.splice(index, 1);
            // when children is empty, delete children prop for hidden anchor
            if (items.length === 0 && parent) {
              delete parent.children;
            }
            break;
          }

          if (Array.isArray(item[childrenKey])) {
            traverse(item[childrenKey], item);
          }
        }
      };
      traverse(data);
    },
    [childrenKey, valueKey]
  );

  /**
   * Creates a function that modifies a tree data structure based on drag and drop parameters.
   */
  const createDragTreeDataFunction = useCallback(
    (params: any) => {
      return function (tree: any[]) {
        const data = [...tree];
        const { dragNode, dropNode, dropNodePosition } = params;
        const cloneDragNode = { ...dragNode };
        removeDragNode(data, params);
        const updateTree = (items: any[]) => {
          for (let index = 0; index < items.length; index += 1) {
            const item = items[index];

            if (equal(item[valueKey], dropNode[valueKey])) {
              // drag to node inside
              if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER) {
                item[childrenKey] = isNil(item[childrenKey]) ? [] : item[childrenKey];
                item[childrenKey].push(cloneDragNode);
                break;
              } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_TOP) {
                // drag to top of node
                items.splice(index, 0, cloneDragNode);
                break;
              } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM) {
                // drag to bottom of node
                items.splice(index + 1, 0, cloneDragNode);
                break;
              }
            }

            if (Array.isArray(item[childrenKey]) && item[childrenKey].length > 0) {
              updateTree(item[childrenKey]);
            }
          }
        };

        updateTree(data);
        return [...data];
      };
    },
    [childrenKey, removeDragNode, valueKey]
  );

  const getDropData = useCallback(
    (nodeData: any) => {
      const dragParams = { dragNode: dragNode.current, dropNode: nodeData, dropNodePosition };

      return {
        ...dragParams,
        createUpdateDataFunction: createDragTreeDataFunction(dragParams)
      };
    },
    [createDragTreeDataFunction, dropNodePosition]
  );

  const handleDragStart = useEventCallback((nodeData: any, event: React.DragEvent) => {
    if (draggable) {
      const dragMoverNode = createDragPreview(
        stringifyReactNode(nodeData[labelKey]),
        prefix('drag-preview')
      );
      event.dataTransfer?.setDragImage(dragMoverNode, 0, 0);
      setDragNodeKeys(getDragNodeKeys(nodeData));
      setDragNode(flattenedNodes[nodeData.refKey]);
      onDragStart?.(nodeData, event);
    }
  });

  const handleDragEnter = useEventCallback((nodeData: any, event: React.DragEvent) => {
    if (dragNodeKeys.some(d => equal(d, nodeData[valueKey]))) {
      return;
    }

    if (dragNode.current) {
      setDragOverNodeKey(nodeData[valueKey]);
      setDropNodePosition(calDropNodePosition(event, treeNodesRefs[nodeData.refKey]));
    }
    onDragEnter?.(nodeData, event);
  });

  const handleDragOver = useEventCallback((nodeData: any, event: React.DragEvent) => {
    if (dragNodeKeys.some(d => equal(d, nodeData[valueKey]))) {
      event.dataTransfer.dropEffect = 'none';
      return;
    }

    if (dragNode.current && equal(nodeData[valueKey], dragOverNodeKey)) {
      const lastDropNodePosition = calDropNodePosition(event, treeNodesRefs[nodeData.refKey]);
      if (lastDropNodePosition === dropNodePosition) return;

      setDropNodePosition(lastDropNodePosition);
    }

    onDragOver?.(nodeData, event);
  });

  const handleDragLeave = useEventCallback((nodeData: any, event: React.DragEvent) => {
    onDragLeave?.(nodeData, event);
  });

  const handleDragEnd = useEventCallback((nodeData: any, event: React.DragEvent) => {
    removeDragPreview();
    setDragNode(null);
    setDragNodeKeys([]);
    setDragOverNodeKey(null);
    onDragEnd?.(nodeData, event);
  });

  const handleDrop = useEventCallback((nodeData: any, event: React.DragEvent) => {
    if (dragNodeKeys.some(d => equal(d, nodeData[valueKey]))) {
      console.error('Cannot drag a node to itself and its children');
    } else {
      const dropData = getDropData(nodeData) as DropData<Record<string, any>>;
      onDrop?.(dropData, event);
    }
    removeDragPreview();
    setDragNode(null);
    setDragNodeKeys([]);
    setDragOverNodeKey(null);
  });

  const dragEvents = {
    onDragStart: handleDragStart,
    onDragEnter: handleDragEnter,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDragEnd: handleDragEnd,
    onDrop: handleDrop
  };

  return {
    dragNode: dragNode?.current,
    dragOverNodeKey,
    dropNodePosition,
    dragEvents
  };
}
