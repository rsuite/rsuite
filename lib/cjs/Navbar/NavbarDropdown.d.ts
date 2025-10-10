import React from 'react';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../internals/types';
import { IconProps } from '@rsuite/icons/Icon';
import Button from '../Button';
import NavDropdownItem from '../Nav/NavDropdownItem';
import NavDropdownMenu from '../Nav/NavDropdownMenu';
export type NavbarDropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface NavbarDropdownProps<T = any> extends WithAsProps, Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
    /** Define the title as a submenu */
    title?: React.ReactNode;
    /** Set the icon */
    icon?: React.ReactElement<IconProps>;
    /** Triggering events */
    trigger?: NavbarDropdownTrigger | readonly NavbarDropdownTrigger[];
    /** The placement of Menu */
    placement?: TypeAttributes.Placement8;
    /** Whether or not component is disabled */
    disabled?: boolean;
    /** The style of the menu */
    menuStyle?: React.CSSProperties;
    /** A css class to apply to the Toggle DOM node */
    toggleClassName?: string;
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
     * @deprecated
     */
    renderTitle?: (children: React.ReactNode) => React.ReactNode;
    /** Custom Toggle */
    renderToggle?: (props: WithAsProps, ref: React.Ref<any>) => any;
    /** The callback function that the menu closes */
    onClose?: () => void;
    /** Menu Pop-up callback function */
    onOpen?: () => void;
    /** Callback function for menu state switching */
    onToggle?: (open: boolean, eventKey?: T | undefined, event?: React.SyntheticEvent) => void;
}
export interface NavbarDropdownComponent extends RsRefForwardingComponent<'div', NavbarDropdownProps> {
    <ToggleAs extends React.ElementType = typeof Button>(props: NavbarDropdownProps & {
        ref?: React.Ref<any>;
        toggleAs?: ToggleAs;
    } & React.ComponentProps<ToggleAs>, context: any): JSX.Element | null;
    Item: typeof NavDropdownItem;
    Menu: typeof NavDropdownMenu;
}
/**
 * @private
 */
declare const NavbarDropdown: NavbarDropdownComponent;
export default NavbarDropdown;
