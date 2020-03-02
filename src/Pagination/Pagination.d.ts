import * as React from 'react';
import { StandardProps } from '../@types/common';
import PaginationBaseProps from './PaginationBase';

export interface PaginationProps extends StandardProps, PaginationBaseProps {
  /** Show border paging buttons 1 and pages */
  boundaryLinks?: boolean;

  /** Displays the ellipsis */
  ellipsis?: boolean | React.ReactNode;

  /** Customizes the element type for the component */
  buttonComponentClass?: React.ElementType;

  /** callback function for pagination clicked */
  onSelect?: (eventKey: any, event: React.MouseEvent) => void;
}

declare const Pagination: React.ComponentType<PaginationProps>;

export default Pagination;
