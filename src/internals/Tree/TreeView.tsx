import React from 'react';
import useCombobox from '../Picker/hooks/useCombobox';
import ScrollView from '../ScrollView';

interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  treeRootClassName: string;
  multiselectable?: boolean;
  scrollShadow?: boolean;
}

const TreeView = React.forwardRef((props: TreeViewProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, treeRootClassName, multiselectable, scrollShadow, ...rest } = props;
  const { id, labelId, popupType } = useCombobox();

  return (
    <ScrollView
      role="tree"
      id={id ? `${id}-${popupType}` : undefined}
      aria-multiselectable={multiselectable}
      aria-labelledby={labelId}
      ref={ref}
      scrollShadow={scrollShadow}
      {...rest}
    >
      <div className={treeRootClassName}>{children}</div>
    </ScrollView>
  );
});

export default TreeView;
