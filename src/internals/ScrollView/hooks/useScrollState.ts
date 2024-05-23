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
    if (bodyRef.current && scrollShadow) {
      setScrollState(getScrollState(bodyRef.current));
    }
  });

  const handleScroll = useEventCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    setScrollState(getScrollState(target));
  });

  return { scrollState, handleScroll: scrollShadow ? handleScroll : undefined, bodyRef };
}
