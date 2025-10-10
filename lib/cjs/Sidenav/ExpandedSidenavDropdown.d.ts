import React from 'react';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../internals/types';
import { IconProps } from '@rsuite/icons/Icon';
export interface SidenavDropdownProps<T = any> extends WithAsProps, Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    /** Define the title as a submenu */
    title?: React.ReactNode;
    /** Set the icon */
    icon?: React.ReactElement<IconProps>;
    /** The placement of Menu */
    placement?: TypeAttributes.Placement8;
    /** Whether or not component is disabled */
    disabled?: boolean;
    /** The style of the menu */
    menuStyle?: React.CSSProperties;
    /** A css class to apply to the Toggle DOM node */
    toggleClassName?: string;
    /** The value of the current option */
    eventKey?: T;
    /** You can use a custom element type for this toggle component */
    toggleAs?: React.ElementType;
    /** No caret variation */
    noCaret?: boolean;
    /**
     * Open the menu and control it
     * @deprecated
     */
    open?: boolean;
    /**
     * Custom title
     * @deprecated Use `renderToggle` instead.
     */
    renderTitle?: (children?: React.ReactNode) => React.ReactNode;
    /** Custom Toggle */
    renderToggle?: (props: WithAsProps, ref: React.Ref<any>) => any;
    /** The callback function that the menu closes */
    onClose?: () => void;
    /** Menu Pop-up callback function */
    onOpen?: () => void;
    /** Callback function for menu state switching */
    onToggle?: (open: boolean) => void;
}
declare const ExpandedSidenavDropdown: RsRefForwardingComponent<'li', SidenavDropdownProps>;
export default ExpandedSidenavDropdown;
