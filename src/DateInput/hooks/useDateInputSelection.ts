import { useCallback, useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';
import { safeSetSelection } from '@/internals/utils';

type Range = { selectionStart: number; selectionEnd: number };
type Request = Range & {
  element: HTMLInputElement;
  observedStart: number | null;
  observedEnd: number | null;
  value: string;
  committed: boolean;
};

/** Coordinates an event-local range with the input's next value commit. */
function useDateInputSelection(input: React.RefObject<any>) {
  const pending = useRef<Request | null>(null);
  const pendingWrite = useRef<Request | null>(null);
  const subscribedElement = useRef<HTMLInputElement | null>(null);
  const invalidate = useCallback(() => {
    pending.current = null;
    pendingWrite.current = null;
  }, []);
  const subscribeToBlur = (element: HTMLInputElement | null) => {
    if (subscribedElement.current === element) return;
    subscribedElement.current?.removeEventListener('blur', invalidate);
    invalidate();
    subscribedElement.current = element;
    element?.addEventListener('blur', invalidate);
  };
  const isOwned = (request: Request) => {
    const element = input.current as HTMLInputElement | null;
    return (
      request.element === element &&
      element?.isConnected &&
      element.ownerDocument.activeElement === element
    );
  };
  const isUnchanged = (request: Request) =>
    request.element.selectionStart === request.observedStart &&
    request.element.selectionEnd === request.observedEnd;
  const isRequested = (request: Request) =>
    request.element.selectionStart === request.selectionStart &&
    request.element.selectionEnd === request.selectionEnd;
  const isCommitCollapse = (request: Request) =>
    request.element.value !== request.value &&
    request.element.selectionStart === request.element.value.length &&
    request.element.selectionEnd === request.element.value.length;

  const apply = (request: Request) => {
    pendingWrite.current = request;
    safeSetSelection(request.element, request.selectionStart, request.selectionEnd, () => {
      if (pendingWrite.current !== request) return false;
      // This check runs inside Android's deferred write, after any owner/caret changes.
      if (!isOwned(request) || !isUnchanged(request) || request.element.value !== request.value) {
        invalidate();
        return false;
      }
      pendingWrite.current = null;
      request.observedStart = request.selectionStart;
      request.observedEnd = request.selectionEnd;
      if (request.committed && pending.current === request) pending.current = null;
      return true;
    });
  };

  const resolveKeyboardSelection = (): Range | undefined => {
    const request = pending.current;
    const element = input.current as HTMLInputElement | null;
    const actualRange =
      typeof element?.selectionStart === 'number' && typeof element.selectionEnd === 'number'
        ? { selectionStart: element.selectionStart, selectionEnd: element.selectionEnd }
        : undefined;
    if (!request) return actualRange;
    if (!isOwned(request)) {
      invalidate();
      return actualRange;
    }
    if (isRequested(request)) return actualRange;
    if (!isUnchanged(request) && (request.committed || !isCommitCollapse(request))) {
      // Native Home/End, pointer selection and caller setSelectionRange take precedence.
      invalidate();
      return actualRange;
    }
    if (request.committed && request.element.value !== request.value) {
      invalidate();
      return actualRange;
    }
    return request;
  };

  useIsomorphicLayoutEffect(() => {
    subscribeToBlur(input.current);
    const request = pending.current;
    if (!request || request.committed) return;
    if (
      !isOwned(request) ||
      (!isUnchanged(request) && !isRequested(request) && !isCommitCollapse(request))
    ) {
      invalidate();
      return;
    }
    request.committed = true;
    request.value = request.element.value;
    request.observedStart = request.element.selectionStart;
    request.observedEnd = request.element.selectionEnd;
    // Only an unchanged range or this value commit's collapse may be restored.
    apply(request);
  });
  useIsomorphicLayoutEffect(() => () => subscribeToBlur(null), []);

  const setSelectionRange = (selectionStart: number, selectionEnd: number) => {
    const element = input.current as HTMLInputElement | null;
    subscribeToBlur(element);
    if (!element) return;
    const request: Request = {
      element,
      selectionStart,
      selectionEnd,
      observedStart: element.selectionStart,
      observedEnd: element.selectionEnd,
      value: element.value,
      committed: false
    };
    pending.current = request;
    apply(request);
    // Expire logical restoration without cancelling a public setter's first Android write.
    queueMicrotask(() => {
      if (pending.current === request && !request.committed) pending.current = null;
    });
  };
  return { setSelectionRange, resolveKeyboardSelection, invalidate };
}

export default useDateInputSelection;
