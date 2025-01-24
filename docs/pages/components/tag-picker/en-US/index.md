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

| Property               | Type`(Default)`                                                                | Description                                                                         |
| ---------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| cacheData              | [ItemDataType][item][]                                                         | Option to cache `value` when searching asynchronously                               |
| classPrefix            | string `('picker')`                                                            | The prefix of the component CSS class                                               |
| cleanable              | boolean `(true)`                                                               | Whether the selected value can be cleared                                           |
| container              | HTMLElement &#124; (() => HTMLElement)                                         | Sets the rendering container                                                        |
| creatable              | boolean                                                                        | Settings can create new options                                                     |
| data \*                | [ItemDataType][item][]                                                         | The data of component                                                               |
| defaultValue           | string[]                                                                       | Default values of the selected items                                                |
| disabled               | boolean                                                                        | Whether disabled component                                                          |
| disabledItemValues     | string[]                                                                       | Disable item by value                                                               |
| groupBy                | string                                                                         | Set group condition key in data                                                     |
| labelKey               | string `('label')`                                                             | Set label key in data                                                               |
| listProps              | [ListProps][listprops]                                                         | Properties of virtualized lists.                                                    |
| loading                | boolean `(false)`                                                              | Whether to display a loading state indicator                                        |
| locale                 | [PickerLocaleType](/guide/i18n/#pickers)                                       | Define localization settings to show component text in the user's regional language |
| menuClassName          | string                                                                         | A css class to apply to the Menu DOM node.                                          |
| menuMaxHeight          | number `(320)`                                                                 | The max height of Dropdown                                                          |
| menuStyle              | CSSProperties                                                                  | A style to apply to the Menu DOM node.                                              |
| onChange               | (value:string[], event) => void                                                | Callback fired when value change                                                    |
| onClean                | (event) => void                                                                | Callback fired when value clean                                                     |
| onClose                | () => void                                                                     | Callback fired when close component                                                 |
| onCreate               | (value: string[], item: [ItemDataType][item], event) => void                   | Callback fired when a new option is created                                         |
| onEnter                | () => void                                                                     | Callback fired before the overlay transitions in                                    |
| onEntered              | () => void                                                                     | Callback fired after the overlay finishes transitioning in                          |
| onEntering             | () => void                                                                     | Callback fired as the overlay begins to transition in                               |
| onExit                 | () => void                                                                     | Callback fired right before the overlay transitions out                             |
| onExited               | () => void                                                                     | Callback fired after the overlay finishes transitioning out                         |
| onExiting              | () => void                                                                     | Callback fired as the overlay begins to transition out                              |
| onGroupTitleClick      | (event) => void                                                                | Callback fired when click the group title                                           |
| onOpen                 | () => void                                                                     | Callback fired when open component                                                  |
| onSearch               | (searchKeyword:string, event) => void                                          | Callback fired when search                                                          |
| onSelect               | (value:string[], item: [ItemDataType][item] , event) => void                   | Callback fired when item is selected                                                |
| onTagRemove            | (value: string, event: MouseEvent) => void                                     | Callback fired when tag remove                                                      |
| open                   | boolean                                                                        | Whether open the component                                                          |
| placeholder            | ReactNode `('Select')`                                                         | Setting placeholders                                                                |
| placement              | [Placement](#code-ts-placement-code)`('bottomStart')`                          | The placement of component                                                          |
| preventOverflow        | boolean                                                                        | Prevent floating element overflow                                                   |
| renderExtraFooter      | () => ReactNode                                                                | Custom render extra footer                                                          |
| renderMenu             | (menu: ReactNode) => ReactNode                                                 | Custom render menu                                                                  |
| renderMenuGroup        | (groupTitle: ReactNode, item: [ItemDataType][item]) => ReactNode               | Custom render menu group                                                            |
| renderMenuItem         | (label:ReactNode, item: [ItemDataType][item]) => ReactNode                     | Custom render menu items                                                            |
| renderMenuItemCheckbox | (checkboxProps: CheckboxProps) => ReactNode                                    | Custom render menu items checkbox <br/>![][5.47.0]                                  |
| renderValue            | (value: string[], items:[ItemDataType][item][], tags:ReactNode[]) => ReactNode | Custom render selected items                                                        |
| searchable             | boolean `(true)`                                                               | Whether dispaly search input box                                                    |
| searchBy               | (keyword: string, label: ReactNode, item: [ItemDataType][item]) => boolean     | Custom search rules                                                                 |
| size                   | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                              | A picker can have different sizes                                                   |
| sort                   | (isGroup: boolean) => (a: any, b: any) => number                               | Sort options                                                                        |
| tagProps               | [TagProps][tagprops]                                                           | Set the props of the Tag                                                            |
| toggleAs               | ElementType `('a')`                                                            | You can use a custom element for this component                                     |
| trigger                | 'Enter' &#124; 'Space' &#124; 'Comma' `('Enter')`                              | Set the trigger for creating tags                                                   |
| value                  | string[]                                                                       | Specifies the values of the selected items (Controlled)                             |
| valueKey               | string `('value')`                                                             | Set value key in data                                                               |
| virtualized            | boolean                                                                        | Whether using Virtualized List                                                      |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

[listprops]: #code-ts-list-props-code
[tagprops]: https://rsuitejs.com/components/tag#Props
[item]: #code-ts-item-data-type-code
[5.47.0]: https://img.shields.io/badge/>=-v5.47.0-blue
