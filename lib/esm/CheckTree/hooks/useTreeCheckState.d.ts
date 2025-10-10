import type { TreeNodeMap } from '../../internals/Tree/types';
interface Props {
    cascade?: boolean;
    flattenedNodes: TreeNodeMap;
    uncheckableItemValues: (string | number)[];
}
declare function useTreeCheckState(props: Props): {
    getCheckedValues: (...args: any[]) => any;
};
export default useTreeCheckState;
