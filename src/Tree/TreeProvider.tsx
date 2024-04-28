import { createContext, useContext, useRef, useCallback } from 'react';

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
}

const TreeContext = createContext<TreeContextValue>({});

export const TreeProvider = TreeContext.Provider;

export const useTreeContext = () => {
  return useContext(TreeContext);
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
