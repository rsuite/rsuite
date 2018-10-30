import * as React from 'react';

export interface ContainerProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;
}

declare const Container: React.ComponentType<ContainerProps>;

export default Container;
