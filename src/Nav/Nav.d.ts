import * as React from 'react';
import { StandardProps } from '../@types/common';
import NavItem from './NavItem';

export interface NavProps<T = any> extends StandardProps {
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
  activeKey?: T;

  /** Callback function triggered after selection */
  onSelect?: (eventKey: T, event: React.SyntheticEvent<any>) => void;
}

interface NavComponent extends React.ComponentClass<NavProps> {
  Item: typeof NavItem;
}

declare const Nav: NavComponent;

export default Nav;
