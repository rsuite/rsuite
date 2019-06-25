import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface GridProps extends StandardProps {
  /** Sets id for controlled component   */
  controlId?: string;

  /** Fluid layout */
  fluid?: boolean;

  /** You can use a custom element for this component */
  componentClass?: React.ElementType;
}

declare const Grid: React.ComponentType<GridProps>;

export default Grid;
