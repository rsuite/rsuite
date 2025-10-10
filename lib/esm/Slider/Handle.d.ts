import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface HandleProps extends WithAsProps, React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    vertical?: boolean;
    tooltip?: boolean;
    rtl?: boolean;
    position?: number;
    value?: number;
    renderTooltip?: (value: number | undefined) => React.ReactNode;
    onDragMove?: (event: React.DragEvent, dataset?: DOMStringMap) => void;
    onDragStart?: (event: React.MouseEvent) => void;
    onDragEnd?: (event: React.MouseEvent, dataset?: DOMStringMap) => void;
    'data-range'?: number[];
    'data-key'?: string;
    keepTooltipOpen?: boolean;
}
declare const Handle: RsRefForwardingComponent<'div', HandleProps>;
export default Handle;
