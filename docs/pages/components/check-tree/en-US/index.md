# CheckTree

`<CheckTree>` is used to display a tree structure data and supports Checkbox selection.

## Import

<!--{include:(components/check-tree/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Cascade

The cascade attribute can set whether or not CheckTree can consider the cascade relationship of the parent parent when selecting. The default value is true.

<!--{include:`cascade.md`}-->

### Custom options

<!--{include:`custom.md`}-->

### Async

<!--{include:`async.md`}-->

## Props

<!--{include:(_common/types/data-item-type.md)}-->

### `<CheckTree>`

| Property                | Type `(Default)`                                                                              | Description                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| cascade                 | boolean `(true)`                                                                              | Whether cascade select                                                    |
| childKey                | string `('children')`                                                                         | Set childrenKey key in data                                               |
| data \*                 | Array&lt;DataItemType&gt;                                                                     | Tree data                                                                 |
| defaultExpandAll        | boolean                                                                                       | Expand all tree node                                                      |
| defaultValue            | string[]                                                                                      | Default values of the selected tree node                                  |
| defaultExpandItemValues | any []                                                                                        | Set the value of the default expanded node                                |
| disabledItemValues      | string[]                                                                                      | Values of disabled tree node                                              |
| expandItemValues        | any []                                                                                        | Set the value of the expanded node (controlled)                           |
| getChildren             | (node: DataItemType) => Promise&lt;DataItemType&gt;                                           | load node children data asynchronously                                    |
| height                  | number `(360px)`                                                                              | height of menu. When `virtualize` is true, you can set the height of menu |
| labelKey                | string `('label')`                                                                            | Set label key in data                                                     |
| onChange                | (values:string[]) => void                                                                     | Callback fired when value change                                          |
| onExpand                | (expandItemValues: any [], activeNode:DataItemType, concat:(data, children) => Array) => void | callback fired when tree node expand state changed                        |
| onSelect                | (activeNode:string, value:any, event) => void                                                 | Callback fired when tree node is selected                                 |
| renderTreeIcon          | (nodeData:DataItemType) => ReactNode                                                          | Custom render the icon in tree node                                       |
| renderTreeNode          | (nodeData:DataItemType) => ReactNode                                                          | Custom render tree node                                                   |
| searchKeyword           | string                                                                                        | searchKeyword (Controlled)                                                |
| uncheckableItemValues   | string[]                                                                                      | Set the option value for the check box not to be rendered                 |
| value                   | string[]                                                                                      | Specifies the values of the selected tree node (Controlled)               |
| valueKey                | string `('value')`                                                                            | Set value key in data                                                     |
| virtualized             | boolean `(true)`                                                                              | Whether using Virtualized List                                            |

## Related components

- [`<Tree>`](./tree)
- [`<TreePicker>`](./tree-picker)
- [`<CheckTreePicker>`](./check-tree-picker)
