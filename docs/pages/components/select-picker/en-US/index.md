# SelectPicker

For a single data selection, support grouping.

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

### Country select

<!--{include:`custom-country-select.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Disable Search

<!--{include:`searchable.md`}-->

### Async

<!--{include:`async.md`}-->

### Container and prevent overflow

<!--{include:`container.md`}-->

### Controlled

<!--{include:`controlled.md`}-->

### Virtualize Long Lists

<!--{include:`virtualized.md`}-->

### Infinite loader

<!--{include:`infinite-loader.md`}-->

## Accessibility

### ARIA properties

- SelectPicker has role `combobox`.
- Has the `aria-haspopup="listbox"` attribute to indicate that the combobox has a popup listbox.
- Has the `aria-expanded` attribute to indicate whether the listbox is open or not.
- Has the `aria-controls` attribute to indicate the ID of the listbox element.
- Has the `aria-activedescendant` attribute to indicate the ID of the focused option.
- When `label` is set, the `aria-labelledby` attribute is added to the combobox element and the listbox element and is set to the value of the `id` attribute of `label`.

### Keyboard interactions

- <kbd>↓</kbd> - Move focus to the next option.
- <kbd>↑</kbd> - Move focus to the previous option.
- <kbd>Enter</kbd> - Select the focused option.
- <kbd>Esc</kbd> - Close the listbox.

## Props

### `<SelectPicker>`

| Property           | Type `(Default)`                                                                                | Description                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| appearance         | 'default' &#124; 'subtle' `('default')`                                                         | Set picker appearence                                                               |
| block              | boolean                                                                                         | Blocking an entire row                                                              |
| classPrefix        | string `('picker')`                                                                             | The prefix of the component CSS class                                               |
| cleanable          | boolean `(true)`                                                                                | Whether the option can be emptied.                                                  |
| container          | HTMLElement &#124; (() => HTMLElement)                                                          | Sets the rendering container                                                        |
| data \*            | [ItemDataType][item][]                                                                          | Selectable data                                                                     |
| defaultValue       | [ValueType][value]                                                                              | The default value (uncontrolled)                                                    |
| disabled           | boolean                                                                                         | Whether or not component is disabled                                                |
| disabledItemValues | [ValueType][value][]                                                                            | Disable optional                                                                    |
| groupBy            | string                                                                                          | Set grouping criteria 'key' in 'data'                                               |
| label              | ReactNode                                                                                       | A label displayed at the beginning of toggle button                                 |
| labelKey           | string `('label')`                                                                              | Set options to display the 'key' in 'data'                                          |
| listProps          | [ListProps][listprops]                                                                          | Properties of virtualized lists.                                                    |
| loading            | boolean `(false)`                                                                               | Whether to display a loading state indicator                                        |
| locale             | [PickerLocaleType](/guide/i18n/#pickers)                                                        | Define localization settings to show component text in the user's regional language |
| menuMaxHeight      | number `(320)`                                                                                  | Set the max height of the Dropdown                                                  |
| menuClassName      | string                                                                                          | A css class to apply to the Menu DOM node.                                          |
| menuStyle          | CSSProperties                                                                                   | A style to apply to the Menu DOM node.                                              |
| onChange           | (value: [ValueType][value], event) => void                                                      | callback function when value changes                                                |
| onClean            | (event) => void                                                                                 | Callback fired when value clean                                                     |
| onClose            | () => void                                                                                      | Close callback functions                                                            |
| onEnter            | () => void                                                                                      | Callback fired before the overlay transitions in                                    |
| onEntered          | () => void                                                                                      | Callback fired after the overlay finishes transitioning in                          |
| onEntering         | () => void                                                                                      | Callback fired as the overlay begins to transition in                               |
| onExit             | () => void                                                                                      | Callback fired right before the overlay transitions out                             |
| onExited           | () => void                                                                                      | Callback fired after the overlay finishes transitioning out                         |
| onExiting          | () => void                                                                                      | Callback fired as the overlay begins to transition out                              |
| onGroupTitleClick  | (event) => void                                                                                 | Click the callback function for the group header                                    |
| onOpen             | () => void                                                                                      | Open callback function                                                              |
| onSearch           | (searchKeyword: string, event) => void                                                          | callback function for Search                                                        |
| onSelect           | (value: [ValueType][value], item: [ItemDataType][item], event) => void                          | option is clicked after the selected callback function                              |
| open               | boolean                                                                                         | Whether open the component                                                          |
| placeholder        | ReactNode `('Select')`                                                                          | Setting placeholders                                                                |
| placement          | [Placement](#code-ts-placement-code)`('bottomStart')`                                           | The placement of component                                                          |
| preventOverflow    | boolean                                                                                         | Prevent floating element overflow                                                   |
| renderExtraFooter  | () => ReactNode                                                                                 | custom render extra footer                                                          |
| renderMenu         | (menu:ReactNode) => ReactNode                                                                   | Customizing the Rendering Menu list                                                 |
| renderMenuGroup    | (groupTitle:ReactNode, item: [ItemDataType][item]) => ReactNode                                 | Custom Render Options Group                                                         |
| renderMenuItem     | (label:ReactNode, item: [ItemDataType][item]) => ReactNode                                      | Custom Render Options                                                               |
| renderValue        | (value: [ValueType][value], item: [ItemDataType][item], selectedElement:ReactNode) => ReactNode | Custom Render selected options                                                      |
| searchBy           | (keyword:string, label:ReactNode, item: [ItemDataType][item]) => boolean                        | Custom search rules                                                                 |
| searchable         | boolean `(true)`                                                                                | Whether you can search for options.                                                 |
| size               | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                                               | A picker can have different sizes                                                   |
| sort               | (isGroup: boolean) => (a: any, b: any) => number                                                | Sort options                                                                        |
| toggleAs           | ElementType `('a')`                                                                             | You can use a custom element for this component                                     |
| value              | [ValueType][value]                                                                              | The current value (controlled)                                                      |
| valueKey           | string `('value')`                                                                              | Set option value 'key' in 'data'                                                    |
| virtualized        | boolean                                                                                         | Whether using Virtualized List                                                      |
| caretAs            | ElementType                                                                                     | Custom component for the caret icon                                                 |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

### `ts:ValueType`

```ts
type ValueType = string | number;
```

[item]: #code-ts-item-data-type-code
[value]: #code-ts-value-type-code
[listprops]: #code-ts-list-props-code
