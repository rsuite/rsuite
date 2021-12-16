import React from 'react';
import noop from 'lodash/noop';

export interface NavContextProps {
  /**
   * Whether component is rendered within a <Nav>
   *
   * FIXME: Bad design. Should use NavContextProps | null to determin whether within a <Nav>
   */
  withinNav: boolean;
  activeKey: string | null;
  onSelect?: (eventKey: string | undefined, event: React.SyntheticEvent) => void;
}

const NavContext = React.createContext<NavContextProps>({
  withinNav: false,
  activeKey: null,
  onSelect: noop
});

export default NavContext;
