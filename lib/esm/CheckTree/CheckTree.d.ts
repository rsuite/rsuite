import { type CheckTreeViewProps } from './CheckTreeView';
import type { RsRefForwardingComponent } from '../internals/types';
import type { TreeExtraProps } from '../Tree/types';
export type ValueType = (string | number)[];
export interface CheckTreeProps<T = ValueType> extends CheckTreeViewProps<T>, TreeExtraProps {
    /**
     * Default selected Value
     */
    defaultValue?: T;
    /**
     * The shadow of the content when scrolling
     */
    scrollShadow?: boolean;
}
/**
 * The `CheckTree` component is used for selecting multiple options which are organized in a tree structure.
 * @see https://rsuitejs.com/components/check-tree
 */
declare const CheckTree: RsRefForwardingComponent<'div', CheckTreeProps>;
export default CheckTree;
