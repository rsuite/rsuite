import React from 'react';
import InputPicker, { InputPickerProps } from '../InputPicker/InputPicker';
import { PickerInstance } from '../Picker/types';

export type TagPickerProps = InputPickerProps;

const TagPicker = React.forwardRef((props: TagPickerProps, ref: React.Ref<PickerInstance>) => {
  return <InputPicker {...props} ref={ref} multi />;
});

TagPicker.displayName = 'TagPicker';

export default TagPicker;
