import isNil from 'lodash/isNil';
import { TREE_NODE_DROP_POSITION, shallowEqual } from '../../utils';

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
export function calDropNodePosition(event: React.DragEvent, treeNodeElement: Element) {
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
 * Removes the drag node from the data array.
 *
 */
function removeDragNode(data: any[], params: any, { valueKey, childrenKey }) {
  const { dragNode } = params;
  const traverse = (items: any[], parent?: any) => {
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      if (shallowEqual(item[valueKey], dragNode[valueKey])) {
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
}

/**
 * Creates a function that modifies a tree data structure based on drag and drop parameters.
 */
export function createDragTreeDataFunction(params: any, { valueKey, childrenKey }) {
  return function (tree: any[]) {
    const data = [...tree];
    const { dragNode, dropNode, dropNodePosition } = params;
    const cloneDragNode = { ...dragNode };
    removeDragNode(data, params, { valueKey, childrenKey });
    const updateTree = (items: any[]) => {
      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];

        if (shallowEqual(item[valueKey], dropNode[valueKey])) {
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
}

/**
 * Retrieves an array of keys for the nodes in a tree starting from the specified drag node.
 */
export function getDragNodeKeys(dragNode: any, childrenKey: string, valueKey: string) {
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
}

/**
 * Creates a drag preview element for tree nodes.
 */
export function createDragPreview(name: string, className: string) {
  const dragPreview = document.createElement('div');
  dragPreview.id = 'rs-tree-drag-preview';
  dragPreview.innerHTML = name;
  dragPreview.classList.add(className);
  document.body.appendChild(dragPreview);
  return dragPreview;
}

/**
 * Removes the drag preview element from the DOM.
 */
export function removeDragPreview() {
  const dragPreview = document.getElementById('rs-tree-drag-preview');
  dragPreview?.parentNode?.removeChild?.(dragPreview);
}
