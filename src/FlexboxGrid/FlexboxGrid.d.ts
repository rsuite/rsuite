import * as React from 'react';

import { StandardProps } from '../@types/common';
import FlexboxGridItem from './FlexboxGridItem';

export interface FlexboxGridProps extends StandardProps {
  /** align */
  align?: 'top' | 'middle' | 'bottom';

  /** horizontal arrangement */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

interface FlexboxGridComponent extends React.ComponentClass<FlexboxGridProps> {
  Item: typeof FlexboxGridItem;
}

declare const FlexboxGrid: FlexboxGridComponent;

export default FlexboxGrid;
