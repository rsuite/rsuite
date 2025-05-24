import React from 'react';
import useCombobox from '../Picker/hooks/useCombobox';
import ScrollView, { ScrollViewProps } from '../ScrollView';
import Box, { BoxProps } from '@/internals/Box';
import { useTreeContextProps } from './TreeProvider';
import { forwardRef, mergeStyles, getCssValue } from '@/internals/utils';

interface TreeViewProps extends BoxProps, React.HTMLAttributes<HTMLDivElement> {
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
  const treeAs = scrollShadow && !virtualized ? ScrollShadowView : as;

  // If the tree is virtualized, the height is not needed.
  const viewStyles = mergeStyles(style, {
    '--rs-tree-view-height': virtualized ? undefined : getCssValue(height)
  });

  return (
    <Box
      as={treeAs}
      role="tree"
      style={viewStyles}
      id={id ? `${id}-${popupType}` : undefined}
      aria-multiselectable={multiselectable}
      aria-labelledby={labelId}
      ref={ref}
      {...rest}
    >
      <div className={treeRootClassName}>{children}</div>
    </Box>
  );
});

TreeView.displayName = 'TreeView';

export default TreeView;
