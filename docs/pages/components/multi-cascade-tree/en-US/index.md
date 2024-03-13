# MultiCascadeTree

MultiCascadeTree is a component that displays tree-structured data in columns and supports multiple selection.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Custom options

<!--{include:`custom.md`}-->

### Async Data

This tree allows the use of the `getChildren` option and the length of the children field on the node to be 0 to load children asynchronously.

<!--{include:`async.md`}-->

### Disabled options

<!--{include:`disabled-options.md`}-->

### Uncheckable options

<!--{include:`uncheckable-options.md`}-->

### Searchable

<!--{include:`searchable.md`}-->

## Props

### `<MultiCascadeTree>`

<!-- prettier-sort-markdown-table -->

| Property              | Type`(Default)`                                                                            | Description                                            |
| --------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| childrenKey           | string `('children')`                                                                      | Set children key in data                               |
| classPrefix           | string `('multi-cascade-tree')`                                                            | The prefix of the component CSS class                  |
| columnHeight          | number                                                                                     | Sets the height of the column                          |
| columnWidth           | number                                                                                     | Sets the width of the column                           |
| data \*               | [ItemDataType][item][]                                                                     | The data of component                                  |
| defaultValue          | string                                                                                     | Specifies the default value of the selected items      |
| disabledItemValues    | string[]                                                                                   | Disabled items                                         |
| getChildren           | (item: [ItemDataType][item]) => Promise&lt;[ItemDataType][item][]&gt;                      | Asynchronously load the children of the tree node.     |
| labelKey              | string `('label')`                                                                         | Set label key in data                                  |
| onChange              | (value: string[], event: React.SyntheticEvent) => void                                     | Callback fired when value changes                      |
| onSearch              | (value: string, event) => void                                                             | Callback fired when search value changes               |
| onSelect              | (item: [ItemDataType][item], selectedPaths: [ItemDataType][item][], event) => void         | Callback fired when item is selected                   |
| renderColumn          | (items: ItemDataType[],columnNode: ReactNode,parentNode?: any,layer?: number) => ReactNode | Custom render column                                   |
| renderTreeNode        | (node: ReactNode, item: [ItemDataType][item]) => ReactNode                                 | Custom render item                                     |
| searchable            | boolean                                                                                    | Whether to enable search                               |
| uncheckableItemValues | string[]                                                                                   | Set uncheckable items                                  |
| value                 | string                                                                                     | Specifies the values of the selected items(Controlled) |
| valueKey              | string `('value')`                                                                         | Set value key in data                                  |

<!--{include:(_common/types/item-data-type.md)}-->

[item]: #code-ts-item-data-type-code
