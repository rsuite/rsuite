/**
 * Partial implementation of Node API
 * Used for holding tree nodes hierarchy
 * Ref: https://developer.mozilla.org/zh-CN/docs/Web/API/Node
 */
export declare class Node {
    id: string | null;
    nodeValue: string | null;
    parent: string | null;
    parentNode: Node | null;
    childNodes: Node[];
    element: HTMLElement;
    appendChild(newChild: Node): void;
    hasChildNodes(): boolean;
    get firstChild(): Node | null;
    get lastChild(): Node | null;
    get nextSibling(): Node | null;
    get previousSibling(): Node | null;
}
