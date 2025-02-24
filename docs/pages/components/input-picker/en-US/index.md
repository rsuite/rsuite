# InputPicker

Single item selector with text box input.

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

### Controlled

<!--{include:`controlled.md`}-->

## Accessibility

### ARIA properties

- InputPicker has role `combobox`.
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

### `<InputPicker>`

| Property                  | Type `(Default)`                                                                  | Description                                              |
| ------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- |
| block                     | boolean                                                                           | Render the component as a block element                  |
| caretAs                   | ElementType                                                                       | Custom component for the caret icon                      |
| classPrefix               | string `('picker')`                                                               | The prefix for the component CSS class                   |
| cleanable                 | boolean `(true)`                                                                  | Whether the value can be cleared                         |
| container                 | HTMLElement\| (() => HTMLElement)                                                 | Sets the rendering container                             |
| creatable                 | boolean                                                                           | Allow creating new options                               |
| data \*                   | [ItemDataType][item][]                                                            | The data for the component                               |
| defaultValue              | string                                                                            | Default value (uncontrolled)                             |
| disabled                  | boolean                                                                           | Whether the component is disabled                        |
| disabledItemValues        | string[]                                                                          | Values of disabled items                                 |
| groupBy                   | string                                                                            | Key for grouping data items                              |
| labelKey                  | string `('label')`                                                                | Key for the label in data items                          |
| listboxMaxHeight          | number `(320)`                                                                    | Maximum height of the listbox                            |
| listProps                 | [ListProps][listprops]                                                            | Properties for virtualized lists                         |
| loading                   | boolean `(false)`                                                                 | Whether to show a loading state                          |
| locale                    | [PickerLocaleType](/guide/i18n/#pickers)                                          | Locale settings for component text                       |
| onChange                  | (value:string, event) => void                                                     | Callback fired when value changes                        |
| onClean                   | (event) => void                                                                   | Callback fired when value is cleared                     |
| onClose                   | () => void                                                                        | Callback fired when component closes                     |
| onCreate                  | (value: string, item: [ItemDataType][item], event) => void                        | Callback fired when a new option is created              |
| onEnter                   | () => void                                                                        | Callback fired before overlay transitions in             |
| onEntered                 | () => void                                                                        | Callback fired after overlay finishes transitioning in   |
| onEntering                | () => void                                                                        | Callback fired as overlay begins to transition in        |
| onExit                    | () => void                                                                        | Callback fired right before overlay transitions out      |
| onExited                  | () => void                                                                        | Callback fired after overlay finishes transitioning out  |
| onExiting                 | () => void                                                                        | Callback fired as overlay begins to transition out       |
| onGroupTitleClick         | (event) => void                                                                   | Callback fired when group header is clicked              |
| onOpen                    | () => void                                                                        | Callback fired when component opens                      |
| onSearch                  | (searchKeyword:string, event) => void                                             | Callback fired when search is performed                  |
| onSelect                  | (value:string, item: [ItemDataType][item] , event) => void                        | Callback fired when an item is selected                  |
| open                      | boolean                                                                           | Whether the component is open                            |
| placeholder               | ReactNode `('Select')`                                                            | Placeholder text                                         |
| placement                 | [Placement](#code-ts-placement-code)`('bottomStart')`                             | The placement of the component                           |
| popupClassName            | string                                                                            | Custom CSS class for the popup                           |
| popupStyle                | CSSProperties                                                                     | Custom style for the popup                               |
| preventOverflow           | boolean                                                                           | Prevent floating element overflow                        |
| renderExtraFooter         | () => ReactNode                                                                   | Custom render function for extra footer                  |
| renderListbox             | (listbox: ReactNode) => ReactNode                                                    | Custom render function for listbox                       |
| renderOption              | (label: ReactNode, item: [ItemDataType][item]) => ReactNode                       | Custom render function for options                       |
| renderOptionGroup         | (groupTitle: ReactNode, item: [ItemDataType][item]) => ReactNode                  | Custom render function for option groups                 |
| renderValue               | (value:string, item: [ItemDataType][item],selectedElement:ReactNode) => ReactNode | Custom render function for selected value                |
| searchable                | boolean `(true)`                                                                  | Whether the component is searchable                      |
| searchBy                  | (keyword: string, label: ReactNode, item: [ItemDataType][item]) => boolean        | Custom search function                                   |
| shouldDisplayCreateOption | (searchKeyword: string, filteredData: InputItemDataType[]) => boolean             | Function to determine whether to display "Create option" |
| size                      | 'lg'\| 'md'\| 'sm'\| 'xs' `('md')`                                                | Size of the component                                    |
| sort                      | (isGroup: boolean) => (a: any, b: any) => number                                  | Custom sort function for options                         |
| toggleAs                  | ElementType `('a')`                                                               | Custom element for the component                         |
| value                     | string                                                                            | Current value (controlled)                               |
| valueKey                  | string `('value')`                                                                | Key for the value in data items                          |
| virtualized               | boolean                                                                           | Whether to use virtualized list                          |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

[item]: #code-ts-item-data-type-code
[listprops]: #code-ts-list-props-code
