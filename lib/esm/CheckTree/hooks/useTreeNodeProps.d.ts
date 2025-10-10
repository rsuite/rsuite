import type { TreeNode } from '../../internals/Tree/types';
interface Props {
    uncheckableItemValues: any[];
    disabledItemValues: any[];
    loadingNodeValues: any[];
    focusItemValue: any;
    flattenedNodes: any;
    keyword: string;
}
declare function useTreeNodeProps(props: Props): (nodeData: TreeNode) => {
    value: any;
    label: any;
    visible: boolean | undefined;
    loading: boolean;
    disabled: boolean;
    nodeData: TreeNode;
    checkState: import("../../internals/constants").CheckStateType | undefined;
    uncheckable: boolean;
    allUncheckable: boolean;
    focus: boolean;
};
export default useTreeNodeProps;
