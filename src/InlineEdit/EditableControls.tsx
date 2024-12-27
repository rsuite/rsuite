import React from 'react';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import IconButton from '../IconButton';
import Stack, { type StackProps } from '../Stack';

interface EditableControlsProps extends StackProps {
  onSave: () => void;
  onCancel: () => void;
}

const EditableControls = React.forwardRef<HTMLDivElement, EditableControlsProps>(
  function EditableControls(props, ref) {
    const { onSave, onCancel, ...rest } = props;
    return (
      <Stack ref={ref} spacing={6} {...rest}>
        <IconButton size="sm" icon={<CheckIcon />} aria-label="Save" onClick={onSave} />
        <IconButton size="sm" icon={<CloseIcon />} aria-label="Cancel" onClick={onCancel} />
      </Stack>
    );
  }
);

export default EditableControls;
