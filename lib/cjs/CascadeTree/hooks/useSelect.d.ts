/// <reference types="react" />
import { type ItemDataType } from '../../internals/types';
import { type SelectNode } from '../types';
export interface UseSelectProps<T> {
    value?: T | null;
    valueKey: string;
    childrenKey: string;
    selectedItem?: ItemDataType<T>;
    childrenMap: any;
    onSelect?: (node: SelectNode<T>, event: React.SyntheticEvent) => void;
    onChange?: (value: T, event: React.SyntheticEvent) => void;
    getChildren?: (node: ItemDataType<T>) => readonly ItemDataType<T>[] | Promise<readonly ItemDataType<T>[]>;
}
/**
 * Hook for handling the state after the option is selected
 */
declare const useSelect: <T>(props: UseSelectProps<T>) => {
    loadingItemsSet: any;
    activeItem: ItemDataType<T> | undefined;
    setActiveItem: import("react").Dispatch<import("react").SetStateAction<ItemDataType<T> | undefined>>;
    handleSelect: (...args: any[]) => any;
};
export default useSelect;
