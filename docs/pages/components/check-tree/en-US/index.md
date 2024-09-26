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

### Scroll Shadows

<!--{include:`scroll-shadow.md`}-->

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

| Property                | Type `(Default)`                                                                               | Description                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| cascade                 | boolean `(true)`                                                                               | Whether to enable cascade selection                        |
| childrenKey             | string `('children')`                                                                          | Set the `key` of the child node of the tree node in `data` |
| data \*                 | [TreeNode][node][]                                                                             | Data to render the tree                                    |
| defaultExpandAll        | boolean                                                                                        | Default expand all nodes                                   |
| defaultExpandItemValues | string[]                                                                                       | Set the value of the default expanded node                 |
| defaultValue            | string[]                                                                                       | Default selected Value                                     |
| disabledItemValues      | string[]                                                                                       | Disabled tree node values                                  |
| expandItemValues        | string[]                                                                                       | Set the value of the expanded node (controlled)            |
| getChildren             | (item: [TreeNode][node]) => Promise&lt;[TreeNode][node]&gt;                                    | Load node children data asynchronously                     |
| height                  | number `(360px)`                                                                               | The height of the tree                                     |
| labelKey                | string `('label')`                                                                             | Set the tree node display content to the `key` in `data`   |
| listProps               | [ListProps][listprops]                                                                         | Properties of virtualized lists                            |
| onChange                | (values:string[]) => void                                                                      | Called when the tree value changes                         |
| onExpand                | (expandItemValues: string[], item: [TreeNode][node], concat:(data, children) => Array) => void | Called when the tree node expands the child node           |
| onSearch                | (keyword: string) => void                                                                      | Called when the search box changes                         |
| onSelect                | (item: [TreeNode][node], value:string, event) => void                                          | Called when the tree node is selected                      |
| renderTreeIcon          | (item: [TreeNode][node], expanded: boolean) => ReactNode                                       | Custom render the icon in tree node                        |
| renderTreeNode          | (item: [TreeNode][node]) => ReactNode                                                          | Custom render tree node                                    |
| scrollShadow            | boolean                                                                                        | The shadow of the content when scrolling<br/>![][5.62.0]   |
| searchable              | boolean                                                                                        | Whether to show the search box <br/>![][5.61.0]            |
| searchKeyword           | string                                                                                         | Set search keywords for the search box                     |
| uncheckableItemValues   | string[]                                                                                       | Set the tree node values that do not display checkboxes    |
| value                   | string[]                                                                                       | The value of the selected tree node                        |
| valueKey                | string `('value')`                                                                             | Set the `key` of the tree node value in `data`             |
| virtualized             | boolean                                                                                        | Whether to enable virtualized lists                        |

<!--{include:(_common/types/tree-node.md)}-->
<!--{include:(_common/types/list-props.md)}-->

## Related components

- [`<Tree>`](/components/tree)
- [`<TreePicker>`](/components/tree-picker)
- [`<CheckTreePicker>`](/components/check-tree-picker)

[listprops]: #code-ts-list-props-code
[node]: #code-ts-tree-node-code
[5.61.0]: https://img.shields.io/badge/>=-v5.61.0-blue
[5.62.0]: https://img.shields.io/badge/>=-v5.62.0-blue
