import { KEY_VALUES } from '@/internals/constants';
import { useEventCallback } from '@/internals/hooks';

interface ToggleKeyDownEventProps {
  toggle?: boolean;
  trigger: React.RefObject<any>;
  target: React.RefObject<any>;
  overlay?: React.RefObject<any>;
  searchInput?: React.RefObject<any>;
  active?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onExit?: (event) => void;
  onKeyDown?: (event) => void;
  onMenuKeyDown?: (event) => void;
  onMenuPressEnter?: (event) => void;
  onMenuPressBackspace?: (event) => void;
}

/**
 * A hook to control the toggle keyboard operation
 * @param props
 */
const useToggleKeyDownEvent = (props: ToggleKeyDownEventProps) => {
  const {
    toggle = true,
    trigger,
    target,
    overlay,
    searchInput,
    active,
    readOnly,
    disabled,
    loading,
    onExit,
    onKeyDown,
    onMenuKeyDown,
    onMenuPressEnter,
    onMenuPressBackspace
  } = props;

  const handleClose = useEventCallback(() => {
    trigger.current?.close?.();

    // The focus is on the trigger button after closing
    trigger.current?.focus?.();
  });

  const handleOpen = useEventCallback(() => {
    trigger.current?.open?.();
  });

  const handleToggleDropdown = useEventCallback(() => {
    if (active) {
      handleClose();
      return;
    }
    handleOpen();
  });

  const onToggle = useEventCallback((event: React.KeyboardEvent) => {
    // Keyboard events should not be processed when readOnly and disabled are set.
    if (readOnly || disabled || loading) {
      return;
    }

    if (event.target === target?.current) {
      // enter
      if (toggle && event.key === KEY_VALUES.ENTER) {
        handleToggleDropdown();
      }

      // delete
      if (event.key === KEY_VALUES.BACKSPACE) {
        onExit?.(event);
      }
    }

    if (overlay?.current) {
      // The keyboard operation callback on the menu.
      onMenuKeyDown?.(event);

      if (event.key === KEY_VALUES.ENTER) {
        onMenuPressEnter?.(event);
      }

      /**
       * There is no callback when typing the Backspace key in the search box.
       * The default is to remove search keywords
       */
      if (event.key === KEY_VALUES.BACKSPACE && event.target !== searchInput?.current) {
        onMenuPressBackspace?.(event);
      }

      // The search box gets focus when typing characters and numbers.
      if (event.key.length === 1 && /\w/.test(event.key)) {
        // Exclude Input
        // eg: <SelectPicker renderExtraFooter={() => <Input />} />
        if ((event.target as HTMLInputElement)?.tagName !== 'INPUT') {
          searchInput?.current?.focus();
        }
      }
    }

    if (event.key === KEY_VALUES.ESC || event.key === KEY_VALUES.TAB) {
      handleClose();
    }

    // Native event callback
    onKeyDown?.(event);
  });

  return onToggle;
};

export default useToggleKeyDownEvent;
