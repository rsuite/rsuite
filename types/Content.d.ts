import * as React from 'react';

export interface ContentProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;
}

declare const Content: React.ComponentType<ContentProps>;

export default Content;
