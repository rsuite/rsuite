import React from 'react';
import useCombobox from '../Picker/hooks/useCombobox';
import ScrollView, { ScrollViewProps } from '../ScrollView';
import { WithAsProps } from '@/internals/types';

interface TreeViewProps extends WithAsProps, React.HTMLAttributes<HTMLDivElement> {
  treeRootClassName: string;
  multiselectable?: boolean;
  scrollShadow?: boolean;
}

const ScrollShadowView = React.forwardRef(
  (props: ScrollViewProps, ref: React.Ref<HTMLDivElement>) => {
    return <ScrollView scrollShadow ref={ref} {...props} />;
  }
);

const TreeView = React.forwardRef((props: TreeViewProps, ref: React.Ref<HTMLDivElement>) => {
  const { as = 'div', children, treeRootClassName, multiselectable, scrollShadow, ...rest } = props;
  const { id, labelId, popupType } = useCombobox();

  const Component = scrollShadow ? ScrollShadowView : as;

  return (
    <Component
      role="tree"
      id={id ? `${id}-${popupType}` : undefined}
      aria-multiselectable={multiselectable}
      aria-labelledby={labelId}
      ref={ref}
      {...rest}
    >
      <div className={treeRootClassName}>{children}</div>
    </Component>
  );
});

export default TreeView;
