import { useState } from 'react';
import { useEventCallback } from '@/internals/hooks';

interface UseActiveProps {
  target: React.RefObject<HTMLElement | null>;
  onOpen?: () => void;
  onClose?: () => void;
  onEnter?: (node: HTMLElement) => void;
  onExit?: (node: HTMLElement) => void;
  setSearchKeyword: (keyword: string) => void;
}

const useActive = (props: UseActiveProps) => {
  const { onOpen, onClose, target, setSearchKeyword } = props;
  // Use component active state to support keyboard events.
  const [active, setActive] = useState(false);

  const onEnter = useEventCallback((node: HTMLElement) => {
    props.onEnter?.(node);

    if (!target.current) {
      return;
    }

    onOpen?.();
    setActive(true);
  });

  const onExit = useEventCallback((node: HTMLElement) => {
    props.onExit?.(node);
    if (!target.current) {
      return;
    }

    onClose?.();
    setActive(false);
    setSearchKeyword('');
  });

  return {
    active,
    events: { onEnter, onExit }
  };
};

export default useActive;
