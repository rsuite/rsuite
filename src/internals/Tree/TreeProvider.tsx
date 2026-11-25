import React, { createContext, useContext, useRef, useCallback } from 'react';
import { TreeNode } from './types';

interface RegisterMethods {
  /**
   * Focuses on the first node in the tree.
   */
  focusTreeFirstNode: () => void;

  /**
   * Focuses on the active node in the tree.
   */
  focusTreeActiveNode: () => void;
}

type Unregister = () => void;

interface TreeContextValue {
  register?: (methods: RegisterMethods) => Unregister;
  props: {
    labelKey: string;
    valueKey: string;
    childrenKey: string;
    virtualized?: boolean;
    scrollShadow?: boolean;
    renderTreeNode?: (nodeData: TreeNode) => React.ReactNode;
    renderTreeIcon?: (nodeData: TreeNode, expanded?: boolean) => React.ReactNode;
  };
}

const defaultItemDataKeys = {
  labelKey: 'label',
  valueKey: 'value',
  childrenKey: 'children',
  virtualized: false
};

const TreeContext = createContext<TreeContextValue>({
  props: defaultItemDataKeys
});

export const TreeProvider = TreeContext.Provider;

export const useRegisterTreeMethods = () => {
  const { register } = useContext(TreeContext);

  return register;
};

export const useTreeCustomRenderer = () => {
  const {
    props: { renderTreeIcon, renderTreeNode }
  } = useContext(TreeContext);

  return { renderTreeIcon, renderTreeNode };
};

export const useItemDataKeys = () => {
  const { props: { labelKey, valueKey, childrenKey } = defaultItemDataKeys } =
    useContext(TreeContext);

  return { labelKey, valueKey, childrenKey };
};

export const useTreeContextProps = () => {
  const { props } = useContext(TreeContext);

  return props;
};

/**
 * Custom hook that provides imperative handle for the Tree component.
 */
export const useTreeImperativeHandle = () => {
  const focusFirstNodeRef = useRef<(() => void) | null>(null);
  const focusActiveNodeRef = useRef<(() => void) | null>(null);

  const register = useCallback(({ focusTreeFirstNode, focusTreeActiveNode }) => {
    focusFirstNodeRef.current = focusTreeFirstNode;
    focusActiveNodeRef.current = focusTreeActiveNode;

    return () => {
      focusFirstNodeRef.current = null;
      focusActiveNodeRef.current = null;
    };
  }, []);

  return {
    register,
    focusFirstNode: () => focusFirstNodeRef.current?.(),
    focusActiveNode: () => focusActiveNodeRef.current?.()
  };
};
