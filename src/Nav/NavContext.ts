import React from 'react';

export interface NavContextProps {
  activeKey: string | undefined;
  onSelect?: (eventKey: string | undefined, event: React.SyntheticEvent) => void;
}

const NavContext = React.createContext<NavContextProps | null>(null);

export default NavContext;
