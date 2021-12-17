import React from 'react';

export interface TreeContextProps {
  inline?: boolean;
}

const TreeContext = React.createContext<TreeContextProps>({});

export default TreeContext;
