import { useState, useCallback, useEffect } from 'react';
import { transformValueToStarStatus, transformStarStatusToValue } from './utils';
import type { StarStatus } from './types';

interface UseRatingStatesParams {
  value: number;
  max: number;
  allowHalf: boolean;
  valueProp?: number;
}

interface UseRatingStatesReturn {
  starStates: StarStatus[];
  hoverValue: number;
  setStarStates: React.Dispatch<React.SetStateAction<StarStatus[]>>;
  resetStarStates: () => void;
  getStarStates: (v?: number) => StarStatus[];
}

/**
 * Custom hook to manage rating star states for Rate component
 */
export const useRatingStates = ({
  value,
  max,
  allowHalf,
  valueProp
}: UseRatingStatesParams): UseRatingStatesReturn => {
  // Create a function to generate star states based on value
  const getStarStates = useCallback(
    (v?: number) => {
      return transformValueToStarStatus(typeof v !== 'undefined' ? v : value, max, allowHalf);
    },
    [allowHalf, max, value]
  );

  // Initialize star states
  const [starStates, setStarStates] = useState<StarStatus[]>(getStarStates());

  // Calculate hover value from star states
  const hoverValue = transformStarStatusToValue(starStates);

  // Function to reset star states to current value
  const resetStarStates = useCallback(() => {
    setStarStates(getStarStates());
  }, [getStarStates]);

  // Update star states when value prop changes
  useEffect(() => {
    if (typeof valueProp !== 'undefined') {
      setStarStates(getStarStates(valueProp));
    }
  }, [valueProp, getStarStates]);

  return {
    starStates,
    setStarStates,
    resetStarStates,
    hoverValue,
    getStarStates
  };
};
