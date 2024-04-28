import { useState, useRef } from 'react';
import { TREE_NODE_DROP_POSITION } from '../../utils/constants';
import { useEventCallback, shallowEqual as equal } from '../../utils';
import { stringifyReactNode } from '../../internals/utils';
import {
  getDragNodeKeys,
  calDropNodePosition,
  removeDragPreview,
  createDragPreview,
  createDragTreeDataFunction
} from '../utils';

import type { DropData } from '../types';

interface TreeDragProps {
  draggable?: boolean;
  childrenKey: string;
  valueKey: string;
  labelKey: string;
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
  const {
    draggable,
    childrenKey,
    valueKey,
    labelKey,
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

  const setDragNode = (node: T | null) => {
    dragNode.current = node;
  };

  const getDropData = (nodeData: any) => {
    const dragParams = { dragNode: dragNode.current, dropNode: nodeData, dropNodePosition };
    const itemKeys = { valueKey, childrenKey };

    return {
      ...dragParams,
      createUpdateDataFunction: createDragTreeDataFunction(dragParams, itemKeys)
    };
  };

  const handleDragStart = useEventCallback((nodeData: any, event: React.DragEvent) => {
    if (draggable) {
      const dragMoverNode = createDragPreview(
        stringifyReactNode(nodeData[labelKey]),
        prefix('drag-preview')
      );
      event.dataTransfer?.setDragImage(dragMoverNode, 0, 0);
      setDragNodeKeys(getDragNodeKeys(nodeData, childrenKey, valueKey));
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
