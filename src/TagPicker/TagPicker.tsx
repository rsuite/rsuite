import React, { useMemo } from 'react';
import InputPicker, { InputPickerProps } from '../InputPicker/InputPicker';
import { TagProvider, TagOnlyProps } from '../InputPicker/InputPickerContext';
import { useCustom } from '../CustomProvider';
import { forwardRef } from '@/internals/utils';
import type { Option } from '@/internals/types';
import type { CheckboxProps } from '../Checkbox';

interface DeprecatedProps {
  /**
   * @deprecated Use `renderCheckbox` instead
   */
  renderMenuItemCheckbox?: (checkboxProps: CheckboxProps) => React.ReactNode;
}

export interface TagPickerProps<V = any>
  extends Omit<InputPickerProps<V>, 'renderValue'>,
    DeprecatedProps,
    Partial<TagOnlyProps> {
  renderCheckbox?: (checkboxProps: CheckboxProps) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    values: V[],
    items: Option<V>[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;
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
    size = 'md',
    onTagRemove,
    renderCheckbox,
    renderValue,
    ...rest
  } = propsWithDefaults;

  const contextValue = useMemo(
    () => ({
      multi: true,
      trigger,
      tagProps,
      onTagRemove,
      renderCheckbox
    }),
    [onTagRemove, renderCheckbox, tagProps, trigger]
  );

  return (
    <TagProvider value={contextValue}>
      <InputPicker
        size={size}
        renderValue={renderValue as InputPickerProps['renderValue']}
        {...rest}
        ref={ref}
      />
    </TagProvider>
  );
});

TagPicker.displayName = 'TagPicker';

export default TagPicker;
