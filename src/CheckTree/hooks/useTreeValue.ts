import { useControlled, useMount } from '../../utils';
import { getCheckTreePickerDefaultValue } from '../utils';
function useTreeValue(controlledValue, { defaultValue, uncheckableItemValues }) {
  const [value, setValue, isControlled] = useControlled(controlledValue, defaultValue);

  useMount(() => {
    setValue(getCheckTreePickerDefaultValue(value, uncheckableItemValues));
  });

  return [value, setValue, isControlled];
}

export default useTreeValue;
