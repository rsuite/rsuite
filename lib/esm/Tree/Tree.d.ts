import { type TreeViewProps } from './TreeView';
import type { RsRefForwardingComponent } from '../internals/types';
import type { TreeExtraProps } from './types';
export interface TreeProps<T = string | number | null> extends TreeViewProps<T>, TreeExtraProps {
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
 * The `Tree` component is used to display hierarchical data.
 *
 * @see https://rsuitejs.com/components/tree
 */
declare const Tree: RsRefForwardingComponent<'div', TreeProps>;
export default Tree;
