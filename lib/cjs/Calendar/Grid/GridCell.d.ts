import React from 'react';
import { RsRefForwardingComponent, WithAsProps } from '../../internals/types';
export interface GridCellProps extends WithAsProps {
    date: Date;
    disabled?: boolean;
    selected?: boolean;
    unSameMonth?: boolean;
    rangeStart?: boolean;
    rangeEnd?: boolean;
    inRange?: boolean;
    onSelect?: (date: Date, disabled: boolean | void, event: React.MouseEvent) => void;
}
declare const GridCell: RsRefForwardingComponent<'div', GridCellProps>;
export default GridCell;
