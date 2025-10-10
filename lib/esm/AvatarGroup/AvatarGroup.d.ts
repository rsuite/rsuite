import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export type Size = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export interface AvatarGroupProps extends WithAsProps {
    /**
     * Render all avatars as stacks
     */
    stack?: boolean;
    /**
     * Set the spacing of the avatar
     */
    spacing?: number;
    /**
     * Set the size of all avatars.
     * @version xxl and xs added in v5.59.0
     */
    size?: Size;
}
export declare const AvatarGroupContext: React.Context<{
    size?: Size | undefined;
    spacing?: number | undefined;
}>;
/**
 * The AvatarGroup component is used to represent a collection of avatars.
 * @see https://rsuitejs.com/components/avatar
 */
declare const AvatarGroup: RsRefForwardingComponent<'div', AvatarGroupProps>;
export default AvatarGroup;
