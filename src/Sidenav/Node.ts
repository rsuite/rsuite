/**
 * Partial implementation of Node API
 * Used for holding tree nodes hierarchy
 * Ref: https://developer.mozilla.org/zh-CN/docs/Web/API/Node
 */
export class Node {
  id: string = null;
  nodeValue: string | null = null;
  parent: string | null = null;
  parentNode: Node | null = null;
  childNodes: Node[] = [];

  element: HTMLElement;

  appendChild(newChild: Node) {
    newChild.parentNode = this;
    this.childNodes.push(newChild);
  }

  hasChildNodes(): boolean {
    return this.childNodes.length > 0;
  }

  get firstChild(): Node | null {
    return this.childNodes[0] ?? null;
  }

  get lastChild(): Node | null {
    return this.childNodes[this.childNodes.length - 1] ?? null;
  }

  get nextSibling(): Node | null {
    if (!this.parentNode) return null;
    return this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) + 1] ?? null;
  }

  get previousSibling(): Node | null {
    if (!this.parentNode) return null;
    return this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) - 1] ?? null;
  }
}
