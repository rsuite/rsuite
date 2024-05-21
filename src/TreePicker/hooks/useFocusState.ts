import { useState } from 'react';
import { useEventCallback } from '@/internals/hooks';

interface FocusStateProps {
  target: React.RefObject<HTMLElement>;
  value?: number | string | null | undefined;
  focusActiveNode: () => void;
  onEnter?: (node: HTMLElement) => void;
  onExit?: (node: HTMLElement) => void;
  onEntered?: (node: HTMLElement) => void;
}

function useFocusState(props: FocusStateProps) {
  const { target, value, focusActiveNode } = props;
  const [active, setActive] = useState(false);
  const [focusItemValue, setFocusItemValue] = useState<number | string | null | undefined>(null);

  const focusTarget = useEventCallback(() => {
    target.current?.focus();
  });

  const onEnter = useEventCallback((node: HTMLElement) => {
    setActive(true);
    props.onEnter?.(node);
  });

  const onExit = useEventCallback((node: HTMLElement) => {
    setActive(false);
    focusTarget();
    props.onExit?.(node);
  });

  const onEntered = useEventCallback((node: HTMLElement) => {
    if (value) {
      setFocusItemValue(value);
      focusActiveNode();
    }

    props.onEntered?.(node);
  });

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
