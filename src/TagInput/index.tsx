import React, { useMemo } from 'react';
import InputPicker, { InputPickerProps } from '../InputPicker/InputPicker';
import InputPickerContext, { TagOnlyProps } from '../InputPicker/InputPickerContext';
import type { PickerComponent } from '../Picker/types';

export type TagInputProps = Omit<InputPickerProps<readonly string[]>, 'data'> &
  Partial<TagOnlyProps>;

/**
 * The `TagInput` component is an enhancement of Input and supports input tags and management tags.
 *
 * @see https://rsuitejs.com/components/tag-input
 */
const TagInput: PickerComponent<TagInputProps> = React.forwardRef((props: TagInputProps, ref) => {
  const { tagProps = {}, trigger = 'Enter', value, defaultValue, onTagRemove, ...rest } = props;
  const contextValue = useMemo(
    () => ({ multi: true, disabledOptions: true, trigger, tagProps, onTagRemove }),
    [onTagRemove, tagProps, trigger]
  );

  const data = useMemo(
    () => (value || defaultValue || []).map(v => ({ value: v, label: v })),
    [defaultValue, value]
  );

  return (
    <InputPickerContext.Provider value={contextValue}>
      <InputPicker
        {...rest}
        aria-haspopup={false}
        aria-expanded={undefined}
        aria-controls={undefined}
        aria-keyshortcuts={trigger}
        value={value}
        defaultValue={defaultValue}
        data={data}
        placement={undefined}
        creatable
        ref={ref}
      />
    </InputPickerContext.Provider>
  );
});

TagInput.displayName = 'TagInput';

export default TagInput;
