import React from 'react';

export interface MenuContextProps {
  activeKey?: string | number;
  onSelect?: (eventKey: string | undefined, event: React.SyntheticEvent) => void;
}

const MenuContext = React.createContext<MenuContextProps | null>(null);

MenuContext.displayName = 'MenuContext';

export default MenuContext;
