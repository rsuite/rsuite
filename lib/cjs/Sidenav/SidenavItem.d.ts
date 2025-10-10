import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
import { IconProps } from '@rsuite/icons/Icon';
export interface SidenavItemProps<T = any> extends WithAsProps, Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    /** Activation status */
    active?: boolean;
    /** Set the icon */
    icon?: React.ReactElement<IconProps>;
    /** Whether or not component is disabled */
    disabled?: boolean;
    /** The value of the current option */
    eventKey?: T;
    /** Selected callback function */
    onSelect?: (eventKey: T, event: React.MouseEvent) => void;
    divider?: boolean;
    panel?: boolean;
    /**
     * Content of the tooltip
     */
    tooltip?: React.ReactNode;
}
/**
 * @private
 */
declare const SidenavItem: RsRefForwardingComponent<'li', SidenavItemProps>;
export default SidenavItem;
