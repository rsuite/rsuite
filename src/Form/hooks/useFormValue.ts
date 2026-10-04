import { useRef, useCallback, useInsertionEffect } from 'react';
import { useControlled } from '@/internals/hooks';
import { setFieldValue as setValue, removeFieldValue } from '../utils/fieldValue';

type RecordAny = Record<string, any>;
interface UseFormValueProps<V = RecordAny> {
  formDefaultValue: V;
  nestedField: boolean;
}

export default function useFormValue<V>(controlledValue, props: UseFormValueProps<V>) {
  const { formDefaultValue, nestedField } = props;
  const [formValue, setFormValue, isControlled] = useControlled(controlledValue, formDefaultValue);

  const realFormValueRef = useRef(formValue);
  realFormValueRef.current = formValue;
  const committedValueRef = useRef({ formValue, isControlled });
  // Publish committed props before descendants run their layout effects.
  useInsertionEffect(() => {
    committedValueRef.current = { formValue, isControlled };
  });

  const getFormValue = useCallback(
    () =>
      committedValueRef.current.isControlled
        ? committedValueRef.current.formValue
        : realFormValueRef.current,
    []
  );

  const updateFormValue = useCallback(
    nextValue => {
      if (!isControlled) {
        realFormValueRef.current = nextValue;
      }
      setFormValue(nextValue);
    },
    [isControlled, setFormValue]
  );

  const setFieldValue = useCallback(
    (fieldName: string, fieldValue: any) => {
      const nextFormValue = setValue(getFormValue(), fieldName, fieldValue, nestedField);

      updateFormValue(nextFormValue);

      return nextFormValue;
    },
    [getFormValue, nestedField, updateFormValue]
  );

  const onRemoveValue = useCallback(
    (name: string) => {
      /**
       * when this function is called when the children component is unmount,
       * it's an old render frame so use Ref to get future value
       */
      const formValue = removeFieldValue(realFormValueRef.current, name);
      realFormValueRef.current = formValue;

      setFormValue(formValue);

      return formValue;
    },
    [setFormValue]
  );

  const resetFormValue = useCallback(
    (nextValue?: V) => {
      const value = nextValue || formDefaultValue;
      updateFormValue(value);

      return value;
    },
    [formDefaultValue, updateFormValue]
  );

  return {
    formValue,
    getFormValue,
    setFormValue,
    setFieldValue,
    onRemoveValue,
    resetFormValue
  };
}
