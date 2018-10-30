import * as React from 'react';

import { PropTypes, ItemDataType } from './index';

export interface AutoCompleteProps {
  /** Whether disabled select */
  disabled?: boolean;

  /** Called when a option is selected */
  onSelect?: (item: ItemDataType, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when select an option or input value change, or value of input is changed */
  onChange?: (value: string, event: React.SyntheticEvent) => void;

  /** Current value of the input. Creates a controlled component */
  value?: string;

  /** Initial value */
  defaultValue?: string;

  /** Additional classes for menu */
  menuClassName?: string;

  /** The placement of component */
  placement?: PropTypes.Placement;

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
  renderItem?: (itemValue: string) => React.Node;

  /** When set to false, the Enter key selection function is invalid */
  selectOnEnter?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Additional classes */
  className?: string;

  /** The prefix of the component CSS class */
  classPrefix?: string;
}

declare const AutoComplete: React.ComponentType<AutoCompleteProps>;

export default AutoComplete;
