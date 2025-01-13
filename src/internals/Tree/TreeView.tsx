import React from 'react';
import useCombobox from '../Picker/hooks/useCombobox';
import ScrollView, { ScrollViewProps } from '../ScrollView';
import { useTreeContextProps } from './TreeProvider';
import { forwardRef } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

interface TreeViewProps extends WithAsProps, React.HTMLAttributes<HTMLDivElement> {
  treeRootClassName: string;
  multiselectable?: boolean;
  height?: number;
}

const ScrollShadowView = forwardRef<'div', ScrollViewProps>((props, ref) => {
  return <ScrollView scrollShadow ref={ref} {...props} />;
});

const TreeView = forwardRef<'div', TreeViewProps>((props, ref) => {
  const {
    as = 'div',
    children,
    treeRootClassName,
    multiselectable,
    style,
    height,
    ...rest
  } = props;
  const { scrollShadow, virtualized } = useTreeContextProps();
  const { id, labelId, popupType } = useCombobox();

  // If the tree is virtualized, the scroll shadow is not needed.
  const Component = scrollShadow && !virtualized ? ScrollShadowView : as;

  // If the tree is virtualized, the height is not needed.
  const viewStyles = { height: virtualized ? undefined : height, ...style };

  return (
    <Component
      role="tree"
      style={viewStyles}
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

TreeView.displayName = 'TreeView';

export default TreeView;
