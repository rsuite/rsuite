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

## Accessibility

### ARIA properties

- MultiCascadeTree has role `tree`.
- Each column has role `group`.
- Each item has role `treeitem`.
- Each item has `aria-setsize` equal to the number of items in the column.
- Each item has `aria-level` equal to the column index.
- The selected item has `aria-selected="true"`.
- The disabled item has `aria-disabled="true"`.
- The search input has role `searchbox`.

## Props

### `<MultiCascadeTree>`

| Property              | Type`(Default)`                                                                    | Description                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| cascade               | boolean `(true)`                                                                   | Determines whether selection should cascade both from parent to child and child to parent nodes. |
| childrenKey           | string `('children')`                                                              | Defines the key used to access child nodes in the data.                                          |
| classPrefix           | string `('multi-cascade-tree')`                                                    | Sets the CSS class prefix for the component.                                                     |
| columnHeight          | number                                                                             | Specifies the height of each column.                                                             |
| columnWidth           | number                                                                             | Specifies the width of each column.                                                              |
| data \*               | [ItemDataType][item][]                                                             | Defines the data structure used by the component.                                                |
| defaultValue          | string[]                                                                           | Specifies the default selected values.                                                           |
| disabledItemValues    | string[]                                                                           | Defines the items that should be disabled.                                                       |
| getChildren           | (item: [ItemDataType][item]) => Promise&lt;[ItemDataType][item][]&gt;              | Asynchronously loads the children of a tree node.                                                |
| labelKey              | string `('label')`                                                                 | Defines the key used to access labels in the data.                                               |
| onChange              | (value: string[], event) => void                                                   | Callback triggered when the selected value changes.                                              |
| onSearch              | (value: string, event) => void                                                     | Callback triggered when the search value changes.                                                |
| onSelect              | (item: [ItemDataType][item], selectedPaths: [ItemDataType][item][], event) => void | Callback triggered when an item is selected.                                                     |
| renderColumn          | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode          | Customizes the rendering of each column.                                                         |
| renderTreeNode        | (node: ReactNode, item: [ItemDataType][item]) => ReactNode                         | Customizes the rendering of each tree node.                                                      |
| searchable            | boolean                                                                            | Determines whether the search functionality is enabled.                                          |
| uncheckableItemValues | string[]                                                                           | Specifies the items that cannot be checked.                                                      |
| value                 | string[]                                                                           | Defines the currently selected values (controlled component).                                    |
| valueKey              | string `('value')`                                                                 | Defines the key used to access values in the data.                                               |

<!--{include:(_common/types/item-data-type.md)}-->

[item]: #code-ts-item-data-type-code
