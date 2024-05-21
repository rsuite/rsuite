import { useState } from 'react';
import { useEventCallback } from '@/internals/hooks';

interface UseActiveProps {
  target: React.RefObject<HTMLElement>;
  onOpen?: () => void;
  onClose?: () => void;
  onEntered?: (node: HTMLElement) => void;
  onExited?: (node: HTMLElement) => void;
  setSearchKeyword: (keyword: string) => void;
}

const useActive = (props: UseActiveProps) => {
  const { onOpen, onClose, onEntered, onExited, target, setSearchKeyword } = props;
  // Use component active state to support keyboard events.
  const [active, setActive] = useState(false);

  const handleEntered = useEventCallback((node: HTMLElement) => {
    onEntered?.(node);

    if (!target.current) {
      return;
    }

    onOpen?.();
    setActive(true);
  });

  const handleExited = useEventCallback((node: HTMLElement) => {
    onExited?.(node);
    if (!target.current) {
      return;
    }

    onClose?.();
    setActive(false);
    setSearchKeyword('');
  });

  return {
    active,
    handleEntered,
    handleExited
  };
};

export default useActive;
