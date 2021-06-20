import React from 'react';

export interface TreeviewItemContextProps {
  /**
   * Element id
   */
  id: string;
  /**
   * Depth of the current treeitem
   * @see `aria-level`
   */
  level: number;
}

// Used to determine whether this treeitem is root
const TreeviewItemContext = React.createContext<TreeviewItemContextProps | null>(null);
TreeviewItemContext.displayName = 'TreeviewItemContext';

export default TreeviewItemContext;
