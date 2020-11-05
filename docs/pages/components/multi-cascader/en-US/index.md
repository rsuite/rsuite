# MultiCascader

Single selection of data with hierarchical relationship structure.

## Import

<!--{include:(components/multi-cascader/fragments/import.md)}-->

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

### Inline

<!--{include:`inline.md`}-->

## Accessibility

- Combo Box: https://www.w3.org/TR/wai-aria-practices/#combobox
- Listbox: https://www.w3.org/TR/wai-aria-practices/#Listbox

### Keyboard Interaction

- <kbd>ArrowDown</kbd> : Moves focus to the next option.
- <kbd>ArrowUp</kbd> : Moves focus to the previous option.
- <kbd>ArrowRight</kbd> : Move focus to the right menu
- <kbd>ArrowLeft</kbd> : Move focus to the left menu
- <kbd>Enter</kbd> : Changes the selection state of the focused option.
- <kbd>Escape</kbd> : Dismisses the popup if it is visible.

### WAI-ARIA Roles, States, and Properties

- The component has role `combobox`.
- The component has the `aria-expanded` prop, the default value is `false`, and the value is `true` when the popup window is displayed.
- The popup of the component has a `listbox` role.
- The option in the popup has an `aria-selected` prop, and a value of `true` means it is selected.
- The option in the popup has an `aria-disabled` prop, and a value of `true` means it is disabled.
- When an `id` is set for a component, it will automatically generate an `id` for the popup, the value is `[id]-listbox`, and it will also set `aria-controls=[id]-listbox` and popup The id of the window is associated.

## Props

### `<MultiCascader>`

| Property              | Type`(Default)`                                                                                            | Description                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| appearance            | enum: 'default', 'subtle' `('default')`                                                                    | Set picker appearence                                            |
| block                 | boolean                                                                                                    | Blocking an entire row                                           |
| cascade               | boolean `(true)`                                                                                           | whether cascade select                                           |
| childrenKey           | string `('children')`                                                                                      | Set children key in data                                         |
| classPrefix           | string `('picker')`                                                                                        | The prefix of the component CSS class                            |
| cleanable             | boolean `(true)`                                                                                           | Whether the selected value can be cleared                        |
| container             | HTMLElement or (() => HTMLElement)                                                                         | Sets the rendering container                                     |
| countable             | boolean `(true)`                                                                                           | Can count selected options                                       |
| data \*               | Array&lt;[DataItemType](#types)&gt;                                                                        | The data of component                                            |
| defaultOpen           | boolean                                                                                                    | Default value of open property                                   |
| defaultValue          | string[]                                                                                                   | Default values of the selected items                             |
| disabled              | boolean                                                                                                    | Disabled component                                               |
| disabledItemValues    | string[]                                                                                                   | Disabled items                                                   |
| height                | number `(320)`                                                                                             | The height of Dropdown                                           |
| inline                | boolean                                                                                                    | The menu is displayed directly when the component is initialized |
| labelKey              | string `('label')`                                                                                         | Set label key in data                                            |
| menuHeight            | number `(200)`                                                                                             | Sets the height of the menu                                      |
| menuWidth             | number `(156)`                                                                                             | Sets the width of the menu                                       |
| onChange              | (value:string[] , event) => void                                                                           | Callback fired when value change                                 |
| onClean               | (event:SyntheticEvent) => void                                                                             | Callback fired when value clean                                  |
| onClose               | () => void                                                                                                 | Callback fired when close component                              |
| onEnter               | () => void                                                                                                 | Callback fired before the overlay transitions in                 |
| onEntered             | () => void                                                                                                 | Callback fired after the overlay finishes transitioning in       |
| onEntering            | () => void                                                                                                 | Callback fired as the overlay begins to transition in            |
| onExit                | () => void                                                                                                 | Callback fired right before the overlay transitions out          |
| onExited              | () => void                                                                                                 | Callback fired after the overlay finishes transitioning out      |
| onExiting             | () => void                                                                                                 | Callback fired as the overlay begins to transition out           |
| onGroupTitleClick     | (event) => void                                                                                            | Callback fired when click the group title                        |
| onOpen                | () => void                                                                                                 | Callback fired when open component                               |
| onSearch              | (searchKeyword:string, event) => void                                                                      | callback function for Search                                     |
| onSelect              | (item:[DataItemType](#types), activePaths: Array, concat:(data, children) => Array) => void                | Callback fired when item is selected                             |
| open                  | boolean                                                                                                    | Whether open the component                                       |
| placeholder           | ReactNode `('Select')`                                                                                     | Setting placeholders                                             |
| placement             | enum: [PlacementStart](#types)`('bottomStart')`                                                            | The placement of component                                       |
| preventOverflow       | boolean                                                                                                    | Prevent floating element overflow                                |
| renderExtraFooter     | () => ReactNode                                                                                            | custom render extra footer                                       |
| renderMenu            | (children: object[], menu:ReactNode, parentNode?: object) => ReactNode                                     | Customizing the Rendering Menu list                              |
| renderMenuItem        | (label:ReactNode, item: [DataItemType](#types)) => ReactNode                                               | Custom render menu items                                         |
| renderValue           | (value:string[],selectedItems: Array&lt;[DataItemType](#types)&gt;,selectedElement:ReactNode) => ReactNode | Custom render selected items                                     |
| searchable            | boolean `(true)`                                                                                           | Whether you can search for options.                              |
| size                  | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                                                      | A picker can have different sizes                                |
| toggleAs              | ElementType `('a')`                                                                                        | You can use a custom element for this component                  |
| uncheckableItemValues | string[]                                                                                                   | Set the option value for the check box not to be rendered        |
| value                 | string[]                                                                                                   | Specifies the values of the selected items(Controlled)           |
| valueKey              | string `('value')`                                                                                         | Set value key in data                                            |
