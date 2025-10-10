import React from 'react';
import type { WithAsProps } from '../types';
interface TreeViewProps extends WithAsProps, React.HTMLAttributes<HTMLDivElement> {
    treeRootClassName: string;
    multiselectable?: boolean;
    height?: number;
}
declare const TreeView: React.ForwardRefExoticComponent<TreeViewProps & React.RefAttributes<HTMLDivElement>>;
export default TreeView;
