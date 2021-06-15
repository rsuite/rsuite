import React from 'react';
import { RsRefForwardingComponent } from '../@types/common';
import useTreeControl from './useTreeControl';
import TreeControlContext from './TreeControlContext';

const Treeview: RsRefForwardingComponent<
  'ul',
  React.HTMLAttributes<HTMLUListElement>
> = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>((props, ref) => {
  const treeControl = useTreeControl();

  return (
    <TreeControlContext.Provider value={treeControl}>
      <ul ref={ref} role="tree" {...props} />
    </TreeControlContext.Provider>
  );
});

export default Treeview;
