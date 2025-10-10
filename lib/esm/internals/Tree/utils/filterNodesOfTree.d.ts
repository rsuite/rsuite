type HasChildren<T extends Record<string, unknown>> = T & {
    children?: readonly HasChildren<T>[];
};
export declare function filterNodesOfTree<TItem extends HasChildren<Record<string, unknown>>>(data: readonly TItem[], check: (item: TItem) => boolean): TItem[];
export {};
