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

## Responsive

<!--{include:<example-responsive>}-->

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

| Property              | Type`(Default)`                                                                           | Description                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| appearance            | 'default' \| 'subtle' `('default')`                                                       | Sets the appearance of the picker                                               |
| block                 | boolean                                                                                   | Whether to display the component as a block                                     |
| caretAs               | ElementType                                                                               | Custom component for the caret icon                                             |
| cascade               | boolean `(true)`                                                                          | Whether selection should cascade from parent to child and child to parent nodes |
| childrenKey           | string `('children')`                                                                     | Set children key in data                                                        |
| classPrefix           | string `('picker')`                                                                       | The prefix for the component CSS class                                          |
| cleanable             | boolean `(true)`                                                                          | Whether the selected value can be cleared                                       |
| container             | HTMLElement \| (() => HTMLElement)                                                        | Sets the rendering container                                                    |
| countable             | boolean `(true)`                                                                          | Whether to display the count of selected items                                  |
| data \*               | [Option][item][]                                                                          | The data of component                                                           |
| defaultOpen           | boolean                                                                                   | Whether the component is open by default                                        |
| defaultValue          | string[]                                                                                  | Default values of the selected items                                            |
| disabled              | boolean                                                                                   | Whether to disable the component                                                |
| disabledItemValues    | string[]                                                                                  | Values of disabled items                                                        |
| height                | number `(320)`                                                                            | The height of Dropdown                                                          |
| inline                | boolean                                                                                   | Display the menu directly when the component is initialized                     |
| labelKey              | string `('label')`                                                                        | Set label key in data                                                           |
| loading               | boolean `(false)`                                                                         | Whether to show a loading state                                                 |
| locale                | [PickerLocaleType](/guide/i18n/#pickers)                                                  | Locale text settings                                                            |
| onChange              | (value: string[], event) => void                                                          | Callback fired when value changes                                               |
| onCheck               | (value: string, item: [Option][item], checked: boolean, event) => void                    | Callback fired after the checkbox state changes                                 |
| onClean               | (event) => void                                                                           | Callback fired when value is cleared                                            |
| onClose               | () => void                                                                                | Callback fired when the component is closed                                     |
| onEnter               | () => void                                                                                | Callback fired before the overlay transitions in                                |
| onEntered             | () => void                                                                                | Callback fired after the overlay finishes transitioning in                      |
| onEntering            | () => void                                                                                | Callback fired as the overlay begins to transition in                           |
| onExit                | () => void                                                                                | Callback fired right before the overlay transitions out                         |
| onExited              | () => void                                                                                | Callback fired after the overlay finishes transitioning out                     |
| onExiting             | () => void                                                                                | Callback fired as the overlay begins to transition out                          |
| onOpen                | () => void                                                                                | Callback fired when the component is opened                                     |
| onSearch              | (searchKeyword: string, event) => void                                                    | Callback fired when search                                                      |
| onSelect              | (item: [Option][item], selectedPaths: [Option][item][], event) => void                    | Callback fired when an item is selected                                         |
| open                  | boolean                                                                                   | Whether the component is open                                                   |
| placeholder           | ReactNode `('Select')`                                                                    | Setting placeholders                                                            |
| placement             | [Placement](#code-ts-placement-code)`('bottomStart')`                                     | The placement of component                                                      |
| popupClassName        | string                                                                                    | Custom class name for the popup                                                 |
| popupStyle            | CSSProperties                                                                             | Custom style for the popup                                                      |
| preventOverflow       | boolean                                                                                   | Prevent floating element overflow                                               |
| renderColumn          | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode                 | Custom render column                                                            |
| renderExtraFooter     | () => ReactNode                                                                           | Custom render extra footer                                                      |
| renderTreeNode        | (node: ReactNode, item: [Option][item]) => ReactNode                                      | Custom render tree node                                                         |
| renderValue           | (value: string, selectedItems: [Option][item][], selectedElement: ReactNode) => ReactNode | Custom render selected items                                                    |
| searchable            | boolean `(true)`                                                                          | Whether can be searched                                                         |
| size                  | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                                     | A picker can have different sizes                                               |
| toggleAs              | ElementType `('a')`                                                                       | You can use a custom element for this component                                 |
| uncheckableItemValues | string[]                                                                                  | Set the value of the checkbox that cannot be checked                            |
| value                 | string[]                                                                                  | Specifies the values of the selected items (controlled)                         |
| valueKey              | string `('value')`                                                                        | Set value key in data                                                           |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement-start.md)}-->

[item]: #code-ts-option-code
