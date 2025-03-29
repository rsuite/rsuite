import { useContext } from 'react';
import { ComboboxContext, type ComboboxContextProps } from '../PickerToggleTrigger';

function useCombobox() {
  const { id, hasLabel, popupType, multiple, placement, breakpoint } =
    useContext<ComboboxContextProps>(ComboboxContext);

  return {
    id,
    popupType,
    multiple,
    placement,
    breakpoint,
    labelId: hasLabel ? `${id}-label` : undefined
  };
}

export default useCombobox;
