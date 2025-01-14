# MultiCascader

The `MultiCascader` component is used to select multiple values from cascading options.

## Import

<!--{include:<import-guide>}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Size

<!--{include:`size.md`}-->

### Cascade

<!--{include:`cascade.md`}-->

### Default value

<!--{include:`default-value.md`}-->

### Controlled

<!--{include:`controlled.md`}-->

### Block

<!--{include:`block.md`}-->

### Placement

<!--{include:`placement.md`}-->

> Tip: When set to `auto*`, try to scroll the page, or change the browser size, it will automatically appear in the right place.

### Custom options

<!--{include:`custom.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Uncheckable

<!--{include:`uncheckable.md`}-->

### Async

<!--{include:`async.md`}-->

### Container and prevent overflow

<!--{include:`container.md`}-->

## Accessibility

### ARIA properties

- MultiCascader has role `combobox`.
- Has the `aria-haspopup="tree"` attribute to indicate that the combobox has a popup tree.
- Has the `aria-expanded` attribute to indicate whether the tree is open or not.
- Has the `aria-controls` attribute to indicate the ID of the tree element.
- Has the `aria-activedescendant` attribute to indicate the ID of the focused tree node.
- When `label` is set, the `aria-labelledby` attribute is added to the combobox element and the tree element and is set to the value of the `id` attribute of `label`.
- The tree has the `aria-multiselectable=true` attribute to indicate that the tree is multi-selectable.

### Keyboard interactions

- <kbd>↓</kbd> - Move focus to the next tree node.
- <kbd>↑</kbd> - Move focus to the previous tree node.
- <kbd>→</kbd> - Expand the focused tree node if it is collapsed.
- <kbd>←</kbd> - Collapse the focused tree node if it is expanded.
- <kbd>Enter</kbd> - Select the focused tree node.
- <kbd>Esc</kbd> - Close the tree.

## Props

### `<MultiCascader>`

| Property              | Type`(Default)`                                                                                 | Description                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| appearance            | 'default' &#124; 'subtle' `('default')`                                                         | Sets the appearance of the picker.                                                               |
| block                 | boolean                                                                                         | Blocks the entire row.                                                                           |
| caretAs               | ElementType                                                                                     | Custom component for the caret icon.                                                             |
| cascade               | boolean `(true)`                                                                                | Determines whether selection should cascade both from parent to child and child to parent nodes. |
| childrenKey           | string `('children')`                                                                           | Defines the key used to access child nodes in the data.                                          |
| classPrefix           | string `('picker')`                                                                             | Sets the CSS class prefix for the component.                                                     |
| cleanable             | boolean `(true)`                                                                                | Determines whether the selected value can be cleared.                                            |
| container             | HTMLElement &#124; (() => HTMLElement)                                                          | Sets the rendering container.                                                                    |
| countable             | boolean `(true)`                                                                                | Enables counting of selected options.                                                            |
| data \*               | [ItemDataType][item][]                                                                          | Defines the data structure used by the component.                                                |
| defaultOpen           | boolean                                                                                         | Specifies whether the component is open by default.                                              |
| defaultValue          | string[]                                                                                        | Specifies the default selected values.                                                           |
| disabled              | boolean                                                                                         | Disables the component.                                                                          |
| disabledItemValues    | string                                                                                          | Defines the values of items that should be disabled.                                             |
| height                | number `(320)`                                                                                  | Specifies the height of the dropdown.                                                            |
| inline                | boolean                                                                                         | Displays the menu directly when the component is initialized.                                    |
| labelKey              | string `('label')`                                                                              | Defines the key used to access labels in the data.                                               |
| loading               | boolean `(false)`                                                                               | Determines whether to display a loading state indicator.                                         |
| locale                | [PickerLocaleType](/guide/i18n/#pickers)                                                        | Sets the locale text.                                                                            |
| onChange              | (value: string[], event) => void                                                                | Callback fired when the selected value changes.                                                  |
| onCheck               | (value: string, item: [ItemDataType][item], checked: boolean, event) => void                    | Callback fired after the checkbox state changes.                                                 |
| onClean               | (event) => void                                                                                 | Callback fired when the value is cleared.                                                        |
| onClose               | () => void                                                                                      | Callback fired when the component is closed.                                                     |
| onEnter               | () => void                                                                                      | Callback fired before the overlay transitions in.                                                |
| onEntered             | () => void                                                                                      | Callback fired after the overlay finishes transitioning in.                                      |
| onEntering            | () => void                                                                                      | Callback fired as the overlay begins to transition in.                                           |
| onExit                | () => void                                                                                      | Callback fired right before the overlay transitions out.                                         |
| onExited              | () => void                                                                                      | Callback fired after the overlay finishes transitioning out.                                     |
| onExiting             | () => void                                                                                      | Callback fired as the overlay begins to transition out.                                          |
| onOpen                | () => void                                                                                      | Callback fired when the component is opened.                                                     |
| onSearch              | (searchKeyword: string, event) => void                                                          | Callback function for search.                                                                    |
| onSelect              | (item: [ItemDataType][item], selectedPaths: [ItemDataType][item][], event) => void              | Callback fired when an item is selected.                                                         |
| open                  | boolean                                                                                         | Determines whether the component is open.                                                        |
| placeholder           | ReactNode `('Select')`                                                                          | Sets the placeholder text.                                                                       |
| placement             | [Placement](#code-ts-placement-code)`('bottomStart')`                                           | Sets the placement of the component.                                                             |
| popupClassName        | string                                                                                          | Custom class name for the popup.                                                                 |
| popupStyle            | CSSProperties                                                                                   | Custom style for the popup.                                                                      |
| preventOverflow       | boolean                                                                                         | Prevents the floating element from overflowing.                                                  |
| renderColumn          | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode                       | Customizes the rendering of each column.                                                         |
| renderExtraFooter     | () => ReactNode                                                                                 | Customizes the rendering of the extra footer.                                                    |
| renderTreeNode        | (node: ReactNode, item: [ItemDataType][item]) => ReactNode                                      | Customizes the rendering of each tree node.                                                      |
| renderValue           | (value: string, selectedItems: [ItemDataType][item][], selectedElement: ReactNode) => ReactNode | Customizes the rendering of the selected items.                                                  |
| searchable            | boolean `(true)`                                                                                | Determines whether the search functionality is enabled.                                          |
| size                  | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                                               | Sets the size of the picker.                                                                     |
| toggleAs              | ElementType `('a')`                                                                             | Specifies a custom element for the component.                                                    |
| uncheckableItemValues | string                                                                                          | Sets the values of items that cannot be checked.                                                 |
| value                 | string[]                                                                                        | Specifies the values of the selected items (controlled).                                         |
| valueKey              | string `('value')`                                                                              | Defines the key used to access values in the data.                                               |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement-start.md)}-->

[item]: #code-ts-item-data-type-code
