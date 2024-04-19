import { useRef, useCallback } from 'react';
import omit from 'lodash/omit';
import set from 'lodash/set';
import { useControlled } from '../../utils';

export default function useFormValue(controlledValue, props) {
  const { formDefaultValue, nestedField } = props;
  const [formValue, setFormValue] = useControlled(controlledValue, formDefaultValue);

  const realFormValueRef = useRef(formValue);
  realFormValueRef.current = formValue;

  const setFieldValue = useCallback(
    (fieldName: string, fieldValue: any) => {
      const nextFormError = nestedField
        ? set({ ...formValue }, fieldName, fieldValue)
        : { ...formValue, [fieldName]: fieldValue };

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
      const formValue = omit(realFormValueRef.current, [name]);
      realFormValueRef.current = formValue;

      setFormValue(formValue);

      return formValue;
    },
    [setFormValue]
  );

  return {
    formValue,
    setFormValue,
    setFieldValue,
    onRemoveValue
  };
}
