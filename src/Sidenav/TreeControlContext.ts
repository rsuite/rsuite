import React from 'react';

export interface TreeControlContextProps {
  activeItemIndex: number | null;
  activeDescendantId: string | null;
}

const TreeControlContext = React.createContext<TreeControlContextProps>({
  activeItemIndex: null,
  activeDescendantId: null
});

export default TreeControlContext;
