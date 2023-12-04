import React, { useMemo } from 'react';
import InputPicker, { InputPickerProps } from '../InputPicker/InputPicker';
import InputPickerContext, { TagOnlyProps } from '../InputPicker/InputPickerContext';
import type { PickerComponent } from '../Picker/types';
import type { CheckboxProps } from '../Checkbox';

export interface TagPickerProps extends InputPickerProps, Partial<TagOnlyProps> {
  /** Custom render checkbox on menu item */
  renderMenuItemCheckbox?: (checkboxProps: CheckboxProps) => React.ReactNode;
}

const TagPicker: PickerComponent<TagPickerProps> = React.forwardRef(
  (props: TagPickerProps, ref) => {
    const {
      tagProps = {},
      trigger = 'Enter',
      onTagRemove,
      renderMenuItemCheckbox,
      ...rest
    } = props;
    const contextValue = useMemo(
      () => ({ multi: true, trigger, tagProps, onTagRemove, renderMenuItemCheckbox }),
      [onTagRemove, renderMenuItemCheckbox, tagProps, trigger]
    );

    return (
      <InputPickerContext.Provider value={contextValue}>
        <InputPicker {...rest} ref={ref} />
      </InputPickerContext.Provider>
    );
  }
);

TagPicker.displayName = 'TagPicker';

export default TagPicker;
