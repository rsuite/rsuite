# CheckTree

`<CheckTree>` is used to display a tree structure data and supports Checkbox selection.

## Import

<!--{include:(components/check-tree/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Cascade

The cascade attribute can set whether or not CheckTree can consider the cascade relationship of the parent parent when selecting. The default value is true.

<!--{include:`cascade.md`}-->

### Show Indent Lines

<!--{include:`show-indent-line.md`}-->

### Custom options

<!--{include:`custom.md`}-->

### Async

<!--{include:`async.md`}-->

## Props

### `<CheckTree>`

| Property                | Type `(Default)`                                                                                 | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| cascade                 | boolean `(true)`                                                                                 | Whether cascade select                                                    |
| childKey                | string `('children')`                                                                            | Set childrenKey key in data                                               |
| data \*                 | [ItemDataType][item][]                                                                           | Tree data                                                                 |
| defaultExpandAll        | boolean                                                                                          | Expand all tree node                                                      |
| defaultExpandItemValues | any []                                                                                           | Set the value of the default expanded node                                |
| defaultValue            | string[]                                                                                         | Default values of the selected tree node                                  |
| disabledItemValues      | string[]                                                                                         | Values of disabled tree node                                              |
| expandItemValues        | any []                                                                                           | Set the value of the expanded node (controlled)                           |
| getChildren             | (item: [ItemDataType][item]) => Promise&lt;[ItemDataType][item]&gt;                              | load node children data asynchronously                                    |
| height                  | number `(360px)`                                                                                 | height of menu. When `virtualize` is true, you can set the height of menu |
| labelKey                | string `('label')`                                                                               | Set label key in data                                                     |
| listProps               | [ListProps][listprops]                                                                           | Properties of virtualized lists.                                          |
| onChange                | (values:string[]) => void                                                                        | Callback fired when value change                                          |
| onExpand                | (expandItemValues: any [], item: [ItemDataType][item], concat:(data, children) => Array) => void | callback fired when tree node expand state changed                        |
| onSelect                | (item: [ItemDataType][item], value:any, event) => void                                           | Callback fired when tree node is selected                                 |
| renderTreeIcon          | (item: [ItemDataType][item]) => ReactNode                                                        | Custom render the icon in tree node                                       |
| renderTreeNode          | (item: [ItemDataType][item]) => ReactNode                                                        | Custom render tree node                                                   |
| searchKeyword           | string                                                                                           | searchKeyword (Controlled)                                                |
| uncheckableItemValues   | string[]                                                                                         | Set the option value for the check box not to be rendered                 |
| value                   | string[]                                                                                         | Specifies the values of the selected tree node (Controlled)               |
| valueKey                | string `('value')`                                                                               | Set value key in data                                                     |
| virtualized             | boolean                                                                                          | Whether using Virtualized List                                            |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/list-props.md)}-->

## Related components

- [`<Tree>`](/components/tree)
- [`<TreePicker>`](/components/tree-picker)
- [`<CheckTreePicker>`](/components/check-tree-picker)

[listprops]: #code-ts-list-props-code
[item]: #code-ts-item-data-type-code
