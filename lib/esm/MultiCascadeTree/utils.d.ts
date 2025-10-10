import { ItemDataType } from '../internals/types';
export interface ItemType<T = any> extends ItemDataType<T> {
    parent?: ItemType<T>;
}
interface ItemKeys {
    valueKey: string;
    labelKey: string;
    childrenKey: string;
}
export type MayHasParent<T extends Record<string, unknown>> = T & {
    parent?: MayHasParent<T>;
};
/**
 * get all ancestor nodes of given node
 * @param {*} node
 */
export declare function getNodeParents(node: any, parentKey?: string, valueKey?: string): any[];
/**
 * Check if any child nodes are selected.
 * @param node
 * @param value
 * @param itemKeys
 */
export declare const isSomeChildChecked: <T extends Record<string, unknown>>(node: T, value: T[], itemKeys: Omit<ItemKeys, 'labelKey'>) => any;
/**
 * Check if the parent is selected.
 * @param node
 * @param value
 * @param itemKeys
 */
export declare const isSomeParentChecked: <T extends Record<string, unknown>>(node: MayHasParent<T>, value: T[], itemKeys: Pick<ItemKeys, 'valueKey'>) => any;
export declare const getOtherItemValuesByUnselectChild: <T>(itemNode: ItemType, value: any, itemKeys: Omit<ItemKeys, 'labelKey'>) => T[];
/**
 * Remove the values of all children.
 */
export declare const removeAllChildrenValue: <T>(value: T[], item: ItemType, itemKeys: Omit<ItemKeys, 'labelKey'>) => T[] | undefined;
export {};
