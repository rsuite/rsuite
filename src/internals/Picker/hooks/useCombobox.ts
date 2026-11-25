import { useContext } from 'react';
import { ComboboxContext, type ComboboxContextProps } from '../PickerToggleTrigger';

function useCombobox() {
  const {
    id,
    hasLabel,
    popupType,
    multiple,
    placement,
    breakpoint,
    inputCombobox,
    ariaLabel,
    ariaLabelledby
  } = useContext<ComboboxContextProps>(ComboboxContext);

  return {
    id,
    popupType,
    multiple,
    placement,
    breakpoint,
    inputCombobox,
    ariaLabel,
    ariaLabelledby,
    labelId: hasLabel ? `${id}-label` : undefined
  };
}

export default useCombobox;
