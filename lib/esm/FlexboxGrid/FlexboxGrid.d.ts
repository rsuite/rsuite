import FlexboxGridItem from './FlexboxGridItem';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface FlexboxGridProps extends WithAsProps {
    /** align */
    align?: 'top' | 'middle' | 'bottom';
    /** horizontal arrangement */
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}
interface FlexboxGridCompont extends RsRefForwardingComponent<'div', FlexboxGridProps> {
    Item: typeof FlexboxGridItem;
}
/**
 * The FlexboxGrid component is a box that can be used to layout other components.
 * @see https://rsuitejs.com/components/flexbox-grid
 */
declare const FlexboxGrid: FlexboxGridCompont;
export default FlexboxGrid;
