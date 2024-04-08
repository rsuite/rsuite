import { useRef, useCallback } from 'react';
import omit from 'lodash/omit';
import { useControlled } from '../../utils';

export default function useFormValue(controlledValue, formDefaultValue) {
  const [formValue, setFormValue] = useControlled(controlledValue, formDefaultValue);

  const realFormValueRef = useRef(formValue);
  realFormValueRef.current = formValue;

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
    onRemoveValue
  };
}
