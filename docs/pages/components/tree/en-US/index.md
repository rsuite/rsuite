# Tree

`<Tree>` Used to show a tree-structured data.

## Import

<!--{include:(components/tree/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Draggable

<!--{include:`draggable.md`}-->

### Async

<!--{include:`async.md`}-->

## Props

<!--{include:(_common/types/data-item-type.md)}-->
<!--{include:(components/tree/fragments/drop-data-type.md)}-->

### `<Tree>`

| Property                | Type `(Default)`                                                                               | Description                                                               |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| childrenKey             | string `('children')`                                                                          | Tree data structure Children property name                                |
| classPrefix             | string`('picker')`                                                                             | The prefix of the component CSS class                                     |
| data \*                 | Array&lt;DataItemType &gt;                                                                     | Tree Data                                                                 |
| defaultExpandAll        | boolean                                                                                        | Expand all nodes By default                                               |
| defaultExpandItemValues | any []                                                                                         | Set the value of the default expanded node                                |
| defaultValue            | string                                                                                         | Default selected Value                                                    |
| disabledItemValues      | string[]                                                                                       | Disable item by value                                                     |
| draggable               | boolean                                                                                        | Setting drag node                                                         |
| expandItemValues        | any []                                                                                         | Set the value of the expanded node (controlled)                           |
| getChildren             | (node: DataItemType) => Promise&lt;DataItemType &gt;                                           | load node children data asynchronously                                    |
| height                  | number `(360px)`                                                                               | Height of tree. When `virtualize` is true, you can set the height of tree |
| labelKey                | string `('label')`                                                                             | Tree data structure Label property name                                   |
| onChange                | (value:string) => void                                                                         | Callback function for data change                                         |
| onDragStart             | (nodeData:DataItemType, event) => void                                                         | Called when node drag start                                               |
| onDragEnter             | (nodeData:DataItemType, event) => void                                                         | Called when node drag enter                                               |
| onDragOver              | (nodeData:DataItemType, event) => void                                                         | Called when node drag over                                                |
| onDragLeave             | (nodeData:DataItemType, event) => void                                                         | Called when node drag leave                                               |
| onDragEnd               | (nodeData:DataItemType, event) => void                                                         | Called when node drag end                                                 |
| onDrop                  | (dropData:DropDataType, event) => void                                                         | Called when node drop                                                     |
| onExpand                | (expandItemValues: any [], activeNode: DataItemType, concat:(data, children) => Array) => void | Callback When tree node is displayed                                      |
| onSelect                | (activeNode:DataItemType, value, event) => void                                                | Callback function after selecting tree node                               |
| renderDragNode          | (nodeData:DataItemType) => ReactNode                                                           | Custom Render drag node when draggable is true                            |
| renderTreeIcon          | (nodeData:DataItemType) => ReactNode                                                           | Custom Render icon                                                        |
| renderTreeNode          | (nodeData:DataItemType) => ReactNode                                                           | Custom Render tree Node                                                   |
| searchKeyword           | string                                                                                         | searchKeyword (Controlled)                                                |
| value                   | string                                                                                         | Selected value                                                            |
| valueKey                | string `('value')`                                                                             | Tree data Structure Value property name                                   |
| virtualized             | boolean `(true)`                                                                               | Whether using Virtualized List                                            |

## Related components

- [`<CheckTree>`](./check-tree) Selector component, which supports a Checkbox on the TreePicker node for multiple selections.
- [`<TreePicker>`](./tree-picker) Used to show a tree-structured data.
- [`<CheckTreePicker>`](./check-tree-picker) Used to show a tree-structured data while supporting Checkbox selection.
