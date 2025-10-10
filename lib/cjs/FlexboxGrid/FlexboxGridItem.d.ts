import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface FlexboxGridItemProps extends WithAsProps {
    /** spacing between grids */
    colspan?: number;
    /** grid orders for sorting */
    order?: number;
}
/**
 * The `FlexboxGrid.Item` component is used to specify the layout of the child element in the `FlexboxGrid` component.
 * @see https://rsuitejs.com/components/flexbox-grid
 */
declare const FlexboxGridItem: RsRefForwardingComponent<'div', FlexboxGridItemProps>;
export default FlexboxGridItem;
