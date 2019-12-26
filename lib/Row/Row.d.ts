import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface RowProps extends StandardProps {
  gutter?: number;
  componentClass?: React.ElementType;
  children?: React.ReactNode;
}

declare const Row: React.ComponentType<RowProps>;

export default Row;
