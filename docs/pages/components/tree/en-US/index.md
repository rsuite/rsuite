# Tree

`<Tree>` Used to show a tree-structured data.

## Usage

```js
import { Tree } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Tree>`

| Property                | Type `(Default)`                                                                                        | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| childrenKey             | string `('children')`                                                                                   | Tree data structure Children property name                                |
| classPrefix             | string`('picker')`                                                                                      | The prefix of the component CSS class                                     |
| data \*                 | Array&lt;[DataItemType](#DataItemType)&gt;                                                              | Tree Data                                                                 |
| defaultExpandAll        | boolean                                                                                                 | Expand all nodes By default                                               |
| defaultExpandItemValues | any []                                                                                                  | Set the value of the default expanded node                                |
| defaultValue            | string                                                                                                  | Default selected Value                                                    |
| disabledItemValues      | string[]                                                                                                | Disable item by value                                                     |
| draggable               | boolean                                                                                                 | Setting drag node                                                         |
| expandItemValues        | any []                                                                                                  | Set the value of the expanded node (controlled)                           |
| height                  | number `(360px)`                                                                                        | height of menu. When `virtualize` is true, you can set the height of menu |
| labelKey                | string `('label')`                                                                                      | Tree data structure Label property name                                   |
| onChange                | (value:string) => void                                                                                  | Callback function for data change                                         |
| onDragStart             | (nodeData:DataItemType, event) => void                                                                  | Called when node drag start                                               |
| onDragEnter             | (nodeData:DataItemType, event) => void                                                                  | Called when node drag enter                                               |
| onDragOver              | (nodeData:DataItemType, event) => void                                                                  | Called when node drag over                                                |
| onDragLeave             | (nodeData:DataItemType, event) => void                                                                  | Called when node drag leave                                               |
| onDragEnd               | (nodeData:DataItemType, event) => void                                                                  | Called when node drag end                                                 |
| onDrop                  | (dropData:DropDataType, event) => void                                                                  | Called when node drop                                                     |
| onExpand                | (expandItemValues: any [], activeNode:[DataItemType](#types), concat:(data, children) => Array) => void | Callback When tree node is displayed                                      |
| onSelect                | (activeNode:DataItemType, value, event) => void                                                         | Callback function after selecting tree node                               |
| renderDragNode          | (nodeData:DataItemType) => React.Node                                                                   | Custom Render drag node when draggable is true                            |
| renderTreeIcon          | (nodeData:DataItemType) => React.Node                                                                   | Custom Render icon                                                        |
| renderTreeNode          | (nodeData:DataItemType) => React.Node                                                                   | Custom Render tree Node                                                   |
| searchKeyword           | string                                                                                                  | searchKeyword (Controlled)                                                |
| value                   | string                                                                                                  | Selected value                                                            |
| valueKey                | string `('value')`                                                                                      | Tree data Structure Value property name                                   |
| virtualized             | boolean `(false)`                                                                                       | Whether using Virtualized List                                            |

### DataItemType

```ts
type DataItemType = {
  value: string;
  label: React.Node;
  children?: Array<DataItemType>;
};
```

## Related components

- [`<CheckTree>`](./check-tree) Selector component, which supports a Checkbox on the Treepicker node for multiple selections.
- [`<TreePicker>`](./tree-picker) Used to show a tree-structured data.
- [`<CheckTreePicker>`](./check-tree-picker) Used to show a tree-structured data while supporting Checkbox selection.
