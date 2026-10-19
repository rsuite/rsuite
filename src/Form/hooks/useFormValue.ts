import { useRef, useCallback, useInsertionEffect, useState } from 'react';
import { setFieldValue as setValue, removeFieldValue } from '../utils/fieldValue';

type RecordAny = Record<string, any>;
interface UseFormValueProps<V = RecordAny> {
  formDefaultValue: V;
  nestedField: boolean;
}

export default function useFormValue<V>(controlledValue, props: UseFormValueProps<V>) {
  const { formDefaultValue, nestedField } = props;
  const [uncontrolledValue, setUncontrolledValue] = useState(formDefaultValue);
  const isControlled = controlledValue !== undefined;
  const formValue = isControlled ? controlledValue : uncontrolledValue;
  const realFormValueRef = useRef(formValue);
  const committedValueRef = useRef({ formValue, isControlled });

  // Publish committed values before child layout callbacks, without exposing suspended renders.
  useInsertionEffect(() => {
    realFormValueRef.current = formValue;
    committedValueRef.current = { formValue, isControlled };
  });

  const getFormValue = useCallback(
    () =>
      committedValueRef.current.isControlled
        ? committedValueRef.current.formValue
        : realFormValueRef.current,
    []
  );

  const setFormValue = useCallback(nextValue => {
    if (committedValueRef.current.isControlled) return;
    realFormValueRef.current = nextValue;
    setUncontrolledValue(nextValue);
  }, []);

  const setFieldValue = useCallback(
    (fieldName: string, fieldValue: any) => {
      const nextFormValue = setValue(getFormValue(), fieldName, fieldValue, nestedField);

      setFormValue(nextFormValue);

      return nextFormValue;
    },
    [getFormValue, nestedField, setFormValue]
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
      setFormValue(value);

      return value;
    },
    [formDefaultValue, setFormValue]
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
