import * as React from 'react';
import { StandardProps } from '.';
import SidenavHeader from './SidenavHeader';
import SidenavBody from './SidenavBody';
import SidenavToggle from './SidenavToggle';

export interface SidenavProps extends StandardProps {
  /** Whether to expand the Sidenav */
  expanded?: boolean;

  /** Menu style */
  appearance?: 'default' | 'inverse' | 'subtle';

  /** Open menu, corresponding to Dropdown eventkey */
  defaultOpenKeys?: any[];

  /** Open menu, corresponding to Dropdown eventkey (controlled) */
  openKeys?: any[];

  /** Activation option, corresponding menu eventkey */
  activeKey?: any;

  /** You can use a custom element type for this component */
  componentClass?: React.ReactType<SidenavProps>;

  /** Menu opening callback function that changed */
  onOpenChange?: (openKeys: any[], event: React.SyntheticEvent<any>) => void;

  /** Select the callback function for the menu */
  onSelect?: (eventKey: any[], event: React.SyntheticEvent<any>) => void;
}

interface SidenavComponent extends React.ComponentClass<SidenavProps> {
  Header: typeof SidenavHeader;
  Body: typeof SidenavBody;
  Toggle: typeof SidenavToggle;
}
declare const Sidenav: SidenavComponent;

export default Sidenav;
