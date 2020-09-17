import * as React from 'react';

import { StandardProps, TypeAttributes, ItemDataType } from '../@types/common';

export interface AutoCompleteProps extends StandardProps {
  /** The data of component */
  data?: any[];

  /** Primary content */
  children?: React.ReactNode;

  /** Whether disabled select */
  disabled?: boolean;

  /** Initial value */
  defaultValue?: string;

  /** Custom filter function to determine whether the item will be displayed */
  filterBy?: (value: string, item: ItemDataType) => boolean;

  /** Current value of the input. Creates a controlled component */
  value?: string;

  /** Additional classes for menu */
  menuClassName?: string;

  /** The placement of component */
  placement?: TypeAttributes.Placement;

  /** When set to false, the Enter key selection function is invalid */
  selectOnEnter?: boolean;

  /** Called when a option is selected */
  onSelect?: (item: ItemDataType, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when select an option or input value change, or value of input is changed */
  onChange?: (value: string, event: React.SyntheticEvent) => void;

  /** Called on focus */
  onFocus?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called on blur */
  onBlur?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called on menu focus */
  onMenuFocus?: (focusItemValue: any, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called on open */
  onOpen?: () => void;

  /** Called on close */
  onClose?: () => void;

  /** Called on hide  */
  onHide?: () => void;

  /** Custom selected option */
  renderItem?: (itemData: ItemDataType) => React.ReactNode;

  /** Position of ref */
  positionRef?: React.RefObject<any>;
}

declare const AutoComplete: React.ComponentType<AutoCompleteProps>;

export default AutoComplete;
