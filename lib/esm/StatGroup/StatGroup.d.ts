import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface StatGroupProps extends WithAsProps {
    /**
     * The number of columns in the group
     */
    columns?: number;
    /**
     * Spacing between columns
     */
    spacing?: number | string;
}
declare const StatGroup: RsRefForwardingComponent<'div', StatGroupProps>;
export default StatGroup;
