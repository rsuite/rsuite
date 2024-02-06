import { useRef } from 'react';
import { useIsomorphicLayoutEffect, useUpdateEffect } from '../utils';
import { PickerHandle } from '../internals/Picker/types';
import { RSUITE_PICKER_TYPE } from '../internals/symbols';

const useTargetFocus = ({ isEditing }: { isEditing: boolean }) => {
  const ref = useRef<HTMLInputElement | PickerHandle>(null);

  const isPicker = ref.current?.type === RSUITE_PICKER_TYPE;

  const focus = () => {
    if (isPicker) {
      setTimeout(() => {
        (ref.current as PickerHandle)?.target?.focus?.();
      }, 100);
    } else {
      (ref.current as HTMLInputElement)?.focus?.();
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (isEditing) {
      focus();
    }
  }, []);

  useUpdateEffect(() => {
    if (isEditing) {
      focus();
    }
  }, [isEditing]);

  return ref;
};

export default useTargetFocus;
