import { useEffect, useRef } from 'react';
import { useEventCallback } from '@/internals/hooks';
import type { RefObject, MouseEvent } from 'react';
import type { OverlayTriggerHandle } from '@/internals/Overlay';

interface Props {
  getInput: () => HTMLElement | null | undefined;
  root: RefObject<HTMLElement | null>;
  target: RefObject<HTMLElement | null>;
  overlay: RefObject<HTMLElement | null>;
  triggerRef: RefObject<OverlayTriggerHandle | null>;
}

export default function usePickerInputFocus({
  getInput,
  root,
  target,
  overlay,
  triggerRef
}: Props) {
  const preventOpenOnFocus = useRef(false);
  const restoreAfterExit = useRef(false);
  const closingPopup = useRef<HTMLElement | null>(null);
  const restoreFrame = useRef<number | null>(null);

  const focusInputOrToggle = useEventCallback((preventOpen = false) => {
    preventOpenOnFocus.current = preventOpen;
    try {
      (getInput() || target.current)?.focus();
    } finally {
      preventOpenOnFocus.current = false;
    }
  });

  const cancelRestoreFocus = useEventCallback(() => {
    if (restoreFrame.current !== null) cancelAnimationFrame(restoreFrame.current);
    restoreFrame.current = null;
  });

  useEffect(() => cancelRestoreFocus, [cancelRestoreFocus]);

  const ownsFocus = useEventCallback((source?: EventTarget | null) => {
    const ownerDocument = target.current?.ownerDocument;
    if (!ownerDocument) return false;
    const active = ownerDocument.activeElement;
    const sourceElement = source as Element | null | undefined;
    return (
      !!active &&
      ((root.current || triggerRef.current?.root)?.contains(active) ||
        overlay.current?.contains(active) ||
        closingPopup.current?.contains(active) ||
        (active === ownerDocument.body &&
          sourceElement?.ownerDocument === ownerDocument &&
          !sourceElement?.isConnected))
    );
  });

  const handleClose = useEventCallback((source: EventTarget | null) => {
    cancelRestoreFocus();
    const restore = ownsFocus(source);
    const popup = overlay.current?.closest<HTMLElement>('[role="dialog"]') || overlay.current;
    restoreAfterExit.current = restore && !!popup?.contains(source as Node);
    closingPopup.current = popup;
    triggerRef.current?.close();
    if (restore) focusInputOrToggle(true);
  });

  const handleCleanFocus = useEventCallback((event: MouseEvent) => {
    if (ownsFocus(event.target)) focusInputOrToggle();
  });

  const prepareOpen = useEventCallback(() => {
    cancelRestoreFocus();
    restoreAfterExit.current = false;
    closingPopup.current = null;
  });

  const prepareExit = useEventCallback(() => {
    cancelRestoreFocus();
    const active = overlay.current?.ownerDocument.activeElement;
    closingPopup.current =
      overlay.current?.closest<HTMLElement>('[role="dialog"]') || overlay.current;
    restoreAfterExit.current =
      restoreAfterExit.current || (!!active && !!closingPopup.current?.contains(active));
  });

  const restoreFocusAfterExit = useEventCallback(() => {
    cancelRestoreFocus();
    const popup = closingPopup.current;
    const restore = restoreAfterExit.current;
    restoreAfterExit.current = false;
    closingPopup.current = null;
    if (restore && typeof requestAnimationFrame !== 'undefined') {
      restoreFrame.current = requestAnimationFrame(() => {
        restoreFrame.current = null;
        const ownerDocument = target.current?.ownerDocument;
        const active = ownerDocument?.activeElement;
        // A later Tab, pointer interaction, or consumer callback may own focus.
        if (
          ownerDocument &&
          (active === ownerDocument.body ||
            active === target.current ||
            (active && popup?.contains(active)))
        ) {
          focusInputOrToggle(true);
        }
      });
    }
  });

  const shouldOpenOnFocus = useEventCallback(() => !preventOpenOnFocus.current);

  return {
    handleClose,
    handleCleanFocus,
    prepareOpen,
    prepareExit,
    restoreFocusAfterExit,
    shouldOpenOnFocus
  };
}
