import * as React from 'react';

import { StandardProps } from './index';

export interface GridProps extends StandardProps {
  /** Sets id for controlled component   */
  controlId?: string;

  /** Fluid layout */
  fluid?: boolean;

  /** You can use a custom element for this component */
  componentClass?: React.ReactType<GridProps>;
}

declare const Grid: React.ComponentType<GridProps>;

export default Grid;
