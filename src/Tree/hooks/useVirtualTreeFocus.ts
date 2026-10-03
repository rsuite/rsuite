import { useReducer, useRef } from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/internals/hooks';
import { formatNodeRefKey } from '../utils/formatNodeRefKey';
import type { ListHandle } from '@/internals/Windowing';
import type { TreeNode } from '@/internals/Tree/types';

interface VirtualTreeFocusProps {
  nodes: TreeNode[];
  sourceData?: TreeNode[];
  valueKey: string;
  childrenKey: string;
  disabledItemValues: (string | number)[];
  listRef: React.RefObject<ListHandle | null>;
  getTree: () => HTMLElement | null;
  getNode: (refKey: string) => HTMLElement | null | undefined;
  onCancel: (sourceKey?: string) => void;
}

interface NodeLocation {
  path: string[];
  indexes: number[];
}

interface FocusRequest {
  refKey: string;
  location: NodeLocation | null;
  sourceElement: Element | null;
  scrolled: boolean;
}

/** Scroll keyboard destinations before focusing their mounted tree items. */
export default function useVirtualTreeFocus(props: VirtualTreeFocusProps) {
  const {
    nodes,
    sourceData,
    valueKey,
    childrenKey,
    disabledItemValues,
    listRef,
    getTree,
    getNode,
    onCancel
  } = props;
  const pendingFocus = useRef<FocusRequest | null>(null);
  const [, renderPendingFocus] = useReducer(version => version + 1, 0);

  const hasPendingFocus = useEventCallback(() => {
    const request = pendingFocus.current;
    if (!request) return false;

    const tree = getTree();
    const ownerDocument = tree?.ownerDocument;
    const { sourceElement } = request;
    const node = nodes.find(node => node.refKey === request.refKey);
    const location =
      sourceData && findNodeLocation(sourceData, request.refKey, valueKey, childrenKey);
    // A later interaction owns focus. Only an unmounted source row may leave it on body.
    if (
      !node ||
      disabledItemValues.includes(node[valueKey]) ||
      (sourceData && !sameLocation(location, request.location)) ||
      !ownerDocument ||
      (sourceElement && sourceElement.ownerDocument !== ownerDocument) ||
      (ownerDocument.activeElement !== sourceElement &&
        (sourceElement?.isConnected || ownerDocument.activeElement !== ownerDocument.body))
    ) {
      if (pendingFocus.current === request) {
        pendingFocus.current = null;
        const sourceKey = sourceElement?.closest<HTMLElement>('[role="treeitem"]')?.dataset.key;
        const sourceExists =
          sourceKey &&
          (!sourceData || findNodeLocation(sourceData, sourceKey, valueKey, childrenKey));
        onCancel(sourceExists ? sourceKey : undefined);
      }
      return false;
    }

    return true;
  });

  const focusNode = useEventCallback((node: TreeNode) => {
    if (!node.refKey || !nodes.some(item => item.refKey === node.refKey)) return;

    pendingFocus.current = {
      refKey: node.refKey,
      location: sourceData
        ? findNodeLocation(sourceData, node.refKey, valueKey, childrenKey)
        : null,
      sourceElement: getTree()?.ownerDocument.activeElement ?? null,
      scrolled: false
    };
    renderPendingFocus();
  });

  useIsomorphicLayoutEffect(() => {
    const request = pendingFocus.current;
    if (!request || !hasPendingFocus()) return;

    if (!request.scrolled) {
      // Commit queued native scroll updates before applying the latest keyboard jump.
      const index = nodes.findIndex(node => node.refKey === request.refKey);
      request.scrolled = true;
      listRef.current?.scrollToItem?.(index);
    }

    if (pendingFocus.current !== request) return;
    const node = getNode(request.refKey);
    if (node?.isConnected && getTree()?.contains(node) && hasPendingFocus()) {
      node.focus({ preventScroll: true });
      if (pendingFocus.current === request) pendingFocus.current = null;
    }
  });

  // Child list lifecycle callbacks run before the parent's latest layout effects.
  // Notify the parent instead of consuming a request with the previous owner data.
  const handleItemsRendered = useEventCallback(() => {
    if (pendingFocus.current?.scrolled) renderPendingFocus();
  });

  return { focusNode, handleItemsRendered };
}

function sameLocation(current: NodeLocation | null | undefined, requested: NodeLocation | null) {
  return (
    !!current &&
    !!requested &&
    current.path.length === requested.path.length &&
    current.path.every(
      (key, index) =>
        key === requested.path[index] && current.indexes[index] === requested.indexes[index]
    )
  );
}

/** Raw owner data has not necessarily received refKey metadata yet. */
function findNodeLocation(data: TreeNode[], refKey: string, valueKey: string, childrenKey: string) {
  const path: string[] = [];
  const indexes: number[] = [];
  const visit = (nodes: TreeNode[]): boolean => {
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      const key = formatNodeRefKey(node[valueKey]);
      path.push(key);
      indexes.push(index);
      if (key === refKey || (Array.isArray(node[childrenKey]) && visit(node[childrenKey])))
        return true;
      path.pop();
      indexes.pop();
    }
    return false;
  };
  return visit(data) ? { path, indexes } : null;
}
