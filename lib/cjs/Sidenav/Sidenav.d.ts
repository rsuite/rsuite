import React from 'react';
import SidenavBody from './SidenavBody';
import SidenavHeader from './SidenavHeader';
import SidenavToggle from './SidenavToggle';
import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface SidenavProps<T = string | number> extends WithAsProps {
    /** Whether to expand the Sidenav */
    expanded?: boolean;
    /** Menu style */
    appearance?: 'default' | 'inverse' | 'subtle';
    /** Open menu, corresponding to Dropdown eventkey */
    defaultOpenKeys?: T[];
    /** Open menu, corresponding to Dropdown eventkey (controlled) */
    openKeys?: T[];
    /**
     * Activation option, corresponding menu eventkey
     * @deprecated Use <Nav activeKey> instead
     */
    activeKey?: T;
    /** Menu opening callback function that changed */
    onOpenChange?: (openKeys: T[], event: React.SyntheticEvent) => void;
    /**
     * Select the callback function for the menu
     * @deprecated Use <Nav onSelect> instead
     */
    onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}
export declare const SidenavContext: React.Context<SidenavContextType<string | number> | null>;
export interface SidenavContextType<T = string | number> {
    openKeys: T[];
    /**
     * @deprecated Use activeKey from NavContext instead
     */
    activeKey: T | undefined;
    sidenav: boolean;
    expanded: boolean;
    onOpenChange: (eventKey: T, event: React.SyntheticEvent) => void;
    /**
     * @deprecated Use onSelect from NavContext instead
     */
    onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}
export interface SidenavComponent extends RsRefForwardingComponent<'div', SidenavProps> {
    Header: typeof SidenavHeader;
    Body: typeof SidenavBody;
    Toggle: typeof SidenavToggle;
}
/**
 * The `Sidenav` component is an encapsulation of the page sidebar `Nav`.
 * @see https://rsuitejs.com/components/sidenav/
 */
declare const Sidenav: SidenavComponent;
export default Sidenav;
