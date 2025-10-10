import { ItemKeys } from '../types';
/**
 * A hook to flatten tree structure data
 */
declare function useFlattenData<T>(data: T[], itemKeys: ItemKeys): {
    addFlattenData: (children: T[], parent: T) => void;
    flattenData: T[];
};
export default useFlattenData;
