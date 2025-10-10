import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface CardGroupProps extends WithAsProps {
    /**
     * The number of columns in the group
     */
    columns?: number;
    /**
     * Spacing between columns
     */
    spacing?: number | string;
}
declare const CardGroup: RsRefForwardingComponent<'div', CardGroupProps>;
export default CardGroup;
