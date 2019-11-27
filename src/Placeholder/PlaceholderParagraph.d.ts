import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface PlaceholderParagraphProps extends StandardProps {
  /* number of rows */
  rows?: number;

  /* height of rows */
  rowHeight?: number;

  /* margin of rows */
  rowMargin?: number;

  /* show graph */
  graph?: boolean | 'circle' | 'square' | 'image';

  /** Placeholder status */
  active?: boolean;
}

declare const PlaceholderParagraph: React.ComponentType<PlaceholderParagraphProps>;

export default PlaceholderParagraph;
