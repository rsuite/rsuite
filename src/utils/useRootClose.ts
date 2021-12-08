import React, { useEffect, useCallback } from 'react';
import contains from 'dom-lib/contains';
import ownerDocument from 'dom-lib/ownerDocument';
import on from 'dom-lib/on';
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
  onRootClose: React.ReactEventHandler | undefined,
  { disabled, triggerTarget, overlayTarget, listenEscape = true }: Options
) {
  const handleDocumentKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
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
      if (triggerElement && contains(triggerElement, event.target)) {
        return;
      }

      // Check if the clicked element is a overlay.
      if (overlayElement && contains(overlayElement, event.target)) {
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

    const doc = ownerDocument(currentTarget);
    const onDocumentMouseDownListener = on(doc, 'mousedown', handleDocumentMouseDown, true);
    const onDocumentKeyupListener = on(doc, 'keyup', handleDocumentKeyUp);

    return () => {
      onDocumentMouseDownListener?.off();
      onDocumentKeyupListener?.off();
    };
  }, [triggerTarget, disabled, onRootClose, handleDocumentMouseDown, handleDocumentKeyUp]);
}

export default useRootClose;
