import { useContext } from 'react';
import { ComboboxContext, type ComboboxContextProps } from '../PickerToggleTrigger';

function useCombobox() {
  const { id, hasLabel, popupType, multiple } = useContext<ComboboxContextProps>(ComboboxContext);

  return {
    id,
    popupType,
    multiple,
    labelId: hasLabel ? `${id}-label` : undefined
  };
}

export default useCombobox;
