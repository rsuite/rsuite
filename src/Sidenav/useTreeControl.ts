import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TreeControlContextProps, TreeNode } from './TreeControlContext';
import { KEY_VALUES } from '../utils';
import { SidenavContext } from './Sidenav';
import { Node } from './Node';

const emptyArray = [];

/**
 * Treeview keyboard interaction and focus management
 * Ref: https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView
 */
export default function useTreeControl(): TreeControlContextProps {
  const { openKeys = emptyArray, onOpenChange, activeKey } = useContext(SidenavContext);

  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const activeNode = nodes[activeItemIndex];
  const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>(() => {
    const ids: string[] = [];
    for (const node of nodes) {
      if (node.nodeValue && openKeys.includes(node.nodeValue)) {
        ids.push(node.id);
      }
    }
    return ids;
  });
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>(() => {
    const ids: string[] = [];
    for (const node of nodes) {
      if (node.id === activeKey) {
        ids.push(node.id);
      }
    }
    return ids;
  });

  useEffect(() => {
    setExpandedNodeIds(() => {
      const ids: string[] = [];
      for (const node of nodes) {
        if (node.nodeValue && openKeys.includes(node.nodeValue)) {
          ids.push(node.id);
        }
      }
      return ids;
    });
  }, [openKeys, nodes]);

  useEffect(() => {
    setSelectedNodeIds(() => {
      const ids: string[] = [];
      for (const node of nodes) {
        if (node.id === activeKey) {
          ids.push(node.id);
        }
      }
      return ids;
    });
  }, [activeKey, nodes]);

  const expandNode = useCallback(
    (node: TreeNode) => {
      setExpandedNodeIds(ids => [...ids, node.id]);
      onOpenChange?.(node.nodeValue, null);
    },
    [onOpenChange]
  );

  const collapseNode = useCallback(
    (node: TreeNode) => {
      setExpandedNodeIds(ids => ids.filter(id => id !== node.id));
      onOpenChange?.(node.nodeValue, null);
    },
    [onOpenChange]
  );

  const registerNode = useCallback((element: HTMLElement, parentId: string = null, props?: any) => {
    setNodes(nodes => {
      const newNode = new Node();
      newNode.id = element.id;
      newNode.element = element;
      newNode.nodeValue = props.eventKey ?? newNode.id;
      newNode.parent = parentId;

      const parentNode: Node = nodes.find(node => node.id === parentId) ?? (null as any);
      parentNode?.appendChild(newNode);

      for (const node of nodes) {
        if (node.parent === newNode.id) {
          newNode.appendChild(node);
        }
      }

      return [...nodes, newNode];
    });
  }, []);

  const unregisterNode = useCallback((id: string) => {
    // todo unlink child nodes
    setNodes(nodes => nodes.filter(node => node.id !== id));
  }, []);

  const handleReceiveFocus = useCallback(() => {
    // Move focus to first root node
    if (!activeNode) {
      setActiveItemIndex(nodes.findIndex(node => !node.parent));
    }
  }, [activeNode, nodes]);

  const moveFocusToNode = useCallback(
    (node: Node) => {
      setActiveItemIndex(nodes.indexOf(node));
    },
    [nodes]
  );

  const isNodeExpanded = useCallback(
    (node: TreeNode) => {
      return expandedNodeIds.includes(node.id);
    },
    [expandedNodeIds]
  );

  // Used when navigating upwards
  const findLastVisibleDescendant = useCallback(
    (node: Node): Node => {
      let nodeCursor = node;

      while (nodeCursor.hasChildNodes() && isNodeExpanded(nodeCursor)) {
        nodeCursor = nodeCursor.lastChild;
      }

      return nodeCursor;
    },
    [isNodeExpanded]
  );

  // Treeview can have multiple root nodes
  const rootNodes = useMemo(() => {
    return nodes.filter(node => !node.parentNode);
  }, [nodes]);

  const findNextVisibleNode = useCallback(
    (node: Node) => {
      if (node.hasChildNodes() && isNodeExpanded(node)) return node.firstChild;
      if (node.nextSibling) return node.nextSibling;

      let nodeCursor = node;
      let nextVisibleNode;

      do {
        const siblingNodes = !nodeCursor.parentNode ? rootNodes : nodeCursor.parentNode.childNodes;
        const nextSibling = siblingNodes[siblingNodes.indexOf(nodeCursor) + 1] ?? null;
        if (nextSibling) {
          nextVisibleNode = nextSibling;
        } else {
          nodeCursor = nodeCursor.parentNode;
        }
      } while (!nextVisibleNode && !!nodeCursor);

      return nextVisibleNode;
    },
    [isNodeExpanded, rootNodes]
  );

  const findPreviousVisibleNode = useCallback(
    (node: Node) => {
      if (node.parentNode && !node.previousSibling) {
        return node.parentNode;
      }

      if (node.previousSibling) {
        return findLastVisibleDescendant(node.previousSibling);
      }

      const previousRoot = rootNodes[rootNodes.indexOf(node) - 1];

      if (previousRoot) {
        return findLastVisibleDescendant(previousRoot);
      }

      return null;
    },
    [rootNodes, findLastVisibleDescendant]
  );

  const keyboardInteractionHandler = useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      switch (event.key) {
        // Moves focus to the next node that is focusable without opening or closing a node
        case KEY_VALUES.DOWN:
          event.preventDefault();
          event.stopPropagation();

          if (activeNode.hasChildNodes() && isNodeExpanded(activeNode)) {
            moveFocusToNode(activeNode.firstChild);
            break;
          }

          const nextVisibleNode = findNextVisibleNode(activeNode);

          if (nextVisibleNode) {
            moveFocusToNode(nextVisibleNode);
          }
          break;
        // Moves focus to the previous node that is focusable without opening or closing a node.
        case KEY_VALUES.UP:
          event.preventDefault();
          event.stopPropagation();
          const previousVisibleNode = findPreviousVisibleNode(activeNode);
          if (previousVisibleNode) {
            moveFocusToNode(previousVisibleNode);
          }
          break;
        // Right arrow:
        // When focus is on a closed node, opens the node; focus does not move.
        // When focus is on a open node, moves focus to the first child node.
        // When focus is on an end node, does nothing.
        case KEY_VALUES.RIGHT:
          event.preventDefault();
          event.stopPropagation();
          if (activeNode.hasChildNodes()) {
            if (!isNodeExpanded(activeNode)) {
              expandNode(activeNode);
            } else {
              moveFocusToNode(activeNode.firstChild);
            }
          }
          break;
        // Left arrow:
        // When focus is on an open node, closes the node.
        // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
        // When focus is on a root node that is also either an end node or a closed node, does nothing.
        case KEY_VALUES.LEFT:
          event.preventDefault();
          event.stopPropagation();
          if (activeNode.hasChildNodes() && isNodeExpanded(activeNode)) {
            collapseNode(activeNode);
          } else if (
            activeNode.parentNode &&
            (!activeNode.hasChildNodes() || !isNodeExpanded(activeNode))
          ) {
            moveFocusToNode(activeNode.parentNode);
          }
          break;
        // Enter: activates a node, i.e., performs its default action.
        // For parent nodes, one possible default action is to open or close the node.
        // In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
        case KEY_VALUES.ENTER:
          event.preventDefault();
          event.stopPropagation();
          if (activeNode.hasChildNodes()) {
            if (isNodeExpanded(activeNode)) {
              collapseNode(activeNode);
            } else {
              expandNode(activeNode);
            }
          } else {
            activeNode.element.click();
          }
          break;
        default:
          break;
      }
    },
    [
      activeNode,
      moveFocusToNode,
      isNodeExpanded,
      findNextVisibleNode,
      findPreviousVisibleNode,
      expandNode,
      collapseNode
    ]
  );

  const handleLoseFocus = useCallback(() => {
    setActiveItemIndex(null);
  }, []);

  return {
    nodes,
    activeItemIndex,
    activeDescendantId: activeNode?.id,
    selectedNodeIds,
    expandedNodeIds,
    registerNode,
    unregisterNode,
    handleReceiveFocus,
    handleLoseFocus,
    keyboardEventHandlers: {
      onKeyDown: keyboardInteractionHandler
    }
  };
}
