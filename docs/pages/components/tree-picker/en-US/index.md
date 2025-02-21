# TreePicker

`<TreePicker>` Selector component, tree single selector.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Size

<!--{include:`size.md`}-->

### Placement

<!--{include:`placement.md`}-->

### Disabled and Read only

<!--{include:`disabled.md`}-->

### Disable Search

<!--{include:`searchable.md`}-->

### Custom options

<!--{include:`custom.md`}-->

### Async

<!--{include:`async.md`}-->

### Extra footer

<!--{include:`extra-footer.md`}-->

## Accessibility

### ARIA properties

**combobox**

- TreePicker has role `combobox`.
- Has the `aria-haspopup="tree"` attribute to indicate that the combobox has a popup tree.
- Has the `aria-controls` attribute to indicate the ID of the tree element.
- Has the `aria-activedescendant` attribute to indicate the ID of the focused tree node.
- When `label` is set, the `aria-labelledby` attribute is added to the combobox element and the tree element and is set to the value of the `id` attribute of `label`.

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
- <kbd>Esc</kbd> - Close the tree.

## Props

### `<TreePicker>`

| Property                | Type `(Default)`                                                                              | Description                                                |
| ----------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| appearance              | 'default' \| 'subtle' `('default')`                                                           | Component appearance                                       |
| block                   | boolean                                                                                       | Whether to take up the full width of its parent            |
| caretAs                 | ElementType                                                                                   | Custom component for the caret icon                        |
| childrenKey             | string `('children')`                                                                         | Set the `key` of the child node of the tree node in `data` |
| classPrefix             | string`('picker')`                                                                            | The prefix of the component CSS class                      |
| cleanable               | boolean `(true)`                                                                              | Whether to display the clear button                        |
| container               | HTMLElement \| (() => HTMLElement)                                                            | Sets the rendering container                               |
| data \*                 | [TreeNode][node][]                                                                            | Data to render the tree                                    |
| defaultExpandAll        | boolean                                                                                       | Default expand all nodes                                   |
| defaultExpandItemValues | string[]                                                                                      | Set the value of the default expanded node                 |
| defaultOpen             | boolean                                                                                       | Default open                                               |
| defaultValue            | string                                                                                        | Default selected value                                     |
| disabled                | boolean                                                                                       | Whether to disable the component                           |
| disabledItemValues      | string[]                                                                                      | Set the value of the disabled node                         |
| expandItemValues        | string[]                                                                                      | Set the value of the expanded node (controlled)            |
| getChildren             | (node: [TreeNode][node]) => Promise&lt;[TreeNode][node]&gt;                                   | Load node children data asynchronously                     |
| labelKey                | string `('label')`                                                                            | Set the tree node display content to the `key` in `data`   |
| listProps               | [ListProps][listprops]                                                                        | Properties of virtualized lists.                           |
| loading                 | boolean `(false)`                                                                             | Whether to display a loading state indicator               |
| locale                  | [PickerLocaleType](/guide/i18n/#pickers)                                                      | Localization configuration                                 |
| onChange                | (value:string) => void                                                                        | Called when the tree value changes                         |
| onClean                 | (event) => void                                                                               | Called when the clear button is clicked                    |
| onClose                 | () => void                                                                                    | Called when the popup is closed                            |
| onEnter                 | () => void                                                                                    | Called when the popup is about to open                     |
| onEntered               | () => void                                                                                    | Called when the popup is opened                            |
| onEntering              | () => void                                                                                    | Called when popup opening is in progress                   |
| onExit                  | () => void                                                                                    | Called when the popup is about to close                    |
| onExited                | () => void                                                                                    | Called when the popup is closed                            |
| onExiting               | () => void                                                                                    | Called when popup closing is in progress                   |
| onExpand                | (expandItemValues: string[], node:[TreeNode][node], concat:(data, children) => Array) => void | Called when the tree node expand state changes             |
| onOpen                  | () => void                                                                                    | Called when the popup is opened                            |
| onSearch                | (searchKeyword: string, event) => void                                                        | Called when the search box input changes                   |
| onSelect                | (node:[TreeNode][node], value: string, event) => void                                         | Called when the tree node is selected                      |
| open                    | boolean                                                                                       | Controlled open state                                      |
| placeholder             | ReactNode `('Select')`                                                                        | The placeholder for the component                          |
| placement               | [Placement](#code-ts-placement-code)`('bottomStart')`                                         | The placement of the popup                                 |
| popupClassName          | string                                                                                        | Custom class for the popup                                 |
| popupStyle              | CSSProperties                                                                                 | Custom style for the popup                                 |
| renderExtraFooter       | () => ReactNode                                                                               | Custom render extra footer                                 |
| renderTree              | (tree:ReactNode) => ReactNode                                                                 | Custom render tree                                         |
| renderTreeIcon          | (node: [TreeNode][node], expanded: boolean) => ReactNode                                      | Custom render tree node icon                               |
| renderTreeNode          | (node: [TreeNode][node]) => ReactNode                                                         | Custom render tree node                                    |
| renderValue             | (value: string, node:[TreeNode][node], selectedElement:ReactNode) => ReactNode                | Custom render selected value                               |
| searchable              | boolean `(true)`                                                                              | Whether to show the search box                             |
| searchBy                | (keyword: string, label: ReactNode, node: [TreeNode][node]) => boolean                        | Custom search method                                       |
| size                    | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                                         | A picker can have different sizes                          |
| toggleAs                | ElementType `('a')`                                                                           | Custom component for the toggle button                     |
| treeHeight              | number `(320)`                                                                                | The height of the tree                                     |
| value                   | string                                                                                        | Set the selected value                                     |
| valueKey                | string `('value')`                                                                            | Set the tree node value to the `key` in `data`             |
| virtualized             | boolean                                                                                       | Whether using Virtualized List                             |

<!--{include:(_common/types/tree-node.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

## Related components

- [`<CheckTreePicker>`](/components/check-tree-picker) Selector component, which supports a Checkbox on the Treepicker node for multiple selections.
- [`<Tree>`](/components/tree) Used to show a tree-structured data.
- [`<CheckTree>`](/components/check-tree) Used to show a tree-structured data while supporting Checkbox selection.

[listprops]: #code-ts-list-props-code
[node]: #code-ts-tree-node-code
