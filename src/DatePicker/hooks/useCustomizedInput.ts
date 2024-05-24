import { useState, useCallback } from 'react';
import { isValid } from '@/internals/utils/date';
import Input from '../../Input';
import DateInput from '../../DateInput';
import DateRangeInput from '../../DateRangeInput';

interface UseCustomizedInputProps<T> {
  value?: T | null;
  formatStr: string;
  readOnly?: boolean;
  editable?: boolean;
  loading?: boolean;
  mode?: 'date' | 'dateRange';
  renderValue?: (value: T, format: string) => string;
}

function useCustomizedInput<T>(props: UseCustomizedInputProps<T>) {
  const { value, formatStr, readOnly, editable, loading, mode = 'date', renderValue } = props;
  const [active, setActive] = useState(false);

  const onActive = useCallback(() => setActive(true), []);
  const onInactive = useCallback(() => setActive(false), []);

  // Custom rendering of the selected value
  let customValue: string | null = null;

  // Input box is read-only when the component is uneditable or loading state
  let inputReadOnly: boolean = readOnly || !editable || loading || false;

  // If the component is not active or editable, the custom rendering value is displayed
  const customized = !active || !editable;

  if (typeof renderValue === 'function' && value && customized) {
    if (Array.isArray(value) ? value.every(isValid) : isValid(value)) {
      customValue = renderValue(value, formatStr);

      // If the custom rendering value, the input box is read-only
      inputReadOnly = true;
    }
  }
  const TargetInput = mode === 'dateRange' ? DateRangeInput : DateInput;
  const CustomizedInput = customValue ? Input : TargetInput;

  return {
    customValue,
    Input: CustomizedInput,
    inputReadOnly,
    events: { onActive, onInactive }
  };
}

export default useCustomizedInput;
