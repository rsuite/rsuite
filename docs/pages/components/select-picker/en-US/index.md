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

### Placement and Prevent overflow

<!--{include:`placement.md`}-->

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

### Controlled

<!--{include:`controlled.md`}-->

### Virtualize Long Lists

<!--{include:`virtualized.md`}-->

### Infinite loader

<!--{include:`infinite-loader.md`}-->

## Responsive

<!--{include:<example-responsive>}-->

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

| Property           | Type `(Default)`                                                               | Description                                             |
| ------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------- |
| appearance         | 'default' \| 'subtle' `('default')`                                            | Set picker appearance                                   |
| block              | boolean                                                                        | Render the component as a block element                 |
| caretAs            | ElementType                                                                    | Custom component for the caret icon                     |
| classPrefix        | string `('picker')`                                                            | The prefix for the component CSS class                  |
| cleanable          | boolean `(true)`                                                               | Whether the value can be cleared                        |
| container          | HTMLElement \| (() => HTMLElement)                                             | Sets the rendering container                            |
| data \*            | [Option][item][]                                                               | The data for the component                              |
| defaultValue       | [Value][value]                                                                 | Default value (uncontrolled)                            |
| disabled           | boolean                                                                        | Whether the component is disabled                       |
| disabledItemValues | [Value][value][]                                                               | Values of disabled items                                |
| groupBy            | string                                                                         | Key for grouping data items                             |
| label              | ReactNode                                                                      | Label displayed at the beginning of the toggle button   |
| labelKey           | string `('label')`                                                             | Key for the label in data items                         |
| listboxMaxHeight   | number `(320)`                                                                 | Maximum height of the listbox                           |
| listProps          | [ListProps][listprops]                                                         | Properties for virtualized lists                        |
| loading            | boolean `(false)`                                                              | Whether to show a loading state                         |
| locale             | [PickerLocaleType](/guide/i18n/#pickers)                                       | Locale settings for component text                      |
| onChange           | (value: [Value][value], event) => void                                         | Callback fired when value changes                       |
| onClean            | (event) => void                                                                | Callback fired when value is cleared                    |
| onClose            | () => void                                                                     | Callback fired when component closes                    |
| onEnter            | () => void                                                                     | Callback fired before overlay transitions in            |
| onEntered          | () => void                                                                     | Callback fired after overlay finishes transitioning in  |
| onEntering         | () => void                                                                     | Callback fired as overlay begins to transition in       |
| onExit             | () => void                                                                     | Callback fired before overlay transitions out           |
| onExited           | () => void                                                                     | Callback fired after overlay finishes transitioning out |
| onExiting          | () => void                                                                     | Callback fired as overlay begins to transition out      |
| onGroupTitleClick  | (event) => void                                                                | Callback fired when group header is clicked             |
| onOpen             | () => void                                                                     | Callback fired when component opens                     |
| onSearch           | (searchKeyword: string, event) => void                                         | Callback fired when search is performed                 |
| onSelect           | (value: [Value][value], item: [Option][item], event) => void                   | Callback fired when an item is selected                 |
| open               | boolean                                                                        | Whether the component is open                           |
| placeholder        | ReactNode `('Select')`                                                         | Placeholder text                                        |
| placement          | [Placement](#code-ts-placement-code)`('bottomStart')`                          | The placement of the component                          |
| popupClassName     | string                                                                         | Custom class name for the popup                         |
| popupStyle         | CSSProperties                                                                  | Custom style for the popup                              |
| preventOverflow    | boolean                                                                        | Prevent floating element overflow                       |
| renderExtraFooter  | () => ReactNode                                                                | Custom render function for extra footer                 |
| renderListbox      | (listbox: ReactNode) => ReactNode                                              | Custom render function for listbox                      |
| renderOption       | (label: ReactNode, item: [Option][item]) => ReactNode                          | Custom render function for options                      |
| renderOptionGroup  | (title: ReactNode, item: [Option][item]) => ReactNode                          | Custom render function for option groups                |
| renderValue        | (value: [Value][value], item: [Option][item], selected:ReactNode) => ReactNode | Custom render function for selected value               |
| searchable         | boolean `(true)`                                                               | Whether the component is searchable                     |
| searchBy           | (keyword:string, label:ReactNode, item: [Option][item]) => boolean             | Custom search function                                  |
| size               | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                          | Size of the component                                   |
| sort               | (isGroup: boolean) => (a: any, b: any) => number                               | Custom sort function for options                        |
| toggleAs           | ElementType `('a')`                                                            | Custom element for the component                        |
| value              | [Value][value]                                                                 | Current value (controlled)                              |
| valueKey           | string `('value')`                                                             | Key for the value in data items                         |
| virtualized        | boolean                                                                        | Whether to use virtualized list                         |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

### `ts:Value`

```ts
type Value = string | number;
```

[item]: #code-ts-option-code
[value]: #code-ts-value-code
[listprops]: #code-ts-list-props-code
