import React, { useCallback } from 'react';
import Box from '@/internals/Box';

export function useRenderMenuItem(as: React.ElementType) {
  return useCallback(
    (props: any, overrideAs?: React.ElementType) => {
      if (as === 'li') {
        if (overrideAs) {
          return (
            <li role="none presentation">
              <Box as={overrideAs} {...props} />
            </li>
          );
        }
        return <Box as={as} {...props} />;
      }

      return (
        <li role="none presentation">
          <Box as={as} {...props} />
        </li>
      );
    },
    [as]
  );
}
