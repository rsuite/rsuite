import * as React from 'react';
import { StandardProps, TypeAttributes } from '.';

export interface PopoverProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** The title of the component. */
  title?: React.ReactNode;
}

declare const Popover: React.ComponentType<PopoverProps>;

export default Popover;
