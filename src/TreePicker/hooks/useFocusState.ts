import { useRef, useState } from 'react';
import isNil from 'lodash/isNil';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/internals/hooks';
import type { TreeNode } from '@/internals/Tree/types';

interface FocusStateProps {
  target: React.RefObject<HTMLElement | null>;
  value?: number | string | null | undefined;
  data: TreeNode[];
  focusActiveNode: (value?: string | number | null, isValid?: () => boolean) => void;
  onEnter?: (node: HTMLElement) => void;
  onExit?: (node: HTMLElement) => void;
  onEntered?: (node: HTMLElement) => void;
}

interface OpeningFocus {
  source: Element | null;
  ownerDocument: Document;
  consumed: boolean;
}

function useFocusState(props: FocusStateProps) {
  const { target, value, data, focusActiveNode } = props;
  const [active, setActive] = useState(false);
  const [focusItemValue, setFocusItemValue] = useState<number | string | null | undefined>(null);
  const openingFocus = useRef<OpeningFocus | null>(null);
  const [focusRequest, requestFocus] = useState<OpeningFocus | null>(null);

  const focusTarget = useEventCallback(() => {
    target.current?.focus();
  });

  const onEnter = useEventCallback((node: HTMLElement) => {
    const ownerDocument = target.current?.ownerDocument ?? node.ownerDocument;
    openingFocus.current = {
      source: ownerDocument.activeElement,
      ownerDocument,
      consumed: false
    };
    setActive(true);
    setFocusItemValue(null);
    if (isNil(value)) focusActiveNode(value);
    props.onEnter?.(node);
  });

  const onExit = useEventCallback((node: HTMLElement) => {
    openingFocus.current = null;
    setActive(false);
    setFocusItemValue(null);
    focusTarget();
    props.onExit?.(node);
  });

  const onEntered = useEventCallback((node: HTMLElement) => {
    if (openingFocus.current) {
      requestFocus(openingFocus.current);
    }

    props.onEntered?.(node);
  });

  const isCurrentOpening = useEventCallback(
    (request: OpeningFocus, requestedValue: FocusStateProps['value'], requestedData: TreeNode[]) =>
      openingFocus.current === request && value === requestedValue && data === requestedData
  );

  useIsomorphicLayoutEffect(() => {
    if (!focusRequest || focusRequest !== openingFocus.current || focusRequest.consumed) return;
    focusRequest.consumed = true;

    const { source, ownerDocument } = focusRequest;
    if (
      ownerDocument.activeElement !== source &&
      (source?.isConnected || ownerDocument.activeElement !== ownerDocument.body)
    ) {
      return;
    }

    // Resolve after callbacks commit so a changed value or closed popup cannot restore an old row.
    focusActiveNode(value, () => isCurrentOpening(focusRequest, value, data));
  }, [focusRequest, value, data, focusActiveNode]);

  useIsomorphicLayoutEffect(
    () => () => {
      openingFocus.current = null;
    },
    []
  );

  return {
    active,
    focusItemValue,
    setFocusItemValue,
    triggerProps: {
      onEnter,
      onExit,
      onEntered
    }
  };
}

export default useFocusState;
