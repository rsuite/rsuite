# Tree

`<Tree>` Used to show a tree-structured data.

## Import

<!--{include:(components/tree/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Show Indent Lines

<!--{include:`show-indent-line.md`}-->

### Draggable

<!--{include:`draggable.md`}-->

### Async

<!--{include:`async.md`}-->

## Props

### `<Tree>`

| Property                | Type `(Default)`                                                                                   | Description                                                               |
| ----------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| childrenKey             | string `('children')`                                                                              | Tree data structure Children property name                                |
| classPrefix             | string`('picker')`                                                                                 | The prefix of the component CSS class                                     |
| data \*                 | [ItemDataType][item][]                                                                             | Tree Data                                                                 |
| defaultExpandAll        | boolean                                                                                            | Expand all nodes By default                                               |
| defaultExpandItemValues | string[]                                                                                           | Set the value of the default expanded node                                |
| defaultValue            | string                                                                                             | Default selected Value                                                    |
| disabledItemValues      | string[]                                                                                           | Disable item by value                                                     |
| draggable               | boolean                                                                                            | Setting drag node                                                         |
| expandItemValues        | string[]                                                                                           | Set the value of the expanded node (controlled)                           |
| getChildren             | (item: [ItemDataType][item]) => Promise&lt;[ItemDataType][item] &gt;                               | load node children data asynchronously                                    |
| height                  | number `(360px)`                                                                                   | Height of tree. When `virtualize` is true, you can set the height of tree |
| labelKey                | string `('label')`                                                                                 | Tree data structure Label property name                                   |
| listProps               | [ListProps][listprops]                                                                             | Properties of virtualized lists.                                          |
| onChange                | (value:string) => void                                                                             | Callback function for data change                                         |
| onDragEnd               | (item: [ItemDataType][item], event) => void                                                        | Called when node drag end                                                 |
| onDragEnter             | (item: [ItemDataType][item], event) => void                                                        | Called when node drag enter                                               |
| onDragLeave             | (item: [ItemDataType][item], event) => void                                                        | Called when node drag leave                                               |
| onDragOver              | (item: [ItemDataType][item], event) => void                                                        | Called when node drag over                                                |
| onDragStart             | (item: [ItemDataType][item], event) => void                                                        | Called when node drag start                                               |
| onDrop                  | (dropData: [DropDataType][drop], event) => void                                                    | Called when node drop                                                     |
| onExpand                | (expandItemValues: string[], item: [ItemDataType][item], concat:(data, children) => Array) => void | Callback When tree node is displayed                                      |
| onSelect                | (item:[ItemDataType][item], value, event) => void                                                  | Callback function after selecting tree node                               |
| renderTreeIcon          | (item: [ItemDataType][item]) => ReactNode                                                          | Custom Render icon                                                        |
| renderTreeNode          | (item: [ItemDataType][item]) => ReactNode                                                          | Custom Render tree Node                                                   |
| searchKeyword           | string                                                                                             | searchKeyword (Controlled)                                                |
| showIndentLine          | boolean                                                                                            | Whether to show indent line                                               |
| value                   | string                                                                                             | Selected value                                                            |
| valueKey                | string `('value')`                                                                                 | Tree data Structure Value property name                                   |
| virtualized             | boolean                                                                                            | Whether using Virtualized List                                            |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/list-props.md)}-->
<!--{include:(components/tree/fragments/drop-data-type.md)}-->

## Related components

- [`<CheckTree>`](/components/check-tree) Selector component, which supports a Checkbox on the TreePicker node for multiple selections.
- [`<TreePicker>`](/components/tree-picker) Used to show a tree-structured data.
- [`<CheckTreePicker>`](/components/check-tree-picker) Used to show a tree-structured data while supporting Checkbox selection.

[listprops]: #code-ts-list-props-code
[item]: #code-ts-item-data-type-code
