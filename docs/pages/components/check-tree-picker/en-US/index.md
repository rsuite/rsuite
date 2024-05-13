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

| Property                | Type `(Default)`                                                                               | Description                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| appearance              | 'default' \| 'subtle' `('default')`                                                            | Set picker appearence                                       |
| block                   | boolean                                                                                        | Blocking an entire row                                      |
| caretAs                 | ElementType                                                                                    | Custom component for the caret icon                         |
| cascade                 | boolean                                                                                        | whether cascade select                                      |
| childrenKey             | string `('children')`                                                                          | set children key in data                                    |
| cleanable               | boolean `(true)`                                                                               | whether the selected value can be cleared                   |
| container               | HTMLElement \| (() => HTMLElement)                                                             | Sets the rendering container                                |
| countable               | boolean `(true)`                                                                               | whether display counts of checkItems                        |
| data \*                 | [TreeNode][node][]                                                                             | tree data                                                   |
| defaultExpandAll        | boolean                                                                                        | expand all tree node                                        |
| defaultExpandItemValues | string[]                                                                                       | Set the value of the default expanded node                  |
| defaultValue            | string[]                                                                                       | (UnControlled) default values of the selected tree node     |
| disabled                | boolean                                                                                        | Whether to disable Picker                                   |
| disabledItemValues      | string[]                                                                                       | Disable item by value                                       |
| expandItemValues        | string[]                                                                                       | Set the value of the expanded node (controlled)             |
| getChildren             | (item: [TreeNode][node]) => Promise&lt;[TreeNode][node]&gt;                                    | load node children data asynchronously                      |
| ~height~                | number                                                                                         | ⚠️`[Deprecated]` Use `treeHeight` instead                   |
| labelKey                | string `('label')`                                                                             | set label key in data                                       |
| listProps               | [ListProps][listprops]                                                                         | Properties of virtualized lists.                            |
| loading                 | boolean `(false)`                                                                              | Whether to display a loading state indicator                |
| locale                  | [PickerLocaleType](/guide/i18n/#pickers)                                                       | Locale text                                                 |
| ~menuClassName~         | string                                                                                         | ⚠️`[Deprecated]` Use `popupClassName` instead               |
| ~menuStyle~             | CSSProperties                                                                                  | ⚠️`[Deprecated]` Use `popupStyle` instead                   |
| onChange                | (values:string[]) => void                                                                      | Callback fired when value change                            |
| onClean                 | (event:SyntheticEvent) => void                                                                 | Callback fired when value clean                             |
| onClose                 | () => void                                                                                     | Callback fired when close component                         |
| onEnter                 | () => void                                                                                     | Callback fired before the overlay transitions in            |
| onEntered               | () => void                                                                                     | Callback fired after the overlay finishes transitioning in  |
| onEntering              | () => void                                                                                     | Callback fired as the overlay begins to transition in       |
| onExit                  | () => void                                                                                     | Callback fired right before the overlay transitions out     |
| onExited                | () => void                                                                                     | Callback fired after the overlay finishes transitioning out |
| onExiting               | () => void                                                                                     | Callback fired as the overlay begins to transition out      |
| onExpand                | (expandItemValues: string[], item: [TreeNode][node], concat:(data, children) => Array) => void | Callback fired when tree node expand state changed          |
| onOpen                  | () => void                                                                                     | Callback fired when open component                          |
| onSearch                | (searchKeyword:string, event) => void                                                          | Callback fired when search                                  |
| onSelect                | (item:[TreeNode][node], value:string, event) => void                                           | Callback fired when tree node is selected                   |
| open                    | boolean                                                                                        | Whether open the component                                  |
| placeholder             | ReactNode `('Select')`                                                                         | Setting placeholders                                        |
| placement               | [Placement](#code-ts-placement-code) `('bottomStart')`                                         | Placement of component                                      |
| popupClassName          | string                                                                                         | Custom class name for the popup                             |
| popupStyle              | CSSProperties                                                                                  | Custom style for the popup                                  |
| preventOverflow         | boolean                                                                                        | Prevent floating element overflow                           |
| renderExtraFooter       | () => ReactNode                                                                                | Custom render extra footer                                  |
| renderMenu              | (menu:ReactNode) => ReactNode                                                                  | Customizing the Rendering Menu list                         |
| renderTreeIcon          | (item:[TreeNode][node], expanded: boolean) => ReactNode                                        | Custom render the icon of tree node                         |
| renderTreeNode          | (item:[TreeNode][node]) => ReactNode                                                           | Custom render tree node                                     |
| renderValue             | (values:string[], checkedItems:[TreeNode][node][],selectedElement: ReactNode) => ReactNode     | Custom render selected items                                |
| searchable              | boolean `(true)`                                                                               | Whether display search input box                            |
| searchBy                | (keyword: string, label: ReactNode, item: [TreeNode][node]) => boolean                         | Custom search rules                                         |
| size                    | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                                          | A picker can have different sizes                           |
| toggleAs                | ElementType `('a')`                                                                            | You can use a custom element for this component             |
| treeHeight              | number `(320)`                                                                                 | The height of the tree                                      |
| uncheckableItemValues   | string[]                                                                                       | Set the option value for the check box not to be rendered   |
| value                   | string[]                                                                                       | (Controlled) specifies the values of the selected tree node |
| valueKey                | string `('value')`                                                                             | Set value key in data                                       |
| virtualized             | boolean                                                                                        | Whether using Virtualized List                              |

<!--{include:(_common/types/tree-node.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

## Related Components

- [`<CheckTree>`](/components/check-tree)
- [`<Tree>`](/components/tree)
- [`<TreePicker>`](/components/tree-picker)

[listprops]: #code-ts-list-props-code
[node]: #code-ts-tree-node-code
