import { useContext } from 'react';
import { ComboboxContextContext, type ComboboxContextProps } from '../PickerToggleTrigger';

function useCombobox() {
  const { id, hasLabel, popupType, multiple } =
    useContext<ComboboxContextProps>(ComboboxContextContext);

  return {
    id,
    popupType,
    multiple,
    labelId: hasLabel ? `${id}-label` : undefined
  };
}

export default useCombobox;
