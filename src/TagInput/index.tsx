import React, { useMemo } from 'react';
import InputPicker, {
  InputPickerProps,
  InputPickerContext,
  TriggerType
} from '../InputPicker/InputPicker';
import type { PickerComponent } from '../Picker/types';
import type { TagProps } from '../Tag';

export interface TagInputProps extends Omit<InputPickerProps<readonly string[]>, 'data'> {
  /**  Tag related props. */
  tagProps?: TagProps;

  /**
   * Set the trigger for creating tags. only valid when creatable
   *
   * @todo Declare as readonly array
   */
  trigger?: TriggerType | TriggerType[];
}

const TagInput: PickerComponent<TagInputProps> = React.forwardRef((props: TagInputProps, ref) => {
  const { tagProps = {}, trigger = 'Enter', value, defaultValue, ...rest } = props;
  const contextValue = useMemo(
    () => ({ multi: true, disabledOptions: true, trigger, tagProps }),
    [tagProps, trigger]
  );

  const data = useMemo(
    () => (value || defaultValue || []).map(v => ({ value: v, label: v })),
    [defaultValue, value]
  );

  return (
    <InputPickerContext.Provider value={contextValue}>
      <InputPicker
        {...rest}
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
