import * as React from 'react';

import { StandardProps } from '../@types/common';

export type FlexboxGridItemProps<P = {}> = StandardProps & {
  /** spacing between grids */
  colspan?: number;

  /** grid orders for sorting */
  order?: number;

  /** You can use a custom element for this component */
  componentClass?: React.ElementType<P>;
} & P;

declare function FlexboxGridItem<P = {}>(props: FlexboxGridItemProps<P>): React.ReactElement;

export default FlexboxGridItem;
