import { useRef, useState, type RefObject } from 'react';
import { useEventCallback } from '@/internals/hooks';
import type { OverlayTriggerHandle } from '@/internals/Overlay';

interface OpenButtonOptions {
  enabled: boolean;
  disabled: boolean;
  trigger: RefObject<OverlayTriggerHandle | null>;
  overlay: RefObject<HTMLElement | null>;
}

function useOpenButton({ enabled, disabled, trigger, overlay }: OpenButtonOptions) {
  const ref = useRef<HTMLButtonElement>(null);
  const openedFromButton = useRef(false);
  const [expanded, setExpanded] = useState(false);

  const restoreFocus = useEventCallback(() => {
    if (!enabled || !openedFromButton.current || disabled || !ref.current?.isConnected) {
      return false;
    }
    const activeElement = ref.current.ownerDocument.activeElement;
    // A previous button opening must not take focus from subsequent input edits.
    if (activeElement !== ref.current && !overlay.current?.contains(activeElement)) {
      return false;
    }
    ref.current.focus();
    return true;
  });

  const onClick = useEventCallback(() => {
    if (disabled) return;
    // Pointer activation does not focus native buttons in every browser.
    ref.current?.focus();
    trigger.current?.open();
  });

  const onEnter = useEventCallback(() => {
    openedFromButton.current = enabled && ref.current?.ownerDocument.activeElement === ref.current;
    setExpanded(true);
  });

  const onEntered = useEventCallback(() => {
    const popup = overlay.current;
    if (!enabled || !openedFromButton.current || !popup) return;
    // Do not move focus if the user already moved elsewhere while the popup opened.
    if (ref.current?.ownerDocument.activeElement !== ref.current) return;
    const selected = Array.from(
      popup.querySelectorAll<HTMLElement>('[aria-selected="true"][tabindex]')
    ).find(
      element =>
        element.getAttribute('aria-disabled') !== 'true' &&
        element.getBoundingClientRect().height > 0
    );
    (selected || popup).focus();
  });

  const onExit = useEventCallback(() => {
    setExpanded(false);
    if (!enabled) return;
    const popup = overlay.current;
    if (popup?.contains(popup.ownerDocument.activeElement)) restoreFocus();
  });

  return { ref, expanded, onClick, onEnter, onEntered, onExit, restoreFocus };
}

export default useOpenButton;
