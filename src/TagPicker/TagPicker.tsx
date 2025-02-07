import React, { useMemo } from 'react';
import InputPicker, { InputPickerProps } from '../InputPicker/InputPicker';
import { TagProvider, TagOnlyProps } from '../InputPicker/InputPickerContext';
import { useCustom } from '../CustomProvider';
import { forwardRef } from '@/internals/utils';
import type { CheckboxProps } from '../Checkbox';

export interface TagPickerProps extends InputPickerProps, Partial<TagOnlyProps> {
  /**
   * Custom render checkbox on menu item
   * @version 5.47.0
   **/
  renderMenuItemCheckbox?: (checkboxProps: CheckboxProps) => React.ReactNode;
}

/**
 * `TagPicker` component enables multi-selection by tags and supports new options.
 *
 * @see https://rsuitejs.com/components/tag-picker/
 */
const TagPicker = forwardRef<'div', TagPickerProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('TagPicker', props);
  const {
    tagProps = {},
    trigger = 'Enter',
    onTagRemove,
    renderMenuItemCheckbox,
    ...rest
  } = propsWithDefaults;

  const contextValue = useMemo(
    () => ({
      multi: true,
      trigger,
      tagProps,
      onTagRemove,
      renderCheckbox: renderMenuItemCheckbox
    }),
    [onTagRemove, renderMenuItemCheckbox, tagProps, trigger]
  );

  return (
    <TagProvider value={contextValue}>
      <InputPicker {...rest} ref={ref} />
    </TagProvider>
  );
});

TagPicker.displayName = 'TagPicker';

export default TagPicker;
