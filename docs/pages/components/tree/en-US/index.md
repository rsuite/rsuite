# Tree

`<Tree>` Used to show a tree-structured data.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Show Indent Lines

<!--{include:`show-indent-line.md`}-->

### Custom Tree Node

<!--{include:`custom.md`}-->

### Draggable

<!--{include:`draggable.md`}-->

### Virtualized

<!--{include:`virtualized.md`}-->

### Asynchronous Loading of Child Nodes

<!--{include:`async.md`}-->

### Searchable

<!--{include:`searchable.md`}-->

### Disabled Tree Node

<!--{include:`disabled.md`}-->

### Scroll Shadows

<!--{include:`scroll-shadow.md`}-->

## Accessibility

### ARIA properties

**tree**

- Tree has role `tree`.

**treeitem**

- Tree node has role `treeitem`.
- Has the `aria-expanded` attribute to indicate whether the tree is open or not.
- Has the `aria-selected` attribute to indicate whether the tree node is selected or not.
- Has the `aria-level` attribute to indicate the level of the tree node.
- Has the `aria-disabled` attribute to indicate whether the tree node is disabled or not.

### Keyboard interactions

- <kbd>↓</kbd> - Move focus to the next tree node.
- <kbd>↑</kbd> - Move focus to the previous tree node.
- <kbd>→</kbd> - Expand the focused tree node if it is collapsed.
- <kbd>←</kbd> - Collapse the focused tree node if it is expanded.
- <kbd>Enter</kbd> - Select the focused tree node.

## Props

### `<Tree>`

| Property                | Type `(Default)`                                                                            | Description                                                |
| ----------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| childrenKey             | string `('children')`                                                                       | Set the `key` of the child node of the tree node in `data` |
| classPrefix             | string`('picker')`                                                                          | The prefix of the component CSS class                      |
| data \*                 | [TreeNode][node][]                                                                          | Data to render the tree                                    |
| defaultExpandAll        | boolean                                                                                     | Default expand all nodes                                   |
| defaultExpandItemValues | string[]                                                                                    | Set the value of the default expanded node                 |
| defaultValue            | string                                                                                      | Default selected Value                                     |
| disabledItemValues      | string[]                                                                                    | Disabled tree node values                                  |
| draggable               | boolean                                                                                     | Whether to enable drag and drop                            |
| expandItemValues        | string[]                                                                                    | Set the value of the expanded node (controlled)            |
| getChildren             | (node: [TreeNode][node]) => Promise&lt;[TreeNode][node] &gt;                                | Load node children data asynchronously                     |
| height                  | number `(360px)`                                                                            | The height of the tree                                     |
| labelKey                | string `('label')`                                                                          | Set the tree node display content to the `key` in `data`   |
| listProps               | [ListProps][listprops]                                                                      | Properties of virtualized lists                            |
| onChange                | (value:string) => void                                                                      | Called when the tree value changes                         |
| onDragEnd               | (node: [TreeNode][node], event) => void                                                     | Called when drag ends                                      |
| onDragEnter             | (node: [TreeNode][node], event) => void                                                     | Called when drag enters a node                             |
| onDragLeave             | (node: [TreeNode][node], event) => void                                                     | Called when drag leaves a node                             |
| onDragOver              | (node: [TreeNode][node], event) => void                                                     | Called when drag over a node                               |
| onDragStart             | (node: [TreeNode][node], event) => void                                                     | Called when drag start                                     |
| onDrop                  | (dropData: [DropDataType][drop], event) => void                                             | Called when drop                                           |
| onExpand                | (expandItemValues: string[], node: [TreeNode][node], concat:(data, children) => []) => void | Called when the tree node expand state changes             |
| onSearch                | (keyword: string) => void                                                                   | Called when the search box input changes                   |
| onSelect                | (node: [TreeNode][node], value, event) => void                                              | Called when the tree node is selected                      |
| renderTreeIcon          | (node: [TreeNode][node], expanded: boolean) => ReactNode                                    | Custom render tree node icon                               |
| renderTreeNode          | (node: [TreeNode][node]) => ReactNode                                                       | Custom render tree node                                    |
| scrollShadow            | boolean                                                                                     | The shadow of the content when scrolling<br/>![][5.62.0]   |
| searchable              | boolean                                                                                     | Whether to show the search box <br/>![][5.61.0]            |
| searchKeyword           | string                                                                                      | Set search keywords for the search box                     |
| showIndentLine          | boolean                                                                                     | Whether to show the indent line                            |
| value                   | string                                                                                      | Set the current selected value                             |
| valueKey                | string `('value')`                                                                          | Set the tree node value to the `key` in `data`             |
| virtualized             | boolean                                                                                     | Whether using Virtualized List                             |

<!--{include:(_common/types/tree-node.md)}-->
<!--{include:(_common/types/list-props.md)}-->
<!--{include:(components/tree/fragments/drop-data-type.md)}-->

## Related components

- [`<CheckTree>`](/components/check-tree) Selector component, which supports a Checkbox on the TreePicker node for multiple selections.
- [`<TreePicker>`](/components/tree-picker) Used to show a tree-structured data.
- [`<CheckTreePicker>`](/components/check-tree-picker) Used to show a tree-structured data while supporting Checkbox selection.

[listprops]: #code-ts-list-props-code
[node]: #code-ts-tree-node-code
[drop]: #code-ts-drop-data-type-code
[5.61.0]: https://img.shields.io/badge/>=-v5.61.0-blue
[5.62.0]: https://img.shields.io/badge/>=-v5.62.0-blue
