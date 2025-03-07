import { useContext } from 'react';
import { ComboboxContext, type ComboboxContextProps } from '../PickerToggleTrigger';

function useCombobox() {
  const { id, hasLabel, popupType, multiple, placement } =
    useContext<ComboboxContextProps>(ComboboxContext);

  return {
    id,
    popupType,
    multiple,
    placement,
    labelId: hasLabel ? `${id}-label` : undefined
  };
}

export default useCombobox;
