import * as React from 'react';

export interface DividerProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Vertical dividing line */
  vertical?: boolean;

  /** You can use a custom element for this component */
  componentClass: React.ReactType<DividerProps>;
}

declare const Divider: React.ComponentType<DividerProps>;

export default Divider;
