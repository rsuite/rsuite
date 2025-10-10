'use client';
import { useRef } from 'react';
import isNil from 'lodash/isNil';

/**
 * Custom hook that manages references to tree nodes. */
export default function useTreeNodeRefs() {
  var treeNodeRefs = useRef({});
  var saveTreeNodeRef = function saveTreeNodeRef(ref, refKey) {
    if (!isNil(refKey)) {
      treeNodeRefs.current[refKey] = ref;
    }
  };
  return {
    treeNodesRefs: treeNodeRefs.current,
    saveTreeNodeRef: saveTreeNodeRef
  };
}