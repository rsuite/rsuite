import React from 'react';

export interface NavContextProps {
  activeKey: string | null;
  onSelect?: (eventKey: string | undefined, event: React.SyntheticEvent) => void;
}

const NavContext = React.createContext<NavContextProps | null>(null);

export default NavContext;
