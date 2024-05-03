import { useState } from 'react';

const defaultSelectedState = {
  selectedPattern: 'y',
  selectionStart: 0,
  selectionEnd: 0
};

export function useSelectedState() {
  const [selectedState, setSelectedState] = useState<{
    selectedPattern: string;
    selectionStart: number;
    selectionEnd: number;
  }>(defaultSelectedState);

  return { selectedState, setSelectedState };
}

export default useSelectedState;
