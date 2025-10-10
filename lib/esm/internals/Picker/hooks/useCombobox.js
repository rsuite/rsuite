'use client';
import { useContext } from 'react';
import { ComboboxContextContext } from "../PickerToggleTrigger.js";
function useCombobox() {
  var _useContext = useContext(ComboboxContextContext),
    id = _useContext.id,
    hasLabel = _useContext.hasLabel,
    popupType = _useContext.popupType,
    multiple = _useContext.multiple;
  return {
    id: id,
    popupType: popupType,
    multiple: multiple,
    labelId: hasLabel ? id + "-label" : undefined
  };
}
export default useCombobox;