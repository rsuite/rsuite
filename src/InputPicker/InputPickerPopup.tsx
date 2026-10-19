import React, { useEffect } from 'react';
import SearchBox from '@/internals/SearchBox';
import PickerPopup, { type PickerPopupProps } from '@/internals/Picker/PickerPopup';
import { useCombobox } from '@/internals/Picker';

interface InputPickerPopupProps extends PickerPopupProps {
  searchable?: boolean;
  searchKeyword?: string;
  searchPlaceholder?: string;
  searchInput?: React.RefObject<HTMLInputElement | null>;
  onSearch?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: React.ComponentProps<typeof SearchBox>['inputProps'];
  active?: boolean;
  activeDescendant?: string;
}

const InputPickerPopup = React.forwardRef<HTMLDivElement, InputPickerPopupProps>((props, ref) => {
  const {
    children,
    searchable,
    searchKeyword,
    searchPlaceholder,
    searchInput,
    onSearch,
    inputProps,
    active,
    activeDescendant,
    target,
    ...popupProps
  } = props;
  const { id, labelId, breakpoint, inputCombobox } = useCombobox();
  const showSearchBox = searchable && breakpoint === 'xs';

  useEffect(() => {
    if (!showSearchBox || typeof requestAnimationFrame === 'undefined') {
      return;
    }

    const animationFrame = requestAnimationFrame(() => {
      const input = searchInput?.current;
      if (!input?.isConnected) return;
      const activeElement = input.ownerDocument.activeElement;
      const dialog = input.closest('[role="dialog"]');
      // Preserve focus chosen by a consumer callback or a later interaction.
      if (
        activeElement === input.ownerDocument.body ||
        activeElement === dialog ||
        activeElement === dialog?.parentElement ||
        (activeElement && target?.current?.root?.contains(activeElement))
      ) {
        input.focus();
      }
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [searchInput, showSearchBox, target]);

  return (
    <PickerPopup ref={ref} target={target} {...popupProps}>
      {showSearchBox && (
        <SearchBox
          inputProps={
            inputCombobox
              ? {
                  role: 'combobox',
                  id: `${id}-search`,
                  'aria-haspopup': 'listbox',
                  'aria-expanded': !!active,
                  'aria-controls': active ? `${id}-listbox` : undefined,
                  'aria-autocomplete': 'list',
                  'aria-labelledby': labelId,
                  'aria-label': labelId ? undefined : searchPlaceholder,
                  'aria-activedescendant': active ? activeDescendant : undefined,
                  ...inputProps
                }
              : undefined
          }
          placeholder={searchPlaceholder}
          value={searchKeyword}
          inputRef={searchInput}
          onChange={onSearch}
        />
      )}
      {children}
    </PickerPopup>
  );
});

InputPickerPopup.displayName = 'InputPickerPopup';

export default InputPickerPopup;
