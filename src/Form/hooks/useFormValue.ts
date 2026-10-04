import { useRef, useCallback } from 'react';
import { useControlled } from '@/internals/hooks';
import { setFieldValue as setValue, removeFieldValue } from '../utils/fieldValue';

type RecordAny = Record<string, any>;
interface UseFormValueProps<V = RecordAny> {
  formDefaultValue: V;
  nestedField: boolean;
}

export default function useFormValue<V>(controlledValue, props: UseFormValueProps<V>) {
  const { formDefaultValue, nestedField } = props;
  const [formValue, setFormValue] = useControlled(controlledValue, formDefaultValue);

  const realFormValueRef = useRef(formValue);
  realFormValueRef.current = formValue;

  const setFieldValue = useCallback(
    (fieldName: string, fieldValue: any) => {
      const nextFormError = setValue(formValue, fieldName, fieldValue, nestedField);

      setFormValue(nextFormError);

      return nextFormError;
    },
    [formValue, nestedField, setFormValue]
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
    setFormValue,
    setFieldValue,
    onRemoveValue,
    resetFormValue
  };
}
