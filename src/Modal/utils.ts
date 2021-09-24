import { useState, useRef, useCallback, useEffect } from 'react';
import bindElementResize, { unbind as unbindElementResize } from 'element-resize-event';
import helper from '../DOMHelper';

export const useBodyStyles = (
  ref: React.RefObject<HTMLElement>,
  options: { overflow: boolean; drawer: boolean; prefix: (...classes: any) => string }
): [React.CSSProperties, (entering?: boolean) => void, () => void] => {
  const [bodyStyles, setBodyStyles] = useState({});
  const { overflow, drawer, prefix } = options;
  const windowResizeListener = useRef<any>();
  const contentElement = useRef();

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

        headerHeight = headerDOM ? helper.getHeight(headerDOM) + headerHeight : headerHeight;
        footerHeight = footerDOM ? helper.getHeight(footerDOM) + footerHeight : footerHeight;

        /**
         * Header height + Footer height + Dialog margin
         */
        const excludeHeight = headerHeight + footerHeight + (entering ? 70 : 60);
        const bodyHeight = helper.getHeight(window) - excludeHeight;
        const maxHeight = scrollHeight >= bodyHeight ? bodyHeight : scrollHeight;
        styles.maxHeight = maxHeight;
      }

      setBodyStyles(styles);
    },
    [prefix, ref]
  );

  const onDestroyEvents = useCallback(() => {
    windowResizeListener.current?.off?.();
    if (contentElement.current) {
      unbindElementResize(contentElement.current);
    }
  }, []);

  const onChangeBodyStyles = useCallback(
    (entering?: boolean) => {
      if (overflow && !drawer) {
        updateBodyStyles(null, entering);
        contentElement.current = ref.current?.querySelector(`.${prefix('content')}`);
        windowResizeListener.current = helper.on(window, 'resize', updateBodyStyles);
        bindElementResize(contentElement.current, updateBodyStyles);
      }
    },
    [drawer, overflow, prefix, ref, updateBodyStyles]
  );

  useEffect(() => {
    onDestroyEvents();
  }, [onDestroyEvents]);

  return [overflow ? bodyStyles : {}, onChangeBodyStyles, onDestroyEvents];
};
