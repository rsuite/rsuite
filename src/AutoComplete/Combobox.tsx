import React from 'react';
import Input, { InputProps } from '../Input';
import { useCombobox } from '@/internals/Picker';
import { forwardRef } from '@/internals/utils';

interface ComboboxProps extends InputProps {
  expanded?: boolean;
  focusItemValue?: string | null;
}

const Combobox = forwardRef<typeof Input, ComboboxProps>((props, ref) => {
  const { id, popupType } = useCombobox();
  const { expanded, focusItemValue, ...rest } = props;

  return (
    <Input
      role="combobox"
      aria-autocomplete="list"
      aria-haspopup={popupType}
      aria-expanded={expanded}
      aria-activedescendant={focusItemValue ? `${id}-opt-${focusItemValue}` : undefined}
      autoComplete="off"
      id={id}
      ref={ref}
      {...rest}
    />
  );
});

Combobox.displayName = 'Combobox';

export default Combobox;
