import React from 'react';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../internals/types';
export interface BadgeProps extends WithAsProps {
    /** Main content */
    content?: React.ReactNode;
    /** Max count */
    maxCount?: number;
    /** A badge can have different colors */
    color?: TypeAttributes.Color;
}
/**
 * The Badge component is usually used to mark or highlight the status or quantity of an object.
 * @see https://rsuitejs.com/components/badge
 */
declare const Badge: RsRefForwardingComponent<'div', BadgeProps>;
export default Badge;
