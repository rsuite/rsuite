import React from 'react';
import { TreeNode } from './types';
interface RegisterMethods {
    /**
     * Focuses on the first node in the tree.
     */
    focusTreeFirstNode: () => void;
    /**
     * Focuses on the active node in the tree.
     */
    focusTreeActiveNode: () => void;
}
type Unregister = () => void;
interface TreeContextValue {
    register?: (methods: RegisterMethods) => Unregister;
    props: {
        labelKey: string;
        valueKey: string;
        childrenKey: string;
        virtualized?: boolean;
        scrollShadow?: boolean;
        renderTreeNode?: (nodeData: TreeNode) => React.ReactNode;
        renderTreeIcon?: (nodeData: TreeNode, expanded?: boolean) => React.ReactNode;
    };
}
export declare const TreeProvider: React.Provider<TreeContextValue>;
export declare const useRegisterTreeMethods: () => ((methods: RegisterMethods) => Unregister) | undefined;
export declare const useTreeCustomRenderer: () => {
    renderTreeIcon: ((nodeData: TreeNode, expanded?: boolean) => React.ReactNode) | undefined;
    renderTreeNode: ((nodeData: TreeNode) => React.ReactNode) | undefined;
};
export declare const useItemDataKeys: () => {
    labelKey: string;
    valueKey: string;
    childrenKey: string;
};
export declare const useTreeContextProps: () => {
    labelKey: string;
    valueKey: string;
    childrenKey: string;
    virtualized?: boolean | undefined;
    scrollShadow?: boolean | undefined;
    renderTreeNode?: ((nodeData: TreeNode) => React.ReactNode) | undefined;
    renderTreeIcon?: ((nodeData: TreeNode, expanded?: boolean) => React.ReactNode) | undefined;
};
/**
 * Custom hook that provides imperative handle for the Tree component.
 */
export declare const useTreeImperativeHandle: () => {
    register: ({ focusTreeFirstNode, focusTreeActiveNode }: any) => () => void;
    focusFirstNode: () => void | undefined;
    focusActiveNode: () => void | undefined;
};
export {};
