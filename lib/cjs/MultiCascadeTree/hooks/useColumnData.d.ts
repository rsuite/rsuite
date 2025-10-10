/// <reference types="react" />
type MayHasParent<T extends Record<string, unknown>> = T & {
    parent?: MayHasParent<T>;
};
/**
 * A hook for column data
 * @param flattenData
 */
declare function useColumnData<T extends MayHasParent<Record<string, unknown>>>(flattenData: T[]): {
    columnData: (readonly T[])[];
    addColumn: (column: T[], index: number) => void;
    removeColumnByIndex: (index: number) => void;
    setColumnData: import("react").Dispatch<import("react").SetStateAction<(readonly T[])[]>>;
    enforceUpdateColumnData: (nextData: T[]) => void;
};
export default useColumnData;
