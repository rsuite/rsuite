import React from 'react';

export interface DropdownContextProps {
  activeKey?: string;
}

const DropdownContext = React.createContext<DropdownContextProps>({});
DropdownContext.displayName = 'DropdownContext';

export default DropdownContext;
