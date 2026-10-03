import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';
import { safeSetSelection } from '@/internals/utils';

type SelectionRange = Pick<HTMLInputElement, 'selectionStart' | 'selectionEnd'>;
type SelectionRequest = {
  selectionStart: number;
  selectionEnd: number;
  element: HTMLInputElement;
  nativeSelection: SelectionRange;
};

function getNativeSelection(element: HTMLInputElement | null): SelectionRange {
  return {
    selectionStart: element?.selectionStart ?? null,
    selectionEnd: element?.selectionEnd ?? null
  };
}

function hasNativeSelectionChanged(selection: SelectionRequest) {
  return (
    selection.element.selectionStart !== selection.nativeSelection.selectionStart ||
    selection.element.selectionEnd !== selection.nativeSelection.selectionEnd
  );
}

export function useInputSelectionState(
  input: React.RefObject<HTMLInputElement | null>,
  value?: unknown
) {
  const pendingSelection = useRef<SelectionRequest | null>(null);
  const logicalSelection = useRef<SelectionRequest | null>(null);
  const committedValue = useRef<string | undefined>(undefined);
  const previousValue = useRef(value);

  const clearSelection = () => {
    pendingSelection.current = null;
    logicalSelection.current = null;
  };

  const applySelection = (selection: SelectionRequest) => {
    const element = input.current;
    if (!element) return;

    safeSetSelection(element, selection.selectionStart, selection.selectionEnd, () => {
      if (
        input.current !== element ||
        document.activeElement !== element ||
        logicalSelection.current !== selection
      ) {
        return false;
      }

      if (hasNativeSelectionChanged(selection)) {
        clearSelection();
        return false;
      }

      logicalSelection.current = null;
      return true;
    });
  };

  // React may move the caret when committing the input value.
  useIsomorphicLayoutEffect(() => {
    const selection = pendingSelection.current;
    const element = input.current;
    pendingSelection.current = null;

    if (!element || document.activeElement !== element) {
      logicalSelection.current = null;
    } else if (selection && selection.element === element) {
      // React's value commit can reset the native caret before the deferred selection runs.
      selection.nativeSelection = getNativeSelection(element);
      logicalSelection.current = selection;
      applySelection(selection);
    } else if (
      !Object.is(previousValue.current, value) ||
      committedValue.current !== element.value
    ) {
      logicalSelection.current = null;
    }

    previousValue.current = value;
    committedValue.current = element?.value;
  });

  useIsomorphicLayoutEffect(() => {
    const element = input.current;
    element?.addEventListener('blur', clearSelection);
    return () => {
      element?.removeEventListener('blur', clearSelection);
      clearSelection();
    };
  }, [input]);

  const setSelectionRange = (selectionStart: number, selectionEnd: number) => {
    const element = input.current;
    if (element?.dataset.test === 'true') {
      safeSetSelection(element, selectionStart, selectionEnd);
      return;
    }

    if (!element || document.activeElement !== element) {
      clearSelection();
      return;
    }

    const selection = {
      selectionStart,
      selectionEnd,
      element,
      nativeSelection: getNativeSelection(element)
    };
    pendingSelection.current = selection;
    logicalSelection.current = selection;
    applySelection(selection);
  };

  const getSelectionRange = (): SelectionRange => {
    const element = input.current;
    const selection = logicalSelection.current;
    if (element && document.activeElement === element && selection) {
      if (selection.element === element && !hasNativeSelectionChanged(selection)) {
        return selection;
      }

      clearSelection();
    }

    return getNativeSelection(element);
  };

  return { setSelectionRange, getSelectionRange };
}

export function useInputSelection(input: React.RefObject<any>) {
  return useInputSelectionState(input).setSelectionRange;
}
