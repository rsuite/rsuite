import { useState, useRef } from 'react';
import { useMount, useEventCallback } from '@/internals/hooks';

function getScrollState(target: HTMLElement) {
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;
  const clientHeight = target.clientHeight;
  if (scrollHeight <= clientHeight) {
    return null;
  } else if (scrollTop === 0) {
    return 'top';
  } else if (scrollTop + clientHeight === scrollHeight) {
    return 'bottom';
  } else {
    return 'middle';
  }
}

export function useScrollState(scrollShadow?: boolean) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<'top' | 'middle' | 'bottom' | null>(null);

  useMount(() => {
    let observer: MutationObserver;
    if (bodyRef.current && scrollShadow) {
      const target = bodyRef.current;

      setScrollState(getScrollState(target));

      let lastScrollHeight = target.scrollHeight;

      // Listen for changes in scrollHeight
      observer = new MutationObserver(() => {
        const newScrollHeight = target?.scrollHeight;
        if (newScrollHeight && newScrollHeight !== lastScrollHeight) {
          setScrollState(getScrollState(target));
          lastScrollHeight = newScrollHeight;
        }
      });

      observer.observe(target, { attributes: true, childList: true, subtree: true });
    }

    return () => {
      observer?.disconnect();
    };
  });

  const handleScroll = useEventCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    setScrollState(getScrollState(target));
  });

  return { scrollState, handleScroll: scrollShadow ? handleScroll : undefined, bodyRef };
}
