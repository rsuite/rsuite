import * as React from 'react';

import { FormControlPickerProps, ItemDataType } from '../@types/common';
import { BaseSelectProps } from '../SelectPicker/SelectPicker.d';
import { TagProps } from '../Tag/Tag.d';

export interface TagPickerProps extends FormControlPickerProps, BaseSelectProps {
  /** Option to cache value when searching asynchronously */
  cacheData?: any[];

  /** Settings can create new options */
  creatable?: boolean;

  /**
   * Tag related props.
   * https://github.com/rsuite/rsuite/blob/master/src/Tag/Tag.d.ts
   */
  tagProps?: TagProps;

  /** Custom render selected items */
  renderValue?: (
    value: any[],
    item: ItemDataType[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;
}

declare const TagPicker: React.ComponentType<TagPickerProps>;

export default TagPicker;
