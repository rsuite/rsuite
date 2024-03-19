### `ts:ItemDataType`

```ts
interface ItemDataType<V> {
  /** The value of the option corresponds to the `valueKey` in the data. **/
  value: V;

  /** The content displayed by the option corresponds to the `labelKey` in the data. **/
  label: ReactNode;

  /**
   * The data of the child option corresponds to the `childrenKey` in the data.
   * Properties owned by tree structure components, such as TreePicker, Cascader.
   */
  children?: ItemDataType<V>[];

  /**
   * Properties of grouping functional components, such as CheckPicker, InputPicker
   */
  groupBy?: string;

  /**
   * The children under the current node are loading.
   * Used for components that have cascading relationships and lazy loading of children. E.g. Cascader, MultiCascader
   */
  loading?: boolean;
}
```
