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

| Property                | Type `(Default)`                                                                               | Description                                                               |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| childrenKey             | string `('children')`                                                                          | Tree data structure Children property name                                |
| classPrefix             | string`('picker')`                                                                             | The prefix of the component CSS class                                     |
| data \*                 | [TreeNode][item][]                                                                             | Tree Data                                                                 |
| defaultExpandAll        | boolean                                                                                        | Expand all nodes By default                                               |
| defaultExpandItemValues | string[]                                                                                       | Set the value of the default expanded node                                |
| defaultValue            | string                                                                                         | Default selected Value                                                    |
| disabledItemValues      | string[]                                                                                       | Disable item by value                                                     |
| draggable               | boolean                                                                                        | Setting drag node                                                         |
| expandItemValues        | string[]                                                                                       | Set the value of the expanded node (controlled)                           |
| getChildren             | (node: [TreeNode][item]) => Promise&lt;[TreeNode][item] &gt;                                   | load node children data asynchronously                                    |
| height                  | number `(360px)`                                                                               | Height of tree. When `virtualize` is true, you can set the height of tree |
| labelKey                | string `('label')`                                                                             | Tree data structure Label property name                                   |
| listProps               | [ListProps][listprops]                                                                         | Properties of virtualized lists.                                          |
| onChange                | (value:string) => void                                                                         | Callback function for data change                                         |
| onDragEnd               | (node: [TreeNode][item], event) => void                                                        | Called when drag ends                                                     |
| onDragEnter             | (node: [TreeNode][item], event) => void                                                        | Called when drag enters a node                                            |
| onDragLeave             | (node: [TreeNode][item], event) => void                                                        | Called when drag leaves a node                                            |
| onDragOver              | (node: [TreeNode][item], event) => void                                                        | Called when drag over a node                                              |
| onDragStart             | (node: [TreeNode][item], event) => void                                                        | Called when drag start                                                    |
| onDrop                  | (dropData: [DropDataType][drop], event) => void                                                | Called when drop                                                          |
| onExpand                | (expandItemValues: string[], node: [TreeNode][item], concat:(data, children) => Array) => void | Callback When tree node is displayed                                      |
| onSearch                | (keyword: string) => void                                                                      | Callback function for search                                              |
| onSelect                | (node:[TreeNode][item], value, event) => void                                                  | Callback function after selecting tree node                               |
| renderTreeIcon          | (node: [TreeNode][item], expanded: boolean) => ReactNode                                       | Custom Render icon                                                        |
| renderTreeNode          | (node: [TreeNode][item]) => ReactNode                                                          | Custom Render tree Node                                                   |
| searchable              | boolean                                                                                        | Whether to show the search box                                            |
| searchKeyword           | string                                                                                         | searchKeyword (Controlled)                                                |
| showIndentLine          | boolean                                                                                        | Whether to show indent line                                               |
| value                   | string                                                                                         | Selected value                                                            |
| valueKey                | string `('value')`                                                                             | Tree data Structure Value property name                                   |
| virtualized             | boolean                                                                                        | Whether using Virtualized List                                            |

<!--{include:(_common/types/tree-node.md)}-->
<!--{include:(_common/types/list-props.md)}-->
<!--{include:(components/tree/fragments/drop-data-type.md)}-->

## Related components

- [`<CheckTree>`](/components/check-tree) Selector component, which supports a Checkbox on the TreePicker node for multiple selections.
- [`<TreePicker>`](/components/tree-picker) Used to show a tree-structured data.
- [`<CheckTreePicker>`](/components/check-tree-picker) Used to show a tree-structured data while supporting Checkbox selection.

[listprops]: #code-ts-list-props-code
[item]: #code-ts-tree-node-code
[drop]: #code-ts-drop-data-type-code
