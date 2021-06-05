import React from 'react';

export interface DropdownContextProps {
  activeKey?: string;
}

export default React.createContext<DropdownContextProps>({});
