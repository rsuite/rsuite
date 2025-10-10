import React from 'react';
import { type ItemDataType } from '../../internals/types';
export interface UseSelectProps<T> {
    data: ItemDataType<T>[];
    childrenKey: string;
    labelKey: string;
    valueKey: string;
    onSelect?: (node: ItemDataType<T>, cascadePaths: ItemDataType<T>[], event: React.SyntheticEvent) => void;
    getChildren?: (node: ItemDataType<T>) => ItemDataType<T>[] | Promise<ItemDataType<T>[]>;
}
declare const useSelect: <T>(props: UseSelectProps<T>) => {
    columnData: (readonly ItemDataType<T>[])[];
    setColumnData: React.Dispatch<React.SetStateAction<(readonly ItemDataType<T>[])[]>>;
    flattenData: ItemDataType<T>[];
    selectedPaths: ItemDataType<T>[] | undefined;
    setSelectedPaths: React.Dispatch<React.SetStateAction<ItemDataType<T>[] | undefined>>;
    handleSelect: (...args: any[]) => any;
};
export default useSelect;
