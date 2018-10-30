import * as React from 'react';

export interface GridProps {
  /** Additional classes */
  className?: string;

  /** The prefix of the component CSS class */
  classPrefix: string;

  /** Sets id for controlled component   */
  controlId?: string;

  /** Fluid layout */
  fluid?: boolean;

  /** You can use a custom element for this component */
  componentClass: React.ReactType<GridProps>;
}

declare const Grid: React.ComponentType<GridProps>;

export default Grid;
