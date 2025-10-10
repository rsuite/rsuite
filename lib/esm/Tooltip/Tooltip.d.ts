import React from 'react';
import type { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface TooltipProps extends WithAsProps {
    /** Dispaly placement */
    placement?: TypeAttributes.Placement;
    /** Whether visible */
    visible?: boolean;
    /** Primary content */
    children?: React.ReactNode;
    /** Whether show the arrow indicator */
    arrow?: boolean;
}
/**
 * The `Tooltip` component is used to describe a element.
 *
 * @see https://rsuitejs.com/components/tooltip
 */
declare const Tooltip: RsRefForwardingComponent<'div', TooltipProps>;
export default Tooltip;
