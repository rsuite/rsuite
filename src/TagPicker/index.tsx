import React, { useMemo } from 'react';
import InputPicker, {
  InputPickerProps,
  InputPickerContext,
  TriggerType
} from '../InputPicker/InputPicker';
import type { PickerComponent } from '../Picker/types';
import type { TagProps } from '../Tag';

export interface TagPickerProps extends InputPickerProps {
  /**  Tag related props. */
  tagProps?: TagProps;

  /**
   * Set the trigger for creating tags. only valid when creatable
   */
  trigger: TriggerType | TriggerType[];
}

const TagPicker: PickerComponent<TagPickerProps> = React.forwardRef(
  (props: TagPickerProps, ref) => {
    const { tagProps, trigger, ...rest } = props;
    const contextValue = useMemo(() => ({ multi: true, trigger, tagProps }), [tagProps, trigger]);

    return (
      <InputPickerContext.Provider value={contextValue}>
        <InputPicker {...rest} ref={ref} />
      </InputPickerContext.Provider>
    );
  }
);

TagPicker.defaultProps = {
  trigger: 'Enter',
  tagProps: {}
};

TagPicker.displayName = 'TagPicker';

export default TagPicker;
