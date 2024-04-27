import { createContext, useContext, useRef, useCallback } from 'react';

interface MountedParams {
  focusTreeFirstNode: () => void;
  focusTreeActiveNode: () => void;
}

interface TreeContextValue {
  onMounted?: (params: MountedParams) => void;
}

const TreeContext = createContext<TreeContextValue>({});

export const TreeProvider = TreeContext.Provider;

export const useTreeContext = () => {
  return useContext(TreeContext);
};

export const useTreeImperativeHandle = () => {
  const focusFirstNodeRef = useRef<(() => void) | null>(null);
  const focusActiveNodeRef = useRef<(() => void) | null>(null);
  const onMounted = useCallback(({ focusTreeFirstNode, focusTreeActiveNode }) => {
    focusFirstNodeRef.current = focusTreeFirstNode;
    focusActiveNodeRef.current = focusTreeActiveNode;
  }, []);

  return {
    onMounted,
    focusFirstNode: () => focusFirstNodeRef.current?.(),
    focusActiveNode: () => focusActiveNodeRef.current?.()
  };
};
