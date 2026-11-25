import { useControlled, useMount } from '@/internals/hooks';
import { getCheckTreeDefaultValue } from '../utils';

function useTreeValue(controlledValue, { defaultValue, uncheckableItemValues }) {
  const [value, setValue, isControlled] = useControlled(controlledValue, defaultValue);

  useMount(() => {
    setValue(getCheckTreeDefaultValue(value, uncheckableItemValues));
  });

  return [value, setValue, isControlled];
}

export default useTreeValue;
