import * as React from 'react';

export interface FlexboxGridItemProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** spacing between grids */
  colspan: number;

  /** grid orders for sorting */
  order: number;
}

declare const FlexboxGridItem: React.ComponentType<FlexboxGridItemProps>;

export default FlexboxGridItem;
