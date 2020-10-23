import { useEffect, useCallback } from 'react';
import helper from '../DOMHelper';
import { getDOMNode, KEY_CODE } from './';

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
}

/**
 * A hook that listens to the document click event and closes the overlay.
 * @param onRootClose
 * @param param1
 */
function useRootClose(
  onRootClose: (e: Event) => void,
  { disabled, triggerTarget, overlayTarget }: Options
) {
  const handleDocumentKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === KEY_CODE.ESC) {
        onRootClose?.(event);
      }
    },
    [onRootClose]
  );

  const handleDocumentClick = useCallback(
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
    const onDocumentClickListener = helper.on(doc, 'click', handleDocumentClick, true);
    const onDocumentKeyupListener = helper.on(doc, 'keyup', handleDocumentKeyUp);

    return () => {
      onDocumentClickListener?.off();
      onDocumentKeyupListener?.off();
    };
  }, [triggerTarget, disabled, onRootClose, handleDocumentClick, handleDocumentKeyUp]);
}

export default useRootClose;
