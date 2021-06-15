import React from 'react';

export interface TreeviewItemContextProps {
  /**
   * Depth of the current treeitem
   * @see `aria-level`
   */
  level: number;
}

// Used to determine whether this treeitem is root
const TreeviewItemContext = React.createContext<TreeviewItemContextProps | null>(null);

export default TreeviewItemContext;
