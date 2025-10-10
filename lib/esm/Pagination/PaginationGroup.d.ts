import { PaginationProps } from './Pagination';
import type { RsRefForwardingComponent } from '../internals/types';
/**
 * The layout of the paging component.
 */
type LayoutType = 'total' | 'pager' | 'limit' | 'skip' | '-' | '|';
export interface PaginationGroupProps extends PaginationProps {
    /**
     * Customize the layout of a paging component.
     * - `total` Component used to display the total.
     * - `pager` Component used to display the page number.
     * - `limit` Component used to display the number of rows per page.
     * - `skip` Component used to jump to a page.
     * - `-` Placeholder, take up the remaining space.
     * - `|` Divider
     *
     * @default ['pager']
     */
    layout?: LayoutType[];
    /**
     * Customizes the options of the rows per page select field.
     */
    limitOptions?: number[];
    /**
     * Customize the layout of a paging component.
     */
    limit?: number;
    /**
     * Total number of data entries.
     */
    total: number;
    /**
     * Callback fired when the page is changed.
     */
    onChangePage?: (page: number) => void;
    /**
     * Callback fired when the number of rows per page is changed.
     */
    onChangeLimit?: (limit: number) => void;
}
/**
 * Pagination component for displaying page numbers.
 *
 * @see https://rsuitejs.com/components/pagination
 */
declare const PaginationGroup: RsRefForwardingComponent<'div', PaginationGroupProps>;
export default PaginationGroup;
