# CascadeTree

CascadeTree is a component that displays tree-structured data in columns.

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

### Searchable

<!--{include:`searchable.md`}-->

## Accessibility

### ARIA properties

- CascadeTree has role `tree`.
- Each column has role `group`.
- Each item has role `treeitem`.
- Each item has `aria-setsize` equal to the number of items in the column.
- Each item has `aria-level` equal to the column index.
- The selected item has `aria-selected="true"`.
- The disabled item has `aria-disabled="true"`.
- The search input has role `searchbox`.

## Props

### `<CascadeTree>`

| Property           | Type`(Default)`                                                           | Description                                                |
| ------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------- |
| childrenKey        | string `('children')`                                                     | Set the key for children in the data structure             |
| classPrefix        | string `('cascader-tree')`                                                | The prefix for the component's CSS class                   |
| columnHeight       | number                                                                    | Specifies the height of each column                        |
| columnWidth        | number                                                                    | Specifies the width of each column                         |
| data \*            | [Option][item][]                                                          | The data to be displayed in the component                  |
| defaultValue       | string                                                                    | The default value for the selected items                   |
| disabledItemValues | string[]                                                                  | An array of values for items to be disabled                |
| getChildren        | (item: [Option][item]) => Promise&lt;[Option][item][]&gt;                 | Asynchronously loads the children of a tree node           |
| labelKey           | string `('label')`                                                        | Specifies the key for labels in the data structure         |
| onChange           | (value: string, event) => void                                            | Callback triggered when the selected value changes         |
| onSearch           | (value: string, event) => void                                            | Callback triggered when the search value changes           |
| onSelect           | (item: [Option][item], selectedPaths: [Option][item][], event) => void    | Callback triggered when an item is selected                |
| renderColumn       | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode | Custom renderer for the column list                        |
| renderTreeNode     | (node: ReactNode, item: [Option][item]) => ReactNode                      | Custom renderer for individual tree nodes                  |
| searchable         | boolean                                                                   | Determines if the search functionality is enabled          |
| value              | string                                                                    | The current value of selected items (for controlled usage) |
| valueKey           | string `('value')`                                                        | Specifies the key for values in the data structure         |

<!--{include:(_common/types/item-data-type.md)}-->

[item]: #code-ts-option-code
