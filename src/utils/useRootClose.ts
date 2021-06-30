import { useEffect, useCallback } from 'react';
import helper from '../DOMHelper';
import { getDOMNode, KEY_VALUES } from './';

function isLeftClickEvent(event: React.MouseEvent) {
  return event?.button === 0;
}

function isModifiedEvent(event: React.MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event?.shiftKey);
}

type TargetType = React.RefObject<Element> | Element | null | undefined;

interface Options {
  disabled: boolean;
  triggerTarget: TargetType;
  overlayTarget: TargetType;
  /**
   * Whether close on Escape keyup.
   * Defaults to true.
   */
  listenEscape?: boolean;
}

/**
 * A hook that listens to the document click event and closes the overlay.
 * @param onRootClose
 * @param param1
 * @todo Allow different behaviors based on whether clicked element is focusable
 */
function useRootClose(
  onRootClose: (e: Event) => void,
  { disabled, triggerTarget, overlayTarget, listenEscape = true }: Options
) {
  const handleDocumentKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (listenEscape && event.key === KEY_VALUES.ESC) {
        onRootClose?.(event);
      }
    },
    [listenEscape, onRootClose]
  );

  const handleDocumentMouseDown = useCallback(
    event => {
      const triggerElement = getDOMNode(triggerTarget);
      const overlayElement = getDOMNode(overlayTarget);

      // Check if the clicked element is a trigger.
      if (triggerElement && helper.contains(triggerElement, event.target)) {
        return;
      }

      // Check if the clicked element is a overlay.
      if (overlayElement && helper.contains(overlayElement, event.target)) {
        return;
      }

      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }

      onRootClose?.(event);
    },
    [onRootClose, triggerTarget, overlayTarget]
  );

  useEffect(() => {
    const currentTarget = getDOMNode(triggerTarget);

    if (disabled || !currentTarget) return;

    const doc = helper.ownerDocument(currentTarget);
    const onDocumentMouseDownListener = helper.on(doc, 'mousedown', handleDocumentMouseDown, true);
    const onDocumentKeyupListener = helper.on(doc, 'keyup', handleDocumentKeyUp);

    return () => {
      onDocumentMouseDownListener?.off();
      onDocumentKeyupListener?.off();
    };
  }, [triggerTarget, disabled, onRootClose, handleDocumentMouseDown, handleDocumentKeyUp]);
}

export default useRootClose;
