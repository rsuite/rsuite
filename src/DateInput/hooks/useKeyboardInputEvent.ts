interface KeyboardEventOptions {
  onSegmentChange?: (kevent: React.KeyboardEvent<HTMLInputElement>) => void;
  onSegmentValueChange?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSegmentValueChangeWithNumericKeys?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSegmentValueRemove?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onAmPmToggle?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function useKeyboardInputEvent({
  onSegmentChange,
  onSegmentValueChange,
  onSegmentValueChangeWithNumericKeys,
  onSegmentValueRemove,
  onAmPmToggle,
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
        break;

      case 'a':
      case 'p':
      case 'A':
      case 'P':
        // Determine whether the Ctrl or Command key is pressed, does not affect user copy and paste
        if (event.ctrlKey || event.metaKey) {
          break;
        }

        // Handle AM/PM toggle with 'a' or 'p' keys
        onAmPmToggle?.(event);
        event.preventDefault();
        break;

      case key.match(/[a-z]/)?.[0]:
        // Determine whether the Ctrl or Command key is pressed, does not affect user copy and paste
        if (event.ctrlKey || event.metaKey) {
          break;
        }

        // Prevent letters from being entered
        event.preventDefault();
        break;
    }

    onKeyDown?.(event);
  };
}

export default useKeyboardInputEvent;
