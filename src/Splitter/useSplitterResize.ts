import { useEffect, useRef, useState } from 'react';
import { useEventCallback } from '@/internals/hooks';
import { resizeBounds, resizePair, sameSizes, type PanelLimits } from './utils';

export type SplitterResizeEvent =
  | React.PointerEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>;
export type SplitterResizeCallback = (sizes: number[], event: SplitterResizeEvent) => void;

interface ResizeProps {
  sizes: number[];
  limits: PanelLimits[];
  disabled: boolean;
  orientation: 'horizontal' | 'vertical';
  rtl: boolean;
  keyboardStep: number;
  configuration: string;
  setSizes: (sizes: number[]) => void;
  onResizeStart?: SplitterResizeCallback;
  onResize?: SplitterResizeCallback;
  onResizeEnd?: SplitterResizeCallback;
}

interface DragSession {
  index: number;
  pointerId: number;
  target: HTMLElement;
  start: number;
  length: number;
  sizes: number[];
  lastSizes: number[];
  observedSizes: number[];
  configuration: string;
}

export default function useSplitterResize(props: ResizeProps) {
  const {
    sizes,
    limits,
    disabled,
    orientation,
    rtl,
    keyboardStep,
    configuration,
    setSizes,
    onResizeStart,
    onResize,
    onResizeEnd
  } = props;
  const session = useRef<DragSession | null>(null);
  const [activeHandle, setActiveHandle] = useState<number | null>(null);

  const release = useEventCallback(() => {
    const current = session.current;
    session.current = null;
    if (current?.target.hasPointerCapture(current.pointerId)) {
      current.target.releasePointerCapture(current.pointerId);
    }
  });

  const cancel = useEventCallback(() => {
    release();
    setActiveHandle(null);
  });

  const isDisabled = (index: number) => {
    if (disabled || !limits[index].resizable || !limits[index + 1].resizable) return true;
    const bounds = resizeBounds(sizes, limits, index);
    return bounds.max - bounds.min < 0.000001;
  };

  const update = useEventCallback((next: number[], event: SplitterResizeEvent) => {
    setSizes(next);
    onResize?.(next.slice(), event);
  });

  const onPointerDown = useEventCallback(
    (index: number, event: React.PointerEvent<HTMLElement>) => {
      if (isDisabled(index) || session.current || event.button !== 0 || !event.isPrimary) return;
      const target = event.currentTarget;
      const root = target.parentElement;
      if (!root) return;

      const length = Array.from(root.children).reduce((sum, element, childIndex) => {
        if (childIndex % 2) return sum;
        const rect = element.getBoundingClientRect();
        return sum + (orientation === 'horizontal' ? rect.width : rect.height);
      }, 0);
      if (!(length > 0)) return;

      try {
        target.setPointerCapture(event.pointerId);
      } catch {
        return;
      }

      event.preventDefault();
      target.focus({ preventScroll: true });
      session.current = {
        index,
        pointerId: event.pointerId,
        target,
        start: orientation === 'horizontal' ? event.clientX : event.clientY,
        length,
        sizes: sizes.slice(),
        lastSizes: sizes.slice(),
        observedSizes: sizes.slice(),
        configuration
      };
      setActiveHandle(index);
      onResizeStart?.(sizes.slice(), event);
    }
  );

  const onPointerMove = useEventCallback((event: React.PointerEvent<HTMLElement>) => {
    const current = session.current;
    if (!current || event.pointerId !== current.pointerId) return;
    const position = orientation === 'horizontal' ? event.clientX : event.clientY;
    const direction = orientation === 'horizontal' && rtl ? -1 : 1;
    const nextSize =
      current.sizes[current.index] +
      ((position - current.start) / current.length) * 100 * direction;
    const next = resizePair(current.sizes, limits, current.index, nextSize);
    if (sameSizes(next, current.lastSizes)) return;
    current.lastSizes = next;
    update(next, event);
  });

  const onPointerEnd = useEventCallback((event: React.PointerEvent<HTMLElement>) => {
    const current = session.current;
    if (!current || event.pointerId !== current.pointerId) return;
    const next = current.lastSizes.slice();
    cancel();
    onResizeEnd?.(next, event);
  });

  const onKeyDown = useEventCallback((index: number, event: React.KeyboardEvent<HTMLElement>) => {
    if (isDisabled(index) || event.altKey || event.ctrlKey || event.metaKey) return;
    let nextSize: number;
    const step = Number.isFinite(keyboardStep) && keyboardStep > 0 ? keyboardStep : 1;
    const amount = step * (event.shiftKey ? 10 : 1);
    const bounds = resizeBounds(sizes, limits, index);

    if (event.key === 'Home') nextSize = bounds.min;
    else if (event.key === 'End') nextSize = bounds.max;
    else if (orientation === 'horizontal' && event.key === 'ArrowLeft')
      nextSize = sizes[index] + (rtl ? amount : -amount);
    else if (orientation === 'horizontal' && event.key === 'ArrowRight')
      nextSize = sizes[index] + (rtl ? -amount : amount);
    else if (orientation === 'vertical' && event.key === 'ArrowUp')
      nextSize = sizes[index] - amount;
    else if (orientation === 'vertical' && event.key === 'ArrowDown')
      nextSize = sizes[index] + amount;
    else return;

    event.preventDefault();
    cancel();
    const next = resizePair(sizes, limits, index, nextSize);
    if (sameSizes(next, sizes)) return;
    onResizeStart?.(sizes.slice(), event);
    update(next, event);
    onResizeEnd?.(next.slice(), event);
  });

  useEffect(() => {
    const current = session.current;
    if (
      current &&
      (current.configuration !== configuration ||
        (!sameSizes(sizes, current.lastSizes) && !sameSizes(sizes, current.observedSizes)))
    ) {
      cancel();
    } else if (current) {
      current.observedSizes = sizes.slice();
    }
  }, [sizes, configuration, cancel]);

  useEffect(() => release, [release]);

  return { activeHandle, isDisabled, onPointerDown, onPointerMove, onPointerEnd, onKeyDown };
}
