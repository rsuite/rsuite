import * as React from 'react';
import { StandardProps } from '../@types/common';

interface MenuItem {
  label: React.ReactNode;
  value: number;
}
export interface TablePaginationProps extends StandardProps {
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

  /** Paging display row number configuration, defaults to 30, 50, 100 */
  lengthMenu?: MenuItem[];

  /** Display Dropdown menu */
  showLengthMenu?: boolean;

  /** Show paging information */
  showInfo?: boolean;

  /** Total number of data entries */
  total?: number;

  /** Configure how many lines of entries per page to display, corresponding to lengthMenu */
  displayLength?: number;

  /** Reverse start and end position */
  reverse?: boolean;

  /** Custom menu */
  renderLengthMenu?: (picker: React.ReactNode) => React.ReactNode;

  /** Custom total */
  renderTotal?: (total: number, activePage: number) => React.ReactNode;

  /** callback function triggered when page changes */
  onChangePage?: (page: number) => void;

  /** The callback function that triggers when the  lengthmenu value changes */
  onChangeLength?: (size: number) => void;
}

declare const TablePagination: React.ComponentType<TablePaginationProps>;

export default TablePagination;
