'use client';
import { useControlled, useMount } from "../../internals/hooks/index.js";
import { getCheckTreeDefaultValue } from "../utils.js";
function useTreeValue(controlledValue, _ref) {
  var defaultValue = _ref.defaultValue,
    uncheckableItemValues = _ref.uncheckableItemValues;
  var _useControlled = useControlled(controlledValue, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  useMount(function () {
    setValue(getCheckTreeDefaultValue(value, uncheckableItemValues));
  });
  return [value, setValue, isControlled];
}
export default useTreeValue;