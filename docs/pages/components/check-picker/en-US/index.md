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

### Placement and prevent overflow

<!--{include:`placement.md`}-->

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

### Controlled

<!--{include:`controlled.md`}-->

### Virtualize Long Lists

<!--{include:`virtualized.md`}-->

## Responsive

<!--{include:<example-responsive>}-->

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

| Property           | Type`(Default)`                                                                   | Description                                                 |
| ------------------ | --------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| appearance         | 'default' \| 'subtle' `('default')`                                               | Set picker appearence                                       |
| block              | boolean                                                                           | Whether to display the component as a block                 |
| caretAs            | ElementType                                                                       | Custom component for the caret icon                         |
| classPrefix        | string `('picker')`                                                               | The prefix for the component CSS class                      |
| cleanable          | boolean `(true)`                                                                  | Whether the selected value can be cleared                   |
| container          | HTMLElement \| (() => HTMLElement)                                                | Sets the rendering container                                |
| countable          | boolean `(true)`                                                                  | Whether to display the count of selected items              |
| data \*            | [Option][item][]                                                                  | The data for the component                                  |
| defaultValue       | [Value][value]                                                                    | Default values of the selected items                        |
| disabled           | boolean                                                                           | Whether the component is disabled                           |
| disabledItemValues | [Value][value]                                                                    | Values of items to be disabled                              |
| groupBy            | string                                                                            | Key for grouping data items                                 |
| label              | ReactNode                                                                         | Label displayed at the beginning of the toggle button       |
| labelKey           | string `('label')`                                                                | Key for the label in the data items                         |
| listboxMaxHeight   | number `(320)`                                                                    | Maximum height of the listbox                               |
| listProps          | [ListProps][listprops]                                                            | Properties for virtualized lists                            |
| loading            | boolean `(false)`                                                                 | Whether to display a loading state indicator                |
| locale             | [PickerLocaleType](/guide/i18n/#pickers)                                          | Localization settings for component text                    |
| onChange           | (value: [Value][value], event) => void                                            | Callback fired when value changes                           |
| onClean            | (event) => void                                                                   | Callback fired when value is cleared                        |
| onClose            | () => void                                                                        | Callback fired when component closes                        |
| onEnter            | () => void                                                                        | Callback fired before the overlay transitions in            |
| onEntered          | () => void                                                                        | Callback fired after the overlay finishes transitioning in  |
| onEntering         | () => void                                                                        | Callback fired as the overlay begins to transition in       |
| onExit             | () => void                                                                        | Callback fired right before the overlay transitions out     |
| onExited           | () => void                                                                        | Callback fired after the overlay finishes transitioning out |
| onExiting          | () => void                                                                        | Callback fired as the overlay begins to transition out      |
| onGroupTitleClick  | (event) => void                                                                   | Callback fired when a group title is clicked                |
| onOpen             | () => void                                                                        | Callback fired when component opens                         |
| onSearch           | (search:string, event) => void                                                    | Callback fired when search is performed                     |
| onSelect           | (value: [Value][value], item: [Option][item] , event) => void                     | Callback fired when an item is selected                     |
| open               | boolean                                                                           | Whether the component is open                               |
| placeholder        | ReactNode `('Select')`                                                            | Placeholder text                                            |
| placement          | [Placement](#code-ts-placement-code)`('bottomStart')`                             | The placement of the component                              |
| popupClassName     | string                                                                            | Custom class name for the popup                             |
| popupStyle         | CSSProperties                                                                     | Custom style for the popup                                  |
| preventOverflow    | boolean                                                                           | Prevent floating element overflow                           |
| renderExtraFooter  | () => ReactNode                                                                   | Custom render function for extra footer                     |
| renderListbox      | (listbox:ReactNode) => ReactNode                                                  | Custom render function for listbox                          |
| renderOption       | (label: ReactNode, item:[Option][item]) => ReactNode                              | Custom render function for options                          |
| renderOptionGroup  | (title: ReactNode, item:[Option][item]) => ReactNode                              | Custom render function for option groups                    |
| renderValue        | (value: [Value][value], items: [Option][item][], selected:ReactNode) => ReactNode | Custom render function for selected items                   |
| searchable         | boolean `(true)`                                                                  | Whether to display search input box                         |
| searchBy           | (keyword: string, label: ReactNode, item: Option) => boolean                      | Custom search function                                      |
| size               | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                             | Size of the picker                                          |
| sort               | (isGroup: boolean) => (a: any, b: any) => number                                  | Custom sort function for options                            |
| sticky             | boolean                                                                           | Whether to stick selected options at the top                |
| toggleAs           | ElementType `('a')`                                                               | Custom element type for the component                       |
| value              | [Value][value]                                                                    | Values of the selected items (Controlled)                   |
| valueKey           | string `('value')`                                                                | Key for the value in the data items                         |
| virtualized        | boolean                                                                           | Whether to use virtualized list                             |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

### `ts:Value`

```ts
type Value = (string | number)[];
```

[item]: #code-ts-option-code
[value]: #code-ts-value-code
[listprops]: #code-ts-list-props-code
