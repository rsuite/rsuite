import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface PlaceholderGridProps extends StandardProps {
  /* number of rows */
  rows?: number;

  /* height of rows */
  rowHeight?: number;

  /* margin of rows */
  rowMargin?: number;

  /* number of columns */
  columns?: number;

  /** Placeholder status */
  active?: boolean;
}

declare const PlaceholderGrid: React.ComponentType<PlaceholderGridProps>;

export default PlaceholderGrid;
