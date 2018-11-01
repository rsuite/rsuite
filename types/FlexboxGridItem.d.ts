import * as React from 'react';

import { StandardProps } from './index';

export interface FlexboxGridItemProps extends StandardProps {
  /** spacing between grids */
  colspan: number;

  /** grid orders for sorting */
  order: number;
}

declare const FlexboxGridItem: React.ComponentType<FlexboxGridItemProps>;

export default FlexboxGridItem;
