import { TreeControlContextProps } from './TreeControlContext';
import { useState } from 'react';

/**
 * TODO Focus management for ARIA `tree` widget
 */
export default function useTreeControl(): TreeControlContextProps {
  const [activeItemIndex] = useState<number | null>(null);

  return {
    activeItemIndex,
    activeDescendantId: null
  };
}
