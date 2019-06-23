import * as React from 'react';
import { StandardProps } from '.';

export interface PlaceholderGrid extends StandardProps {
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

declare const PlaceholderGrid: React.ComponentType<PlaceholderGrid>;

export default PlaceholderGrid;
