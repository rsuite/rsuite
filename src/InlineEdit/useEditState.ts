import React, { useState } from 'react';
import { useEventCallback, useControlled } from '@/internals/hooks';

interface EditStateProps {
  value?: any;
  defaultValue?: any;
  disabled?: boolean;
  onChange?: (value: any, event: React.ChangeEvent) => void;
  onEdit?: (event: React.SyntheticEvent) => void;
  onCancel?: (event?: React.MouseEvent) => void;
  onSave?: (event?: React.MouseEvent) => void;
  onClick?: (event: React.SyntheticEvent) => void;
}

const useEditState = (props: EditStateProps) => {
  const {
    value: valueProp,
    defaultValue,
    disabled,
    onChange,
    onEdit,
    onCancel,
    onSave,
    onClick,
    ...htmlProps
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useControlled(valueProp, defaultValue);

  // When editing, the value is not updated, and the original value is restored when canceling
  const [resetValue, setResetValue] = useState();

  const handleClick = useEventCallback((event: React.SyntheticEvent) => {
    if (disabled) {
      return;
    }
    onClick?.(event);
    onEdit?.(event);
    setIsEditing(true);
    setResetValue(value);
  });

  const handleChange = useEventCallback((value: any, event: React.ChangeEvent) => {
    setValue(value);
    onChange?.(value, event);
  });

  const handleCancel = useEventCallback((event?: React.MouseEvent) => {
    setIsEditing(false);
    setValue(resetValue);
    onCancel?.(event);

    event?.stopPropagation?.();
  });

  const handleSave = useEventCallback((event?: React.MouseEvent) => {
    setIsEditing(false);
    onSave?.(event);
    event?.stopPropagation?.();
  });

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    if (isEditing) {
      switch (event.key) {
        case 'Enter':
          if ((event.target as HTMLInputElement)?.tagName === 'INPUT') {
            handleSave(event);
          }
          break;
        case 'Escape':
          handleCancel(event);
          break;
      }
    }
  });

  return {
    isEditing,
    value,
    onClick: handleClick,
    onChange: handleChange,
    onCancel: handleCancel,
    onSave: handleSave,
    onKeyDown: handleKeyDown,
    htmlProps
  };
};

export default useEditState;
