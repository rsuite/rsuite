import React from 'react';
import useCombobox from './useCombobox';

interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  treeRootClassName: string;
  multiselectable?: boolean;
}

const TreeView = React.forwardRef((props: TreeViewProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, treeRootClassName, multiselectable, ...rest } = props;
  const { id, labelId, popupType } = useCombobox();

  return (
    <div
      role="tree"
      id={`${id}-${popupType}`}
      aria-multiselectable={multiselectable}
      aria-labelledby={labelId}
      ref={ref}
      {...rest}
    >
      <div className={treeRootClassName}>{children}</div>
    </div>
  );
});

export default TreeView;
