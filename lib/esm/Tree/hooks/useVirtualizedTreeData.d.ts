import type { TreeNode, TreeNodeMap } from '../../internals/Tree/types';
declare function useVirtualizedTreeData(nodes: TreeNodeMap, data: TreeNode[], options: {
    expandItemValues: (string | number)[];
    cascade?: boolean;
    searchKeyword?: string;
}): () => TreeNode[];
export default useVirtualizedTreeData;
