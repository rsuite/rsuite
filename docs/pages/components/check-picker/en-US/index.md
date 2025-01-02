# CheckPicker

Used for multiple data selection, support grouping.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### With a label

<!--{include:`with-label.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Size

<!--{include:`size.md`}-->

### Sticky

Set the `sticky` property to put the selected in the options to the top.

<!--{include:`sticky.md`}-->

### Block

<!--{include:`block.md`}-->

### Loading state

When the picker is loading, a spinner is displayed to indicate the loading state.
Clicking a loading picker won't open its options menu.

<!--{include:`loading.md`}-->

### Group

<!--{include:`group.md`}-->

### Placement

<!--{include:`placement.md`}-->

> Tip: When set to `auto*`, try to scroll the page, or change the browser size, it will automatically appear in the right place.

### Custom options

<!--{include:`custom.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Disabled Search

<!--{include:`searchable.md`}-->

### Extra footer

Customize a select all function.

<!--{include:`extra-footer.md`}-->

### Async

<!--{include:`async.md`}-->

### Container and prevent overflow

<!--{include:`container.md`}-->

### Controlled

<!--{include:`controlled.md`}-->

### Virtualize Long Lists

<!--{include:`virtualized.md`}-->

## Accessibility

### ARIA properties

- CheckPicker has role `combobox`.
- Has the `aria-haspopup="listbox"` attribute to indicate that the combobox has a popup listbox.
- Has the `aria-expanded` attribute to indicate whether the listbox is open or not.
- Has the `aria-controls` attribute to indicate the ID of the listbox element.
- Has the `aria-activedescendant` attribute to indicate the ID of the focused option.
- When `label` is set, the `aria-labelledby` attribute is added to the combobox element and the listbox element and is set to the value of the `id` attribute of `label`.
- listbox has the `aria-multiselectable=true` attribute to indicate that the listbox is multi-selectable.

### Keyboard interactions

- <kbd>↓</kbd> - Move focus to the next option.
- <kbd>↑</kbd> - Move focus to the previous option.
- <kbd>Enter</kbd> - Select the focused option.
- <kbd>Esc</kbd> - Close the listbox.

## Props

### `<CheckPicker>`

| Property           | Type`(Default)`                                                                                    | Description                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| appearance         | 'default' &#124; 'subtle' `('default')`                                                            | Set picker appearence                                                               |
| block              | boolean                                                                                            | Blocking an entire row                                                              |
| caretAs            | ElementType                                                                                        | Custom component for the caret icon                                                 |
| classPrefix        | string `('picker')`                                                                                | The prefix of the component CSS class                                               |
| cleanable          | boolean `(true)`                                                                                   | Whether the selected value can be cleared                                           |
| container          | HTMLElement &#124; (() => HTMLElement)                                                             | Sets the rendering container                                                        |
| countable          | boolean `(true)`                                                                                   | Whether display selected items count                                                |
| data \*            | [ItemDataType][item][]                                                                             | The data of component                                                               |
| defaultValue       | [ValueType][value]                                                                                 | Default values of the selected items                                                |
| disabled           | boolean                                                                                            | Whether disabled component                                                          |
| disabledItemValues | [ValueType][value]                                                                                 | Disable item by value                                                               |
| groupBy            | string                                                                                             | Set group condition key in data                                                     |
| label              | ReactNode                                                                                          | A label displayed at the beginning of toggle button                                 |
| labelKey           | string `('label')`                                                                                 | Set label key in data                                                               |
| listProps          | [ListProps][listprops]                                                                             | Properties of virtualized lists                                                     |
| loading            | boolean `(false)`                                                                                  | Whether to display a loading state indicator                                        |
| locale             | [PickerLocaleType](/guide/i18n/#pickers)                                                           | Define localization settings to show component text in the user's regional language |
| menuClassName      | string                                                                                             | A css class to apply to the Menu DOM node.                                          |
| menuMaxHeight      | number `(320)`                                                                                     | The max height of Dropdown                                                          |
| menuStyle          | CSSProperties                                                                                      | A style to apply to the Menu DOM node.                                              |
| onChange           | (value: [ValueType][value], event) => void                                                         | Callback fired when value change                                                    |
| onClean            | (event:SyntheticEvent) => void                                                                     | Callback fired when value clean                                                     |
| onClose            | () => void                                                                                         | Callback fired when close component                                                 |
| onEnter            | () => void                                                                                         | Callback fired before the overlay transitions in                                    |
| onEntered          | () => void                                                                                         | Callback fired after the overlay finishes transitioning in                          |
| onEntering         | () => void                                                                                         | Callback fired as the overlay begins to transition in                               |
| onExit             | () => void                                                                                         | Callback fired right before the overlay transitions out                             |
| onExited           | () => void                                                                                         | Callback fired after the overlay finishes transitioning out                         |
| onExiting          | () => void                                                                                         | Callback fired as the overlay begins to transition out                              |
| onGroupTitleClick  | (event) => void                                                                                    | Callback fired when click the group title                                           |
| onOpen             | () => void                                                                                         | Callback fired when open component                                                  |
| onSearch           | (searchKeyword:string, event) => void                                                              | Callback fired when search                                                          |
| onSelect           | (value: [ValueType][value], item: [ItemDataType][item] , event) => void                            | Callback fired when item is selected                                                |
| open               | boolean                                                                                            | Whether open the component                                                          |
| placeholder        | ReactNode `('Select')`                                                                             | Setting placeholders                                                                |
| placement          | [Placement](#code-ts-placement-code)`('bottomStart')`                                              | The placement of component                                                          |
| preventOverflow    | boolean                                                                                            | Prevent floating element overflow                                                   |
| renderExtraFooter  | () => ReactNode                                                                                    | Custom render extra footer                                                          |
| renderMenu         | (menu:ReactNode) => ReactNode                                                                      | Customizing the Rendering Menu list                                                 |
| renderMenuGroup    | (groupTitle:ReactNode, item:[ItemDataType][item]) => ReactNode                                     | Custom render menu group                                                            |
| renderMenuItem     | (label:ReactNode, item: [ItemDataType][item]) => ReactNode                                         | Custom render menu items                                                            |
| renderValue        | (value: [ValueType][value], items: [ItemDataType][item][], selectedElement:ReactNode) => ReactNode | Custom render selected items                                                        |
| searchable         | boolean `(true)`                                                                                   | Whether dispaly search input box                                                    |
| searchBy           | (keyword: string, label: ReactNode, item: ItemDataType) => boolean                                 | Custom search rules                                                                 |
| size               | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                                                  | A picker can have different sizes                                                   |
| sort               | (isGroup: boolean) => (a: any, b: any) => number                                                   | Sort options                                                                        |
| sticky             | boolean                                                                                            | Top the selected option in the options                                              |
| toggleAs           | ElementType `('a')`                                                                                | You can use a custom element for this component                                     |
| value              | [ValueType][value]                                                                                 | Specifies the values of the selected items (Controlled)                             |
| valueKey           | string `('value')`                                                                                 | Set value key in data                                                               |
| virtualized        | boolean                                                                                            | Whether using Virtualized List                                                      |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

### `ts:ValueType`

```ts
type ValueType = (string | number)[];
```

[item]: #code-ts-item-data-type-code
[value]: #code-ts-value-type-code
[listprops]: #code-ts-list-props-code
