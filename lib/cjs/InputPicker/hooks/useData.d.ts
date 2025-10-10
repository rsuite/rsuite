/// <reference types="react" />
import type { ItemDataType } from '../../internals/types';
export interface InputItemDataType<T = number | string> extends ItemDataType<T> {
    create?: boolean;
}
interface UseDataProps {
    controlledData?: InputItemDataType[];
    cacheData?: InputItemDataType[];
    onChange?: (data: ItemDataType[]) => void;
}
declare function useData(props: UseDataProps): {
    data: ItemDataType<string | number>[];
    dataWithCache: ItemDataType<string | number>[];
    newData: InputItemDataType<string | number>[];
    setNewData: import("react").Dispatch<import("react").SetStateAction<InputItemDataType<string | number>[]>>;
};
export default useData;
