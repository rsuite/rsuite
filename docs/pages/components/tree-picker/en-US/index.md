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

### Custom Option

<!--{include:`custom.md`}-->

### Async

<!--{include:`async.md`}-->

### Extra footer

<!--{include:`extra-footer.md`}-->

## Accessibility

### ARIA properties

- TreePicker has role `combobox`.
- Has the `aria-haspopup="tree"` attribute to indicate that the combobox has a popup tree.
- Has the `aria-expanded` attribute to indicate whether the tree is open or not.
- Has the `aria-controls` attribute to indicate the ID of the tree element.
- Has the `aria-activedescendant` attribute to indicate the ID of the focused tree node.
- When `label` is set, the `aria-labelledby` attribute is added to the combobox element and the tree element and is set to the value of the `id` attribute of `label`.

### Keyboard interactions

- <kbd>↓</kbd> - Move focus to the next tree node.
- <kbd>↑</kbd> - Move focus to the previous tree node.
- <kbd>→</kbd> - Expand the focused tree node if it is collapsed.
- <kbd>←</kbd> - Collapse the focused tree node if it is expanded.
- <kbd>Enter</kbd> - Select the focused tree node.
- <kbd>Esc</kbd> - Close the tree.

## Props

### `<TreePicker>`

| Property                | Type `(Default)`                                                                              | Description                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| appearance              | 'default' \| 'subtle' `('default')`                                                           | Set picker appearence                                       |
| block                   | boolean                                                                                       | Blocking an entire row                                      |
| caretAs                 | ElementType                                                                                   | Custom component for the caret icon                         |
| childrenKey             | string `('children')`                                                                         | Tree data structure Children property name                  |
| classPrefix             | string`('picker')`                                                                            | The prefix of the component CSS class                       |
| cleanable               | boolean `(true)`                                                                              | Set whether you can clear                                   |
| container               | HTMLElement \| (() => HTMLElement)                                                            | Sets the rendering container                                |
| data \*                 | [TreeNode][node][]                                                                            | Tree data                                                   |
| defaultExpandAll        | boolean                                                                                       | Expand all nodes By default                                 |
| defaultExpandItemValues | string[]                                                                                      | Set the value of the default expanded node                  |
| defaultOpen             | boolean                                                                                       | Open by default                                             |
| defaultValue            | string                                                                                        | Default selected Value                                      |
| disabled                | boolean                                                                                       | Whether to disable Picker                                   |
| disabledItemValues      | string[]                                                                                      | Disable item by value                                       |
| expandItemValues        | string[]                                                                                      | Set the value of the expanded node (controlled)             |
| getChildren             | (node: [TreeNode][node]) => Promise&lt;[TreeNode][node]&gt;                                   | load node children data asynchronously                      |
| ~height~                | number                                                                                        | ⚠️`[Deprecated]` Use `treeHeight` instead                   |
| labelKey                | string `('label')`                                                                            | Tree data structure Label property name                     |
| listProps               | [ListProps][listprops]                                                                        | Properties of virtualized lists.                            |
| loading                 | boolean `(false)`                                                                             | Whether to display a loading state indicator                |
| locale                  | [PickerLocaleType](/guide/i18n/#pickers)                                                      | Locale text                                                 |
| ~menuClassName~         | string                                                                                        | ⚠️`[Deprecated]` Use `popupClassName` instead               |
| ~menuStyle~             | CSSProperties                                                                                 | ⚠️`[Deprecated]` Use `popupStyle` instead                   |
| onChange                | (value:string) => void                                                                        | Callback function for data change                           |
| onClean                 | (event) => void                                                                               | Callback fired when value clean                             |
| onClose                 | () => void                                                                                    | Close Dropdown callback functions                           |
| onEnter                 | () => void                                                                                    | Callback fired before the overlay transitions in            |
| onEntered               | () => void                                                                                    | Callback fired after the overlay finishes transitioning in  |
| onEntering              | () => void                                                                                    | Callback fired as the overlay begins to transition in       |
| onExit                  | () => void                                                                                    | Callback fired right before the overlay transitions out     |
| onExited                | () => void                                                                                    | Callback fired after the overlay finishes transitioning out |
| onExiting               | () => void                                                                                    | Callback fired as the overlay begins to transition out      |
| onExpand                | (expandItemValues: string[], item:[TreeNode][node], concat:(data, children) => Array) => void | Callback When tree node is displayed                        |
| onOpen                  | () => void                                                                                    | Open Dropdown callback function                             |
| onSearch                | (searchKeyword: string, event) => void                                                        | Callback function for search                                |
| onSelect                | (item:[TreeNode][node], value: string, event) => void                                         | Callback function after selecting tree node                 |
| open                    | boolean                                                                                       | Open (Controlled)                                           |
| placeholder             | ReactNode `('Select')`                                                                        | Placeholder                                                 |
| placement               | [Placement](#code-ts-placement-code)`('bottomStart')`                                         | Expand placement                                            |
| popupClassName          | string                                                                                        | Custom class name for the popup                             |
| popupStyle              | CSSProperties                                                                                 | Custom style for the popup                                  |
| renderExtraFooter       | () => ReactNode                                                                               | Customizing footer Content                                  |
| renderTreeIcon          | (item: [TreeNode][node], expanded: boolean) => ReactNode                                                         | Custom render icon                                          |
| renderTreeNode          | (item: [TreeNode][node]) => ReactNode                                                         | Custom render tree Node                                     |
| renderValue             | (value: string,item:[TreeNode][node], selectedElement:ReactNode) => ReactNode                 | Custom render selected value                                |
| searchable              | boolean `(true)`                                                                              | Whether to show the search box                              |
| searchBy                | (keyword: string, label: ReactNode, item: [TreeNode][node]) => boolean                        | Custom search rules                                         |
| size                    | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                                         | A picker can have different sizes                           |
| toggleAs                | ElementType `('a')`                                                                           | You can use a custom element for this component             |
| treeHeight              | number `(320)`                                                                                | The height of the tree                                      |
| value                   | string                                                                                        | Selected value                                              |
| valueKey                | string `('value')`                                                                            | Tree data Structure Value property name                     |
| virtualized             | boolean                                                                                       | Whether using Virtualized List                              |

<!--{include:(_common/types/tree-node.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

## Related components

- [`<CheckTreePicker>`](/components/check-tree-picker) Selector component, which supports a Checkbox on the Treepicker node for multiple selections.
- [`<Tree>`](/components/tree) Used to show a tree-structured data.
- [`<CheckTree>`](/components/check-tree) Used to show a tree-structured data while supporting Checkbox selection.

[listprops]: #code-ts-list-props-code
[node]: #code-ts-tree-node-code
