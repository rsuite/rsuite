import * as React from 'react';
import { StandardProps } from '.';

export interface PlaceholderGraph extends StandardProps {
  /* height of rows */
  height?: number;

  /* width of rows */
  width?: number;

  /** Placeholder status */
  active?: boolean;
}

declare const PlaceholderGraph: React.ComponentType<PlaceholderGraph>;

export default PlaceholderGraph;
