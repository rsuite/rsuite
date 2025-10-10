import React from 'react';
import type { ItemDataType, WithAsProps, RsRefForwardingComponent } from '../internals/types';
import type { CascadeColumn } from '../CascadeTree/types';
export interface TreeViewProps<T = any> extends WithAsProps {
    disabledItemValues?: T[];
    value: T[];
    childrenKey: string;
    valueKey: string;
    labelKey: string;
    columnWidth?: number;
    columnHeight?: number | string;
    cascade?: boolean;
    cascadeData: (readonly ItemDataType<T>[])[];
    cascadePaths?: ItemDataType<T>[];
    uncheckableItemValues: T[];
    renderTreeNode?: (node: React.ReactNode, item: ItemDataType<T>) => React.ReactNode;
    renderColumn?: (childNodes: React.ReactNode, column: CascadeColumn<T>) => React.ReactNode;
    onCheck?: (node: ItemDataType<T>, event: React.SyntheticEvent, checked: boolean) => void;
    onSelect?: (node: ItemDataType<T>, cascadePaths: ItemDataType<T>[], event: React.SyntheticEvent) => void;
}
declare const TreeView: RsRefForwardingComponent<'div', TreeViewProps>;
export default TreeView;
