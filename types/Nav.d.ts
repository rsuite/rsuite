import * as React from 'react';
import { StandardProps } from '.';
import NavItem from './NavItem';

export interface NavProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** sets appearance */
  appearance?: 'default' | 'subtle' | 'tabs';

  /** Reverse Direction of tabs/subtle */
  reversed?: boolean;

  /** Justified navigation */
  justified?: boolean;

  /** Vertical navigation */
  vertical?: boolean;

  /** appears on the right. */
  pullRight?: boolean;

  /** Active key, corresponding to eventkey in <Nav.item>. */
  activeKey?: any;

  /** Callback function triggered after selection */
  onSelect?: (eventKey: any, event: React.SyntheticEvent<any>) => void;
}

interface NavComponent extends React.ComponentClass<NavProps> {
  Item: typeof NavItem;
}
declare const Nav: NavComponent;

export default Nav;
