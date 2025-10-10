import React from 'react';
import type { CascadeTreeProps } from './types';
export interface CascadeTreeComponent {
    <T>(props: CascadeTreeProps<T> & {
        ref?: React.Ref<HTMLDivElement>;
    }): JSX.Element | null;
    displayName?: string;
    propTypes?: React.WeakValidationMap<CascadeTreeProps<any>>;
}
/**
 * CascadeTree is a component that displays tree-structured data in columns.
 *
 * @see https://rsuitejs.com/components/cascade-tree
 */
declare const CascadeTree: CascadeTreeComponent;
export default CascadeTree;
