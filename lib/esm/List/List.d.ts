import { SortConfig } from './helper/useSortHelper';
import ListItem from './ListItem';
import { RsRefForwardingComponent, WithAsProps } from '../internals/types';
export interface ListProps extends WithAsProps, SortConfig {
    /**
     * Size of list item.
     */
    size?: 'lg' | 'md' | 'sm' | 'xs';
    /**
     * Whether the list is bordered.
     */
    bordered?: boolean;
    /**
     * Whether the list is hoverable.
     */
    hover?: boolean;
    /**
     * Whether the list is sortable.
     */
    sortable?: boolean;
    /**
     * Whether to display a divider between items.
     *
     * @version 5.75.0
     */
    divider?: boolean;
}
export interface ListComponent extends RsRefForwardingComponent<'div', ListProps> {
    Item: typeof ListItem;
}
/**
 * The `List` component is used to specify the layout of the list.
 * @see https://rsuitejs.com/components/list
 */
declare const List: ListComponent;
export default List;
