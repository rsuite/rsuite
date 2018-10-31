import * as React from 'react';
import { StandardProps } from '.';

export interface PaginationProps extends StandardProps {
  /** Current page number */
  activePage: number;

  /** Pages */
  pages: number;

  /** Page buttons display the maximum number of */
  maxButtons: number;

  /** Show border paging buttons 1 and pages */
  boundaryLinks?: boolean;

  /** Displays the ellipsis */
  ellipsis?: boolean | React.ReactNode;

  /** Displays the first page */
  first?: boolean | React.ReactNode;

  /** Displays the last page */
  last?: boolean | React.ReactNode;

  /** Displays the prev page */
  prev?: boolean | React.ReactNode;

  /** Displays the next page */
  next?: boolean | React.ReactNode;

  /** Customizes the element type for the component */
  buttonComponentClass: React.ReactType<PaginationProps>;

  /** Disabled component */
  disabled?: boolean | ((eventKey: any) => boolean);

  /** callback function for pagination clicked */
  onSelect?: (event: React.SyntheticEvent<any>) => void;
}

declare const Pagination: React.ComponentType<PaginationProps>;

export default Pagination;
