import * as React from 'react';

import { StandardProps, ItemDataType } from '../@types/common';

export interface AutoCompleteItemProps extends StandardProps {
  itemData: ItemDataType;
  focus?: boolean;
  children?: React.ReactNode;
  onSelect?: (itemData: ItemDataType, event: React.SyntheticEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  renderItem?: (itemData: ItemDataType) => React.ReactNode;
}

declare const AutoCompleteItem: React.ComponentType<AutoCompleteItemProps>;

export default AutoCompleteItem;
