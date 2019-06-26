import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface PlaceholderGraphProps extends StandardProps {
  /* height of rows */
  height?: number;

  /* width of rows */
  width?: number;

  /** Placeholder status */
  active?: boolean;
}

declare const PlaceholderGraph: React.ComponentType<PlaceholderGraphProps>;

export default PlaceholderGraph;
