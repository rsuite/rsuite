### `ts:TreeNode`

```ts
interface TreeNode {
  /** The value of the option corresponds to the `valueKey` in the data. **/
  value: string | number;

  /** The content displayed by the option corresponds to the `labelKey` in the data. **/
  label: React.ReactNode;

  /** The data of the child option corresponds to the `childrenKey` in the data. */
  children?: TreeNode[];
}
```
