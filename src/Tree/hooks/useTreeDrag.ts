import { useState, useRef } from 'react';
import { TREE_NODE_DROP_POSITION } from '../../utils/constants';

/**
 * Custom hook for handling tree node dragging.
 */
export default function useTreeDrag<T>() {
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

  return {
    dragNode: dragNode?.current,
    dragOverNodeKey,
    dragNodeKeys,
    dropNodePosition,
    setDragNode,
    setDragOverNodeKey,
    setDragNodeKeys,
    setDropNodePosition
  };
}
