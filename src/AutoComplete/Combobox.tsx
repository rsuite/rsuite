import React from 'react';
import { useCombobox } from '../Picker';
import Input, { type InputProps } from '../Input';

interface ComboboxProps extends InputProps {
  expanded?: boolean;
  focusItemValue?: string | null;
}

const Combobox = React.forwardRef((props: ComboboxProps, ref: React.Ref<HTMLInputElement>) => {
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

export default Combobox;
