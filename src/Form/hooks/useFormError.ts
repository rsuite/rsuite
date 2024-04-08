import { useRef, useCallback } from 'react';
import omit from 'lodash/omit';
import { useControlled } from '../../utils';

export default function useFormError(formError) {
  const [realFormError, setFormError] = useControlled(formError, {});

  const realFormErrorRef = useRef(realFormError);
  realFormErrorRef.current = realFormError;

  const onRemoveError = useCallback(
    (name: string) => {
      /**
       * when this function is called when the children component is unmount,
       * it's an old render frame so use Ref to get future error
       */
      const formError = omit(realFormErrorRef.current, [name]);
      realFormErrorRef.current = formError;

      setFormError(formError);

      return formError;
    },
    [setFormError]
  );

  return {
    formError: realFormError,
    setFormError,
    onRemoveError
  };
}
