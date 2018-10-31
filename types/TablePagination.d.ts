import * as React from 'react';
import { StandardProps } from '.';

interface MenuItem {
  label: number;
  value: React.ReactNode;
}
export interface TablePaginationProps extends StandardProps {
  /** Paging display row number configuration, defaults to 30, 50, 100 */
  lengthMenu?: MenuItem[];

  /** Display Dropdown menu */
  showLengthMenu?: boolean;

  /** Show paging information */
  showInfo?: boolean;

  /** Total number of data entries */
  total: number;

  /** Configure how many lines of entries per page to display, corresponding to lengthMenu */
  displayLength: number;

  /** Show Previous Page button */
  prev?: boolean;

  /** Show Next Page button */
  next?: boolean;

  /** Show First Page button */
  first?: boolean;

  /** Show Last Page button */
  last?: boolean;

  /** Configure the maximum number of display buttons  */
  maxButtons?: number;

  /** Configure the current page number */
  activePage: number;

  /** Disabled component */
  disabled?: boolean | ((eventKey: any) => boolean);

  /** Custom menu */
  renderLengthMenu?: (picker: React.ReactNode) => React.ReactNode;

  /** Custom total */
  renderTotal?: (total: number, activePage: number) => void;

  /** callback function triggered when page changes */
  onChangePage?: (page: number) => void;

  /** The callback function that triggers when the  lengthmenu value changes */
  onChangeLength?: (size: number) => void;
}

declare const TablePagination: React.ComponentType<TablePaginationProps>;

export default TablePagination;
