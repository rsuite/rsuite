/// <reference types="react" />
import { ItemDataType, DataProps, WithAsProps, ToArray } from '../internals/types';
export interface SelectNode<T> {
    itemData: ItemDataType<T>;
    cascadePaths: ItemDataType<T>[];
    isLeafNode: boolean;
}
export interface CascadeColumn<T> {
    items: readonly ItemDataType<T>[];
    parentItem?: ItemDataType<T>;
    layer?: number;
}
export interface CascadeTreeProps<T = any, V = T, L = any> extends WithAsProps, DataProps<ItemDataType<T>> {
    /**
     * Initial value
     */
    defaultValue?: V;
    /**
     * Selected value
     */
    value?: V;
    /**
     * Sets the width of the menu
     */
    columnWidth?: number;
    /**
     * Sets the height of the menu
     */
    columnHeight?: number;
    /**
     * Disabled items
     */
    disabledItemValues?: ToArray<NonNullable<T>>;
    /**
     * Whether dispaly search input box
     */
    searchable?: boolean;
    /**
     * A collection of localized strings.
     */
    locale?: Partial<L>;
    /**
     * Custom render columns
     */
    renderColumn?: (childNodes: React.ReactNode, column: CascadeColumn<T>) => React.ReactNode;
    /**
     * Custom render tree node
     */
    renderTreeNode?: (node: React.ReactNode, itemData: ItemDataType<T>) => React.ReactNode;
    /**
     * Custom render search items
     */
    renderSearchItem?: (node: React.ReactNode, items: ItemDataType<T>[]) => React.ReactNode;
    /**
     * Called when the option is selected
     */
    onSelect?: (value: ItemDataType<T>, selectedPaths: ItemDataType<T>[], event: React.SyntheticEvent) => void;
    /**
     * Called after the value has been changed
     */
    onChange?: (value: V, event: React.SyntheticEvent) => void;
    /**
     * Called when searching
     */
    onSearch?: (value: string, event: React.SyntheticEvent) => void;
    /**
     * Asynchronously load the children of the tree node.
     */
    getChildren?: (childNodes: ItemDataType<T>) => ItemDataType<T>[] | Promise<ItemDataType<T>[]>;
}
