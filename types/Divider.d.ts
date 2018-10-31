import * as React from 'react';

import { StandardProps } from './index';

export interface DividerProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Vertical dividing line */
  vertical?: boolean;

  /** You can use a custom element for this component */
  componentClass: React.ReactType<DividerProps>;
}

declare const Divider: React.ComponentType<DividerProps>;

export default Divider;
