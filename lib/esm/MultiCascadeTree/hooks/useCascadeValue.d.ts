/// <reference types="react" />
import { MultiCascadeTreeProps, ItemKeys } from '../types';
import { type ItemType } from '../utils';
/**
 * A hook that converts the value into a cascading value
 * @param props
 * @param flattenData
 */
declare function useCascadeValue<T>(props: Partial<MultiCascadeTreeProps<T>> & ItemKeys, flattenData: ItemType<T>[]): {
    value: T[];
    setValue: import("react").Dispatch<import("react").SetStateAction<T[]>>;
    splitValue: (item: ItemType<T>, checked: boolean, value: T[]) => {
        value: T[];
        removedValue: T[];
    };
    handleCheck: (...args: any[]) => any;
};
export default useCascadeValue;
