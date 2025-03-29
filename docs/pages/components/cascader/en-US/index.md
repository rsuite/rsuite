# Cascader

The `Cascader` component displays a hierarchical list of options.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Size

<!--{include:`size.md`}-->

### Block

<!--{include:`block.md`}-->

### Placement

<!--{include:`placement.md`}-->

> Tip: When set to `auto*`, try to scroll the page, or change the browser size, it will automatically appear in the right place.

### Parent selectable

<!--{include:`parent-selectable.md`}-->

### Custom options

<!--{include:`custom.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Async Data

This tree allows the use of the `getChildren` option and the length of the children field on the node to be 0 to load children asynchronously.

<!--{include:`async.md`}-->

### Controlled

<!--{include:`controlled.md`}-->

### Container and prevent overflow

<!--{include:`container.md`}-->

## Responsive

<!--{include:<example-responsive>}-->

## Accessibility

### ARIA properties

- Cascader has role `combobox`.
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

### `<Cascader>`

| Property           | Type`(Default)`                                                                   | Description                                                 |
| ------------------ | --------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| appearance         | 'default' \| 'subtle' `('default')`                                               | Set picker appearance                                       |
| block              | boolean                                                                           | Occupy the full width of the parent container               |
| caretAs            | ElementType                                                                       | Custom component for the caret icon                         |
| childrenKey        | string `('children')`                                                             | Set children key in data                                    |
| classPrefix        | string `('picker')`                                                               | The prefix of the component CSS class                       |
| cleanable          | boolean `(true)`                                                                  | Whether the selected value can be cleared                   |
| columnHeight       | number                                                                            | Sets the height of the column                               |
| columnWidth        | number                                                                            | Sets the width of the column                                |
| container          | HTMLElement \| (() => HTMLElement)                                                | Sets the rendering container                                |
| data \*            | [Option][item][]                                                                  | The data of component                                       |
| defaultValue       | string                                                                            | Default values of the selected items                        |
| disabled           | boolean                                                                           | Whether to disable the component                            |
| disabledItemValues | string[]                                                                          | Values of disabled items                                    |
| getChildren        | (item: [Option][item]) => Promise&lt;[Option][item][]&gt;                         | Asynchronously load the children of the tree node           |
| height             | number `(320)`                                                                    | The height of Dropdown                                      |
| labelKey           | string `('label')`                                                                | Set label key in data                                       |
| loading            | boolean `(false)`                                                                 | Whether to display a loading state indicator                |
| locale             | [PickerLocaleType](/guide/i18n/#pickers)                                          | Locale text settings                                        |
| onChange           | (value:string, event) => void                                                     | Callback fired when value changes                           |
| onClean            | (event) => void                                                                   | Callback fired when value is cleared                        |
| onClose            | () => void                                                                        | Callback fired when component closes                        |
| onEnter            | () => void                                                                        | Callback fired before the overlay transitions in            |
| onEntered          | () => void                                                                        | Callback fired after the overlay finishes transitioning in  |
| onEntering         | () => void                                                                        | Callback fired as the overlay begins to transition in       |
| onExit             | () => void                                                                        | Callback fired right before the overlay transitions out     |
| onExited           | () => void                                                                        | Callback fired after the overlay finishes transitioning out |
| onExiting          | () => void                                                                        | Callback fired as the overlay begins to transition out      |
| onOpen             | () => void                                                                        | Callback fired when component opens                         |
| onSearch           | (search:string, event) => void                                                    | Callback function for search                                |
| onSelect           | (item: [Option][item], selectedPaths: [Option][item][], event) => void            | Callback fired when an item is selected                     |
| open               | boolean                                                                           | Whether the component is open                               |
| parentSelectable   | boolean                                                                           | Whether parent nodes are selectable                         |
| placeholder        | ReactNode `('Select')`                                                            | Placeholder text                                            |
| placement          | [Placement](#code-ts-placement-code) `('bottomStart')`                            | The placement of component                                  |
| popupClassName     | string                                                                            | Custom CSS class for the popup                              |
| popupStyle         | CSSProperties                                                                     | Custom style for the popup                                  |
| preventOverflow    | boolean                                                                           | Prevent floating element overflow                           |
| renderColumn       | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode         | Custom render function for column list                      |
| renderExtraFooter  | () => ReactNode                                                                   | Custom render function for extra footer                     |
| renderSearchItem   | (node: ReactNode, items: [Option][item][]) => ReactNode                           | Custom render function for search result items              |
| renderTreeNode     | (node: ReactNode, item: [Option][item]) => ReactNode                              | Custom render function for tree nodes                       |
| renderValue        | (value: string, selectedPaths: [Option][item][], selected:ReactNode) => ReactNode | Custom render function for selected items                   |
| searchable         | boolean `(true)`                                                                  | Whether the component is searchable                         |
| size               | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                             | Size of the component                                       |
| toggleAs           | ElementType `('a')`                                                               | Custom element for the component                            |
| value              | string                                                                            | Value of the component (Controlled)                         |
| valueKey           | string `('value')`                                                                | Set value key in data                                       |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement-start.md)}-->

[item]: #code-ts-option-code
