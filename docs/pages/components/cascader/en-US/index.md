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

| Property           | Type`(Default)`                                                                                | Description                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| appearance         | 'default' \| 'subtle' `('default')`                                                            | Set picker appearence                                                               |
| block              | boolean                                                                                        | Blocking an entire row                                                              |
| caretAs            | ElementType                                                                                    | Custom component for the caret icon                                                 |
| childrenKey        | string `('children')`                                                                          | Set children key in data                                                            |
| classPrefix        | string `('picker')`                                                                            | The prefix of the component CSS class                                               |
| cleanable          | boolean `(true)`                                                                               | Whether the selected value can be cleared                                           |
| columnHeight       | number                                                                                         | Sets the height of the menu                                                         |
| columnWidth        | number                                                                                         | Sets the width of the menu                                                          |
| container          | HTMLElement \| (() => HTMLElement)                                                             | Sets the rendering container                                                        |
| data \*            | [ItemDataType][item][]                                                                         | The data of component                                                               |
| defaultValue       | string                                                                                         | Default values of the selected items                                                |
| disabled           | boolean                                                                                        | Disabled component                                                                  |
| disabledItemValues | string[]                                                                                       | Disabled items                                                                      |
| getChildren        | (item: [ItemDataType][item]) => Promise&lt;[ItemDataType][item][]&gt;                          | Asynchronously load the children of the tree node.                                  |
| height             | number `(320)`                                                                                 | The height of Dropdown                                                              |
| labelKey           | string `('label')`                                                                             | Set label key in data                                                               |
| loading            | boolean `(false)`                                                                              | Whether to display a loading state indicator                                        |
| locale             | [PickerLocaleType](/guide/i18n/#pickers)                                                       | Define localization settings to show component text in the user's regional language |
| onChange           | (value:string, event) => void                                                                  | Callback fired when value change                                                    |
| onClean            | (event) => void                                                                                | Callback fired when value clean                                                     |
| onClose            | () => void                                                                                     | Callback fired when close component                                                 |
| onEnter            | () => void                                                                                     | Callback fired before the overlay transitions in                                    |
| onEntered          | () => void                                                                                     | Callback fired after the overlay finishes transitioning in                          |
| onEntering         | () => void                                                                                     | Callback fired as the overlay begins to transition in                               |
| onExit             | () => void                                                                                     | Callback fired right before the overlay transitions out                             |
| onExited           | () => void                                                                                     | Callback fired after the overlay finishes transitioning out                         |
| onExiting          | () => void                                                                                     | Callback fired as the overlay begins to transition out                              |
| onOpen             | () => void                                                                                     | Callback fired when open component                                                  |
| onSearch           | (searchKeyword:string, event) => void                                                          | callback function for Search                                                        |
| onSelect           | (item: [ItemDataType][item], selectedPaths: [ItemDataType][item][], event) => void             | Callback fired when item is selected                                                |
| open               | boolean                                                                                        | Whether open the component                                                          |
| parentSelectable   | boolean                                                                                        | Make parent node selectable                                                         |
| placeholder        | ReactNode `('Select')`                                                                         | Setting placeholders                                                                |
| placement          | [Placement](#code-ts-placement-code) `('bottomStart')`                                         | The placement of component                                                          |
| popupClassName     | string                                                                                         | Custom class name for the popup                                                     |
| popupStyle         | CSSProperties                                                                                  | Custom style for the popup                                                          |
| preventOverflow    | boolean                                                                                        | Prevent floating element overflow                                                   |
| renderColumn       | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode                      | Customizing the Rendering Menu list                                                 |
| renderExtraFooter  | () => ReactNode                                                                                | custom render extra footer                                                          |
| renderSearchItem   | (node: ReactNode, items: [ItemDataType][item][]) => ReactNode                                  | Custom render search result items                                                   |
| renderTreeNode     | (node: ReactNode, item: [ItemDataType][item]) => ReactNode                                     | Custom render menu items                                                            |
| renderValue        | (value: string, selectedPaths: [ItemDataType][item][], selectedElement:ReactNode) => ReactNode | Custom render selected items                                                        |
| searchable         | boolean `(true)`                                                                               | Whether you can search for options.                                                 |
| size               | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                                          | A picker can have different sizes                                                   |
| toggleAs           | ElementType `('a')`                                                                            | You can use a custom element for this component                                     |
| value              | string                                                                                         | Specifies the values of the selected items(Controlled)                              |
| valueKey           | string `('value')`                                                                             | Set value key in data                                                               |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement-start.md)}-->

[item]: #code-ts-item-data-type-code
