import { useRef } from 'react';
import { contains, ownerDocument } from 'dom-lib';
import { useIsomorphicLayoutEffect, useUpdateEffect, useEventCallback } from '../utils';
import { PickerHandle } from '../internals/Picker/types';
import { RSUITE_PICKER_TYPE } from '../internals/symbols';

interface FocusEventProps {
  isEditing: boolean;
  stateOnBlur?: 'save' | 'cancel';
  onSave?: (event?: React.FocusEvent) => void;
  onCancel?: (event?: React.FocusEvent) => void;
}

const useFocusEvent = ({ isEditing, stateOnBlur, onSave, onCancel }: FocusEventProps) => {
  const ref = useRef<HTMLInputElement | PickerHandle>(null);
  const rootRef = useRef<HTMLDivElement>(null);

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

  const handleBlur = useEventCallback((event?: React.FocusEvent) => {
    if (event) {
      const relatedTarget = (event.relatedTarget ??
        ownerDocument(event.currentTarget).activeElement) as HTMLElement;

      if (rootRef.current && contains(rootRef.current, relatedTarget)) {
        return;
      }
    }

    if (stateOnBlur === 'save') {
      onSave?.(event);
    } else if (stateOnBlur === 'cancel') {
      onCancel?.(event);
    }
  });

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

  return {
    target: ref,
    root: rootRef,
    onBlur: handleBlur
  };
};

export default useFocusEvent;
