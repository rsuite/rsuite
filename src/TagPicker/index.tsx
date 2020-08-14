import React from 'react';
import InputPicker, { InputPickerProps } from '../InputPicker/InputPicker';
import { PickerComponent } from '../Picker/types';

export type TagPickerProps = InputPickerProps;

const TagPicker: PickerComponent<TagPickerProps> = React.forwardRef(
  (props: TagPickerProps, ref) => {
    return <InputPicker {...props} ref={ref} multi />;
  }
);

TagPicker.displayName = 'TagPicker';

export default TagPicker;
