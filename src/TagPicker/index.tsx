import React, { useMemo } from 'react';
import InputPicker, {
  InputPickerProps,
  InputPickerContext,
  TriggerType
} from '../InputPicker/InputPicker';
import type { PickerComponent } from '../Picker/types';
import type { TagProps } from '../Tag';
import { ItemDataType } from 'src/@types/common';

export interface TagPickerProps extends InputPickerProps {
  /**  Tag related props. */
  tagProps?: TagProps;

  /**
   * Set the trigger for creating tags. only valid when creatable
   */
  trigger?: TriggerType | TriggerType[];

  /** Callback fired when a tag is removed. */
  onTagRemove?: (tag: string, event: React.MouseEvent) => void;

  /** Callback fired when a tag is checked. */
  onTagCheck?: (tag: string, item?: ItemDataType) => void;
}

const TagPicker: PickerComponent<TagPickerProps> = React.forwardRef(
  (props: TagPickerProps, ref) => {
    const { tagProps = {}, trigger = 'Enter', onTagRemove, onTagCheck, ...rest } = props;
    const contextValue = useMemo(
      () => ({ multi: true, trigger, tagProps, onTagRemove, onTagCheck }),
      [onTagRemove, tagProps, trigger, onTagCheck]
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
