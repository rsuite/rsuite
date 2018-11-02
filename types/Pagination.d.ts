import * as React from 'react';
import { StandardProps } from '.';
import { ButtonProps } from './Button';
import PaginationBaseProps from './PaginationBase';

export interface PaginationProps extends StandardProps, PaginationBaseProps {
  /** Show border paging buttons 1 and pages */
  boundaryLinks?: boolean;

  /** Displays the ellipsis */
  ellipsis?: boolean | React.ReactNode;

  /** Customizes the element type for the component */
  buttonComponentClass?: React.ReactType<ButtonProps>;

  /** callback function for pagination clicked */
  onSelect?: (event: React.SyntheticEvent<any>) => void;
}

declare const Pagination: React.ComponentType<PaginationProps>;

export default Pagination;
