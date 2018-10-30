import * as React from 'react';
import FlexboxGridItem from './FlexboxGridItem';

export interface FlexboxGridProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** align */
  align: 'top' | 'middle' | 'bottom';

  /** horizontal arrangement */
  justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

interface FlexboxGridComponent extends React.ComponentType<FlexboxGridProps> {
  Item: typeof FlexboxGridItem;
}

declare const FlexboxGrid: FlexboxGridComponent;

export default FlexboxGrid;
