import * as React from 'react';
import { StandardProps } from '.';

export interface PlaceholderParagraph extends StandardProps {
  /* number of rows */
  rows?: number;

  /* height of rows */
  rowHeight?: number;

  /* margin of rows */
  rowMargin?: number;

  /* show graph */
  graph?: boolean | 'circle' | 'square';

  /** Placeholder status */
  active?: boolean;
}

declare const PlaceholderParagraph: React.ComponentType<PlaceholderParagraph>;

export default PlaceholderParagraph;
