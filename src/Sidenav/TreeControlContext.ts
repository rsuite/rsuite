import React from 'react';
import noop from 'lodash/noop';

/**
 * treeitem properties and states
 */
export interface TreeNode {
  id: string;
  nodeValue: string | null;
  parent: string | null;
  parentNode: TreeNode | null;
  childNodes: TreeNode[];
}

export interface TreeControlContextProps {
  nodes: TreeNode[];
  activeItemIndex: number | null;
  activeDescendantId: string | null;
  registerNode: (id: string, parent?: string, props?: { eventKey?: string }) => void;
  unregisterNode: (id: string) => void;
  handleReceiveFocus: React.FocusEventHandler;
  handleLoseFocus: React.FocusEventHandler;
  keyboardEventHandlers: {
    onKeyDown: React.KeyboardEventHandler;
  };
}

const TreeControlContext = React.createContext<TreeControlContextProps>({
  nodes: [],
  activeItemIndex: null,
  activeDescendantId: null,
  registerNode: noop,
  unregisterNode: noop,
  handleReceiveFocus: noop,
  handleLoseFocus: noop,
  keyboardEventHandlers: {
    onKeyDown: noop
  }
});

export default TreeControlContext;
