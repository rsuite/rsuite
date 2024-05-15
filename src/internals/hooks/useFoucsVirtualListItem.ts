import { useRef, useEffect } from 'react';

/**
 * Virtualized list loses focus when scrolling or clicking options, causing the component to re-render.
 * To solve this problem, we need to refocus on the selected option after the component is re-rendered.
 */
function useFoucsVirtualListItem<T extends HTMLElement>(focused?: boolean) {
  const itemRef = useRef<T>(null);

  useEffect(() => {
    if (!focused) {
      return;
    }

    if (document.activeElement !== itemRef.current) {
      // Focus on the selected option.
      itemRef.current?.focus();
    }
  }, [focused]);

  return itemRef;
}

export default useFoucsVirtualListItem;
