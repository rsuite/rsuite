import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface GridProps extends WithAsProps {
    /** Fluid layout */
    fluid?: boolean;
}
/**
 * The Grid component is used to specify the layout of child elements in rows and columns.
 * @see https://rsuitejs.com/components/grid
 */
declare const Grid: RsRefForwardingComponent<'div', GridProps>;
export default Grid;
