import { RsRefForwardingComponent, WithAsProps } from '../../internals/types';
export interface GridRowProps extends WithAsProps {
    /** The weekend: Sunday */
    weekendDate?: Date;
    /** The index of the row */
    rowIndex?: number;
}
declare const GridRow: RsRefForwardingComponent<'div', GridRowProps>;
export default GridRow;
