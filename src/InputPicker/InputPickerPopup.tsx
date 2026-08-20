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
}

const InputPickerPopup = React.forwardRef<HTMLDivElement, InputPickerPopupProps>((props, ref) => {
  const {
    children,
    searchable,
    searchKeyword,
    searchPlaceholder,
    searchInput,
    onSearch,
    ...popupProps
  } = props;
  const { breakpoint } = useCombobox();
  const showSearchBox = searchable && breakpoint === 'xs';

  useEffect(() => {
    if (!showSearchBox || typeof requestAnimationFrame === 'undefined') {
      return;
    }

    const animationFrame = requestAnimationFrame(() => {
      searchInput?.current?.focus();
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [searchInput, showSearchBox]);

  return (
    <PickerPopup ref={ref} {...popupProps}>
      {showSearchBox && (
        <SearchBox
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
