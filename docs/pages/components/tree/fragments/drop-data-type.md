### `ts:DropDataType`

```ts
type DropDataType = {
  /** drag node data */
  dragNode: any;

  /** dropNode data */
  dropNode: any;

  /** node drop position */
  dropNodePosition: TREE_NODE_DROP_POSITION;

  /** Update Data when drop node */
  createUpdateDataFunction: (data: any[]) => any[];
};

enum TREE_NODE_DROP_POSITION {
  DRAG_OVER = 0, // drag node in tree node
  DRAG_OVER_TOP = 1, // drag node on tree node
  DRAG_OVER_BOTTOM = 2 // drag node under tree node
}
```
