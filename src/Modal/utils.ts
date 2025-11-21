import getHeight from 'dom-lib/getHeight';
import on from 'dom-lib/on';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import type { Size } from '@/internals/types';

export type ModalSize = Size | 'full' | number | string;

export const useBodyStyles = (
  ref: React.RefObject<HTMLElement | null>,
  options: {
    overflow: boolean;
    size?: ModalSize;
    prefix: (...classes: any) => string;
  }
): [React.CSSProperties | null, (entering?: boolean) => void, () => void] => {
  const [bodyStyles, setBodyStyles] = useState<React.CSSProperties | null>({});
  const { overflow, prefix, size } = options;
  const windowResizeListener = useRef<{ off: () => void }>(null);
  const contentElement = useRef<HTMLElement | null>(null);
  const contentElementResizeObserver = useRef<ResizeObserver>(null);

  const updateBodyStyles = useCallback(
    (_event?: EventInit, entering?: boolean) => {
      const dialog = ref.current;

      const styles: React.CSSProperties = {
        overflow: 'auto'
      };

      if (dialog) {
        // default margin
        let headerHeight = 46;
        let footerHeight = 46;

        const headerDOM = dialog.querySelector(`.${prefix('header')}`);
        const footerDOM = dialog.querySelector(`.${prefix('footer')}`);

        headerHeight = headerDOM ? getHeight(headerDOM) + headerHeight : headerHeight;
        footerHeight = footerDOM ? getHeight(footerDOM) + footerHeight : footerHeight;

        // Get the actual margin from the modal element itself (.rs-modal)
        const computedStyle = window.getComputedStyle(dialog);
        const marginTop = parseFloat(computedStyle.marginTop) || 0;
        const marginBottom = parseFloat(computedStyle.marginBottom) || 0;
        const dialogMargin = marginTop + marginBottom;

        // Get padding from the wrapper if needed
        const wrapper = dialog.parentElement;
        let wrapperPadding = 0;
        if (wrapper) {
          const wrapperStyle = window.getComputedStyle(wrapper);
          const paddingTop = parseFloat(wrapperStyle.paddingTop) || 0;
          const paddingBottom = parseFloat(wrapperStyle.paddingBottom) || 0;
          wrapperPadding = paddingTop + paddingBottom;
        }

        // Add extra space during entering animation (10px buffer)
        const extraSpace = entering ? 10 : 0;

        /**
         * Header height + Footer height + Dialog margin + Wrapper padding + Extra space
         */
        const excludeHeight =
          headerHeight + footerHeight + dialogMargin + wrapperPadding + extraSpace;

        const bodyHeight = getHeight(window) - excludeHeight;

        // Always set maxHeight to available space, let browser handle content that's smaller
        styles.maxHeight = bodyHeight;
      }

      setBodyStyles(styles);
    },
    [prefix, ref]
  );

  const onDestroyEvents = useCallback(() => {
    windowResizeListener.current?.off?.();
    contentElementResizeObserver.current?.disconnect();
    windowResizeListener.current = null;
    contentElementResizeObserver.current = null;
  }, []);

  const onChangeBodyStyles = useCallback(
    (entering?: boolean) => {
      if (!overflow || size === 'full') {
        setBodyStyles(null);
        return;
      }

      if (ref.current) {
        updateBodyStyles(undefined, entering);

        contentElement.current = ref.current.querySelector(`.${prefix('content')}`);

        if (!windowResizeListener.current) {
          windowResizeListener.current = on(window, 'resize', updateBodyStyles);
        }

        if (contentElement.current && !contentElementResizeObserver.current) {
          contentElementResizeObserver.current = new ResizeObserver(() => updateBodyStyles());
          contentElementResizeObserver.current.observe(contentElement.current);
        }
      }
    },
    [overflow, prefix, ref, size, updateBodyStyles]
  );

  useEffect(() => {
    return onDestroyEvents;
  }, []);

  return [overflow ? bodyStyles : null, onChangeBodyStyles, onDestroyEvents];
};
