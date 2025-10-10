import React from 'react';
/**
 * Converts a React element to a string representation.
 * @param element - The React element to convert.
 * @returns An array of strings representing the React element.
 */
export declare function reactToString(element: React.ReactElement): string[];
/**
 * Converts a React node to a string representation.
 * @param node - The React node to convert.
 * @returns A string representation of the React node.
 */
export declare function stringifyReactNode(node: React.ReactNode): string;
export default stringifyReactNode;
