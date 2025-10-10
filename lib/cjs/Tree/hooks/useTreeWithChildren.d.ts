import type { TreeNode } from '../../internals/Tree/types';
interface UseTreeWithChildrenOptions {
    valueKey: string;
    childrenKey: string;
}
/**
 * Custom hook that provides functionality for managing a tree structure with children.
 */
export default function useTreeWithChildren<T extends TreeNode>(data: T[], options: UseTreeWithChildrenOptions): {
    treeData: T[];
    loadingNodeValues: never[];
    appendChild: (node: any, getChildren: any) => void;
};
export {};
