import { useContext } from 'react';
import { ComboboxContextContext, type ComboboxContextProps } from './PickerToggleTrigger';

function useCombobox() {
  const { id, hasLabel, popupType, multiSelectable } =
    useContext<ComboboxContextProps>(ComboboxContextContext);

  return {
    id,
    popupType,
    multiSelectable,
    labelId: hasLabel ? `${id}-label` : undefined
  };
}

export default useCombobox;
