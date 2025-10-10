import React from 'react';
import { StandardProps } from '../internals/types';
export interface SidenavDropdownCollapseProps extends StandardProps {
    open?: boolean;
}
declare const SidenavDropdownCollapse: React.ForwardRefExoticComponent<SidenavDropdownCollapseProps & React.HTMLAttributes<HTMLUListElement> & React.RefAttributes<unknown>>;
export default SidenavDropdownCollapse;
