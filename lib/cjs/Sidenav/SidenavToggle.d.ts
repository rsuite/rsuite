import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface SidenavToggleProps extends WithAsProps {
    /**
     * Expand then nav
     *
     * @deprecated Use <Sidenav expanded> instead.
     */
    expanded?: boolean;
    /** Callback function for menu state switching */
    onToggle?: (expanded: boolean, event: React.MouseEvent) => void;
}
declare const SidenavToggle: RsRefForwardingComponent<'div', SidenavToggleProps>;
export default SidenavToggle;
