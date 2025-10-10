import React from 'react';
import DropdownMenu from './DropdownMenu';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../internals/types';
import { IconProps } from '@rsuite/icons/Icon';
import DropdownItem from './DropdownItem';
import Button from '../Button';
import DropdownSeparator from './DropdownSeparator';
export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface DropdownProps<T = any> extends WithAsProps, Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
    /** Define the title as a submenu */
    title?: React.ReactNode;
    /** Set the icon */
    icon?: React.ReactElement<IconProps>;
    /** The option to activate the state, corresponding to the eventkey in the Dropdown.item */
    activeKey?: T;
    /** Triggering events */
    trigger?: DropdownTrigger | DropdownTrigger[];
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
     * Controlled open state
     */
    open?: boolean;
    /**
     * Whether dropdown is initially open
     */
    defaultOpen?: boolean;
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
    onToggle?: (open?: boolean) => void;
    /** Selected callback function */
    onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}
export interface DropdownComponent extends RsRefForwardingComponent<'div', DropdownProps> {
    <ToggleAs extends React.ElementType = typeof Button>(props: DropdownProps & {
        ref?: React.Ref<any>;
        toggleAs?: ToggleAs;
    } & React.ComponentProps<ToggleAs>, context: any): JSX.Element | null;
    Item: typeof DropdownItem;
    Menu: typeof DropdownMenu;
    Separator: typeof DropdownSeparator;
}
/**
 * The `Dropdown` component is used to select an option from a set of options.
 * @see https://rsuitejs.com/components/dropdown
 *
 * The `<Dropdown>` API
 * - When used inside `<Sidenav>`, renders a `<TreeviewRootItem>`;
 * - Otherwise renders a `<MenuRoot>`
 */
declare const Dropdown: DropdownComponent;
export default Dropdown;
