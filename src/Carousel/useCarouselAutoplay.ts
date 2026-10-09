import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useTimeout } from '@/internals/hooks';
import useReducedMotion from '../Animation/useReducedMotion';

export default function useCarouselAutoplay(
  enabled: boolean,
  interval: number,
  advance: () => void,
  rootRef: RefObject<HTMLElement | null>
) {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(reducedMotion);
  const [explicitPlay, setExplicitPlay] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverPointer = useRef(true);
  const previousReducedMotion = useRef(reducedMotion);
  const playing = enabled && !paused && (!reducedMotion || explicitPlay);
  const { clear, reset } = useTimeout(advance, interval, playing && !hovered);

  useEffect(() => {
    const root = rootRef.current;
    // Hydration can attach handlers after focus or hover has already entered the carousel.
    if (root?.contains(root.ownerDocument.activeElement)) {
      clear();
      setPaused(true);
    }
    const isHovered = hoverPointer.current && !!root?.matches(':hover');
    if (isHovered) clear();
    setHovered(isHovered);
  }, [rootRef, clear]);

  useEffect(() => {
    // Reconnecting effects must preserve an explicit choice to play with reduced motion.
    if (reducedMotion && !previousReducedMotion.current) {
      clear();
      setPaused(true);
      setExplicitPlay(false);
    }
    previousReducedMotion.current = reducedMotion;
  }, [reducedMotion, clear]);

  const pause = () => {
    clear();
    setPaused(true);
  };

  const changePlaying = (next: boolean) => {
    clear();
    setPaused(!next);
    setExplicitPlay(next);
    setHovered(hoverPointer.current && !!rootRef.current?.matches(':hover'));
  };

  const changeHovered = (next: boolean, pointerType: string) => {
    hoverPointer.current = pointerType !== 'touch';
    const hovered = hoverPointer.current && next;
    if (hovered) clear();
    setHovered(hovered);
  };

  return { playing, reducedMotion, pause, changePlaying, changeHovered, clear, reset };
}
