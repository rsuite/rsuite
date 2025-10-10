import React from 'react';
/**
 * Checks if the given children is a React fragment.
 * @param children - The children to check.
 * @returns True if the children is a React fragment, false otherwise.
 */
export declare function isFragment(children: React.ReactNode): boolean;
/**
 * Finds the first child that satisfies the given condition.
 * @param children - The children to search.
 * @param func - The condition function.
 * @param context - The context to use for the condition function.
 * @returns The first child that satisfies the condition, or undefined if no child is found.
 */
export declare function find(children: React.ReactNode, func: any, context?: any): React.ReactNode;
/**
 * Maps over the children and applies the given function to each child.
 * @param children - The children to map over.
 * @param func - The function to apply to each child.
 * @param context - The context to use for the function.
 * @returns An array of the results of applying the function to each child.
 */
export declare function map(children: React.ReactNode, func: any, context?: any): any[];
/**
 * Maps over the children and clones each child element with the provided props.
 * @param children - The children to clone and map over.
 * @param func - The function to apply to each child element.
 * @param context - The context to use for the function.
 * @returns An array of the cloned and modified child elements.
 */
export declare function mapCloneElement(children: React.ReactNode, func: any, context?: any): any[];
/**
 * Iterates over children that are in flat array form.
 * @param children
 * @param func
 * @param context
 */
export declare function forEach(children: React.ReactNode, func: any, context?: any): void;
/**
 * Returns the number of children.
 * @param children - The children to count.
 * @returns The number of children.
 */
export declare function count(children: React.ReactNode): number;
/**
 * Checks if any child satisfies the given condition.
 * @param children - The children to check.
 * @param func - The condition function.
 * @param context - The context to use for the condition function.
 * @returns True if any child satisfies the condition, false otherwise.
 */
declare function some(children: React.ReactNode, func: any, context?: any): boolean;
/**
 * Utility functions for working with React children.
 */
export declare const ReactChildren: {
    /**
     * Maps over the children and clones each child element with the provided props.
     */
    mapCloneElement: typeof mapCloneElement;
    /**
     * Returns the number of children.
     */
    count: typeof count;
    /**
     * Checks if any child satisfies the given condition.
     */
    some: typeof some;
    /**
     * Maps over the children and applies the given function to each child.
     */
    map: typeof map;
    /**
     * Iterates over children that are in flat array form.
     */
    forEach: typeof forEach;
    /**
     * Finds the first child that satisfies the given condition.
     */
    find: typeof find;
};
export default ReactChildren;
