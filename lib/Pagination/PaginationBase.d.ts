import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface PaginationBaseProps extends StandardProps {
  /** Current page number */
  activePage?: number;

  /** Page buttons display the maximum number of */
  maxButtons?: number;

  /** Displays the first page */
  first?: boolean | React.ReactNode;

  /** Displays the last page */
  last?: boolean | React.ReactNode;

  /** Displays the prev page */
  prev?: boolean | React.ReactNode;

  /** Displays the next page */
  next?: boolean | React.ReactNode;

  /** Disabled component */
  disabled?: boolean | ((eventKey: any) => boolean);
}

export default PaginationBaseProps;
