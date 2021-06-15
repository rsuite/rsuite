import { TreeControlContextProps } from './TreeControlContext';
import { useState } from 'react';

export default function useTreeControl(): TreeControlContextProps {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  return {
    activeItemIndex
  };
}
