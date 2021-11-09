import React, { useCallback } from 'react';

export function useRenderDropdownItem(Component: React.ElementType) {
  return useCallback(
    (props: any, OverrideComponent?: React.ElementType) => {
      if (Component === 'li') {
        if (OverrideComponent) {
          return (
            <li role="none presentation">
              <OverrideComponent {...props} />
            </li>
          );
        }
        return <Component {...props} />;
      }

      return (
        <li role="none presentation">
          <Component {...props} />
        </li>
      );
    },
    [Component]
  );
}
