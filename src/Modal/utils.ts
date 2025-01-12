import getHeight from 'dom-lib/getHeight';
import on from 'dom-lib/on';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import type { SizeType } from '@/internals/types';

export type ModalSize = SizeType | 'full' | number | string;

export const useBodyStyles = (
  ref: React.RefObject<HTMLElement>,
  options: {
    overflow: boolean;
    size?: ModalSize;
    prefix: (...classes: any) => string;
  }
): [React.CSSProperties | null, (entering?: boolean) => void, () => void] => {
  const [bodyStyles, setBodyStyles] = useState<React.CSSProperties | null>({});
  const { overflow, prefix, size } = options;
  const windowResizeListener = useRef<any>();
  const contentElement = useRef<HTMLElement | null>(null);
  const contentElementResizeObserver = useRef<ResizeObserver | null>();

  const updateBodyStyles = useCallback(
    (_event?: EventInit, entering?: boolean) => {
      const dialog = ref.current;
      const scrollHeight = dialog ? dialog.scrollHeight : 0;

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

        /**
         * Header height + Footer height + Dialog margin
         */
        const excludeHeight = headerHeight + footerHeight + (entering ? 70 : 60);
        const bodyHeight = getHeight(window) - excludeHeight;
        const maxHeight = scrollHeight >= bodyHeight ? bodyHeight : scrollHeight;
        styles.maxHeight = maxHeight;
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
