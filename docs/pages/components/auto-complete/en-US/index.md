# AutoComplete

Provide auto-complete functionality for input box.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Autocomplete suffix

<!--{include:`email.md`}-->

### Size

<!--{include:`size.md`}-->

### Custom Render Item

<!--{include:`render-item.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Combined with InputGroup

<!--{include:`input-group.md`}-->

### Controlled

<!--{include:`controlled.md`}-->

## Accessibility

### ARIA properties

- Autocomplete has role `combobox`.
- Has the `aria-haspopup="listbox"` attribute to indicate that the input has a popup listbox.
- Has the `aria-expanded` attribute to indicate whether the listbox is open or not.
- Has the `aria-controls` attribute to indicate the ID of the listbox element.
- Has the `aria-activedescendant` attribute to indicate the ID of the focused option.

### Keyboard interactions

- <kbd>Down</kbd> - Move focus to the next option.
- <kbd>Up</kbd> - Move focus to the previous option.
- <kbd>Enter</kbd> - Select the focused option.
- <kbd>Esc</kbd> - Close the listbox.

## Props

### `<AutoComplete>`

| Property       | Type`(Default)`                                                                    | Description                                                                                 |
| -------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| classPrefix    | string `('auto-complete')`                                                         | The prefix of the component CSS class                                                       |
| data \*        | [ItemDataType](#code-ts-item-data-type-code)[] &#124; string[]                     | The data of component                                                                       |
| defaultValue   | string                                                                             | The default value (uncontrolled)                                                            |
| disabled       | boolean                                                                            | Whether disabled select                                                                     |
| filterBy       | (value: string, item: [ItemDataType](#code-ts-item-data-type-code)) => boolean     | Custom filter rules (will only display items that value is a substring of which by default) |
| menuClassName  | string                                                                             | A css class to apply to the Menu DOM                                                        |
| onChange       | (value:string, event) => void                                                      | Called when select an option or input value change, or value of input is changed            |
| onClose        | () => void                                                                         | Callback fired when hidden                                                                  |
| onEnter        | () => void                                                                         | Callback fired before the overlay transitions in                                            |
| onEntered      | () => void                                                                         | Callback fired after the overlay finishes transitioning in                                  |
| onEntering     | () => void                                                                         | Callback fired as the overlay begins to transition in                                       |
| onExit         | () => void                                                                         | Callback fired right before the overlay transitions out                                     |
| onExited       | () => void                                                                         | Callback fired after the overlay finishes transitioning out                                 |
| onExiting      | () => void                                                                         | Callback fired as the overlay begins to transition out                                      |
| onSelect       | (item: [ItemDataType](#code-ts-item-data-type-code), event) => void                | Called when a option is selected.                                                           |
| placeholder    | ReactNode                                                                          | The placeholder of input                                                                    |
| renderMenu     | (menu:ReactNode) => ReactNode                                                      | Customizing the Rendering Menu list                                                         |
| renderMenuItem | (label:ReactNode, item: [ItemDataType](#code-ts-item-data-type-code)) => ReactNode | Custom render menu items                                                                    |
| selectOnEnter  | boolean `(true)`                                                                   | When set to `false`, the Enter key selection function is invalid                            |
| size           | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs'                                           | A component can have different sizes                                                        |
| value          | string                                                                             | The current value (controlled)                                                              |

<!--{include:(_common/types/item-data-type.md)}-->
