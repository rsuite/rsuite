import { TREE_NODE_DROP_POSITION } from '../../internals/constants';
import { DragStatus } from '../TreeNode';
interface Props {
    value: any;
    disabledItemValues: any[];
    loadingNodeValues: any[];
    focusItemValue: any;
    keyword: string;
    dragNode: any;
    dragOverNodeKey: any;
    dropNodePosition: TREE_NODE_DROP_POSITION | -1 | null;
}
declare function useTreeNodeProps(props: Props): (nodeData: any, layer: number, index?: number) => {
    id: string | undefined;
    value: any;
    label: any;
    index: number | undefined;
    layer: number;
    loading: boolean;
    active: boolean;
    focus: boolean;
    visible: any;
    children: any;
    nodeData: any;
    disabled: boolean;
    dragging: boolean;
    dragStatus: DragStatus | undefined;
};
export default useTreeNodeProps;
