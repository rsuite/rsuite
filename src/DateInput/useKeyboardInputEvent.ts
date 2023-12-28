interface KeyboardEventOptions {
  onSegmentChange?: (kevent: React.KeyboardEvent<HTMLInputElement>) => void;
  onSegmentValueChange?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSegmentValueChangeWithNumericKeys?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSegmentValueRemove?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function useKeyboardInputEvent({
  onSegmentChange,
  onSegmentValueChange,
  onSegmentValueChangeWithNumericKeys,
  onSegmentValueRemove,
  onKeyDown
}: KeyboardEventOptions) {
  return (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    switch (key) {
      case 'ArrowRight':
      case 'ArrowLeft':
        onSegmentChange?.(event);
        event.preventDefault();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        onSegmentValueChange?.(event);
        event.preventDefault();
        break;
      case 'Backspace':
        onSegmentValueRemove?.(event);
        event.preventDefault();
        break;

      case key.match(/\d/)?.input:
        // Allow numeric keys to be entered
        onSegmentValueChangeWithNumericKeys?.(event);
        event.preventDefault();

      case key.match(/[a-z]/)?.[0]:
        // Prevent letters from being entered
        event.preventDefault();
        break;
    }

    onKeyDown?.(event);
  };
}

export default useKeyboardInputEvent;
