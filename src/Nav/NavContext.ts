import React from 'react';

export interface NavContextProps {
  activeKey: string | number | undefined;
  onSelect?: (eventKey: string | number | undefined, event: React.SyntheticEvent) => void;
}

const NavContext = React.createContext<NavContextProps | null>(null);

export default NavContext;
