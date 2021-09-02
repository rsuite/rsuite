import React from 'react';

export interface TreeContextProps {
  inline?: boolean;
  dragNodeRef?: React.MutableRefObject<any>;
}

const TreeContext = React.createContext<TreeContextProps>({});

export default TreeContext;
