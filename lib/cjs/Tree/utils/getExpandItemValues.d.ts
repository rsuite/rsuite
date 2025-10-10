interface ExpandOptions<T> {
    node: Record<string, unknown>;
    isExpand: boolean;
    expandItemValues: T[];
    valueKey: string;
}
/**
 * Returns an array of expanded item values.
 */
export declare function getExpandItemValues<T>({ node, isExpand, expandItemValues, valueKey }: ExpandOptions<T>): T[];
export {};
