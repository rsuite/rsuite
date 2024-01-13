import React from 'react';
import { useCombobox } from '../Picker';
import Input, { type InputProps } from '../Input';

interface ComboboxProps extends InputProps {
  expanded?: boolean;
}

const Combobox = React.forwardRef((props: ComboboxProps, ref: React.Ref<HTMLInputElement>) => {
  const { id, popupType } = useCombobox();
  const { expanded, ...rest } = props;

  return (
    <Input
      role="combobox"
      aria-autocomplete="list"
      aria-haspopup={popupType}
      aria-required={false}
      aria-expanded={expanded}
      autoComplete="off"
      id={id}
      ref={ref}
      {...rest}
    />
  );
});

export default Combobox;
