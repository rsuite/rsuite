# TagPicker

Multi-select by tag and support new options

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Size

<!--{include:`size.md`}-->

### Block

<!--{include:`block.md`}-->

### Group

<!--{include:`group.md`}-->

### Creatable

<!--{include:`creatable.md`}-->

### Custom

<!--{include:`custom.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Async

<!--{include:`async.md`}-->

## Responsive

On small screen devices, the selection list will be converted to a popup selector. To maintain the component's search functionality, this will only take effect when `searchable={false}` is set.

<!--{include:<example-responsive>}-->

## Accessibility

### ARIA properties

- TagPicker has role `combobox`.
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

### `<TagPicker>`

| Property           | Type`(Default)`                                                          | Description                                             |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------- |
| cacheData          | [Option][item][]                                                         | Option to cache `value` when searching asynchronously   |
| classPrefix        | string `('picker')`                                                      | The prefix of the component CSS class                   |
| cleanable          | boolean `(true)`                                                         | Whether the selected value can be cleared               |
| container          | HTMLElement \| (() => HTMLElement)                                       | Sets the rendering container                            |
| creatable          | boolean                                                                  | Allow creating new options                              |
| data \*            | [Option][item][]                                                         | The data of component                                   |
| defaultValue       | string[]                                                                 | Default values of the selected items                    |
| disabled           | boolean                                                                  | Whether to disable the component                        |
| disabledItemValues | string[]                                                                 | Values of disabled items                                |
| groupBy            | string                                                                   | Key for grouping data items                             |
| labelKey           | string `('label')`                                                       | Key for the label in data items                         |
| listboxMaxHeight   | number `(320)`                                                           | Maximum height of the listbox                           |
| listProps          | [ListProps][listprops]                                                   | Properties of virtualized lists                         |
| loading            | boolean `(false)`                                                        | Whether to display a loading state indicator            |
| locale             | [PickerLocaleType](/guide/i18n/#pickers)                                 | Locale settings for component text                      |
| onChange           | (value:string[], event) => void                                          | Callback fired when value changes                       |
| onClean            | (event) => void                                                          | Callback fired when value is cleared                    |
| onClose            | () => void                                                               | Callback fired when component closes                    |
| onCreate           | (value: string[], item: [Option][item], event) => void                   | Callback fired when a new option is created             |
| onEnter            | () => void                                                               | Callback fired before overlay transitions in            |
| onEntered          | () => void                                                               | Callback fired after overlay finishes transitioning in  |
| onEntering         | () => void                                                               | Callback fired as overlay begins to transition in       |
| onExit             | () => void                                                               | Callback fired right before overlay transitions out     |
| onExited           | () => void                                                               | Callback fired after overlay finishes transitioning out |
| onExiting          | () => void                                                               | Callback fired as overlay begins to transition out      |
| onGroupTitleClick  | (event) => void                                                          | Callback fired when group title is clicked              |
| onOpen             | () => void                                                               | Callback fired when component opens                     |
| onSearch           | (search:string, event) => void                                           | Callback fired when search is performed                 |
| onSelect           | (value:string[], item: [Option][item] , event) => void                   | Callback fired when an item is selected                 |
| onTagRemove        | (value: string, event: MouseEvent) => void                               | Callback fired when a tag is removed                    |
| open               | boolean                                                                  | Whether the component is open                           |
| placeholder        | ReactNode `('Select')`                                                   | Placeholder text                                        |
| placement          | [Placement](#code-ts-placement-code)`('bottomStart')`                    | The placement of the component                          |
| popupClassName     | string                                                                   | Custom CSS class for the popup                          |
| popupStyle         | CSSProperties                                                            | Custom style for the popup                              |
| preventOverflow    | boolean                                                                  | Prevent floating element overflow                       |
| renderCheckbox     | (checkboxProps: CheckboxProps) => ReactNode                              | Custom render function for option checkboxes            |
| renderExtraFooter  | () => ReactNode                                                          | Custom render function for extra footer                 |
| renderListbox      | (listbox: ReactNode) => ReactNode                                        | Custom render function for listbox                      |
| renderOption       | (label:ReactNode, item: [Option][item]) => ReactNode                     | Custom render function for options                      |
| renderOptionGroup  | (groupTitle: ReactNode, item: [Option][item]) => ReactNode               | Custom render function for option groups                |
| renderValue        | (value: string[], items:[Option][item][], tags:ReactNode[]) => ReactNode | Custom render function for selected items               |
| searchable         | boolean `(true)`                                                         | Whether the component is searchable                     |
| searchBy           | (keyword: string, label: ReactNode, item: [Option][item]) => boolean     | Custom search rules                                     |
| size               | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                    | The size of the component                               |
| sort               | (isGroup: boolean) => (a: any, b: any) => number                         | Sort function for options                               |
| tagProps           | [TagProps][tagprops]                                                     | Properties for the Tag component                        |
| toggleAs           | ElementType `('a')`                                                      | Custom component for the toggle                         |
| trigger            | 'Enter' \| 'Space' \| 'Comma' `('Enter')`                                | Trigger for creating tags                               |
| value              | string[]                                                                 | Current values of the selected items (controlled)       |
| valueKey           | string `('value')`                                                       | Key for the value in data items                         |
| virtualized        | boolean                                                                  | Whether to use virtualized list                         |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

[listprops]: #code-ts-list-props-code
[tagprops]: https://rsuitejs.com/components/tag#Props
[item]: #code-ts-option-code
[5.47.0]: https://img.shields.io/badge/>=-v5.47.0-blue
