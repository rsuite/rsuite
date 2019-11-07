import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface PaginationButtonProps extends StandardProps {
  /** The value of the current option */
  eventKey?: any;

  /** Called when the button is clicked. */
  onClick?: React.MouseEventHandler;

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** A button can show it is currently the active user selection */
  active?: boolean;

  /** You can use a custom element for this component */
  componentClass: React.ElementType;

  /** Primary content */
  children?: React.ReactNode;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: any, event: React.MouseEvent) => void;

  /** Custom rendering item */
  renderItem?: (item: React.ReactNode) => React.ReactNode;
}

declare const PaginationButton: React.ComponentType<PaginationButtonProps>;

export default PaginationButton;
