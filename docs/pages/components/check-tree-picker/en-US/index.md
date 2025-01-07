# CheckTreePicker

CheckTreePicker are supported in multiple selectors for multiple selection of complex data structures.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Size

<!--{include:`size.md`}-->

### Cascade

The cascade attribute can set whether or not CheckTreePicker can consider the cascade relationship of the parent parent when selecting. The default value is true.

<!--{include:`cascade.md`}-->

### Placement

<!--{include:`placement.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Custom options

<!--{include:`custom.md`}-->

### Async

<!--{include:`async.md`}-->

### Extra footer

<!--{include:`extra-footer.md`}-->

## Accessibility

### ARIA properties

**combobox**

- CheckTreePicker has role `combobox`.
- Has the `aria-haspopup="tree"` attribute to indicate that the combobox has a popup tree.
- Has the `aria-controls` attribute to indicate the ID of the tree element.
- Has the `aria-activedescendant` attribute to indicate the ID of the focused tree node.
- When `label` is set, the `aria-labelledby` attribute is added to the combobox element and the tree element and is set to the value of the `id` attribute of `label`.

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
- <kbd>Esc</kbd> - Close the tree.

## Props

### `<CheckTreePicker>`

| Property                | Type `(Default)`                                                                               | Description                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| appearance              | 'default' \| 'subtle' `('default')`                                                            | The appearance of the component                            |
| block                   | boolean                                                                                        | Whether to take up the full width of the parent container  |
| caretAs                 | ElementType                                                                                    | Custom component for the caret icon                        |
| cascade                 | boolean                                                                                        | Whether to enable cascade selection                        |
| childrenKey             | string `('children')`                                                                          | Set the `key` of the child node of the tree node in `data` |
| cleanable               | boolean `(true)`                                                                               | Whether to display the clear button                        |
| container               | HTMLElement \| (() => HTMLElement)                                                             | Specify the container for the popup                        |
| countable               | boolean `(true)`                                                                               | Whether to display the number of selected tree node        |
| data \*                 | [TreeNode][node][]                                                                             | Data to render the tree                                    |
| defaultExpandAll        | boolean                                                                                        | Default expand all nodes                                   |
| defaultExpandItemValues | string[]                                                                                       | Set the value of the default expanded node                 |
| defaultValue            | string[]                                                                                       | Default selected Value                                     |
| disabled                | boolean                                                                                        | Whether the component is disabled                          |
| disabledItemValues      | string[]                                                                                       | Disabled tree node values                                  |
| expandItemValues        | string[]                                                                                       | Set the value of the expanded node (controlled)            |
| getChildren             | (item: [TreeNode][node]) => Promise&lt;[TreeNode][node]&gt;                                    | Load node children data asynchronously                     |
| labelKey                | string `('label')`                                                                             | Set the tree node display content to the `key` in `data`   |
| listProps               | [ListProps][listprops]                                                                         | Properties of virtualized lists                            |
| loading                 | boolean `(false)`                                                                              | Whether the component is in a loading state                |
| locale                  | [PickerLocaleType](/guide/i18n/#pickers)                                                       | Localization configuration                                 |
| onChange                | (values:string[]) => void                                                                      | Called when the tree value changes                         |
| onClean                 | (event:SyntheticEvent) => void                                                                 | Called when the clear button is clicked                    |
| onClose                 | () => void                                                                                     | Called when the popup is closed                            |
| onEnter                 | () => void                                                                                     | Called when the popup is about to open                     |
| onEntered               | () => void                                                                                     | Called when the popup is opened                            |
| onEntering              | () => void                                                                                     | Called when popup opening is in progress                   |
| onExit                  | () => void                                                                                     | Called when the popup is about to close                    |
| onExited                | () => void                                                                                     | Called when the popup is closed                            |
| onExiting               | () => void                                                                                     | Called when popup closing is in progress                   |
| onExpand                | (expandItemValues: string[], item: [TreeNode][node], concat:(data, children) => Array) => void | Called when the tree node expands the child node           |
| onOpen                  | () => void                                                                                     | Called when the popup is opened                            |
| onSearch                | (searchKeyword:string, event) => void                                                          | Called when the search box input changes                   |
| onSelect                | (item:[TreeNode][node], value:string, event) => void                                           | Called when the tree node is selected                      |
| open                    | boolean                                                                                        | Whether the popup is displayed                             |
| placeholder             | ReactNode `('Select')`                                                                         | Placeholder content when there is no value                 |
| placement               | [Placement](#code-ts-placement-code) `('bottomStart')`                                         | The placement of the popup                                 |
| popupClassName          | string                                                                                         | Custom class name for the popup                            |
| popupStyle              | CSSProperties                                                                                  | Custom style for the popup                                 |
| preventOverflow         | boolean                                                                                        | Prevent popup element overflow                             |
| renderExtraFooter       | () => ReactNode                                                                                | Custom render extra footer                                 |
| renderTree              | (tree:ReactNode) => ReactNode                                                                  | Custom render tree                                         |
| renderTreeIcon          | (item:[TreeNode][node], expanded: boolean) => ReactNode                                        | Custom render tree node icon                               |
| renderTreeNode          | (item:[TreeNode][node]) => ReactNode                                                           | Custom render tree node                                    |
| renderValue             | (values:string[], checkedItems:[TreeNode][node][],selectedElement: ReactNode) => ReactNode     | Custom render selected items                               |
| searchable              | boolean `(true)`                                                                               | Whether display search input box                           |
| searchBy                | (keyword: string, label: ReactNode, item: [TreeNode][node]) => boolean                         | Custom search method                                       |
| size                    | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                                          | The size of the component                                  |
| toggleAs                | ElementType `('a')`                                                                            | Custom component for the toggle button                     |
| treeHeight              | number `(320)`                                                                                 | The height of the tree                                     |
| uncheckableItemValues   | string[]                                                                                       | Set the tree node values that do not display checkboxes    |
| value                   | string[]                                                                                       | Selected value                                             |
| valueKey                | string `('value')`                                                                             | Set the `key` of the tree node value in `data`             |
| virtualized             | boolean                                                                                        | Whether to enable virtualized lists                        |

<!--{include:(_common/types/tree-node.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

## Related Components

- [`<CheckTree>`](/components/check-tree)
- [`<Tree>`](/components/tree)
- [`<TreePicker>`](/components/tree-picker)

[listprops]: #code-ts-list-props-code
[node]: #code-ts-tree-node-code
