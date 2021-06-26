import React, { useCallback } from 'react';
import { RsRefForwardingComponent } from '../@types/common';
import useTreeControl from './useTreeControl';
import TreeControlContext from './TreeControlContext';
import useEnsuredRef from '../utils/useEnsuredRef';

const Treeview: RsRefForwardingComponent<
  'ul',
  React.HTMLAttributes<HTMLUListElement>
> = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>((props, ref) => {
  const treeControl = useTreeControl();
  const treeRef = useEnsuredRef<HTMLUListElement>(ref);

  const handleFocus = useCallback(
    (event: React.FocusEvent) => {
      if (event.target === treeRef.current) {
        treeControl.handleReceiveFocus(event);
      }
    },
    [treeControl]
  );

  return (
    <TreeControlContext.Provider value={treeControl}>
      <ul
        ref={treeRef}
        role="tree"
        tabIndex={0}
        aria-activedescendant={treeControl.activeDescendantId}
        onFocus={handleFocus}
        onBlur={treeControl.handleLoseFocus}
        {...treeControl.keyboardEventHandlers}
        {...props}
      />
    </TreeControlContext.Provider>
  );
});

export default Treeview;
