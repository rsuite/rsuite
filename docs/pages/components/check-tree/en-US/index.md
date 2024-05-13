# CheckTree

`<CheckTree>` is used to display a tree structure data and supports Checkbox selection.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Cascade

The cascade attribute can set whether or not CheckTree can consider the cascade relationship of the parent parent when selecting. The default value is true.

<!--{include:`cascade.md`}-->

### Show Indent Lines

<!--{include:`show-indent-line.md`}-->

### Custom Tree Node

<!--{include:`custom.md`}-->

### Virtualized

<!--{include:`virtualized.md`}-->

### Asynchronous Loading of Child Nodes

<!--{include:`async.md`}-->

### Searchable

<!--{include:`searchable.md`}-->

### Uncheckable Tree Node

<!--{include:`uncheckable.md`}-->

### Disabled Tree Node

<!--{include:`disabled.md`}-->

## Accessibility

### ARIA properties

**tree**

- CheckTree has role `tree`.
- CheckTree has the `aria-multiselectable=true` attribute to indicate that the tree is multi-selectable.

**treeitem**

- CheckTree node has role `treeitem`.
- Has the `aria-expanded` attribute to indicate whether the tree is open or not.
- Has the `aria-checked` attribute to indicate whether the tree node is checked or not.
- Has the `aria-level` attribute to indicate the level of the tree node.
- Has the `aria-disabled` attribute to indicate whether the tree node is disabled or not.

### Keyboard interactions

- <kbd>↓</kbd> - Move focus to the next tree node.
- <kbd>↑</kbd> - Move focus to the previous tree node.
- <kbd>→</kbd> - Expand the focused tree node if it is collapsed.
- <kbd>←</kbd> - Collapse the focused tree node if it is expanded.
- <kbd>Enter</kbd> - Select the focused tree node.

## Props

### `<CheckTree>`

| Property                | Type `(Default)`                                                                             | Description                                                               |
| ----------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| cascade                 | boolean `(true)`                                                                             | Whether cascade select                                                    |
| childKey                | string `('children')`                                                                        | Set childrenKey key in data                                               |
| data \*                 | [TreeNode][node][]                                                                           | Tree data                                                                 |
| defaultExpandAll        | boolean                                                                                      | Expand all tree node                                                      |
| defaultExpandItemValues | any []                                                                                       | Set the value of the default expanded node                                |
| defaultValue            | string[]                                                                                     | Default values of the selected tree node                                  |
| disabledItemValues      | string[]                                                                                     | Values of disabled tree node                                              |
| expandItemValues        | any []                                                                                       | Set the value of the expanded node (controlled)                           |
| getChildren             | (item: [TreeNode][node]) => Promise&lt;[TreeNode][node]&gt;                                  | load node children data asynchronously                                    |
| height                  | number `(360px)`                                                                             | height of menu. When `virtualize` is true, you can set the height of menu |
| labelKey                | string `('label')`                                                                           | Set label key in data                                                     |
| listProps               | [ListProps][listprops]                                                                       | Properties of virtualized lists.                                          |
| onChange                | (values:string[]) => void                                                                    | Callback fired when value change                                          |
| onExpand                | (expandItemValues: any [], item: [TreeNode][node], concat:(data, children) => Array) => void | callback fired when tree node expand state changed                        |
| onSearch                | (keyword: string) => void                                                                    | Callback function for search                                              |
| onSelect                | (item: [TreeNode][node], value:any, event) => void                                           | Callback fired when tree node is selected                                 |
| renderTreeIcon          | (item: [TreeNode][node], expanded: boolean) => ReactNode                                     | Custom render the icon in tree node                                       |
| renderTreeNode          | (item: [TreeNode][node]) => ReactNode                                                        | Custom render tree node                                                   |
| searchable              | boolean                                                                                      | Whether to show the search box                                            |
| searchKeyword           | string                                                                                       | searchKeyword (Controlled)                                                |
| uncheckableItemValues   | string[]                                                                                     | Set the option value for the check box not to be rendered                 |
| value                   | string[]                                                                                     | Specifies the values of the selected tree node (Controlled)               |
| valueKey                | string `('value')`                                                                           | Set value key in data                                                     |
| virtualized             | boolean                                                                                      | Whether using Virtualized List                                            |

<!--{include:(_common/types/tree-node.md)}-->
<!--{include:(_common/types/list-props.md)}-->

## Related components

- [`<Tree>`](/components/tree)
- [`<TreePicker>`](/components/tree-picker)
- [`<CheckTreePicker>`](/components/check-tree-picker)

[listprops]: #code-ts-list-props-code
[node]: #code-ts-tree-node-code
