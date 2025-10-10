import React from 'react';
import type { SelectNode, CascadeColumn } from './types';
import type { ItemDataType, WithAsProps, RsRefForwardingComponent, DataProps, ToArray } from '../internals/types';
type SetLike<T = unknown> = {
    has(value: T): boolean;
};
export interface TreeViewProps<T = any> extends WithAsProps, Omit<DataProps<ItemDataType<T>>, 'data'> {
    data?: (readonly ItemDataType<T>[])[];
    disabledItemValues?: ToArray<NonNullable<T>>;
    activeItemValue?: T | null;
    loadingItemsSet?: SetLike<ItemDataType<T>>;
    cascadePaths?: ItemDataType<T>[];
    columnWidth?: number;
    columnHeight?: number | string;
    renderTreeNode?: (node: React.ReactNode, itemData: ItemDataType<T>) => React.ReactNode;
    renderColumn?: (childNodes: React.ReactNode, column: CascadeColumn<T>) => React.ReactNode;
    onSelect?: (node: SelectNode<T>, event: React.MouseEvent) => void;
}
declare const TreeView: RsRefForwardingComponent<'div', TreeViewProps>;
export default TreeView;
