import * as React from 'react';

import { StandardProps } from './index';

export interface RowProps extends StandardProps {
  gutter?: number;
  componentClass?: React.ReactType<RowProps>;
}

declare const Row: React.ComponentType<RowProps>;

export default Row;
